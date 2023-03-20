import { AbstractCard } from "./AbstractCard.js";
import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType } from "./enums.js";
import { PatchManager } from "./PatchManager.js";

/**
 * if you plan register a new card, add a function property to NewCardLibrary,the function code like follow:
 * ```typescript
 * (thisPtr: NativePointer): NativePointer => {
 *     const vfuncs = {
 *         use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
 *             let wrapCard = new AbstractCard(thisPtr);
 *             let dmgInfoObj = PatchManager.Cards.DamageInfo.Ctor(playerPtr, wrapCard.damage, wrapCard.damageTypeForTurn);
 *             let damageAction = PatchManager.Actions.Damage.Ctor(monsterPtr, dmgInfoObj, AttackEffect.SLASH_DIAGONAL);
 *             let targetCard = PatchManager.Cards.status.Burn.Ctor();
 *             let makeTempCardInHandAction = PatchManager.Actions.MakeTempCardInHand.Ctor(targetCard, 2, true);
 *             wrapCard.addToBot(damageAction);
 *             wrapCard.addToBot(makeTempCardInHandAction);
 *         },
 *         upgrade: (thisPtr: NativePointer) => {
 *             let wrapCard = new AbstractCard(thisPtr);
 *             if (!wrapCard.upgraded) {
 *                 wrapCard.upgradeName();
 *                 wrapCard.upgradeDamage(3);
 *             }
 *         },
 *         makeCopy: (thisPtr: NativePointer) => {
 *             let wrapCard = new AbstractCard(thisPtr);
 *             let copyObj = NewCardLibrary.IroncladBasicAttack(thisPtr);
 *             return copyObj;
 *         },
 *     };
 * 
 *     let wrapCard = AbstractCard.NewCardCtor("BasicAttack_R", "熔岩击", "red/attack/strike", 1, "造成9点伤害，将一张灼伤放入你的手牌。", CardType.ATTACK,
 *         CardColor.RED, CardRarity.BASIC, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);
 *     wrapCard.baseDamage = 9;
 * 
 *     return wrapCard.rawPtr;
 * };
 * ```
 */
export class NewCardLibrary {
    static readonly IroncladBasicAttack = (thisPtr: NativePointer): NativePointer => {
        const vfuncs = {
            use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
                let wrapCard = new AbstractCard(thisPtr);
                let dmgInfoObj = PatchManager.Cards.DamageInfo.Ctor(playerPtr, wrapCard.damage, wrapCard.damageTypeForTurn);
                let damageAction = PatchManager.Actions.Damage.Ctor(monsterPtr, dmgInfoObj, AttackEffect.SLASH_DIAGONAL);
                let targetCard = PatchManager.Cards.status.Burn.Ctor();
                let makeTempCardInHandAction = PatchManager.Actions.MakeTempCardInHand.Ctor(targetCard, 2, true);
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
                let wrapCard = new AbstractCard(thisPtr);
                PatchManager.LogV(wrapCard.cardID + " enter BasicDefend_R makeCopy");
                let copyObj = NewCardLibrary.IroncladBasicAttack(thisPtr);
                return copyObj;
            },
        };

        let wrapCard = AbstractCard.NewCardCtor("BasicAttack_R", "熔岩击", "red/attack/strike", 1, "造成9点伤害，将一张灼伤放入你的手牌。", CardType.ATTACK,
            CardColor.RED, CardRarity.BASIC, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);
        wrapCard.baseDamage = 9;

        return wrapCard.rawPtr;
    };

    static readonly IroncladBasicSkill = (thisPtr: NativePointer): NativePointer => {
        const vfuncs = {
            use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
                let wrapCard = new AbstractCard(thisPtr);
                let damageAction = PatchManager.Actions.GainBlock.Ctor2(playerPtr, playerPtr, wrapCard.block);
                wrapCard.addToBot(damageAction);
                let loseHpAction = PatchManager.Actions.LoseHP.Ctor(playerPtr, playerPtr, 2, AttackEffect.NONE);
                wrapCard.addToBot(loseHpAction);
            },
            upgrade: (thisPtr: NativePointer) => {
                let wrapCard = new AbstractCard(thisPtr);
                if (!wrapCard.upgraded) {
                    wrapCard.upgradeName();
                    wrapCard.upgradeBlock(3);
                }
            },
            makeCopy: (thisPtr: NativePointer) => {
                let wrapCard = new AbstractCard(thisPtr);
                PatchManager.LogV(wrapCard.cardID + "enter BasicDefend_R makeCopy");
                let copyObj = NewCardLibrary.IroncladBasicSkill(thisPtr);
                return copyObj;
            },
        };

        let wrapCard = AbstractCard.NewCardCtor("BasicDefend_R", "鲜血护盾", "red/skill/defend", 1, "失去2点生命，获得9点格挡。", CardType.SKILL,
            CardColor.RED, CardRarity.BASIC, CardTarget.SELF, DamageType.NORMAL, vfuncs);
        wrapCard.baseBlock = 9;

        return wrapCard.rawPtr;
    };
}
