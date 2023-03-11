import { RelicTier } from "./enums.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { PatchManager } from "./PatchManager.js";

export class AbstractRelic extends NativeClassWrapper {
    //NativePointer AbstractRelic *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    static #vfunctionMap = {
        //void AbstractRelic::onPlayCard(STS::AbstractRelic* this, STS::AbstractCard* cardPtr, STS::AbstractMonster * monsterPtr)
        onPlayCard: new NativeFunctionInfo(0xA8, 'void', ['pointer', 'pointer', 'pointer']),
        //void AbstractRelic::onPreviewObtainCard(STS::AbstractRelic* this, STS::AbstractCard* cardPtr)
        onPreviewObtainCard: new NativeFunctionInfo(0xB0, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onObtainCard(STS::AbstractRelic* this, STS::AbstractCard* cardPtr)
        onObtainCard: new NativeFunctionInfo(0xB8, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onGainGold(STS::AbstractRelic* this)
        onGainGold: new NativeFunctionInfo(0xC0, 'void', ['pointer']),
        //void AbstractRelic::onGainGold(STS::AbstractRelic* this)
        onLoseGold: new NativeFunctionInfo(0xC8, 'void', ['pointer']),
        //void AbstractRelic::onSpendGold(STS::AbstractRelic* this)
        onSpendGold: new NativeFunctionInfo(0xD0, 'void', ['pointer']),
        //void AbstractRelic::onEquip(STS::AbstractRelic* this)
        onEquip: new NativeFunctionInfo(0xD8, 'void', ['pointer']),
        //void AbstractRelic::onUnequip(STS::AbstractRelic* this)
        onUnequip: new NativeFunctionInfo(0xE0, 'void', ['pointer']),
        //void AbstractRelic::atPreBattle(STS::AbstractRelic* this)
        atPreBattle: new NativeFunctionInfo(0xE8, 'void', ['pointer']),
        //void AbstractRelic::atBattleStart(STS::AbstractRelic* this)
        atBattleStart: new NativeFunctionInfo(0xF0, 'void', ['pointer']),
        //void AbstractRelic::onSpawnMonster(STS::AbstractRelic* this, STS::AbstractMonster * monsterPtr)
        onSpawnMonster: new NativeFunctionInfo(0xF8, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::atBattleStartPreDraw(STS::AbstractRelic* this)
        atBattleStartPreDraw: new NativeFunctionInfo(0x100, 'void', ['pointer']),
        //void AbstractRelic::atTurnStart(STS::AbstractRelic* this)
        atTurnStart: new NativeFunctionInfo(0x108, 'void', ['pointer']),
        //void AbstractRelic::atTurnStartPostDraw(STS::AbstractRelic* this)
        atTurnStartPostDraw: new NativeFunctionInfo(0x110, 'void', ['pointer']),
        //void AbstractRelic::onPlayerEndTurn(STS::AbstractRelic* this)
        onPlayerEndTurn: new NativeFunctionInfo(0x118, 'void', ['pointer']),
        //void AbstractRelic::onBloodied(STS::AbstractRelic* this)
        onBloodied: new NativeFunctionInfo(0x120, 'void', ['pointer']),
        //void AbstractRelic::onNotBloodied(STS::AbstractRelic* this)
        onNotBloodied: new NativeFunctionInfo(0x128, 'void', ['pointer']),
        //void AbstractRelic::onManualDiscard(STS::AbstractRelic* this)
        onManualDiscard: new NativeFunctionInfo(0x130, 'void', ['pointer']),
        //void AbstractRelic::onManualDiscard(STS::AbstractRelic* this, STS::AbstractCard targetCard, STS::AbstractGameAction useCardAction)
        onUseCard: new NativeFunctionInfo(0x138, 'void', ['pointer', 'pointer', 'pointer']),
        //void AbstractRelic::onVictory(STS::AbstractRelic* this)
        onVictory: new NativeFunctionInfo(0x140, 'void', ['pointer']),
        //void AbstractRelic::onMonsterDeath(STS::AbstractRelic* this, STS::AbstractMonster * monsterPtr)
        onMonsterDeath: new NativeFunctionInfo(0x148, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onBlockBroken(STS::AbstractRelic* this, STS::AbstractCreature * monsterPtr)
        onBlockBroken: new NativeFunctionInfo(0x150, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onPlayerGainedBlock(STS::AbstractRelic* this, float blockAmount)
        //onPlayerGainedBlockFloat: new NativeFunctionInfo(0x158, 'void', ['pointer', 'float']),
        //void AbstractRelic::onPlayerGainedBlock(STS::AbstractRelic* this, int32_t blockAmount)
        onPlayerGainedBlock: new NativeFunctionInfo(0x160, 'void', ['pointer', 'int32']),
        //void AbstractRelic::onPlayerHeal(STS::AbstractRelic* this, int32_t healAmount)
        onPlayerHeal: new NativeFunctionInfo(0x168, 'void', ['pointer', 'int32']),
        //void AbstractRelic::onEnergyRecharge(STS::AbstractRelic* this)
        onEnergyRecharge: new NativeFunctionInfo(0x178, 'void', ['pointer']),
        //void AbstractRelic::onRest(STS::AbstractRelic* this)
        onRest: new NativeFunctionInfo(0x190, 'void', ['pointer']),
        //void AbstractRelic::onEnterRestRoom(STS::AbstractRelic* this)
        onEnterRestRoom: new NativeFunctionInfo(0x1A0, 'void', ['pointer']),
        //void AbstractRelic::onRefreshHand(STS::AbstractRelic* this)
        onRefreshHand: new NativeFunctionInfo(0x1A8, 'void', ['pointer']),
        //void AbstractRelic::onShuffle(STS::AbstractRelic* this)
        onShuffle: new NativeFunctionInfo(0x1B0, 'void', ['pointer']),
        //void AbstractRelic::onSmith(STS::AbstractRelic* this)
        onSmith: new NativeFunctionInfo(0x1B8, 'void', ['pointer']),
        //void AbstractRelic::onAttack(STS::AbstractRelic* this, STS::DamageInfo* info, int32_t damageAmount, STS::AbstractCreature* target)
        onAttack: new NativeFunctionInfo(0x1C0, 'void', ['pointer', 'pointer', 'int32', 'pointer']),
        //void AbstractRelic::onEnterRoom(STS::AbstractRelic* this, STS::AbstractRoom* room)
        onEnterRoom: new NativeFunctionInfo(0x200, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onCardDraw(STS::AbstractRelic* this, STS::AbstractCard* drawnCard)
        onCardDraw: new NativeFunctionInfo(0x210, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onDrawOrDiscard(STS::AbstractRelic* this)
        onDrawOrDiscard: new NativeFunctionInfo(0x228, 'void', ['pointer']),
        //bool AbstractRelic::canPlay(STS::AbstractRelic* this, STS::AbstractCard* card)
        canPlay: new NativeFunctionInfo(0x2D0, 'bool', ['pointer', 'pointer']),
        //void AbstractRelic::onUsePotion(STS::AbstractRelic* this)
        onUsePotion: new NativeFunctionInfo(0x308, 'void', ['pointer']),
        //void AbstractRelic::onLoseHp(STS::AbstractRelic* this, int damageAmount)
        onLoseHp: new NativeFunctionInfo(0x318, 'void', ['pointer', 'int32']),
        /**
         * ```c
         *  void AbstractRelic::addToTop(STS::AbstractRelic* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToBot: new NativeFunctionInfo(0x328, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractRelic::addToTop(STS::AbstractRelic* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0x330, 'void', ['pointer', 'pointer']),
    };

    static #vFuncNamePrefix = "AbstractRelic_";

    OverrideonPlayCard(newVFunc: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => void) {
        let funcName = AbstractRelic.#vFuncNamePrefix + this.relicId + "_onPlayCard";
        this.setVirtualFunction(funcName, PatchManager.fakeCodeGen.V_PPP_Func(funcName), AbstractRelic.#vfunctionMap.onPlayCard, newVFunc);
    }

    OverrideonEquip(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = AbstractRelic.#vFuncNamePrefix + this.relicId + "_onEquip";
        this.setVirtualFunction(funcName, PatchManager.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onEquip, newVFunc);
    }

    OverrideatBattleStart(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = AbstractRelic.#vFuncNamePrefix + this.relicId + "_atBattleStart";
        this.setVirtualFunction(funcName, PatchManager.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.atBattleStart, newVFunc);
    }

    OverrideatTurnStart(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = AbstractRelic.#vFuncNamePrefix + this.relicId + "_atTurnStart";
        this.setVirtualFunction(funcName, PatchManager.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.atTurnStart, newVFunc);
    }

    OverrideonVictory(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = AbstractRelic.#vFuncNamePrefix + this.relicId + "_onVictory";
        this.setVirtualFunction(funcName, PatchManager.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onVictory, newVFunc);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractRelic.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractRelic.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    get name() {
        return this.readOffsetJString(0x8);
    }
    set name(value) {
        this.writeOffsetJString(0x8, value);
    }

    get relicId() {
        return this.readOffsetJString(0xC);
    }
    set relicId(value) {
        this.writeOffsetJString(0xC, value);
    }

    get energyBased() {
        return this.readOffsetBool(0x18);
    }
    set energyBased(value) {
        this.writeOffsetBool(0x18, value);
    }

    get usedUp() {
        return this.readOffsetBool(0x19);
    }
    set usedUp(value) {
        this.writeOffsetBool(0x19, value);
    }

    get grayscale() {
        return this.readOffsetBool(0x1A);
    }
    set grayscale(value) {
        this.writeOffsetBool(0x1A, value);
    }

    get description() {
        return this.readOffsetJString(0x1C);
    }
    set description(value) {
        this.writeOffsetJString(0x1C, value);
    }

    get flavorText() {
        return this.readOffsetJString(0x20);
    }
    set flavorText(value) {
        this.writeOffsetJString(0x20, value);
    }

    get cost() {
        return this.readOffsetS32(0x24);
    }
    set cost(value) {
        this.writeOffsetS32(0x24, value);
    }

    get counter() {
        return this.readOffsetS32(0x28);
    }
    set counter(value) {
        this.writeOffsetS32(0x28, value);
    }

    get tier(): RelicTier {
        return this.readOffsetU32(0x2C);
    }
    set tier(value) {
        this.writeOffsetU32(0x2C, value);
    }
}