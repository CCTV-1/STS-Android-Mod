import { STSCardCtor } from "./NativeClassWrap/AbstractCard.js";
import { BasicAttackRed } from "./NewCards/BasicAttackRed.js";
import { BasicDefendRed } from "./NewCards/BasicDefendRed.js";
import { BigScore } from "./NewCards/BigScore.js";
import { PlunderTalent } from "./NewCards/PlunderTalent.js";
import { OneWithTheMultiverse } from "./NewCards/OneWithTheMultiverse.js";
import { DemonicPurge } from "./NewCards/DemonicPurge.js";
import { OuterGodization } from "./NewCards/OuterGodization.js";
import { GaugeTheory } from "./NewCards/GaugeTheory.js";
import { GammaRayBurst } from "./NewCards/GammaRayBurst.js";
import { AncestralRecall } from "./NewCards/AncestralRecall.js";
import { Ephemerate } from "./NewCards/Ephemerate.js";
import { ForceOfWill } from "./NewCards/ForceOfWill.js";
import { TransgressTheMind } from "./NewCards/TransgressTheMind.js";
import { TreasureCruise } from "./NewCards/TreasureCruise.js";
import { GalvanicBombardment } from "./NewCards/GalvanicBombardment.js";
import { SeeEvething } from "./NewCards/SeeEvething.js";
import { FastFourierTransform } from "./NewCards/FastFourierTransform.js";
import { CompilePrinciples } from "./NewCards/CompilePrinciples.js";
import { BringToLight } from "./NewCards/BringToLight.js";
import { AbsoluteDefend } from "./NewCards/AbsoluteDefend.js";
import { DeadlyStrike } from "./NewCards/DeadlyStrike.js";
import { HappyTime } from "./NewCards/HappyTime.js";

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
    DemonicPurge,
    OuterGodization,
    GaugeTheory,
    GammaRayBurst,
    AncestralRecall,
    Ephemerate,
    ForceOfWill,
    FastFourierTransform,
    TransgressTheMind,
    TreasureCruise,
    GalvanicBombardment,
    SeeEvething,
    CompilePrinciples,
    BringToLight,
    AbsoluteDefend,
    DeadlyStrike,
    HappyTime,
];