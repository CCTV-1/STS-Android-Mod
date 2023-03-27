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
}