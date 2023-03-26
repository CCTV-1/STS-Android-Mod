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
            Ctor: new NativeFunctionInfo(0x16777D1, 'pointer', ['pointer', 'pointer', 'pointer',  'int32', 'bool', 'uint32']),
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