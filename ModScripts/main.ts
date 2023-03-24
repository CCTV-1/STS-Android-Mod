import { PatchManager } from "./PatchManager.js";
import { AbstractCard } from "./AbstractCard.js";
import { AbstractPlayer } from "./AbstractPlayer.js";
import { AbstractRelic } from "./AbstractRelic.js";
import { PlayerClass } from "./enums.js";
import { AbstractGameAction } from "./AbstractGameAction.js";
import { newCardLibrary } from "./NewCardLibrary.js";
import { newRelicLibrary } from "./NewRelicLibrary.js";

function FakeRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function UpgradeRandomCard(currentPlayer: AbstractPlayer) {
    let masterDeckGroup = currentPlayer.masterDeck.group;
    let deckSize = masterDeckGroup.size;
    let canUpgradeCards = new Array<AbstractCard>();
    for (let i = 0; i < deckSize - 1; i++) {
        let randCard = PatchManager.STSLib.ArrayList.AbstractCard.get(masterDeckGroup.data, i);
        let wrapCard = new AbstractCard(randCard);
        if (wrapCard.canUpgrade()) {
            canUpgradeCards.push(wrapCard);
        }
    }
    if (canUpgradeCards.length > 0) {
        let index = FakeRandom(0, canUpgradeCards.length - 1);
        let upgradeCard = canUpgradeCards[index];
        upgradeCard.upgrade();
        let topLevelEffects = PatchManager.STSGlobalVars.AbstractDungeon_topLevelEffects;
        let statCopyCard = upgradeCard.makeStatEquivalentCopy();
        let cardBrieflyEffectObj = PatchManager.VFX.ShowCardBrieflyEffect.Ctor(statCopyCard);
        let upgradeShineEffectObj = PatchManager.VFX.UpgradeShineEffect.Ctor(PatchManager.STSGlobalVars.STSSetting_WIDTH * 0.5, PatchManager.STSGlobalVars.STSSetting_HEIGHT * 0.5);
        PatchManager.STSLib.ArrayList.AbstractGameEffect.Add(topLevelEffects, cardBrieflyEffectObj);
        PatchManager.STSLib.ArrayList.AbstractGameEffect.Add(topLevelEffects, upgradeShineEffectObj);
    }
}

