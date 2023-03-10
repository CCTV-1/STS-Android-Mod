import { PatchManager } from "./PatchManager.js";
import { AbstractCard } from "./AbstractCard.js";
import { AbstractPlayer } from "./AbstractPlayer.js";
import { AbstractRelic } from "./AbstractRelic.js";

function FakeRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function UpgradeRandomCard(currentPlayer: AbstractPlayer) {
    let masterDeckGroup = currentPlayer.masterDeck.group;
    let deckSize = masterDeckGroup.size;
    let canUpgradeCards = new Array<AbstractCard>();
    let ArrayListOperatorGet = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_AbstractCardUnsafeLoad);
    for (let i = 0; i < deckSize - 1; i++) {
        let randCard = ArrayListOperatorGet(masterDeckGroup.data, i);
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
        let showCardBrieflyEffectCtor = PatchManager.GetNativeFunction(PatchManager.VFX.ShowCardBrieflyEffectCtor);
        let UpgradeShineEffectCtor = PatchManager.GetNativeFunction(PatchManager.VFX.UpgradeShineEffectCtor);
        let addFunc = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_AbstractGameEffectAdd);
        let cardBrieflyEffectObj = showCardBrieflyEffectCtor(new NativePointer(0), statCopyCard);
        let upgradeShineEffectObj = UpgradeShineEffectCtor(new NativePointer(0), PatchManager.STSGlobalVars.STSSetting_WIDTH * 0.5, PatchManager.STSGlobalVars.STSSetting_HEIGHT * 0.5);
        addFunc(topLevelEffects, cardBrieflyEffectObj);
        addFunc(topLevelEffects, upgradeShineEffectObj);
    }
}

function PatchRedCards() {
    let origStrikeRedCtorFunc = PatchManager.HookSTSFunction(PatchManager.RedCards.StrikeRedCtor, (thisPtr: NativePointer) => {
        let ret = origStrikeRedCtorFunc(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseDamage++;
        return ret;
    });
    let origDefendRedCtorFunc = PatchManager.HookSTSFunction(PatchManager.RedCards.DefendRedCtor, (thisPtr: NativePointer) => {
        let ret = origDefendRedCtorFunc(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseBlock++;
        return ret;
    });
    let origFeedCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.FeedCtor, (thisPtr: NativePointer) => {
        let ret = origFeedCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.magicNumber = ++newCard.baseMagicNumber;
        return ret;
    });
    let origBashCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.BashCtor, (thisPtr: NativePointer) => {
        let ret = origBashCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseDamage = 12;
        return ret;
    });
    let origSearingBlowUse = PatchManager.HookSTSFunction(PatchManager.RedCards.SearingBlowUse, (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        origSearingBlowUse(thisPtr, playerPtr, monsterPtr);
        let baseCard = new AbstractCard(thisPtr);
        let cardLevel = baseCard.timesUpgraded;
        let HealActionCtor = PatchManager.GetNativeFunction(PatchManager.CommonActions.HealActionCtor)
        let newHealAction = HealActionCtor(new NativePointer(0), playerPtr, playerPtr, cardLevel)
        baseCard.addToBot(newHealAction);
    });
    let origHeavyBladeCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.HeavyBladeCtor, (thisPtr: NativePointer) => {
        let ret = origHeavyBladeCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseMagicNumber += 3;
        newCard.magicNumber += 3;
        return ret;
    });
    let origClotheslineCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.ClotheslineCtor, (thisPtr: NativePointer) => {
        let ret = origClotheslineCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.cost = 1;
        newCard.costForTurn = 1;
        newCard.baseDamage = 6;
        return ret;
    });
    let origPerfectedStrikeCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.PerfectedStrikeCtor, (thisPtr: NativePointer) => {
        let ret = origPerfectedStrikeCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseMagicNumber += 2;
        newCard.magicNumber += 2;
        return ret;
    });
}

