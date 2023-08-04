import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { AngelGracePower } from "../NewPowers/AngelGracePower.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        const angelGracePower = AngelGracePower(playerPtr, 1);
        const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(playerPtr, playerPtr, angelGracePower, 1);
        wrapCard.addToBot(applyPowerAction);
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeBaseCost(0);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = AngelGrace(thisPtr);
        return copyObj;
    },
};

export const AngelGrace: STSCardCtor = (thisPtr: NativePointer) => {
    let wrapCard = AbstractCard.NewCardCtor("AngelGrace", "天使恩典", "colorless/skill/AngelGrace", 1, "防止一个回合中的所有致死伤害。 NL 消耗。", CardType.SKILL, CardColor.COLORLESS, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    return wrapCard.rawPtr;
};