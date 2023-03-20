import { AbstractCard } from "../AbstractCard.js";
import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { PatchManager } from "../PatchManager.js";

export const BasicAttackRed = (thisPtr: NativePointer): NativePointer => {
    const vfuncs = {
        use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            let dmgInfoObj = PatchManager.Cards.DamageInfo.Ctor(playerPtr, wrapCard.damage, wrapCard.damageTypeForTurn);
            let damageAction = PatchManager.Actions.Damage.Ctor(monsterPtr, dmgInfoObj, AttackEffect.SLASH_DIAGONAL);
            let targetCard = PatchManager.Cards.status.Burn.Ctor();
            let makeTempCardInHandAction = PatchManager.Actions.MakeTempCardInHand.Ctor(targetCard, 1, true);
            wrapCard.addToBot(damageAction);
            wrapCard.addToBot(makeTempCardInHandAction);
        },
        upgrade: (thisPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            if (!wrapCard.upgraded) {
                wrapCard.upgradeName();
                wrapCard.upgradeDamage(3);
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = BasicAttackRed(thisPtr);
            return copyObj;
        },
    };

    let wrapCard = AbstractCard.NewCardCtor("BasicAttack_R", "熔岩击", "red/attack/strike", 1, "造成9点伤害，将一张灼伤放入你的手牌。", CardType.ATTACK,
        CardColor.RED, CardRarity.BASIC, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);
    wrapCard.baseDamage = 9;

    return wrapCard.rawPtr;
};