function PatchPurpleCards() {
    let origAlphaCtor = PatchManager.HookSTSFunction(PatchManager.PurpleCards.AlphaCtor, (thisPtr: NativePointer) => {
        let ret = origAlphaCtor(thisPtr);
        let OmegaCtor = PatchManager.GetNativeFunction(PatchManager.TempCards.OmegaCtor);
        let newCard = new AbstractCard(ret);
        let fakePreview = OmegaCtor(new NativePointer(0));
        newCard.cardsToPreview = fakePreview;
        return ret;
    });
}

function Patchcharacters() {
    PatchManager.HookSTSFunction(PatchManager.Characters.Ironclad.getStartingDeck, (thisPtr: NativePointer) => {
        let stringListCtor = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_StringCtor);
        let addStrFunc = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_StringAdd);
        let startDeck = stringListCtor(new NativePointer(0));

        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeRed);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeRed);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeRed);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeRed);

        addStrFunc(startDeck, PatchManager.StringLiteral.DefendRed);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendRed);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendRed);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendRed);

        if (FakeRandom(0, 10) > 8) {
            addStrFunc(startDeck, PatchManager.StringLiteral.StrikeRed);
            addStrFunc(startDeck, PatchManager.StringLiteral.DefendRed);
            addStrFunc(startDeck, PatchManager.StringLiteral.Discovery);
        } else {
            addStrFunc(startDeck, PatchManager.StringLiteral.InfernalBlade);
            addStrFunc(startDeck, PatchManager.StringLiteral.TrueGrit);
        }

        return startDeck;
    });
    PatchManager.HookSTSFunction(PatchManager.Characters.TheSilent.getStartingDeck, (thisPtr: NativePointer) => {
        let stringListCtor = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_StringCtor);
        let addStrFunc = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_StringAdd);
        let startDeck = stringListCtor(new NativePointer(0));

        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeGreen);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeGreen);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeGreen);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeGreen);

        addStrFunc(startDeck, PatchManager.StringLiteral.DefendGreen);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendGreen);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendGreen);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendGreen);

        addStrFunc(startDeck, PatchManager.StringLiteral.Neutralize);
        if (FakeRandom(0, 10) > 8) {
            addStrFunc(startDeck, PatchManager.StringLiteral.StrikeGreen);
            addStrFunc(startDeck, PatchManager.StringLiteral.DefendGreen);
            addStrFunc(startDeck, PatchManager.StringLiteral.Discovery);
        } else {
            addStrFunc(startDeck, PatchManager.StringLiteral.Distraction);
            addStrFunc(startDeck, PatchManager.StringLiteral.Distraction);
        }

        return startDeck;
    });
    PatchManager.HookSTSFunction(PatchManager.Characters.Defect.getStartingDeck, (thisPtr: NativePointer) => {
        let stringListCtor = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_StringCtor);
        let addStrFunc = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_StringAdd);
        let startDeck = stringListCtor(new NativePointer(0));

        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeBlue);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeBlue);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeBlue);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikeBlue);

        addStrFunc(startDeck, PatchManager.StringLiteral.DefendBlue);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendBlue);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendBlue);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendBlue);

        if (FakeRandom(0, 10) > 8) {
            addStrFunc(startDeck, PatchManager.StringLiteral.StrikeBlue);
            addStrFunc(startDeck, PatchManager.StringLiteral.DefendBlue);
            addStrFunc(startDeck, PatchManager.StringLiteral.Discovery);
        } else {
            addStrFunc(startDeck, PatchManager.StringLiteral.Dualcast);
            addStrFunc(startDeck, PatchManager.StringLiteral.WhiteNoise);
        }

        return startDeck;
    });
    PatchManager.HookSTSFunction(PatchManager.Characters.Watcher.getStartingDeck, (thisPtr: NativePointer) => {
        let stringListCtor = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_StringCtor);
        let addStrFunc = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_StringAdd);
        let startDeck = stringListCtor(new NativePointer(0));

        addStrFunc(startDeck, PatchManager.StringLiteral.StrikePurple);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikePurple);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikePurple);
        addStrFunc(startDeck, PatchManager.StringLiteral.StrikePurple);

        addStrFunc(startDeck, PatchManager.StringLiteral.DefendPurple);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendPurple);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendPurple);
        addStrFunc(startDeck, PatchManager.StringLiteral.DefendPurple);

        if (FakeRandom(0, 10) > 8) {
            addStrFunc(startDeck, PatchManager.StringLiteral.Discovery);
        }

        addStrFunc(startDeck, PatchManager.StringLiteral.Eruption);
        addStrFunc(startDeck, PatchManager.StringLiteral.Vigilance);

        return startDeck;
    });

    //let origLoseGoldFunc = PatchManager.HookSTSFunction(PatchManager.AbstractPlayer.loseGold, (thisPtr: NativePointer, gold: Number) => { origLoseGoldFunc(thisPtr, Math.ceil(gold * 0.6)); });

    Memory.patchCode(PatchManager.InstructionPtr.rewardCardNumber, 64, function (code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 017BE846 04 25 MOVS R5, #5  ;set numCards = 4
        numCardsModifyer.putBytes([0x4, 0x25]);
        numCardsModifyer.flush();
    });
}

