import { STSCardCtor } from "./NativeClassWrap/AbstractCard.js";
import { BasicAttackRed } from "./NewCards/BasicAttackRed.js";
import { BasicDefendRed } from "./NewCards/BasicDefendRed.js";
import { BigScore } from "./NewCards/BigScore.js";
import { PlunderTalent } from "./NewCards/PlunderTalent.js";
import { OneWithTheMultiverse } from "./NewCards/OneWithTheMultiverse.js";

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
export const newCardLibrary: STSCardCtor[] = [
    BasicAttackRed,
    BasicDefendRed,
    BigScore,
    PlunderTalent,
    OneWithTheMultiverse,
];