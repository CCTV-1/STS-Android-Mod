import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { DoubleGoldAction } from "../NewActions/DoubleGoldAction.js";
import { NativeActions } from "../NativeFuncWrap/Actions/NativeActions.js";

export const BigScore = (thisPtr: NativePointer): NativePointer => {
    const vfuncs = {
        use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            let loseHPAction = NativeActions.common.LoseHP.Ctor(playerPtr, playerPtr, wrapCard.magicNumber, AttackEffect.NONE);
            wrapCard.addToBot(loseHPAction);
            wrapCard.addToBot(DoubleGoldAction());
        },
        upgrade: (thisPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            if (!wrapCard.upgraded) {
                wrapCard.upgradeName();
                wrapCard.upgradeMagicNumber(-5);
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = BigScore(thisPtr);
            return copyObj;
        },
    };

    let wrapCard = AbstractCard.NewCardCtor("BigScore", "大干一票", "colorless/skill/BigScore", 4, "失去 !M! 点生命，将你拥有的金币翻倍。", CardType.SKILL,
        CardColor.COLORLESS, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);
    wrapCard.baseMagicNumber = 30;
    wrapCard.magicNumber = 30;

    return wrapCard.rawPtr;
}