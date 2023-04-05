import { PatchHelper } from "./PatchHelper.js";
import { AbstractCard } from "./NativeClassWrap/AbstractCard.js";
import { AbstractPlayer } from "./NativeClassWrap/AbstractPlayer.js";
import { AbstractRelic } from "./NativeClassWrap/AbstractRelic.js";
import { PlayerClass } from "./enums.js";
import { AbstractGameAction } from "./NativeClassWrap/AbstractGameAction.js";
import { newCardLibrary } from "./NewCardLibrary.js";
import { newRelicLibrary } from "./NewRelicLibrary.js";
import { NativeSTDLib } from "./NativeFuncWrap/NativeSTDLib.js";
import { NativeActions } from "./NativeFuncWrap/NativeActions.js";
import { NativeCards } from "./NativeFuncWrap/NativeCards.js";
import { NativeHelpers } from "./NativeFuncWrap/NativeHelpers.js";
import { NativeCharacters } from "./NativeFuncWrap/NativeCharacters.js";
import { NativeRelics } from "./NativeFuncWrap/NativeRelics.js";
import { NativePotions } from "./NativeFuncWrap/NativePotions.js";
import { NativeVFX } from "./NativeFuncWrap/NativeVFX.js";
import { NativePowers } from "./NativeFuncWrap/NativePowers.js";
import { NativeGDXLib } from "./NativeFuncWrap/NativeGDXLib.js";
import { JString } from "./NativeClassWrap/JString.js";
import { NativeSTSLib } from "./NativeFuncWrap/NativeSTSLib.js";
import { AbstractDungeon } from "./NativeClassWrap/AbstractDungeon.js";
import { NewPotionLibrary } from "./NewPotionLibrary.js";

function FakeRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function UpgradeRandomCard(currentPlayer: AbstractPlayer) {
    let masterDeckGroup = currentPlayer.masterDeck.group;
    let deckSize = masterDeckGroup.size;
    let canUpgradeCards = new Array<AbstractCard>();
    for (let i = 0; i < deckSize - 1; i++) {
        let randCard = NativeSTDLib.ArrayList.AbstractCard.get(masterDeckGroup, i);
        let wrapCard = new AbstractCard(randCard);
        if (wrapCard.canUpgrade()) {
            canUpgradeCards.push(wrapCard);
        }
    }
    if (canUpgradeCards.length > 0) {
        let index = FakeRandom(0, canUpgradeCards.length - 1);
        let upgradeCard = canUpgradeCards[index];
        upgradeCard.upgrade();
        let topLevelEffects = AbstractDungeon.getInstance().topLevelEffects;
        let statCopyCard = upgradeCard.makeStatEquivalentCopy();
        let cardBrieflyEffectObj = NativeVFX.ShowCardBrieflyEffect.Ctor(statCopyCard);
        let upgradeShineEffectObj = NativeVFX.UpgradeShineEffect.Ctor(PatchHelper.STSGlobalVars.STSSetting_WIDTH * 0.5, PatchHelper.STSGlobalVars.STSSetting_HEIGHT * 0.5);
        NativeSTDLib.ArrayList.AbstractGameEffect.Add(topLevelEffects, cardBrieflyEffectObj);
        NativeSTDLib.ArrayList.AbstractGameEffect.Add(topLevelEffects, upgradeShineEffectObj);
    }
}

function FixGDXFileHandlereadBytes() {
    let origOpenAssetFile = NativeSTSLib.OverrideopenAssestFile((thisPtr: NativePointer) => {
        let origBytesArr = origOpenAssetFile(thisPtr);
        try {
            if (origBytesArr.isNull()) {
                let wrapPath = thisPtr.readCString();
                if (wrapPath === null) {
                    return origBytesArr;
                }
                let fridaFileHandle = new File(wrapPath, "rb");
                let fileBytes = fridaFileHandle.readBytes();

                let newBytesArr = NativeSTDLib.Array.CreateByteArray(fileBytes.byteLength);
                let newBytesArrDataPtr = newBytesArr.add(0x8).readPointer();
                newBytesArrDataPtr.writeByteArray(fileBytes);
                fridaFileHandle.close();
                origBytesArr = newBytesArr;
            }
        } catch (error) {
            PatchHelper.LogV("" + (error as Error).stack);
        }

        return origBytesArr;
    });
}

