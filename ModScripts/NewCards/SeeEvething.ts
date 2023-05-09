import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { AbstractMonster } from "../NativeClassWrap/AbstractMonster.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        if (!monsterPtr.isNull()) {
            const wrapMonster = new AbstractMonster(monsterPtr);
            if (wrapMonster.getIntentBaseDmg() <= 0) {
                return;
            }
            const wrapCard = new AbstractCard(thisPtr);
            const dexterityPower = NativePowers.Common.Dexterity.Ctor(playerPtr, wrapCard.magicNumber);
            const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(playerPtr, playerPtr, dexterityPower, wrapCard.magicNumber);
            wrapCard.addToBot(applyPowerAction);
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
        const copyObj = SeeEvething(thisPtr);
        return copyObj;
    },
};

export const SeeEvething = (thisPtr: NativePointer): NativePointer => {
    const wrapCard = AbstractCard.NewCardCtor("SeeEvething", "洞若观火", "green/skill/SeeEvething", 1, "如果一名敌人的意图是攻击，你获得 !M! 点 敏捷 。", CardType.SKILL, CardColor.GREEN, CardRarity.UNCOMMON, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);
    wrapCard.baseMagicNumber = 1;
    wrapCard.magicNumber = 1;

    return wrapCard.rawPtr;
}