import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { ForceOfWillPower } from "../NewPowers/ForceOfWillPower.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        const forceOfWillPower = ForceOfWillPower(playerPtr);
        const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(playerPtr, playerPtr, forceOfWillPower, 1);
        wrapCard.addToBot(applyPowerAction);
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeBaseCost(2);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = ForceOfWill(thisPtr);
        return copyObj;
    },
};

export const ForceOfWill: STSCardCtor = (thisPtr: NativePointer) => {
    let wrapCard = AbstractCard.NewCardCtor("ForceOfWill", "意志之力", "purple/powers/ForceOfWill", 3, "回合开始时进入愤怒。 NL 回合结束时进入平静。", CardType.POWER,
        CardColor.PURPLE, CardRarity.UNCOMMON, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    return wrapCard.rawPtr;
};