function PatchNativeExceptions() {
    let origRunExceptCtor = NativeGDXLib.Utils.RuntimeException.OverrideCtor((thisPtr: NativePointer, message: NativePointer) => {
        let wrapJStr = new JString(message);
        PatchHelper.LogV("GDX::RuntimeException error message: " + wrapJStr.content);
        return origRunExceptCtor(thisPtr, message);
    });
    let origRunExcept2Ctor = NativeGDXLib.Utils.RuntimeException.OverrideCtor2((thisPtr: NativePointer, message: NativePointer, exceptPtr: NativePointer) => {
        let wrapRunTimeExceptStr = new JString(message);
        let exceptMessage = NativeSTDLib.Exception.getMessage(exceptPtr);
        let wrapExceptStr = new JString(exceptMessage);
        PatchHelper.LogV("STD::Exception error message: " + wrapExceptStr.content);
        PatchHelper.LogV("GDX::RuntimeException error message: " + wrapRunTimeExceptStr.content);
        return origRunExcept2Ctor(thisPtr, message, exceptPtr);
    });
}

function PatchRedCards() {
    let origStrikeRedCtorFunc = NativeCards.Red.StrikeRed.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origStrikeRedCtorFunc(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseDamage++;
        return ret;
    });
    let origDefendRedCtorFunc = NativeCards.Red.DefendRed.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origDefendRedCtorFunc(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseBlock++;
        return ret;
    });
    let origFeedCtor = NativeCards.Red.Feed.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origFeedCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.magicNumber = ++newCard.baseMagicNumber;
        return ret;
    });
    let origBashCtor = NativeCards.Red.Bash.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origBashCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseDamage = 12;
        return ret;
    });
    let origSearingBlowUse = NativeCards.Red.SearingBlow.OverridUse((thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        origSearingBlowUse(thisPtr, playerPtr, monsterPtr);
        let baseCard = new AbstractCard(thisPtr);
        let cardLevel = baseCard.timesUpgraded;
        let newHealAction = NativeActions.common.Heal.Ctor(playerPtr, playerPtr, cardLevel);
        baseCard.addToBot(newHealAction);
    });
    let origHeavyBladeCtor = NativeCards.Red.HeavyBlade.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origHeavyBladeCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseMagicNumber += 3;
        newCard.magicNumber += 3;
        return ret;
    });
    let origClotheslineCtor = NativeCards.Red.Clothesline.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origClotheslineCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.cost = 1;
        newCard.costForTurn = 1;
        newCard.baseDamage = 6;
        return ret;
    });
    let origPerfectedStrikeCtor = NativeCards.Red.PerfectedStrike.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origPerfectedStrikeCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseMagicNumber += 2;
        newCard.magicNumber += 2;
        return ret;
    });
    let origDemonFormUse = NativeCards.Red.DemonForm.OverridUse((thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => {
        origDemonFormUse(thisPtr, caster, target);
        let freeAttackPower = NativePowers.Watcher.FreeAttack.Ctor(caster, 1);
        let ApplyPowerActionObj = NativeActions.common.ApplyPower.Ctor2(caster, caster, freeAttackPower, 1);
        let wrapCard = new AbstractCard(thisPtr);
        wrapCard.addToBot(ApplyPowerActionObj);
    });
    let origThunderclapUse = NativeCards.Red.Thunderclap.OverridUse((thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => {
        origThunderclapUse(thisPtr, caster, target);
        let wrapCard = new AbstractCard(thisPtr);
        if (wrapCard.upgraded) {
            origThunderclapUse(thisPtr, caster, target);
        }
    });
}

function PatchPurpleCards() {
    let origAlphaCtor = NativeCards.Purple.Alpha.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origAlphaCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        let fakePreview = NativeCards.Temp.Omega.Ctor();
        newCard.cardsToPreview = fakePreview;
        return ret;
    });
}

