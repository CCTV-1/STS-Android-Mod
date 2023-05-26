import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType, AttackEffect } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        const dmgInfoObj = NativeCards.DamageInfo.Ctor(playerPtr, wrapCard.damage, wrapCard.damageTypeForTurn);
        const damageAction = NativeActions.common.Damage.Ctor(monsterPtr, dmgInfoObj, AttackEffect.SLASH_DIAGONAL);
        wrapCard.addToBot(damageAction);
    },
    canUpgrade: (thisPtr) => {
        return Number(true);
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        wrapCard.timesUpgraded++;
        wrapCard.name = "致命一击+" + wrapCard.timesUpgraded;
        wrapCard.upgraded = true;
        wrapCard.initializeTitle();
        wrapCard.upgradeDamage(2 * wrapCard.timesUpgraded + 1);
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = DeadlyStrike(thisPtr);
        return copyObj;
    },
};

export const DeadlyStrike: STSCardCtor = (thisPtr: NativePointer) => {
    const wrapCard = AbstractCard.NewCardCtor("DeadlyStrike", "致命一击", "colorless/attack/DeadlyStrike", 1,
        "可无限升级。 NL 获得 !D! 点伤害。", CardType.ATTACK, CardColor.COLORLESS, CardRarity.COMMON, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);

    wrapCard.baseDamage = 6;
    return wrapCard.rawPtr;
};