import { NativeFunctionInfo } from "../NativeFunctionInfo.js";

export const NativeActionInfo = {
    animations: {
        AnimateFastAttack: {

        },
        AnimateHop: {

        },
        AnimateJump: {

        },
        AnimateShake: {

        },
        AnimateSlowAttack: {

        },
        FastShake: {

        },
        SetAnimation: {

        },
        Shout: {

        },
        Talk: {

        },
        VFX: {

        },
    },
    common: {
        //not implement in android sts
        //ApplyPoisonOnRandomMonster {},
        ApplyPower: {
            /**
             * ```c
             * AbstractGameAction* Actions::ApplyPowerAction::Ctor(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::AbstractCreature* source, STS::AbstractPower* powerToApply, int32_t stackAmount, bool isFast, STS::AttackEffect effect)
             * ```
             * 
             * default args call: `ApplyPowerAction::Ctor(this, target, source, powerPtr, powerPtr->amount, false, AttackEffect.NONE);`
             */
            Ctor: new NativeFunctionInfo(0x1672CFD, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'int32', 'bool', 'uint32']),
        },
        ApplyPowerToRandomEnemy: {
            /**
             * ```c
             * AbstractGameAction* Actions::ApplyPowerToRandomEnemyAction::Ctor(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source,
             *      STS::AbstractPower* powerToApply, int32_t stackAmount, bool isFast, STS::AttackEffect effect)
             * ```
             * 
             * default args call: `ApplyPowerToRandomEnemyAction::Ctor(this, source, powerPtr, -1, false, AttackEffect.NONE);`
             */
            Ctor: new NativeFunctionInfo(0x16777D1, 'pointer', ['pointer', 'pointer', 'pointer',  'int32', 'bool', 'uint32']),
        },
        AttackDamageRandomEnemy: {

        },
        BetterDiscardPileToHand: {

        },
        BetterDrawPileToHand: {

        },
        ChangeState: {

        },
        Damage: {
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, AttackEffect effect)
             * ```
             * 
             * Ctor3 just call ```Ctor(thisPtr, target, dmgInfo, AttackEffect.NONE)```
             */
            Ctor: new NativeFunctionInfo(0x167A165, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32']),
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, int stealGoldAmount)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x167A225, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, bool superFast)
             * ```
             * 
             * call ```Ctor(thisPtr, target, dmgInfo, AttackEffect.NONE)``` and ```this.skipWait = superFast;```
             */
            Ctor4: new NativeFunctionInfo(0x167A33D, 'pointer', ['pointer', 'pointer', 'pointer', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, AttackEffect effect, bool superFast)
             * ```
             * 
             * forward to ```Ctor``` and ```this.skipWait = superFast;```
             */
            Ctor5: new NativeFunctionInfo(0x167A3D1, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, AttackEffect effect, bool superFast)
             * ```
             * 
             * forward to ```Ctor5``` and ```this.muteSfx = muteSfx;```
             */
            Ctor6: new NativeFunctionInfo(0x167A465, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'bool', 'bool']),
        },
        DamageAllEnemies: {

        },
        DamageRandomEnemy: {

        },
        DarkOrbEvoke: {

        },
        Discard: {
            /**
             * ```c
             * AbstractGameAction* Actions::DiscardAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t cardAmount, bool isRandom, bool drawinEndTurn)
             * ```
             * 
             * Ctor just call ```Ctor2(thisPtr, target, source, amount, isRandom, false);```
             */
            Ctor2: new NativeFunctionInfo(0x167CBD5, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'bool', 'bool']),
        },
        DiscardAtEndOfTurnAction: {

        },
        DiscardSpecificCardAction: {

        },
        DrawCard: {
            /**
             * ```c
             * AbstractGameAction* Actions::DrawCardAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source, int32_t cardAmount, bool endTurnDraw)
             * ```
             * 
             * Ctor2 just call ```Ctor(thisPtr, source, cardAmount, false);```
             * 
             * Ctor4 just call ```Ctor(thisPtr, nullptr, cardAmount, false);```
             */
            Ctor: new NativeFunctionInfo(0x167EB71, 'pointer', ['pointer', 'pointer', 'int32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::DrawCardAction(STS::AbstractGameAction* thisPtr, int32_t cardAmount, bool clearDrawHistory)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x167EDF9, 'pointer', ['pointer', 'int32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::DrawCardAction(STS::AbstractGameAction* thisPtr, int32_t cardAmount, STS::AbstractGameAction* action, bool clearDrawHistory)
             * ```
             * 
             * Ctor5 just call ```Ctor6(thisPtr, amount, action, true);```
             */
            Ctor6: new NativeFunctionInfo(0x167F005, 'pointer', ['pointer', 'int32', 'pointer', 'bool']),
        },
        EmptyDeckShuffle: {

        },
        EnableEndTurnButton: {

        },
        EndTurn: {

        },
        Escape: {

        },
        Exhaust: {

        },
        ExhaustSpecificCard: {

        },
        FastDrawCard: {

        },
        GainBlock: {
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1681BDD, 'pointer', ['pointer', 'pointer', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x1681C85, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, int32_t amount, bool superFast)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x1681D41, 'pointer', ['pointer', 'pointer', 'int32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount, bool superFast)
             * ```
             */
            Ctor4: new NativeFunctionInfo(0x1681E09, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'bool']),
        },
        GainEnergy: {

        },
        GainEnergyAndEnableControls: {

        },
        GainGold: {

        },
        Heal: {
            /**
             * ```c
             * AbstractGameAction* HealAction(AbstractGameAction* this, STS::AbstractCreature* target, STS::AbstractCreature* source, int amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1682A11, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
        },
        InstantKill: {

        },
        LoseHP: {
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount, AttackEffect effect)
             * ```
             * 
             * Ctor2 just call ```Ctor(target, source, amount, AttackEffect.NONE);```
             */
            Ctor: new NativeFunctionInfo(0x1682DFD, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'uint32']),
        },
        LosePercentHP: {

        },
        MakeTempCardAtBottomOfDeck: {

        },
        MakeTempCardInDiscard: {

        },
        MakeTempCardInDiscardAndDeck: {

        },
        MakeTempCardInDrawPile: {

        },
        MakeTempCardInHand: {
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, bool isOtherCardInCenter)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1684519, 'pointer', ['pointer', 'pointer', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, int32_t cardAmount)
             * ```
             */
            Ctor1: new NativeFunctionInfo(0x16847B5, 'pointer', ['pointer', 'pointer', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, int32_t cardAmount, bool isOtherCardInCenter)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x16849A1, 'pointer', ['pointer', 'pointer', 'int32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, bool isOtherCardInCenter, bool sameUUID)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x1684A59, 'pointer', ['pointer', 'pointer', 'bool', 'bool']),
        },
        Mill: {

        },
        ModifyBlock: {

        },
        ModifyDamage: {

        },
        MonsterStartTurn: {

        },
        ObtainPotion: {

        },
        PlayTopCard: {

        },
        PummelDamage: {

        },
        PutOnBottomOfDeck: {

        },
        PutOnDeck: {

        },
        ReduceCost: {

        },
        ReduceCostForTurn: {

        },
        ReducePower: {

        },
        RelicAboveCreature: {
            /**
             * ```c
             * AbstractGameAction* Actions::RelicAboveCreatureAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source, STS::AbstractRelic* relic)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1688E25, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        RemoveAllBlockAction: {

        },
        RemoveSpecificPowerAction: {

        },
        ReviveMonster: {

        },
        RollMove: {

        },
        SetDontTrigger: {

        },
        SetMove: {

        },
        ShowMoveName: {

        },
        Shuffle: {

        },
        SpawnMonster: {

        },
        Suicide: {

        },
        TransformCardInHand: {

        },
        UpgradeRandomCard: {

        },
        UpgradeSpecificCard: {

        },
    },
    defect: {
        AggregateEnergy: {

        },
        AllCostToHand: {

        },
        AnimateOrb: {

        },
        Barrage: {

        },
        Blaster: {

        },
        Cache: {

        },
        Channel: {

        },
        CompileDriver: {

        },
        DamageAllButOneEnemy: {

        },
        DarkImpulse: {

        },
        DecreaseMaxOrb: {

        },
        DiscardPileToHand: {

        },
        DoubleEnergy: {

        },
        EnergyBlock: {

        },
        EssenceOfDarkness: {

        },
        EvokeAllOrbs: {

        },
        EvokeOrb: {

        },
        EvokeWithoutRemovingOrb: {

        },
        FTL: {

        },
        Fission: {

        },
        Flux: {

        },
        ForTheEyes: {

        },
        Gash: {

        },
        IceWall: {

        },
        Impulse: {

        },
        IncreaseMaxOrb: {

        },
        IncreaseMisc: {

        },
        LightningOrbEvoke: {

        },
        LightningOrbPassive: {

        },
        NewRipAndTear: {

        },
        NewThunderStrike: {

        },
        OldFission: {

        },
        Recycle: {

        },
        Redo: {

        },
        ReinforcedBody: {

        },
        RemoveAllOrbs: {

        },
        RemoveNextOrb: {

        },
        Reprieve: {

        },
        Scrape: {

        },
        ScrapeFollowUp: {

        },
        Seek: {

        },
        ShuffleAll: {

        },
        Sunder: {

        },
        ThunderStrike: {

        },
        TriggerEndOfTurnOrbs: {
            
        }
    },
    unique: {

    },
    utility: {
        Scry: {
            /**
             * ```c
             * AbstractGameAction* Actions::ScryAction(STS::AbstractGameAction* thisPtr, int32_t numCards)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16B01F9, 'pointer', ['pointer', 'int32']),
        },
    },
    watcher: {

    }
};