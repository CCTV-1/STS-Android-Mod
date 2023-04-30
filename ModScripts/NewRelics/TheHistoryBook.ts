import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { LandingSound, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    onEquip: (thisPtr: NativePointer) => {
        const currentPlayer = AbstractDungeon.getInstance().player;
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.counter = currentPlayer.masterHandSize;
        currentPlayer.masterHandSize = 0;
    },
    atTurnStart: (thisPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        const count = wrapRelic.counter;
        for (let index = 0; index < count; index++) {
            const randCardPtr = NativeAbstractDungeon.returnTrulyRandomCard();
            const wrapCard = new AbstractCard(randCardPtr);
            const copyCard = new AbstractCard(wrapCard.makeCopy());
            if (copyCard.cost >= 0) {
                copyCard.upgradeBaseCost(0);
            }
            const addCardToHandAction = NativeActions.common.MakeTempCardInHand.Ctor(copyCard.rawPtr, 1, false);
            wrapRelic.addToBot(addCardToHandAction);
        }
        wrapRelic.flash();
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = TheHistoryBook(thisPtr);
        return copyObj;
    },
};

export const TheHistoryBook = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("TheHistoryBook", "岁月史书", "拾取时，岁月史书获得等同于你每回合抽牌数的指示物。你每回合少抽等量的牌。 NL 在每回合开始时，增加等量的随机牌到你的手牌，他们变为0费。", "过去、现在、将来都已在、正在、将在这本书中。", "TheHistoryBook.png", RelicTier.BOSS, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