function Patchcharacters() {
    NativeCharacters.Ironclad.OverridegetStartingDeck((thisPtr: NativePointer) => {
        let startDeck = NativeSTDLib.ArrayList.JString.Ctor();

        const baseStrike = NativeSTDLib.JString.Ctor("Strike_R");
        const baseDefend = NativeSTDLib.JString.Ctor("Defend_R");
        const addNativeStr = NativeSTDLib.ArrayList.JString.AddNativeStr;

        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);

        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);

        switch (FakeRandom(0, 1)) {
            case 0: {
                NativeSTDLib.ArrayList.JString.Add(startDeck, "BasicAttack_R");
                NativeSTDLib.ArrayList.JString.Add(startDeck, "BasicDefend_R");
                break;
            }
            default: {
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Infernal Blade");
                NativeSTDLib.ArrayList.JString.Add(startDeck, "True Grit");
                break;
            }
        }

        return startDeck;
    });
    NativeCharacters.TheSilent.OverridegetStartingDeck((thisPtr: NativePointer) => {
        let startDeck = NativeSTDLib.ArrayList.JString.Ctor();

        const baseStrike = NativeSTDLib.JString.Ctor("Strike_G");
        const baseDefend = NativeSTDLib.JString.Ctor("Defend_G");
        const addNativeStr = NativeSTDLib.ArrayList.JString.AddNativeStr;

        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);

        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);

        switch (FakeRandom(0, 1)) {
            case 0: {
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Prepared");
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Prepared");
                break;
            }
            default: {
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Poisoned Stab");
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Discovery");
                break;
            }
        }

        return startDeck;
    });
    NativeCharacters.Defect.OverridegetStartingDeck((thisPtr: NativePointer) => {
        let startDeck = NativeSTDLib.ArrayList.JString.Ctor();

        const baseStrike = NativeSTDLib.JString.Ctor("Strike_B");
        const baseDefend = NativeSTDLib.JString.Ctor("Defend_B");
        const addNativeStr = NativeSTDLib.ArrayList.JString.AddNativeStr;

        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);

        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);

        switch (FakeRandom(0, 1)) {
            case 0: {
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Ball Lightning");
                NativeSTDLib.ArrayList.JString.Add(startDeck, "White Noise");
                break;
            }
            default: {
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Chill");
                NativeSTDLib.ArrayList.JString.Add(startDeck, "White Noise");
                break;
            }
        }

        return startDeck;
    });
    NativeCharacters.Watcher.OverridegetStartingDeck((thisPtr: NativePointer) => {
        let startDeck = NativeSTDLib.ArrayList.JString.Ctor();

        const baseStrike = NativeSTDLib.JString.Ctor("Strike_P");
        const baseDefend = NativeSTDLib.JString.Ctor("Defend_P");
        const addNativeStr = NativeSTDLib.ArrayList.JString.AddNativeStr;

        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);
        addNativeStr(startDeck, baseStrike);

        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);
        addNativeStr(startDeck, baseDefend);

        switch (FakeRandom(0, 1)) {
            case 0: {
                NativeSTDLib.ArrayList.JString.Add(startDeck, "ForeignInfluence");
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Discovery");
                break;
            }
            default: {
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Eruption");
                NativeSTDLib.ArrayList.JString.Add(startDeck, "Vigilance");
                break;
            }
        }

        return startDeck;
    });

    //let origLoseGoldFunc = NativeCharacters.AbstractPlayer.OverridloseGold((thisPtr: NativePointer, gold: number) => { origLoseGoldFunc(thisPtr, Math.ceil(gold*0.6)); });

    Memory.patchCode(PatchHelper.InstructionPtr.rewardCardNumber, 64, function (code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 017BE846 04 25 MOVS R5, #5  ;set numCards = 4
        numCardsModifyer.putBytes([0x4, 0x25]);
        numCardsModifyer.flush();
    });
}

