import { AddCardToDeckAction } from "./unique/AddCardToDeckAction.js";
import { ApotheosisAction } from "./unique/ApotheosisAction.js";
import { ApplyBulletTimeAction } from "./unique/ApplyBulletTimeAction.js";
import { ApplyStasisAction } from "./unique/ApplyStasisAction.js";
import { ArmamentsAction } from "./unique/ArmamentsAction.js";
import { AttackFromDeckToHandAction } from "./unique/AttackFromDeckToHandAction.js";
import { BaneAction } from "./unique/BaneAction.js";
import { BladeFuryAction } from "./unique/BladeFuryAction.js";
import { BlockPerNonAttackAction } from "./unique/BlockPerNonAttackAction.js";
import { BouncingFlaskAction } from "./unique/BouncingFlaskAction.js";
import { BurnIncreaseAction } from "./unique/BurnIncreaseAction.js";
import { CalculatedGambleAction } from "./unique/CalculatedGambleAction.js";
import { CanLoseAction } from "./unique/CanLoseAction.js";
import { CannotLoseAction } from "./unique/CannotLoseAction.js";
import { CodexAction } from "./unique/CodexAction.js";
import { DamagePerAttackPlayedAction } from "./unique/DamagePerAttackPlayedAction.js";
import { DiscardPileToTopOfDeckAction } from "./unique/DiscardPileToTopOfDeckAction.js";
import { DiscoveryAction } from "./unique/DiscoveryAction.js";
import { DoppelgangerAction } from "./unique/DoppelgangerAction.js";
import { DoublePoisonAction } from "./unique/DoublePoisonAction.js";
import { DoubleYourBlockAction } from "./unique/DoubleYourBlockAction.js";
import { DropkickAction } from "./unique/DropkickAction.js";
import { DualWieldAction } from "./unique/DualWieldAction.js";

export const NativeUniqueActions = {
    AddCardToDeck: AddCardToDeckAction,
    Apotheosis: ApotheosisAction,
    ApplyBulletTime: ApplyBulletTimeAction,
    ApplyStasis: ApplyStasisAction,
    Armaments: ArmamentsAction,
    AttackFromDeckToHand: AttackFromDeckToHandAction,
    Bane: BaneAction,
    BladeFury: BladeFuryAction,
    BlockPerNonAttack: BlockPerNonAttackAction,
    BouncingFlask: BouncingFlaskAction,
    BurnIncrease: BurnIncreaseAction,
    CalculatedGamble: CalculatedGambleAction,
    CanLose: CanLoseAction,
    CannotLose: CannotLoseAction,
    Codex: CodexAction,
    DamagePerAttackPlayed: DamagePerAttackPlayedAction,
    DiscardPileToTopOfDeck: DiscardPileToTopOfDeckAction,
    Discovery: DiscoveryAction,
    Doppelganger: DoppelgangerAction,
    DoublePoison: DoublePoisonAction,
    DoubleYourBlock: DoubleYourBlockAction,
    Dropkick: DropkickAction,
    DualWield: DualWieldAction,
}