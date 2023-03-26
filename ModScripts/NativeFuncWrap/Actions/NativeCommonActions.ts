import { ApplyPowerAction } from "./common/ApplyPowerAction.js";
import { ApplyPowerToRandomEnemyAction } from "./common/ApplyPowerToRandomEnemyAction.js";
import { AttackDamageRandomEnemyAction } from "./common/AttackDamageRandomEnemyAction.js";
import { BetterDiscardPileToHandAction } from "./common/BetterDiscardPileToHandAction.js";
import { BetterDrawPileToHandAction } from "./common/BetterDrawPileToHandAction.js";
import { ChangeStateAction } from "./common/ChangeStateAction.js";
import { DamageAction } from "./common/DamageAction.js";
import { DamageAllEnemiesAction } from "./common/DamageAllEnemiesAction.js";
import { DamageRandomEnemyAction } from "./common/DamageRandomEnemyAction.js";
import { DarkOrbEvokeAction } from "./common/DarkOrbEvokeAction.js";
import { DiscardAction } from "./common/DiscardAction.js";
import { DiscardAtEndOfTurnAction } from "./common/DiscardAtEndOfTurnAction.js";
import { DiscardSpecificCardAction } from "./common/DiscardSpecificCardAction.js";
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
    ChangeState: ChangeStateAction,
    Damage: DamageAction,
    DamageAllEnemies: DamageAllEnemiesAction,
    DamageRandomEnemy: DamageRandomEnemyAction,
    DarkOrbEvoke: DarkOrbEvokeAction,
    Discard: DiscardAction,
    DiscardAtEndOfTurn: DiscardAtEndOfTurnAction,
    DiscardSpecificCard: DiscardSpecificCardAction,
    Heal: HealAction,
    MakeTempCardInHand: MakeTempCardInHandAction,
    RelicAboveCreature: RelicAboveCreatureAction,
    DrawCard: DrawCardAction,
    GainBlock: GainBlockAction,
    LoseHP: LoseHPAction,
};