function PatchPowers() {
    //let origOnCardDrawFunc = 
    NativePowers.Common.Confusion.OverrideonCardDraw((thisPtr: NativePointer, cardPtr: NativePointer) => {
        //    origOnCardDrawFunc(thisPtr, cardPtr)
        let baseCard = new AbstractCard(cardPtr);
        if (baseCard.cost >= 0) {
            let newCost = FakeRandom(0, Math.min(3, baseCard.cost + 1));
            if (baseCard.cost != newCost) {
                baseCard.cost = newCost;
                baseCard.costForTurn = baseCard.cost;
                baseCard.isCostModified = true;
            }
            baseCard.freeToPlayOnce = false;
        }
    });
}

function PatchRelics() {
    let origBurningBloodOnVictory = NativeRelics.BurningBlood.OverrideonVictory((thisPtr: NativePointer) => {
        let currentPlayer = AbstractDungeon.getInstance().player;
        if (currentPlayer.currentHealth < currentPlayer.maxHealth * 0.4) {
            UpgradeRandomCard(currentPlayer);
        }
        origBurningBloodOnVictory(thisPtr);
    });

    let origBlackBloodBloodOnVictory = NativeRelics.BlackBlood.OverrideonVictory((thisPtr: NativePointer) => {
        let currentPlayer = AbstractDungeon.getInstance().player;
        if (currentPlayer.currentHealth < currentPlayer.maxHealth * 0.6) {
            UpgradeRandomCard(currentPlayer);
        }
        origBlackBloodBloodOnVictory(thisPtr);
    });

    //Ginger::atBattleStart don't exist,can't hook it,so we will set the function Pointer in Ginger::Ctor.
    let origGingeronCtor = NativeRelics.Ginger.OverrideCtor((thisPtr: NativePointer) => {
        let gingerObj = origGingeronCtor(thisPtr);
        let wrapGinger = new AbstractRelic(gingerObj);
        wrapGinger.OverrideatBattleStart((thisPtr: NativePointer) => {
            let currentPlayer = AbstractDungeon.getInstance().player;
            if (currentPlayer.hasRelic("Turnip")) {
                let wrapGinger = new AbstractRelic(gingerObj);
                //Apotheosis
                //wrapGinger.addToBot(new ApotheosisAction());

                //forms
                let formPowerObj = null;
                switch (currentPlayer.chosenClass) {
                    case PlayerClass.IRONCLAD: {
                        formPowerObj = NativePowers.Ironclad.DemonForm.Ctor(currentPlayer.rawPtr, 2);
                        break;
                    }
                    case PlayerClass.THE_SILENT: {
                        formPowerObj = NativePowers.Common.IntangiblePlayer.Ctor(currentPlayer.rawPtr, 2);
                        break;
                    }
                    case PlayerClass.DEFECT: {
                        formPowerObj = NativePowers.Defect.Echo.Ctor(currentPlayer.rawPtr, 1);
                        break;
                    }
                    case PlayerClass.WATCHER: {
                        formPowerObj = NativePowers.Watcher.Deva.Ctor(currentPlayer.rawPtr, 1);
                        break;
                    }
                    default: {
                        PatchHelper.LogV("class ???:" + currentPlayer.chosenClass);
                        return;
                    }
                }

                let ApplyPowerActionObj = NativeActions.common.ApplyPower.Ctor2(currentPlayer.rawPtr, currentPlayer.rawPtr, formPowerObj, 1);
                wrapGinger.addToBot(ApplyPowerActionObj);
                wrapGinger.flash();
            }
        });
        return gingerObj;
    });

    //SacredBark::onEquip don't exist,can't hook it,so we will set the function Pointer in SacredBark::Ctor.
    let origSacredBarkCtor = NativeRelics.SacredBark.OverrideCtor((thisPtr: NativePointer) => {
        let sacredBarkObj = origSacredBarkCtor(thisPtr);
        let wrapSacredBark = new AbstractRelic(sacredBarkObj);
        wrapSacredBark.OverrideonEquip((thisPtr: NativePointer) => {
            let currentPlayer = AbstractDungeon.getInstance().player;
            currentPlayer.potionSlots += 2;
            let playerPotions = currentPlayer.potions;
            for (let index = 2; index > 0; index--) {
                let newPotionSlot = NativePotions.PotionSlot.Ctor(currentPlayer.potionSlots - index);
                NativeSTDLib.ArrayList.AbstractPotion.Add(playerPotions.rawPtr, newPotionSlot);
            }
            let wrapSacredBark = new AbstractRelic(sacredBarkObj);
            wrapSacredBark.flash();
        });
        return sacredBarkObj;
    });

    //GoldenEye ability hard-code in ScryAction ctor
    let origScryActionCtor = NativeActions.utility.Scry.OverrideCtor((thisPtr: NativePointer, numCards: number) => {
        let scryActionObj = origScryActionCtor(thisPtr, numCards);
        let wrapAction = new AbstractGameAction(scryActionObj);
        if (wrapAction.amount >= 5) {
            let currentPlayer = AbstractDungeon.getInstance().player;
            if (currentPlayer.hasRelic("GoldenEye")) {
                currentPlayer.gainEnergy(1);
            }
        }
        return scryActionObj;
    });

    let origCoffeeDripperCtor = NativeRelics.CoffeeDripper.OverrideCtor((thisPtr: NativePointer) => {
        let coffeeDripperObj = origCoffeeDripperCtor(thisPtr);
        let wrapCoffeeDripper = new AbstractRelic(coffeeDripperObj);
        wrapCoffeeDripper.OverrideonEnterRestRoom((thisPtr: NativePointer) => {
            let wrapCoffeeDripper = new AbstractRelic(thisPtr);
            wrapCoffeeDripper.counter++;
            let currentPlayer = AbstractDungeon.getInstance().player;
            currentPlayer.heal(wrapCoffeeDripper.counter, true);
            wrapCoffeeDripper.flash();
        });
        return coffeeDripperObj;
    });

    Memory.patchCode(PatchHelper.InstructionPtr.VelvetChokerPlayCounter, 4, function (code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 019AD89E 09 28 CMP R0, #0x9  ;counter max increase to 10
        numCardsModifyer.putBytes([0x9, 0x28]);
        numCardsModifyer.flush();
    });
    Memory.patchCode(PatchHelper.InstructionPtr.VelvetChokerCanPlayCheck, 4, function (code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 019AD8E2 0A 28 CMP R0, #0xA  ;play card limit change to 10
        numCardsModifyer.putBytes([0xA, 0x28]);
        numCardsModifyer.flush();
    });
    Memory.patchCode(PatchHelper.InstructionPtr.VelvetChokerCanPlayStateValue, 4, function (code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 019AD904 0A 21 MOVS R1, #0xA  ;tips text number increase to 10
        numCardsModifyer.putBytes([0xA, 0x21]);
        numCardsModifyer.flush();
    });

    NativeRelics.MarkofPain.OverrideatBattleStart((thisPtr: NativePointer) => {
        let wrapMarkofPain = new AbstractRelic(thisPtr);
        wrapMarkofPain.flash();
        let relicAboveCreatureAction = NativeActions.common.RelicAboveCreature.Ctor(AbstractDungeon.getInstance().player.rawPtr, thisPtr);
        let targetCard = NativeCards.status.Burn.Ctor();
        let makeTempCardInHandAction = NativeActions.common.MakeTempCardInHand.Ctor(targetCard, 2, true);
        wrapMarkofPain.addToBot(relicAboveCreatureAction);
        wrapMarkofPain.addToBot(makeTempCardInHandAction);
    });

    //RunicPyramid::onPlayerEndTurn don't exist,can't hook it,so we will set the function Pointer in RunicPyramid::Ctor.
    let origRunicPyramidCtor = NativeRelics.RunicPyramid.OverrideCtor((thisPtr: NativePointer) => {
        let RunicPyramidObj = origRunicPyramidCtor(thisPtr);
        let wrapRunicPyramid = new AbstractRelic(RunicPyramidObj);
        wrapRunicPyramid.OverrideonPlayerEndTurn((thisPtr: NativePointer) => {
            let currentPlayer = AbstractDungeon.getInstance().player;
            let handSize = currentPlayer.hand.group.size;
            if (handSize > 0) {
                let wrapRunicPyramid = new AbstractRelic(RunicPyramidObj);
                let lootingNumber = Math.min(handSize, 3);
                let discardAction = NativeActions.common.Discard.Ctor(currentPlayer.rawPtr, currentPlayer.rawPtr, lootingNumber);
                let drawCardAction = NativeActions.common.DrawCard.Ctor2(lootingNumber);
                wrapRunicPyramid.addToBot(discardAction);
                wrapRunicPyramid.addToBot(drawCardAction);
            }
        });
        return RunicPyramidObj;
    });
}

