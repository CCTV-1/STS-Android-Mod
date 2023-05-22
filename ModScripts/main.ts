import { AbstractCard } from "./NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "./NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction } from "./NativeClassWrap/AbstractGameAction.js";
import { AbstractMonster } from "./NativeClassWrap/AbstractMonster.js";
import { AbstractOrb } from "./NativeClassWrap/AbstractOrb.js";
import { AbstractPotion } from "./NativeClassWrap/AbstractPotion.js";
import { AbstractPower } from "./NativeClassWrap/AbstractPower.js";
import { AbstractRelic } from "./NativeClassWrap/AbstractRelic.js";
import { ArrayList } from "./NativeClassWrap/ArrayList.js";
import { JString } from "./NativeClassWrap/JString.js";
import { ModUtility } from "./ModUtility.js";
import { MonsterIntent, PlayerClass } from "./enums.js";
import { NativeActions } from "./NativeFuncWrap/NativeActions.js";
import { NativeCards } from "./NativeFuncWrap/NativeCards.js";
import { NativeCharacters } from "./NativeFuncWrap/NativeCharacters.js";
import { NativeGDXLib } from "./NativeFuncWrap/NativeGDXLib.js";
import { NativeHelpers } from "./NativeFuncWrap/NativeHelpers.js";
import { NativeMonsters } from "./NativeFuncWrap/NativeMonsters.js";
import { NativeOrbs } from "./NativeFuncWrap/NativeOrbs.js";
import { NativePotions } from "./NativeFuncWrap/NativePotions.js";
import { NativePowers } from "./NativeFuncWrap/NativePowers.js";
import { NativeRelics } from "./NativeFuncWrap/NativeRelics.js";
import { NativeSTDLib } from "./NativeFuncWrap/NativeSTDLib.js";
import { NativeSTSLib } from "./NativeFuncWrap/NativeSTSLib.js";
import { newCardLibrary } from "./NewCardLibrary.js";
import { NewPotionLibrary } from "./NewPotionLibrary.js";
import { newRelicLibrary } from "./NewRelicLibrary.js";
import { PatchHelper } from "./PatchHelper.js";
import { PowerTip } from "./NativeClassWrap/PowerTip.js";
import { Random } from "./NativeClassWrap/Random.js";

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

