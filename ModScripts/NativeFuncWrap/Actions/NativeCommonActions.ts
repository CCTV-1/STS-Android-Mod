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
import { EmptyDeckShuffleAction } from "./common/EmptyDeckShuffleAction.js";
import { EscapeAction } from "./common/EscapeAction.js";
import { ExhaustAction } from "./common/ExhaustAction.js";
import { ExhaustSpecificCardAction } from "./common/ExhaustSpecificCard.js";
import { GainBlockAction } from "./common/GainBlock.js";
import { GainEnergyAction } from "./common/GainEnergyAction.js";
import { GainEnergyAndEnableControlsAction } from "./common/GainEnergyAndEnableControlsAction.js";
import { GainGoldAction } from "./common/GainGoldAction.js";
import { HealAction } from "./common/HealAction.js";
import { InstantKillAction } from "./common/InstantKillAction.js";
import { LoseHPAction } from "./common/LoseHPAction.js";
import { MakeTempCardAtBottomOfDeckAction } from "./common/MakeTempCardAtBottomOfDeckAction.js";
import { MakeTempCardInDiscardAction } from "./common/MakeTempCardInDiscardAction.js";
import { MakeTempCardInDiscardAndDeckAction } from "./common/MakeTempCardInDiscardAndDeckAction.js";
import { MakeTempCardInDrawPileAction } from "./common/MakeTempCardInDrawPileAction.js";
import { MakeTempCardInHandAction } from "./common/MakeTempCardInHandAction.js";
import { MillAction } from "./common/MillAction.js";
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
    DrawCard: DrawCardAction,
    EmptyDeckShuffle: EmptyDeckShuffleAction,
    Escape: EscapeAction,
    Exhaust: ExhaustAction,
    ExhaustSpecificCard: ExhaustSpecificCardAction,
    GainBlock: GainBlockAction,
    GainEnergy: GainEnergyAction,
    GainEnergyAndEnableControls: GainEnergyAndEnableControlsAction,
    GainGold: GainGoldAction,
    Heal: HealAction,
    InstantKill: InstantKillAction,
    LoseHP: LoseHPAction,
    MakeTempCardAtBottomOfDeck: MakeTempCardAtBottomOfDeckAction,
    MakeTempCardInDiscard: MakeTempCardInDiscardAction,
    MakeTempCardInDiscardAndDeck: MakeTempCardInDiscardAndDeckAction,
    MakeTempCardInDrawPile: MakeTempCardInDrawPileAction,
    MakeTempCardInHand: MakeTempCardInHandAction,
    Mill: MillAction,
    RelicAboveCreature: RelicAboveCreatureAction,
};
