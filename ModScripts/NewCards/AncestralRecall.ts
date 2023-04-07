import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType } from "../enums.js";

export const AncestralRecall: STSCardCtor = (thisPtr: NativePointer) => {
    const vfuncs: NewCardVFuncType = {
        use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            let drawAction = NativeActions.common.DrawCard.Ctor(playerPtr, 3, false);
            wrapCard.addToBot(drawAction);
        },
        upgrade: (thisPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            if (!wrapCard.upgraded) {
                wrapCard.upgradeName();
                wrapCard.upgradeBaseCost(0);
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = AncestralRecall(thisPtr);
            return copyObj;
        },
    };

    let wrapCard = AbstractCard.NewCardCtor("AncestralRecall", "先人的召还", "green/skill/AncestralRecall", 1,
        "固有 NL 抓三张牌。", CardType.SKILL, CardColor.GREEN, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);
    
    wrapCard.isInnate = true;

    return wrapCard.rawPtr;
};