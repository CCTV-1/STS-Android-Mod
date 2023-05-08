import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        const dmgInfoObj = NativeCards.DamageInfo.Ctor(playerPtr, wrapCard.damage, wrapCard.damageTypeForTurn);
        const damageAction = NativeActions.common.Damage.Ctor(monsterPtr, dmgInfoObj, AttackEffect.SLASH_DIAGONAL);
        const vulnerablePower = NativePowers.Common.Vulnerable.Ctor(monsterPtr, wrapCard.magicNumber, false);
        const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(monsterPtr, playerPtr, vulnerablePower, wrapCard.magicNumber);
        wrapCard.addToBot(damageAction);
        wrapCard.addToBot(applyPowerAction);
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeDamage(3);
            wrapCard.upgradeMagicNumber(3);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = BasicAttackRed(thisPtr);
        return copyObj;
    },
};

export const BasicAttackRed = (thisPtr: NativePointer): NativePointer => {
    const wrapCard = AbstractCard.NewCardCtor("BasicAttack_R", "熔岩击", "red/attack/strike", 1, "造成 !D! 点伤害，给与 !M! 层易伤。", CardType.ATTACK,
        CardColor.RED, CardRarity.BASIC, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);
    wrapCard.baseDamage = 6;
    wrapCard.baseMagicNumber = 2;
    wrapCard.magicNumber = 2;

    return wrapCard.rawPtr;
};