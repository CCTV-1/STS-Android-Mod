import { ApplyPowerAction } from "./common/ApplyPowerAction.js";
import { ApplyPowerToRandomEnemyAction } from "./common/ApplyPowerToRandomEnemyAction.js";
import { AttackDamageRandomEnemyAction } from "./common/AttackDamageRandomEnemyAction.js";
import { BetterDiscardPileToHandAction } from "./common/BetterDiscardPileToHandAction.js";
import { BetterDrawPileToHandAction } from "./common/BetterDrawPileToHandAction.js";
import { DamageAction } from "./common/DamageAction.js";
import { DiscardAction } from "./common/DiscardAction.js";
import { DrawCardAction } from "./common/DrawCardAction.js";
import { GainBlockAction } from "./common/GainBlock.js";
import { HealAction } from "./common/HealAction.js";
import { LoseHPAction } from "./common/LoseHPAction.js";
import { MakeTempCardInHandAction } from "./common/MakeTempCardInHandAction.js";
import { RelicAboveCreatureAction } from "./common/RelicAboveCreatureAction.js";

export const NativeCommonActions = {
    ApplyPower: ApplyPowerAction,
    ApplyPowerToRandomEnemy: ApplyPowerToRandomEnemyAction,
    AttackDamageRandomEnemy: AttackDamageRandomEnemyAction,
    BetterDiscardPileToHand: BetterDiscardPileToHandAction,
    BetterDrawPileToHand: BetterDrawPileToHandAction,
    Heal: HealAction,
    MakeTempCardInHand: MakeTempCardInHandAction,
    RelicAboveCreature: RelicAboveCreatureAction,
    Discard: DiscardAction,
    DrawCard: DrawCardAction,
    Damage: DamageAction,
    GainBlock: GainBlockAction,
    LoseHP: LoseHPAction,
};