function PatchRedCards() {
    let origStrikeRedCtorFunc = PatchManager.Cards.Red.StrikeRed.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origStrikeRedCtorFunc(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseDamage++;
        return ret;
    });
    let origDefendRedCtorFunc = PatchManager.Cards.Red.DefendRed.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origDefendRedCtorFunc(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseBlock++;
        return ret;
    });
    let origFeedCtor = PatchManager.Cards.Red.Feed.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origFeedCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.magicNumber = ++newCard.baseMagicNumber;
        return ret;
    });
    let origBashCtor = PatchManager.Cards.Red.Bash.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origBashCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseDamage = 12;
        return ret;
    });
    let origSearingBlowUse = PatchManager.Cards.Red.SearingBlow.OverridUse((thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        origSearingBlowUse(thisPtr, playerPtr, monsterPtr);
        let baseCard = new AbstractCard(thisPtr);
        let cardLevel = baseCard.timesUpgraded;
        let newHealAction = PatchManager.Actions.Heal.Ctor(playerPtr, playerPtr, cardLevel);
        baseCard.addToBot(newHealAction);
    });
    let origHeavyBladeCtor = PatchManager.Cards.Red.HeavyBlade.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origHeavyBladeCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseMagicNumber += 3;
        newCard.magicNumber += 3;
        return ret;
    });
    let origClotheslineCtor = PatchManager.Cards.Red.Clothesline.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origClotheslineCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.cost = 1;
        newCard.costForTurn = 1;
        newCard.baseDamage = 6;
        return ret;
    });
    let origPerfectedStrikeCtor = PatchManager.Cards.Red.PerfectedStrike.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origPerfectedStrikeCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseMagicNumber += 2;
        newCard.magicNumber += 2;
        return ret;
    });
    let origDemonFormUse = PatchManager.Cards.Red.DemonForm.OverridUse((thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => {
        origDemonFormUse(thisPtr, caster, target);
        let freeAttackPower = PatchManager.Powers.FreeAttack.Ctor(caster, 1);
        let ApplyPowerActionObj = PatchManager.Actions.ApplyPower.Ctor2(caster, caster, freeAttackPower, 1);
        let wrapCard = new AbstractCard(thisPtr);
        wrapCard.addToBot(ApplyPowerActionObj);
    });
    let origThunderclapUse = PatchManager.Cards.Red.Thunderclap.OverridUse((thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => {
        origThunderclapUse(thisPtr, caster, target);
        let wrapCard = new AbstractCard(thisPtr);
        if (wrapCard.upgraded) {
            origThunderclapUse(thisPtr, caster, target);
        }
    });
}

function PatchPurpleCards() {
    let origAlphaCtor = PatchManager.Cards.Purple.Alpha.OverrideCtor((thisPtr: NativePointer) => {
        let ret = origAlphaCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        let fakePreview = PatchManager.Cards.Temp.Omega.Ctor();
        newCard.cardsToPreview = fakePreview;
        return ret;
    });
}

function Patchcharacters() {
    PatchManager.Characters.Ironclad.OverridegetStartingDeck((thisPtr: NativePointer) => {
        let startDeck = PatchManager.STSLib.ArrayList.JString.Ctor();

        const baseStrike = PatchManager.STSLib.JString.Ctor("Strike_R");
        const baseDefend = PatchManager.STSLib.JString.Ctor("Defend_R");
        const addNativeStr = PatchManager.STSLib.ArrayList.JString.AddNativeStr;

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
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "BasicAttack_R");
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "BasicDefend_R");
                break;
            }
            default: {
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "Infernal Blade");
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "True Grit");
                break;
            }
        }

        return startDeck;
    });
    PatchManager.Characters.TheSilent.OverridegetStartingDeck((thisPtr: NativePointer) => {
        let startDeck = PatchManager.STSLib.ArrayList.JString.Ctor();

        const baseStrike = PatchManager.STSLib.JString.Ctor("Strike_G");
        const baseDefend = PatchManager.STSLib.JString.Ctor("Defend_G");
        const addNativeStr = PatchManager.STSLib.ArrayList.JString.AddNativeStr;

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
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "Distraction");
                break;
            }
            default: {
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "Discovery");
                break;
            }
        }

        return startDeck;
    });
    PatchManager.Characters.Defect.OverridegetStartingDeck((thisPtr: NativePointer) => {
        let startDeck = PatchManager.STSLib.ArrayList.JString.Ctor();

        const baseStrike = PatchManager.STSLib.JString.Ctor("Strike_B");
        const baseDefend = PatchManager.STSLib.JString.Ctor("Defend_B");
        const addNativeStr = PatchManager.STSLib.ArrayList.JString.AddNativeStr;

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
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "Ball Lightning");
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "Distraction");
                break;
            }
            default: {
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "Dualcast");
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "White Noise");
                break;
            }
        }

        return startDeck;
    });
    PatchManager.Characters.Watcher.OverridegetStartingDeck((thisPtr: NativePointer) => {
        let startDeck = PatchManager.STSLib.ArrayList.JString.Ctor();

        const baseStrike = PatchManager.STSLib.JString.Ctor("Strike_P");
        const baseDefend = PatchManager.STSLib.JString.Ctor("Defend_P");
        const addNativeStr = PatchManager.STSLib.ArrayList.JString.AddNativeStr;

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
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "ForeignInfluence");
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "Discovery");
                break;
            }
            default: {
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "Eruption");
                PatchManager.STSLib.ArrayList.JString.Add(startDeck, "Vigilance");
                break;
            }
        }

        return startDeck;
    });

    //let origLoseGoldFunc = PatchManager.Characters.AbstractPlayer.OverridloseGold((thisPtr: NativePointer, gold: number) => { origLoseGoldFunc(thisPtr, Math.ceil(gold*0.6)); });

    Memory.patchCode(PatchManager.InstructionPtr.rewardCardNumber, 64, function (code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 017BE846 04 25 MOVS R5, #5  ;set numCards = 4
        numCardsModifyer.putBytes([0x4, 0x25]);
        numCardsModifyer.flush();
    });
}

