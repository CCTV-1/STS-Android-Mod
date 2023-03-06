import { PatchManager } from "./PatchManager.js";
import { AbstractCard } from "./AbstractCard.js";
import { AbstractPlayer } from "./AbstractPlayer.js";

function FakeRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function UpgradeRandomCard(currentPlayer: AbstractPlayer) {
    let masterDeckGroup = currentPlayer.masterDeck.group;
    let deckSize = masterDeckGroup.size;
    let index = FakeRandom(0, deckSize - 1);
    let ArrayListOperatorGet = PatchManager.CreateNativeFunction(PatchManager.STSNativeLib.ArrayList_AbstractCardUnsafeLoad);
    let randCard = ArrayListOperatorGet(masterDeckGroup.data, index);
    let wrapCard = new AbstractCard(randCard);
    if (wrapCard.canUpgrade()) {
        wrapCard.upgrade();
        let topLevelEffects = PatchManager.STSGlobalVars.AbstractDungeon_topLevelEffects;
        let statCopyCard = wrapCard.makeStatEquivalentCopy();
        let showCardBrieflyEffectCtor = PatchManager.CreateNativeFunction(PatchManager.VFX.ShowCardBrieflyEffectCtor);
        let UpgradeShineEffectCtor = PatchManager.CreateNativeFunction(PatchManager.VFX.UpgradeShineEffectCtor);
        let addFunc = PatchManager.CreateNativeFunction(PatchManager.STSNativeLib.ArrayList_AbstractGameEffectAdd);
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
        let HealActionCtor = PatchManager.CreateNativeFunction(PatchManager.CommonActions.HealActionCtor)
        let newHealAction = HealActionCtor(new NativePointer(0), playerPtr, playerPtr, cardLevel)
        let addToBotFunc = PatchManager.CreateNativeFunction(PatchManager.AbstractCard.addToBot);
        addToBotFunc(thisPtr, newHealAction);
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
        let OmegaCtor = PatchManager.CreateNativeFunction(PatchManager.TempCards.OmegaCtor);
        let newCard = new AbstractCard(ret);
        let fakePreview = OmegaCtor(new NativePointer(0));
        newCard.cardsToPreview = fakePreview;
        return ret;
    });
}

function Patchcharacters() {
    let origIroncladGetStartingDeck = PatchManager.HookSTSFunction(PatchManager.Ironclad.getStartingDeck, (thisPtr: NativePointer) => {
        let origDeck = origIroncladGetStartingDeck(thisPtr);
        let addStrFunc = PatchManager.CreateNativeFunction(PatchManager.STSNativeLib.ArrayList_StringAdd);
        //"Searing Blow"
        addStrFunc(origDeck, PatchManager.STSGlobalVars.StrikeRedStr);
        addStrFunc(origDeck, PatchManager.STSGlobalVars.SearingBlowStr);
        return origDeck;
    });

    //let origLoseGoldFunc = PatchManager.HookSTSFunction(PatchManager.AbstractPlayer.loseGold, (thisPtr: NativePointer, gold: Number) => { origLoseGoldFunc(thisPtr, Math.ceil(gold * 0.6)); });

    Memory.patchCode(PatchManager.STSGlobalVars.numCardsInstPtr, 64, function (code) {
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
    let origBurningBloodOnVictory = PatchManager.HookSTSFunction(PatchManager.BurningBlood.onVictory, (thisPtr: NativePointer) => {
        origBurningBloodOnVictory(thisPtr);
        let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
        if (currentPlayer.currentHealth < currentPlayer.maxHealth * 0.3) {
            UpgradeRandomCard(currentPlayer);
        }
    });

    let origBlackBloodBloodOnVictory = PatchManager.HookSTSFunction(PatchManager.BlackBlood.onVictory, (thisPtr: NativePointer) => {
        origBlackBloodBloodOnVictory(thisPtr);
        let currentPlayer = PatchManager.STSGlobalVars.AbstractDungeon_player;
        if (currentPlayer.currentHealth < currentPlayer.maxHealth * 0.4) {
            UpgradeRandomCard(currentPlayer);
        }
    });
}

function main() {
    PatchRedCards();
    Patchcharacters();
    PatchPurpleCards();
    PatchPowers();
    PatchRelics();
}

main();