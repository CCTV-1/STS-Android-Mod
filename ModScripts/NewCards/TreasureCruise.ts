import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        const drawCardAction = NativeActions.common.DrawCard.Ctor(playerPtr, 3, false);
        wrapCard.addToBot(drawCardAction);
    },
    didDiscard: (thisPtr) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (wrapCard.costForTurn >= 1) {
            wrapCard.costForTurn -= 1;
        }
        if (wrapCard.costForTurn != wrapCard.cost) {
            wrapCard.isCostModifiedForTurn = true;
        }
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeMagicNumber(1);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = TreasureCruise(thisPtr);
        return copyObj;
    },
};

export const TreasureCruise: STSCardCtor = (thisPtr: NativePointer) => {
    let wrapCard = AbstractCard.NewCardCtor("TreasureCruise", "宝船巡游", "green/skill/TreasureCruise", 4, "本回合中每弃一张牌费用便减少[E]。 NL 抓 !M! 张。", CardType.SKILL,
        CardColor.GREEN, CardRarity.COMMON, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.baseMagicNumber = 3;
    wrapCard.magicNumber = 3;
    return wrapCard.rawPtr;
};