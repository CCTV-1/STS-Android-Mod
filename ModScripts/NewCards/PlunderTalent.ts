import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { PlunderPower } from "../NewPowers/PlunderPower.js";
import { PatchHelper } from "../PatchHelper.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        let plunderPower = PlunderPower(playerPtr, 1);
        let applyPower = NativeActions.common.ApplyPower.Ctor(playerPtr, playerPtr, plunderPower, 1, true, AttackEffect.NONE);
        wrapCard.addToBot(applyPower);
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeBaseCost(1);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = PlunderTalent(thisPtr);
        return copyObj;
    },
};

export const PlunderTalent = (thisPtr: NativePointer): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("PlunderTalent", "掠夺天赋", "colorless/powers/PlunderTalent", 2, "获得1层掠夺", CardType.POWER,
        CardColor.COLORLESS, CardRarity.UNCOMMON, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    return wrapCard.rawPtr;
}