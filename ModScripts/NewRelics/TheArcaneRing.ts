import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { CardType, LandingSound, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    atBattleStart: (thisPtr: NativePointer) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        for (let index = 0; index < 3; index++) {
            const randCardPtr = NativeAbstractDungeon.returnTrulyRandomCardInCombat(CardType.SKILL);
            const wrapCard = new AbstractCard(randCardPtr);
            const copyCard = new AbstractCard(wrapCard.makeCopy());
            if (copyCard.cost >= 0) {
                copyCard.costForTurn = 0;
                if (copyCard.costForTurn != copyCard.cost) {
                    copyCard.isCostModifiedForTurn = true;
                }
                copyCard.exhaust = true;
            }
            const addCardToHandAction = NativeActions.common.MakeTempCardInHand.Ctor(copyCard.rawPtr, 1, false);
            wrapRelic.addToBot(addCardToHandAction);
        }
        wrapRelic.flash();
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = TheArcaneRing(thisPtr);
        return copyObj;
    },
};

export const TheArcaneRing = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("TheArcaneRing", "奥术魔戒", "在战斗开始时添加三张耗能为0的技能牌到你手上。 NL 它们额外具有 #y消耗。", "魔网魔力泄漏的源头之一。", "TheArcaneRing.png", RelicTier.BOSS, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
