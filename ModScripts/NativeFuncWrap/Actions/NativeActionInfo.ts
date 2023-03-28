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
            Ctor: new NativeFunctionInfo(0x16777D1, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'bool', 'uint32']),
        },
        AttackDamageRandomEnemy: {
            /**
             * ```c
             * AbstractGameAction* Actions::AttackDamageRandomEnemyAction::Ctor(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr,
             *      STS::AttackEffect effect)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1677981, 'pointer', ['pointer', 'pointer', 'uint32']),
        },
        BetterDiscardPileToHand: {
            /**
             * ```c
             * AbstractGameAction* Actions::BetterDiscardPileToHand::Ctor(STS::AbstractGameAction* thisPtr, int32_t numberOfCards, bool optional)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1677D65, 'pointer', ['pointer', 'int32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::BetterDiscardPileToHand::Ctor(STS::AbstractGameAction* thisPtr, int32_t numberOfCards, int32_t newCost)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x1677F49, 'pointer', ['pointer', 'int32', 'int32']),
        },
        BetterDrawPileToHand: {
            /**
             * ```c
             * AbstractGameAction* Actions::BetterDrawPileToHand::Ctor(STS::AbstractGameAction* thisPtr, int32_t numberOfCards, bool optional)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16792CD, 'pointer', ['pointer', 'int32', 'bool']),
        },
        ChangeState: {
            /**
             * ```c
             * AbstractGameAction* Actions::ChangeState::Ctor(STS::AbstractGameAction* thisPtr, STS::AbstractMonster* monster, JString* stateName)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x167A079, 'pointer', ['pointer', 'pointer', 'pointer']),
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
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAllEnemies(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source, JObectArray* amounts,
             *      DamageType type, AttackEffect effect, bool isFast)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x167ADDD, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'uint32', 'bool']),
        },
        DamageRandomEnemy: {
            /**
             * ```c
             * AbstractGameAction* Actions::DamageRandomEnemy(STS::AbstractGameAction* thisPtr, STS::DamageInfo* info, AttackEffect effect)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x167C11CD, 'pointer', ['pointer', 'pointer', 'uint32']),
        },
        DarkOrbEvoke: {
            /**
             * ```c
             * AbstractGameAction* Actions::DarkOrbEvoke(STS::AbstractGameAction* thisPtr, STS::DamageInfo* info, AttackEffect effect)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x167C265, 'pointer', ['pointer', 'pointer', 'uint32']),
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
        DiscardAtEndOfTurn: {
            /**
             * ```c
             * AbstractGameAction* Actions::DiscardAtEndOfTurnAction(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x167D84D, 'pointer', ['pointer']),
        },
        DiscardSpecificCard: {
            /**
             * ```c
             * AbstractGameAction* Actions::DiscardSpecificCard::Ctor(STS::AbstractGameAction* thisPtr, STS::AbstractCard* targetCard)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x167E91D, 'pointer', ['pointer', 'pointer']),
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
            /**
             * ```c
             * AbstractGameAction* Actions::EmptyDeckShuffle(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x167FAD1, 'pointer', ['pointer']),

        },
        Escape: {
            /**
             * ```c
             * AbstractGameAction* Actions::Escape(STS::AbstractGameAction* thisPtr, STS::AbstractMonster source)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1680A5D, 'pointer', ['pointer', 'pointer']),

        },
        Exhaust: {
            /**
             * ```c
             * AbstractGameAction* Actions::Exhaust::Ctor(STS::AbstractGameAction* thisPtr, int32_t amount, bool isRandom, bool anyNumber, bool canPickZero)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1680BF1, 'pointer', ['pointer', 'int32', 'bool', 'bool', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::Exhaust::Ctor2(STS::AbstractGameAction* thisPtr, int32_t amount, bool isRandom, bool anyNumber, bool canPickZero, float duration)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x1680F59, 'pointer', ['pointer', 'int32', 'bool', 'bool', 'bool', 'float']),
        },
        ExhaustSpecificCard: {
            /**
             * ```c
             * AbstractGameAction* Actions::ExhaustSpecificCard::Ctor(STS::AbstractGameAction* thisPtr, STS::AbstractCard* targetCard, CardGroup group, bool isFast)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16818E1, 'pointer', ['pointer', 'pointer', 'pointer', 'bool']),
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
            /**
             * ```c
             * AbstractGameAction* Actions::GainEnergy(STS::AbstractGameAction* thisPtr, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1682455, 'pointer', ['pointer', 'int32']),
        },
        GainEnergyAndEnableControls: {
            /**
             * ```c
             * AbstractGameAction* Actions::GainEnergyAndEnableControls(STS::AbstractGameAction* thisPtr, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1682455, 'pointer', ['pointer', 'int32']),
        },
        GainGold: {
            /**
             * ```c
             * AbstractGameAction* Actions::GainGold(STS::AbstractGameAction* thisPtr, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x168290D, 'pointer', ['pointer', 'int32']),
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
            /**
             * ```c
             * AbstractGameAction* InstantKill(AbstractGameAction* this, STS::AbstractCreature* target)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1682C21, 'pointer', ['pointer', 'pointer']),
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
        MakeTempCardAtBottomOfDeck: {
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardAtBottomOfDeck(AbstractGameAction* this, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1683139, 'pointer', ['pointer', 'int32']),
        },
        MakeTempCardInDiscard: {
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInDiscard(AbstractGameAction* this, STS::AbstractCard* card, bool sameUUID)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1683665, 'pointer', ['pointer', 'pointer', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInDiscard(AbstractGameAction* this, STS::AbstractCard* card, int32_t amount)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x1683509, 'pointer', ['pointer', 'pointer', 'int']),
        },
        MakeTempCardInDiscardAndDeck: {
            /**
             * ```c
             * AbstractGameAction* MakeTempCardInDiscardAndDeck(AbstractGameAction* this, STS::AbstractCard* card)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1683A25, 'pointer', ['pointer', 'pointer']),
        },
        MakeTempCardInDrawPile: {
            /**
             * ```c
             * AbstractGameAction* MakeTempCardInDrawPileAction(AbstractGameAction* this, STS::AbstractCard* card, int32_t amount, bool randomSpot,
             *      bool autoPosition, bool toBottom, float cardX, float cardY)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1683E01, 'pointer', ['pointer', 'pointer', 'int32', 'bool', 'bool', 'bool', 'float', 'float']),
            /**
             * just call `Ctor(card, amount, shuffleInto, autoPosition, false, Settings.WIDTH / 2.0f, Settings.HEIGHT / 2.0f);
             */
            Ctor2: new NativeFunctionInfo(0x168408D, 'pointer', ['pointer', 'pointer', 'int32', 'bool', 'bool']),
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
            /**
             * ```c
             * AbstractGameAction* Actions::Mill(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16866E1, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
        },
        ModifyBlock: {
            /**
             * ```c
             * AbstractGameAction* Actions::ModifyBlock(STS::AbstractGameAction* thisPtr, UUID targetUUID, int32_t amount)
             * ```
             * 
             * `struct UUID { uint32_t v1, uint32_t v2, uint32_t v3, uint32_t v4 }`
             */
            Ctor: new NativeFunctionInfo(0x16869FD, 'pointer', ['pointer', 'uint32', 'uint32', 'uint32', 'uint32', 'int32']),
        },
        ModifyDamage: {
            /**
             * ```c
             * AbstractGameAction* Actions::ModifyDamage(STS::AbstractGameAction* thisPtr, UUID targetUUID, int32_t amount)
             * ```
             * 
             * `struct UUID { uint32_t v1, uint32_t v2, uint32_t v3, uint32_t v4 }`
             */
            Ctor: new NativeFunctionInfo(0x1686D8D, 'pointer', ['pointer', 'uint32', 'uint32', 'uint32', 'uint32', 'int32']),
        },
        MonsterStartTurn: {
            /**
             * ```c
             * AbstractGameAction* Actions::MonsterStartTurn(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1686F31, 'pointer', ['pointer']),
        },
        ObtainPotion: {
            /**
             * ```c
             * AbstractGameAction* Actions::ObtainPotion(STS::AbstractGameAction* thisPtr, STS::AbstractPotion* potion)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16870ED, 'pointer', ['pointer', 'pointer']),
        },
        PlayTopCard: {
            /**
             * ```c
             * AbstractGameAction* Actions::ObtainPotion(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* creaturePtr, bool exhausts)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1687495, 'pointer', ['pointer', 'pointer', 'bool']),
        },
        PummelDamage: {
            /**
             * ```c
             * AbstractGameAction* Actions::PummelDamage(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* creaturePtr, DamageInfo* dmgInfo)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1687B29, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        PutOnDeck: {
            /**
             * ```c
             * AbstractGameAction* Actions::PutOnDeck(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::AbstractCreature* source, int32_t amount, bool isRandom)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1687F4D, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'bool']),
        },
        ReduceCost: {
            /**
             * ```c
             * AbstractGameAction* Actions::ReduceCost(STS::AbstractGameAction* thisPtr, UUID targetUUID, int32_t amount)
             * ```
             * 
             * `struct UUID { uint32_t v1, uint32_t v2, uint32_t v3, uint32_t v4 }`
             */
            Ctor: new NativeFunctionInfo(0x1688911, 'pointer', ['pointer', 'uint32', 'uint32', 'uint32', 'uint32', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::ReduceCost(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x168888D, 'pointer', ['pointer', 'pointer']),
        },
        ReducePower: {
            /**
             * ```c
             * AbstractGameAction* Actions::ReduceCost(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::AbstractCreature* source, JString * powerName, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1688AF5, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::ReduceCost(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::AbstractCreature* source, STS::AbstractPower * powerInstance, int32_t amount)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x1688C0D, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'int32']),
        },
        RelicAboveCreature: {
            /**
             * ```c
             * AbstractGameAction* Actions::RelicAboveCreatureAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source, STS::AbstractRelic* relic)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1688E25, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        RemoveAllBlock: {
            /**
             * ```c
             * AbstractGameAction* Actions::RemoveAllBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1688E25, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        RemoveSpecificPower: {
            /**
             * ```c
             * AbstractGameAction* Actions::RemoveSpecificPowerAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::AbstractCreature* source, JString * powerName)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1689149, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']),
            /**
             * ```c
             * AbstractGameAction* Actions::RemoveSpecificPowerAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::AbstractCreature* source, STS::AbstractPower * powerInstance)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x168920D, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']),
        },
        RollMove: {
            /**
             * ```c
             * AbstractGameAction* Actions::RollMove(STS::AbstractGameAction* thisPtr, STS::AbstractMonster* monster)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x168A219, 'pointer', ['pointer', 'pointer']),
        },
        SetDontTrigger: {
            /**
             * ```c
             * AbstractGameAction* Actions::SetDontTrigger(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, bool dontTrigger)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x168A2ED, 'pointer', ['pointer', 'pointer', 'bool']),
        },
        SetMove: {
            /**
             * ```c
             * AbstractGameAction* Actions::SetMoveAction(STS::AbstractGameAction* thisPtr, STS::AbstractMonster* monster, JString* moveName,
             *      bool nextMove, MonsterIntent intent, int32_t baseDamage, int32_t multiplierAmt, bool multiplier)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x168A3BD, 'pointer', ['pointer', 'pointer', 'pointer', 'bool', 'uint32', 'int32', 'int32', 'bool']),
        },
        Shuffle: {
            /**
             * ```c
             * AbstractGameAction* Actions::Shuffle(STS::AbstractGameAction* thisPtr, CardGroup* theGroup, bool trigger)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x168AB21, 'pointer', ['pointer', 'pointer', 'bool']),

        },
        SpawnMonster: {
            /**
             * ```c
             * AbstractGameAction* Actions::SpawnMonster(STS::AbstractGameAction* thisPtr, STS::AbstractMonster* monster, bool isMinion)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x168AD4D, 'pointer', ['pointer', 'pointer', 'bool']),
        },
        Suicide: {
            /**
             * ```c
             * AbstractGameAction* Actions::SuicideAction(STS::AbstractGameAction* thisPtr, STS::AbstractMonster* monster, bool triggerRelics)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x168B43D, 'pointer', ['pointer', 'pointer', 'bool']),
        },
        UpgradeRandomCard: {
            /**
             * ```c
             * AbstractGameAction* Actions::UpgradeRandomCard(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x168B5BD, 'pointer', ['pointer']),
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
        AddCardToDeck: {
            /**
             * ```c
             * AbstractGameAction* Actions::ScryAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1699E2D, 'pointer', ['pointer', 'pointer']),
        },
        Apotheosis: {
            /**
             * ```c
             * AbstractGameAction* Actions::Apotheosis(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1699FA5, 'pointer', ['pointer']),
        },
        ApplyBulletTime: {
            /**
             * ```c
             * AbstractGameAction* Actions::ApplyBulletTime(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169A281, 'pointer', ['pointer']),
        },
        ApplyStasis: {
            /**
             * ```c
             * AbstractGameAction* Actions::ApplyBulletTime(STS::AbstractGameAction* thisPtr, STSLLAbstractCreature* owner)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169A495, 'pointer', ['pointer', 'pointer']),
        },
        Armaments: {
            /**
             * ```c
             * AbstractGameAction* Actions::Armaments(STS::AbstractGameAction* thisPtr, bool armamentsPlus)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169AE1D, 'pointer', ['pointer', 'bool']),
        },
        AttackFromDeckToHand: {
            /**
             * ```c
             * AbstractGameAction* Actions::AttackFromDeckToHand(STS::AbstractGameAction* thisPtr, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169BBF1, 'pointer', ['pointer', 'int32']),
        },
        Bane: {
            /**
             * ```c
             * AbstractGameAction* Actions::BaneAction(STS::AbstractGameAction* thisPtr, STS::AbstractMonster* target, DamageInfo* info)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169C94D, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        BladeFury: {
            /**
             * ```c
             * AbstractGameAction* Actions::BaneAction(STS::AbstractGameAction* thisPtr, bool upgraded)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169CCA5, 'pointer', ['pointer', 'bool']),
        },
        BlockPerNonAttack: {
            /**
             * ```c
             * AbstractGameAction* Actions::BlockPerNonAttack(STS::AbstractGameAction* thisPtr, int32_t blockAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169CE9D, 'pointer', ['pointer', 'int32']),
        },
        BouncingFlask: {
            /**
             * ```c
             * AbstractGameAction* Actions::BouncingFlask(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* targetCreature, int32_t amount, int32_t numTimes)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169D245, 'pointer', ['pointer', 'pointer', 'int32', 'int32']),
        },
        BurnIncrease: {
            /**
             * ```c
             * AbstractGameAction* Actions::BurnIncrease(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169D5DD, 'pointer', ['pointer']),
        },
        CalculatedGamble: {
            /**
             * ```c
             * AbstractGameAction* Actions::CalculatedGamble(STS::AbstractGameAction* thisPtr, bool upgraded)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169DB8D, 'pointer', ['pointer', 'bool']),
        },
        CanLose: {
            /**
             * ```c
             * AbstractGameAction* Actions::CanLoseAction(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169DDAD, 'pointer', ['pointer']),
        },
        CannotLose: {
            /**
             * ```c
             * AbstractGameAction* Actions::CannotLoseAction(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169DE9D, 'pointer', ['pointer']),
        },
        Codex: {
            /**
             * ```c
             * AbstractGameAction* Actions::CodexAction(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169DF89, 'pointer', ['pointer']),
        },
        DamagePerAttackPlayed: {
            /**
             * ```c
             * AbstractGameAction* Actions::DamagePerAttackPlayedAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::DamageInfo* dmgInfo, AttackEffect effect)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169E515, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32']),
        },
        DiscardPileToTopOfDeck: {
            /**
             * ```c
             * AbstractGameAction* Actions::DiscardPileToTopOfDeck(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169E735, 'pointer', ['pointer', 'pointer']),
        },
        Discovery: {
            /**
             * ```c
             * AbstractGameAction* Actions::DiscoveryAction(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169EFD5, 'pointer', ['pointer']),
            /**
             * ```c
             * AbstractGameAction* Actions::DiscoveryAction(STS::AbstractGameAction* thisPtr, bool colorless, int32_t amount)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x169F16D, 'pointer', ['pointer', 'bool', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::DiscoveryAction(STS::AbstractGameAction* thisPtr, CardType type, int32_t amount)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x169F095, 'pointer', ['pointer', 'uint32', 'int32']),
        },
        Doppelganger: {
            /**
             * ```c
             * AbstractGameAction* Actions::DiscardPileToTopOfDeck(STS::AbstractGameAction* thisPtr, STS::AbstractPlayer* playerPtr,
             *      bool upgraded, bool freeToPlayOnce, int32_t energyOnUse)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x169FF79, 'pointer', ['pointer', 'pointer', 'bool', 'bool', 'int32']),
        },
        DoublePoison: {
            /**
             * ```c
             * AbstractGameAction* Actions::DoublePoison(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* targetCR,
             *      STS::AbstractCreature sourceCR)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A023D, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        DoubleYourBlock: {
            /**
             * ```c
             * AbstractGameAction* Actions::DoubleYourBlock(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* targetCR)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A040D, 'pointer', ['pointer', 'pointer']),
        },
        Dropkick: {
            /**
             * ```c
             * AbstractGameAction* Actions::DropkickAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* targetCR, DamageInfo* dmgInfo)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A05C9, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        DualWield: {
            /**
             * ```c
             * AbstractGameAction* Actions::DualWieldAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* targetCR, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A0715, 'pointer', ['pointer', 'pointer', 'int32']),
        },
        Enlightenment: {
            /**
             * ```c
             * AbstractGameAction* Actions::DualWieldAction(STS::AbstractGameAction* thisPtr, bool forRestOfCombat)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A1589, 'pointer', ['pointer', 'bool']),
        },
        EscapePlan: {
            /**
             * ```c
             * AbstractGameAction* Actions::EscapePlan(STS::AbstractGameAction* thisPtr, int32_t blockGain)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A1801, 'pointer', ['pointer', 'int32']),
        },
        EstablishmentPower: {
            /**
             * ```c
             * AbstractGameAction* Actions::EstablishmentPower(STS::AbstractGameAction* thisPtr, int32_t discountAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A1A1D, 'pointer', ['pointer', 'int32']),
        },
        ExhaustAllNonAttack: {
            /**
             * ```c
             * AbstractGameAction* Actions::ExhaustAllNonAttack(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A1C11, 'pointer', ['pointer']),
        },
        Exhume: {
            /**
             * ```c
             * AbstractGameAction* Actions::EstablishmentPower(STS::AbstractGameAction* thisPtr, bool upgrade)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A1F1C, 'pointer', ['pointer', 'bool']),
        },
        Expertise: {
            /**
             * ```c
             * AbstractGameAction* Actions::Expertise(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* sourceCR, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A3369, 'pointer', ['pointer', 'pointer', 'int32']),
        },
        Feed: {
            /**
             * ```c
             * AbstractGameAction* Actions::FeedAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::DamageInfo* dmgInfo, int32_t maxHPAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A34DD, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
        },
        FiendFire: {
            /**
             * ```c
             * AbstractGameAction* Actions::FiendFireAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::DamageInfo* dmgInfo)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A396D, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        Flechette: {
            /**
             * ```c
             * AbstractGameAction* Actions::Flechette(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::DamageInfo* dmgInfo)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A3BED, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        Forethought: {
            /**
             * ```c
             * AbstractGameAction* Actions::Forethought(STS::AbstractGameAction* thisPtr, bool upgraded)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A3E4D, 'pointer', ['pointer', 'bool']),
        },
        GainBlockRandomMonster: {
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockRandomMonster(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* sourceCR, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A4685, 'pointer', ['pointer', 'pointer', 'int32']),
        },
        GainEnergyIfDiscard: {
            /**
             * ```c
             * AbstractGameAction* Actions::GainEnergyIfDiscard(STS::AbstractGameAction* thisPtr, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A4F51, 'pointer', ['pointer', 'int32']),
        },
        GamblingChip: {
            /**
             * ```c
             * AbstractGameAction* Actions::GamblingChip(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* sourceCR)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A525D, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * AbstractGameAction* Actions::GamblingChip(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* sourceCR, bool notChip)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x16A5355, 'pointer', ['pointer', 'pointer', 'bool']),
        },
        Greed: {
            /**
             * ```c
             * AbstractGameAction* Actions::Greed(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::DamageInfo* dmgInfo, int32_t goldAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A59A9, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
        },
        HeelHook: {
            /**
             * ```c
             * AbstractGameAction* Actions::HeelHook(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::DamageInfo* dmgInfo)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A5EBD, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        IncreaseMaxHp: {
            /**
             * ```c
             * AbstractGameAction* Actions::HeelHook(STS::AbstractGameAction* thisPtr, STS::AbstractMonster* target,
             *      float increasePercent, bool showEffect)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A6009, 'pointer', ['pointer', 'pointer', 'float', 'bool']),
        },
        LimitBreak: {
            /**
             * ```c
             * AbstractGameAction* Actions::LimitBreak(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A61D5, 'pointer', ['pointer']),
        },
        LoseEnergy: {
            /**
             * ```c
             * AbstractGameAction* Actions::LoseEnergy(STS::AbstractGameAction* thisPtr, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A6409, 'pointer', ['pointer', 'int32']),
        },
        Madness: {
            /**
             * ```c
             * AbstractGameAction* Actions::Madness(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A65D5, 'pointer', ['pointer']),
        },
        Malaise: {
            /**
             * ```c
             * AbstractGameAction* Actions::Malaise(STS::AbstractGameAction* thisPtr, STS::AbstractPlayer* playerPtr, STS::AbstractMonster* monsterPtr,
             *      bool upgraded, bool freeToPlayOnce, int energyOnUse)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A6AA5, 'pointer', ['pointer', 'pointer', 'pointer', 'bool', 'bool', 'int32']),
        },
        Multicast: {
            /**
             * ```c
             * AbstractGameAction* Actions::Multicast(STS::AbstractGameAction* thisPtr, STS::AbstractPlayer* playerPtr, int energyOnUse,
             *      bool upgraded, bool freeToPlayOnce)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A6D81, 'pointer', ['pointer', 'pointer', 'int32', 'bool', 'bool']),
        },
        Nightmare: {
            /**
             * ```c
             * AbstractGameAction* Actions::Nightmare(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source,
             *      int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A70C5, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
        },
        PoisonLoseHp: {
            /**
             * ```c
             * AbstractGameAction* Actions::PoisonLoseHp(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source,
             *      int32_t amount, AttackEffect effect)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A77DD, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'uint32']),
        },
        RandomizeHandCost: {
            /**
             * ```c
             * AbstractGameAction* Actions::RandomizeHandCost(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A7DDD, 'pointer', ['pointer']),
        },
        Regen: {
            /**
             * ```c
             * AbstractGameAction* Actions::Regen(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, int32_t goldAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A80D5, 'pointer', ['pointer', 'pointer', 'int32']),
        },
        RemoveDebuffs: {
            /**
             * ```c
             * AbstractGameAction* Actions::RemoveDebuffs(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A84E1, 'pointer', ['pointer', 'pointer']),
        },
        RestoreRetainedCards: {
            /**
             * ```c
             * AbstractGameAction* Actions::RemoveDebuffs(STS::AbstractGameAction* thisPtr, CardGroup* group)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A8685, 'pointer', ['pointer', 'pointer']),
        },
        RetainCards: {
            /**
             * ```c
             * AbstractGameAction* Actions::Regen(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A8A29, 'pointer', ['pointer', 'pointer', 'int32']),
        },
        RitualDagger: {
            /**
             * ```c
             * AbstractGameAction* Actions::Regen(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo,
             *      int32_t incAmount, UUID targetUUID)
             * ```
             * 
             * `struct UUID { uint32_t v1, uint32_t v2, uint32_t v3, uint32_t v4 }`
             */
            Ctor: new NativeFunctionInfo(0x16A8F29, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'uint32', 'uint32', 'uint32', 'uint32']),
        },
        Setup: {
            /**
             * ```c
             * AbstractGameAction* Actions::Setup(STS::AbstractGameAction* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A9435, 'pointer', ['pointer']),
        },
        Skewer: {
            /**
             * ```c
             * AbstractGameAction* Actions::Multicast(STS::AbstractGameAction* thisPtr, STS::AbstractPlayer* playerPtr, STS::AbstractMonster* monsterPtr,
             *      int32_t damage, DamageType damageTypeForTurn, bool freeToPlayOnce, int32_t energyOnUse)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A9C45, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'uint32', 'bool', 'int32']),
        },
        SkillFromDeckToHand: {
            /**
             * ```c
             * AbstractGameAction* Actions::SkillFromDeckToHand(STS::AbstractGameAction* thisPtr, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16A9EF9, 'pointer', ['pointer', 'int32']),
        },
        SpotWeakness: {
            /**
             * ```c
             * AbstractGameAction* Actions::SpotWeakness(STS::AbstractGameAction* thisPtr, int32_t damageIncrease, STS::AbstractMonster* monsterPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16AAC55, 'pointer', ['pointer', 'int32', 'pointer']),
        },
        SummonGremlin: {
            /**
             * ```c
             * AbstractGameAction* Actions::SummonGremlin(STS::AbstractGameAction* thisPtr, JObjectArray<STS::AbstractMonster>* gremlins)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16AAFF5, 'pointer', ['pointer', 'pointer']),
        },
        Tempest: {
            /**
             * ```c
             * AbstractGameAction* Actions::Tempest(STS::AbstractGameAction* thisPtr, STS::AbstractPlayer* playerPtr, int32_t energyOnUse, bool upgraded, bool freeToPlayOnce)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16ABCE9, 'pointer', ['pointer', 'pointer', 'int32', 'bool', 'bool']),
        },
        Transmutation: {
            /**
             * ```c
             * AbstractGameAction* Actions::Transmutation(STS::AbstractGameAction* thisPtr, STS::AbstractPlayer* playerPtr, bool upgraded, bool freeToPlayOnce, int32_t energyOnUse)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16ABF89, 'pointer', ['pointer', 'pointer', 'bool', 'bool', 'int32']),
        },
        TriplePoison: {
            /**
             * ```c
             * AbstractGameAction* Actions::TriplePoison(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* targetCR, STS::AbstractCreature* sourceCR)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16AC305, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        Unload: {
            /**
             * ```c
             * AbstractGameAction* Actions::TriplePoison(STS::AbstractGameAction* thisPtrSTS::AbstractCreature* sourceCR)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16AC4F9, 'pointer', ['pointer', 'pointer']),
        },
        VampireDamage: {
            /**
             * ```c
             * AbstractGameAction* Actions::VampireDamage(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::DamageInfo* dmgInfo, AttackEffect effect)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16AC761, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32']),
        },
        VampireDamageAllEnemies: {
            /**
             * ```c
             * AbstractGameAction* Actions::VampireDamageAllEnemies(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source,
             *      JObjectArray<int32_t> amount, DamageType type, AttackEffect effect)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16ACA45, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'uint32']),
        },
        Whirlwind: {
            /**
             * ```c
             * AbstractGameAction* Actions::Whirlwind(STS::AbstractGameAction* thisPtr, STS::AbstractPlayer* plyaerPtr,
             *      JObjectArray<int32_t> multiDamage, DamageType type, bool freeToPlayOnce, int32_t energyOnUse)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16AD6DD, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'bool', 'int32']),
        }
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

    },
    AbstractGame: {
        /**
         * ```c
         * AbstractGameAction* STS::AbstractGameAction::Ctor(STS::AbstractGameAction * thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x166FA41, 'pointer', ['pointer']),
    },
};