function RegisterNewCards() {
    let origCardLibraryInitialize = NativeHelpers.CardLibrary.Overrideinitialize((thisPtr: NativePointer) => {
        for (const newCardCtor of newCardLibrary) {
            NativeHelpers.CardLibrary.Add(newCardCtor(NULL));
        }
        origCardLibraryInitialize(thisPtr);
    });
}

function RegisterNewRelic() {
    let origRelicLibraryInitialize = NativeHelpers.RelicLibrary.Overrideinitialize((thisPtr: NativePointer) => {
        for (const newRelicCtor of newRelicLibrary) {
            let origRelicPtr = newRelicCtor(NULL);
            NativeHelpers.RelicLibrary.Add(origRelicPtr);
        }

        origRelicLibraryInitialize(thisPtr);
    });
}

function RegisterNewPotions() {
    let origPotionHelpergetPotions = NativeHelpers.PotionHelper.OverridegetPotions((playerClass: number, getAll: number) => {
        let rawPotionList = origPotionHelpergetPotions(playerClass, getAll);
        if (getAll) {
            for (const k of NewPotionLibrary.PotionList.keys()) {
                NativeSTDLib.ArrayList.JString.Add(rawPotionList, k);
            }
        } else {
            for (const v of NewPotionLibrary.playerPotions(playerClass).values()) {
                NativeSTDLib.ArrayList.JString.Add(rawPotionList, v);
            }
        }
        return rawPotionList;
    });

    let origPotionHelpergetPotion = NativeHelpers.PotionHelper.OverridegetPotion((potionId: NativePointer): NativePointer => {
        let wrapId = new JString(potionId);
        const newPotionCtor = NewPotionLibrary.PotionList.get(wrapId.content);
        if (newPotionCtor !== undefined) {
            return newPotionCtor();
        }
        return origPotionHelpergetPotion(potionId);
    });
}

function main() {
    //FixGDXFileHandlereadBytes();

    PatchNativeExceptions();

    PatchRedCards();
    PatchPurpleCards();
    Patchcharacters();
    PatchPowers();
    PatchRelics();

    RegisterNewCards();
    RegisterNewRelic();
    RegisterNewPotions();
}

try {
    main();
} catch (error) {
    PatchHelper.LogV((error as Error).stack + "");
}