function PatchPowers() {
    //let origOnCardDrawFunc = 
    PatchManager.Powers.Confusion.OverrideonCardDraw((thisPtr: NativePointer, cardPtr: NativePointer) => {
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
    let origBurningBloodOnVictory = PatchManager.Relics.BurningBlood.OverrideonVictory((thisPtr: NativePointer) => {
        let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
        if (currentPlayer.currentHealth < currentPlayer.maxHealth * 0.4) {
            UpgradeRandomCard(currentPlayer);
        }
        origBurningBloodOnVictory(thisPtr);
    });

    let origBlackBloodBloodOnVictory = PatchManager.Relics.BlackBlood.OverrideonVictory((thisPtr: NativePointer) => {
        let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
        if (currentPlayer.currentHealth < currentPlayer.maxHealth * 0.6) {
            UpgradeRandomCard(currentPlayer);
        }
        origBlackBloodBloodOnVictory(thisPtr);
    });

    //Ginger::atBattleStart don't exist,can't hook it,so we will set the function Pointer in Ginger::Ctor.
    let origGingeronCtor = PatchManager.Relics.Ginger.OverrideCtor((thisPtr: NativePointer) => {
        let gingerObj = origGingeronCtor(thisPtr);
        let wrapGinger = new AbstractRelic(gingerObj);
        wrapGinger.OverrideatBattleStart((thisPtr: NativePointer) => {
            let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
            if (currentPlayer.hasRelic("Turnip")) {
                let wrapGinger = new AbstractRelic(gingerObj);
                //Apotheosis
                //wrapGinger.addToBot(new ApotheosisAction());

                //forms
                let formPowerObj = null;
                switch (currentPlayer.chosenClass) {
                    case PlayerClass.IRONCLAD: {
                        formPowerObj = PatchManager.Powers.DemonForm.Ctor(currentPlayer.rawPtr, 2);
                        break;
                    }
                    case PlayerClass.THE_SILENT: {
                        formPowerObj = PatchManager.Powers.IntangiblePlayer.Ctor(currentPlayer.rawPtr, 2);
                        break;
                    }
                    case PlayerClass.DEFECT: {
                        formPowerObj = PatchManager.Powers.Echo.Ctor(currentPlayer.rawPtr, 1);
                        break;
                    }
                    case PlayerClass.WATCHER: {
                        formPowerObj = PatchManager.Powers.Deva.Ctor(currentPlayer.rawPtr, 1);
                        break;
                    }
                    default: {
                        PatchManager.LogV("class ???:" + currentPlayer.chosenClass);
                        return;
                    }
                }

                let ApplyPowerActionObj = PatchManager.Actions.ApplyPower.Ctor2(currentPlayer.rawPtr, currentPlayer.rawPtr, formPowerObj, 1);
                wrapGinger.addToBot(ApplyPowerActionObj);
                wrapGinger.flash();
            }
        });
        return gingerObj;
    });

    //SacredBark::onEquip don't exist,can't hook it,so we will set the function Pointer in SacredBark::Ctor.
    let origSacredBarkCtor = PatchManager.Relics.SacredBark.OverrideCtor((thisPtr: NativePointer) => {
        let sacredBarkObj = origSacredBarkCtor(thisPtr);
        let wrapSacredBark = new AbstractRelic(sacredBarkObj);
        wrapSacredBark.OverrideonEquip((thisPtr: NativePointer) => {
            let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
            currentPlayer.potionSlots += 2;
            let playerPotions = currentPlayer.potions;
            for (let index = 2; index > 0; index--) {
                let newPotionSlot = PatchManager.Potions.PotionSlot.Ctor(currentPlayer.potionSlots - index);
                PatchManager.STSLib.ArrayList.AbstractPotion.Add(playerPotions.rawPtr, newPotionSlot);
            }
            let wrapSacredBark = new AbstractRelic(sacredBarkObj);
            wrapSacredBark.flash();
        });
        return sacredBarkObj;
    });

    //GoldenEye ability hard-code in ScryAction ctor
    let origScryActionCtor = PatchManager.Actions.Scry.OverrideCtor((thisPtr: NativePointer, numCards: number) => {
        let scryActionObj = origScryActionCtor(thisPtr, numCards);
        let wrapAction = new AbstractGameAction(scryActionObj);
        if (wrapAction.amount >= 5) {
            let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
            if (currentPlayer.hasRelic("GoldenEye")) {
                currentPlayer.gainEnergy(1);
            }
        }
        return scryActionObj;
    });

    let origCoffeeDripperCtor = PatchManager.Relics.CoffeeDripper.OverrideCtor((thisPtr: NativePointer) => {
        let coffeeDripperObj = origCoffeeDripperCtor(thisPtr);
        let wrapCoffeeDripper = new AbstractRelic(coffeeDripperObj);
        wrapCoffeeDripper.OverrideonEnterRestRoom((thisPtr: NativePointer) => {
            let wrapCoffeeDripper = new AbstractRelic(thisPtr);
            wrapCoffeeDripper.counter++;
            let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
            currentPlayer.heal(wrapCoffeeDripper.counter, true);
            wrapCoffeeDripper.flash();
        });
        return coffeeDripperObj;
    });

    Memory.patchCode(PatchManager.InstructionPtr.VelvetChokerPlayCounter, 4, function (code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 019AD89E 09 28 CMP R0, #0x9  ;counter max increase to 10
        numCardsModifyer.putBytes([0x9, 0x28]);
        numCardsModifyer.flush();
    });
    Memory.patchCode(PatchManager.InstructionPtr.VelvetChokerCanPlayCheck, 4, function (code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 019AD8E2 0A 28 CMP R0, #0xA  ;play card limit change to 10
        numCardsModifyer.putBytes([0xA, 0x28]);
        numCardsModifyer.flush();
    });
    Memory.patchCode(PatchManager.InstructionPtr.VelvetChokerCanPlayStateValue, 4, function (code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 019AD904 0A 21 MOVS R1, #0xA  ;tips text number increase to 10
        numCardsModifyer.putBytes([0xA, 0x21]);
        numCardsModifyer.flush();
    });

    PatchManager.Relics.MarkofPain.OverrideatBattleStart((thisPtr: NativePointer) => {
        let wrapMarkofPain = new AbstractRelic(thisPtr);
        wrapMarkofPain.flash();
        let relicAboveCreatureAction = PatchManager.Actions.RelicAboveCreature.Ctor(PatchManager.STSGlobalVars.AbstractDungeon_player.rawPtr, thisPtr);
        let targetCard = PatchManager.Cards.status.Burn.Ctor();
        let makeTempCardInHandAction = PatchManager.Actions.MakeTempCardInHand.Ctor(targetCard, 2, true);
        wrapMarkofPain.addToBot(relicAboveCreatureAction);
        wrapMarkofPain.addToBot(makeTempCardInHandAction);
    });

    //RunicPyramid::onPlayerEndTurn don't exist,can't hook it,so we will set the function Pointer in RunicPyramid::Ctor.
    let origRunicPyramidCtor = PatchManager.Relics.RunicPyramid.OverrideCtor((thisPtr: NativePointer) => {
        let RunicPyramidObj = origRunicPyramidCtor(thisPtr);
        let wrapRunicPyramid = new AbstractRelic(RunicPyramidObj);
        wrapRunicPyramid.OverrideonPlayerEndTurn((thisPtr: NativePointer) => {
            let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
            let handSize = currentPlayer.hand.group.size;
            if (handSize > 0) {
                let wrapRunicPyramid = new AbstractRelic(RunicPyramidObj);
                let lootingNumber = Math.min(handSize, 3);
                let discardAction = PatchManager.Actions.Discard.Ctor(currentPlayer.rawPtr, currentPlayer.rawPtr, lootingNumber);
                let drawCardAction = PatchManager.Actions.DrawCard.Ctor2(lootingNumber);
                wrapRunicPyramid.addToBot(discardAction);
                wrapRunicPyramid.addToBot(drawCardAction);
            }
        });
        return RunicPyramidObj;
    });
}

function RegisterNewCards() {
    let origCardLibraryInitialize = PatchManager.CardLibrary.Overrideinitialize((thisPtr: NativePointer) => {
        for (const newCardCtor of newCardLibrary) {
            PatchManager.CardLibrary.Add(newCardCtor(PatchManager.nullptr));
        }
        origCardLibraryInitialize(thisPtr);
    });
}

function RegisterNewRelic() {
    let origRelicLibraryInitialize = PatchManager.RelicLibrary.Overrideinitialize((thisPtr: NativePointer) => {
        for (const newRelicCtor of newRelicLibrary) {
            let origRelicPtr = newRelicCtor(PatchManager.nullptr);
            PatchManager.RelicLibrary.Add(origRelicPtr);
        }

        origRelicLibraryInitialize(thisPtr);
    });
}

function main() {
    PatchRedCards();
    PatchPurpleCards();
    Patchcharacters();
    PatchPowers();
    PatchRelics();

    RegisterNewCards();
    RegisterNewRelic();
}

try {
    main();
} catch (error) {
    PatchManager.LogV("error message:" + error);
}