function PatchAbstractCardFunctions() {
    let origMakeStatEquivalentCopy = NativeCards.AbstractCard.OverridemakeStatEquivalentCopy((thisPtr: NativePointer) => {
        let origCopy = origMakeStatEquivalentCopy(thisPtr);
        let wrapCopyCard = new AbstractCard(origCopy);
        let wrapOriCard = new AbstractCard(thisPtr);
        wrapCopyCard.exhaust = wrapOriCard.exhaust;
        return origCopy;
    })
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

        switch (ModUtility.FakeRandom(0, 1)) {
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

        switch (ModUtility.FakeRandom(0, 1)) {
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

        switch (ModUtility.FakeRandom(0, 1)) {
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

        switch (ModUtility.FakeRandom(0, 1)) {
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
            const eventRng = new Random(AbstractDungeon.getInstance().eventRng);
            let newCost = eventRng.randomI32_2(0, Math.min(3, baseCard.cost + 1));
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
            ModUtility.UpgradeRandomCard(currentPlayer);
        }
        origBurningBloodOnVictory(thisPtr);
    });

    let origBlackBloodBloodOnVictory = NativeRelics.BlackBlood.OverrideonVictory((thisPtr: NativePointer) => {
        let currentPlayer = AbstractDungeon.getInstance().player;
        if (currentPlayer.currentHealth < currentPlayer.maxHealth * 0.6) {
            ModUtility.UpgradeRandomCard(currentPlayer);
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
            currentPlayer.heal2(wrapCoffeeDripper.counter);
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

function PatchMonsters() {
    let origupdateIntentTip = NativeMonsters.Abstract.OverrideupdateIntentTip((thisPtr: NativePointer) => {
        origupdateIntentTip(thisPtr);
        let wrapMonster = new AbstractMonster(thisPtr);
        if (wrapMonster.isMultiDmg) {
            switch (wrapMonster.intent) {
                case MonsterIntent.ATTACK:
                case MonsterIntent.ATTACK_BUFF:
                case MonsterIntent.ATTACK_DEFEND: {
                    let intentTip = wrapMonster.intentTip;
                    let wrapTip = new PowerTip(intentTip);
                    wrapTip.body += "(" + wrapMonster.intentDmg * wrapMonster.intentMultiAmt + ")";
                }
                default: {
                    break;
                }
            }
        }
    });
    //todo: Override AbstractMonster::renderDamageRange change "AXB" to display "AXB(C)".
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
            for (const v of NewPotionLibrary.playerPotions(PlayerClass.DEFECT).values()) {
                NativeSTDLib.ArrayList.JString.Add(rawPotionList, v);
            }
            for (const v of NewPotionLibrary.playerPotions(PlayerClass.THE_SILENT).values()) {
                NativeSTDLib.ArrayList.JString.Add(rawPotionList, v);
            }
            for (const v of NewPotionLibrary.playerPotions(PlayerClass.DEFECT).values()) {
                NativeSTDLib.ArrayList.JString.Add(rawPotionList, v);
            }
            for (const v of NewPotionLibrary.playerPotions(PlayerClass.WATCHER).values()) {
                NativeSTDLib.ArrayList.JString.Add(rawPotionList, v);
            }
        } else {
            for (const v of NewPotionLibrary.playerPotions(playerClass).values()) {
                NativeSTDLib.ArrayList.JString.Add(rawPotionList, v);
            }
        }

        for (const k of NewPotionLibrary.PotionList.keys()) {
            NativeSTDLib.ArrayList.JString.Add(rawPotionList, k);
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

function RegisterNewCharacters() {
    const origCharacterManagerCtor = NativeSTSLib.CharacterManager.OverrideCtor((thisPtr: NativePointer) => {
        let charactersListPtr = PatchHelper.STSGlobalVars.masterCharacterList;
        let addNewCharacter = false;
        if (charactersListPtr.isNull()) {
            addNewCharacter = true
        }
        const managerObj = origCharacterManagerCtor(thisPtr);
        if (addNewCharacter) {
            charactersListPtr = PatchHelper.STSGlobalVars.masterCharacterList;
            const wrapList = new ArrayList(charactersListPtr);
            if (wrapList.size === 4) {
                //NativeSTDLib.ArrayList.AbstractPlayer.Add(charactersListPtr, NativeCharacters.Watcher.Ctor());
            }
        }
        return managerObj;
    });
}

function RegisterNewOrbs() {
    NativeOrbs.AbstractOrb.OverridegetRandomOrb((useCardRng: boolean) => {
        const orbs = new Array<NativePointer>(
            NativeOrbs.Dark.Ctor(),
            NativeOrbs.Frost.Ctor(),
            NativeOrbs.Lightning.Ctor(),
            NativeOrbs.Plasma.Ctor(),
            /** Mod Extra Orb */

        );

        let randValue: number = 0;
        if (useCardRng) {
            const cardRng = AbstractDungeon.getInstance().cardRandomRng;
            const RNGWrap = new Random(cardRng);
            randValue = RNGWrap.randomI32_2(0, orbs.length - 1);
        }

        randValue = ModUtility.FakeRandom(0, orbs.length - 1);
        return orbs[randValue];
    });
}

function ListenNativeObjectAlloc() {
    //let origLoadPlayerSaveFunc = NativeSTSLib.OverrideloadPlayerSave((gameInstance, playerPtr) => {
    //    AbstractCard.OnGameSaveLoad();
    //    AbstractRelic.OnGameSaveLoad();
    //    origLoadPlayerSaveFunc(gameInstance, playerPtr);
    //});

    //these ctor pass RuntimeType_t argument to call GC_malloc,so these maybe use different memory pool to alloc memory.
    //so maybe don't need send all wrapped class::ctor return value to each wrapClass::OnNativeObjectAlloc?
    let origAbstractCardCtor = NativeCards.AbstractCard.OverrideCtor((thisPtr: NativePointer, id: NativePointer, name: NativePointer, imgUrl: NativePointer, cost: number, rawDescription: NativePointer, type: Number, color: Number, rarity: Number, target: Number, dType: Number) => {
        const rawPtr = origAbstractCardCtor(thisPtr, id, name, imgUrl, cost, rawDescription, type, color, rarity, target, dType);
        AbstractCard.OnNativeObjectAlloc(rawPtr.toUInt32());
        return rawPtr;
    });

    let origAbstractRelicCtor = NativeRelics.AbstractRelic.OverrideCtor((thisPtr: NativePointer, relicId: NativePointer, imgName: NativePointer, tier: Number, sfx: Number) => {
        const rawPtr = origAbstractRelicCtor(thisPtr, relicId, imgName, tier, sfx);
        AbstractRelic.OnNativeObjectAlloc(rawPtr.toUInt32());
        return rawPtr;
    });

    let origAbstractPowerCtor = NativePowers.Abstract.OverrideCtor((thisPtr: NativePointer) => {
        const rawPtr = origAbstractPowerCtor(thisPtr);
        AbstractPower.OnNativeObjectAlloc(rawPtr.toUInt32());
        return rawPtr;
    });

    let origAbstractActionCtor = NativeActions.Abstract.OverrideCtor((thisPtr: NativePointer) => {
        const rawPtr = origAbstractActionCtor(thisPtr);
        AbstractGameAction.OnNativeObjectAlloc(rawPtr.toUInt32());
        return rawPtr;
    });

    let origAbstractPotionCtor = NativePotions.Abstract.OverrideCtor2((thisPtr: NativePointer, name: NativePointer, id: NativePointer, rarity: number, size: number, color: number, liquidColor: NativePointer, hybridColor: NativePointer, spotsColor: NativePointer) => {
        const rawPtr = origAbstractPotionCtor(thisPtr, name, id, rarity, size, color, liquidColor, hybridColor, spotsColor);
        AbstractPotion.OnNativeObjectAlloc(rawPtr.toUInt32());
        return rawPtr;
    });

    let origAbstractOrbCtor = NativeOrbs.AbstractOrb.OverrideCtor((thisPtr: NativePointer) => {
        const rawPtr = origAbstractOrbCtor(thisPtr);
        AbstractOrb.OnNativeObjectAlloc(rawPtr.toUInt32());
        return rawPtr;
    });
};

function main() {
    //FixGDXFileHandlereadBytes();

    //PatchNativeExceptions();
    PatchAbstractCardFunctions();

    PatchRedCards();
    PatchPurpleCards();
    Patchcharacters();
    PatchPowers();
    PatchRelics();
    PatchMonsters();

    RegisterNewCards();
    RegisterNewRelic();
    RegisterNewPotions();
    RegisterNewCharacters();
    RegisterNewOrbs();

    ListenNativeObjectAlloc();
}

try {
    main();
} catch (error) {
    PatchHelper.LogV((error as Error).stack + "");
}