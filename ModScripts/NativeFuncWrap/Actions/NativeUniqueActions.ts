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
import { EnlightenmentAction } from "./unique/EnlightenmentAction.js";
import { EscapePlanAction } from "./unique/EscapePlanAction.js";
import { EstablishmentPowerAction } from "./unique/EstablishmentPowerAction.js";
import { ExhaustAllNonAttackAction } from "./unique/ExhaustAllNonAttackAction.js";
import { ExhumeAction } from "./unique/ExhumeAction.js";
import { ExpertiseAction } from "./unique/ExpertiseAction.js";
import { FeedAction } from "./unique/FeedAction.js";
import { FiendFireAction } from "./unique/FiendFireAction.js";
import { FlechetteAction } from "./unique/FlechetteAction.js";
import { ForethoughtAction } from "./unique/ForethoughtAction.js";
import { GainBlockRandomMonsterAction } from "./unique/GainBlockRandomMonsterAction.js";
import { GainEnergyIfDiscardAction } from "./unique/GainEnergyIfDiscardAction.js";
import { GamblingChipAction } from "./unique/GamblingChipAction.js";
import { GreedAction } from "./unique/GreedAction.js";
import { HeelHookAction } from "./unique/HeelHookAction.js";
import { IncreaseMaxHpAction } from "./unique/IncreaseMaxHpAction.js";
import { LimitBreakAction } from "./unique/LimitBreakAction.js";
import { LoseEnergyAction } from "./unique/LoseEnergyAction.js";
import { MadnessAction } from "./unique/MadnessAction.js";
import { MalaiseAction } from "./unique/MalaiseAction.js";
import { MulticastAction } from "./unique/MulticastAction.js";
import { NightmareAction } from "./unique/NightmareAction.js";
import { PoisonLoseHpAction } from "./unique/PoisonLoseHpAction.js";
import { RandomizeHandCostAction } from "./unique/RandomizeHandCostAction.js";
import { RegenAction } from "./unique/RegenAction.js";
import { RemoveDebuffsAction } from "./unique/RemoveDebuffsAction.js";
import { RestoreRetainedCardsAction } from "./unique/RestoreRetainedCardsAction.js";
import { RetainCardsAction } from "./unique/RetainCardsAction.js";
import { RitualDaggerAction } from "./unique/RitualDaggerAction.js";
import { SetupAction } from "./unique/SetupAction.js";
import { SkewerAction } from "./unique/SkewerAction.js";
import { SkillFromDeckToHandAction } from "./unique/SkillFromDeckToHandAction.js";
import { SpotWeaknessAction } from "./unique/SpotWeaknessAction.js";
import { SummonGremlinAction } from "./unique/SummonGremlinAction.js";
import { TempestAction } from "./unique/TempestAction.js";
import { TransmutationAction } from "./unique/TransmutationAction.js";
import { TriplePoisonAction } from "./unique/TriplePoisonAction.js";
import { UnloadAction } from "./unique/UnloadAction.js";
import { VampireDamageAction } from "./unique/VampireDamageAction.js";
import { VampireDamageAllEnemiesAction } from "./unique/VampireDamageAllEnemiesAction.js";
import { WhirlwindAction } from "./unique/WhirlwindAction.js";

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
    Enlightenment: EnlightenmentAction,
    EscapePlan: EscapePlanAction,
    EstablishmentPower: EstablishmentPowerAction,
    ExhaustAllNonAttack: ExhaustAllNonAttackAction,
    Exhume: ExhumeAction,
    Expertise: ExpertiseAction,
    Feed: FeedAction,
    FiendFire: FiendFireAction,
    Flechette: FlechetteAction,
    Forethought: ForethoughtAction,
    GainBlockRandomMonster: GainBlockRandomMonsterAction,
    GainEnergyIfDiscard: GainEnergyIfDiscardAction,
    GamblingChip: GamblingChipAction,
    Greed: GreedAction,
    HeelHook: HeelHookAction,
    IncreaseMaxHp: IncreaseMaxHpAction,
    LimitBreak: LimitBreakAction,
    LoseEnergy: LoseEnergyAction,
    Madness: MadnessAction,
    Malaise: MalaiseAction,
    Multicast: MulticastAction,
    Nightmare: NightmareAction,
    PoisonLoseHp: PoisonLoseHpAction,
    RandomizeHandCost: RandomizeHandCostAction,
    Regen: RegenAction,
    RemoveDebuffs: RemoveDebuffsAction,
    RestoreRetainedCards: RestoreRetainedCardsAction,
    RetainCards: RetainCardsAction,
    RitualDagger: RitualDaggerAction,
    Setup: SetupAction,
    Skewer: SkewerAction,
    SkillFromDeckToHand: SkillFromDeckToHandAction,
    SpotWeakness: SpotWeaknessAction,
    SummonGremlin: SummonGremlinAction,
    Tempest: TempestAction,
    Transmutation: TransmutationAction,
    TriplePoison: TriplePoisonAction,
    Unload: UnloadAction,
    VampireDamage: VampireDamageAction,
    VampireDamageAllEnemies: VampireDamageAllEnemiesAction,
    Whirlwind: WhirlwindAction,
}