function PatchPowers() {
    //let origOnCardDrawFunc = 
    PatchManager.HookSTSFunction(PatchManager.ConfusionPower.onCardDraw, (thisPtr: NativePointer, cardPtr: NativePointer) => {
        //    origOnCardDrawFunc(thisPtr, cardPtr)
        let baseCard = new AbstractCard(cardPtr);
        if (baseCard.cost >= 0) {
            let newCost = FakeRandom(0, baseCard.cost);
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
    let origBurningBloodOnVictory = PatchManager.HookSTSFunction(PatchManager.Relics.BurningBlood.onVictory, (thisPtr: NativePointer) => {
        let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
        if (currentPlayer.currentHealth < currentPlayer.maxHealth * 0.4) {
            UpgradeRandomCard(currentPlayer);
        }
        origBurningBloodOnVictory(thisPtr);
    });

    let origBlackBloodBloodOnVictory = PatchManager.HookSTSFunction(PatchManager.Relics.BlackBlood.onVictory, (thisPtr: NativePointer) => {
        let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
        if (currentPlayer.currentHealth < currentPlayer.maxHealth * 0.6) {
            UpgradeRandomCard(currentPlayer);
        }
        origBlackBloodBloodOnVictory(thisPtr);
    });

    let origGingeronCtor = PatchManager.HookSTSFunction(PatchManager.Relics.Ginger.Ctor, (thisPtr: NativePointer) => {
        let gingerObj = origGingeronCtor(thisPtr);
        let wrapGinger = new AbstractRelic(gingerObj);
        wrapGinger.OverrideonPlayCard((thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => {
            let wrapGinger = new AbstractRelic(thisPtr);
            if (wrapGinger.counter >= 4) {
                let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
                currentPlayer.heal(5, true);
                wrapGinger.counter = 0;
            }
            else {
                wrapGinger.counter++;
            }
        });
        return gingerObj;
    });

    let origSacredBarkCtor = PatchManager.HookSTSFunction(PatchManager.Relics.SacredBark.Ctor, (thisPtr: NativePointer) => {
        let sacredBarkObj = origSacredBarkCtor(thisPtr);
        let wrapSacredBark = new AbstractRelic(sacredBarkObj);
        wrapSacredBark.OverrideonEquip((thisPtr: NativePointer) => {
            let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
            currentPlayer.potionSlots += 2;
            let playerPotions = currentPlayer.potions;
            let PotionSlotCtor = PatchManager.GetNativeFunction(PatchManager.Potions.PotionSlot.Ctor);
            let AddFunc = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.ArrayList_AbstractPotionAdd);
            for (let index = 2; index <= 0 ; index--) {
                let newPotionSlot = PotionSlotCtor(new NativePointer(0), currentPlayer.potionSlots - index);
                AddFunc(playerPotions.rawPtr, newPotionSlot);
            }
        });
        return sacredBarkObj;
    })
}

function main() {
    PatchRedCards();
    Patchcharacters();
    PatchPurpleCards();
    PatchPowers();
    PatchRelics();
}

main();