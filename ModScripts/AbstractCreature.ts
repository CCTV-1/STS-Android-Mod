import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

export class AbstractCreature extends NativeClassWrapper {
    //NativePointer AbstractCreature *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * int32_t STS::AbstractCreature::decrementBlock(STS::AbstractCreature* this, STS::DamageInfo* info, int32_t damageAmount);
         * ```
         */
        decrementBlock: new NativeFunctionInfo(0x28, 'int32', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * void STS::AbstractCreature::decrementBlock(STS::AbstractCreature* this, int32_t amount, bool showEffect);
         * ```
         */
        increaseMaxHp: new NativeFunctionInfo(0x30, 'void', ['pointer', 'int32', 'bool']),
        /**
         * ```c
         * void STS::AbstractCreature::decreaseMaxHealth(STS::AbstractCreature* this, int32_t amount);
         * ```
         */
        decreaseMaxHealth: new NativeFunctionInfo(0x38, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void STS::AbstractCreature::heal(STS::AbstractCreature* this, int32_t amount, bool showEffect);
         * ```
         * 0x98 just call this.heal(amount, true);
         */
        heal: new NativeFunctionInfo(0x90, 'void', ['pointer', 'int32', 'bool']),
        /**
         * ```c
         * void STS::AbstractCreature::addBlock(STS::AbstractCreature* this, int32_t blockAmount);
         * ```
         */
        addBlock: new NativeFunctionInfo(0xA0, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void STS::AbstractCreature::loseBlock(STS::AbstractCreature* this, int32_t amount, bool noAnimation);
         * ```
         * 0xB0 just call `this.loseBlock(this.currentBlock, false);`
         * 
         * 0xB8 just call `this.loseBlock(this.currentBlock, noAnimation);`
         * 
         * 0xC0 just call `this.loseBlock(amount, false);`
         */
        loseBlock: new NativeFunctionInfo(0xA8, 'void', ['pointer', 'int32', 'bool']),
        /**
         * ```c
         * void STS::AbstractCreature::addPower(STS::AbstractCreature* this, STS::AbstractPower* powerToApply);
         * ```
         */
        addPower: new NativeFunctionInfo(0xD8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * STS::AbstractPower* STS::AbstractCreature::getPower(STS::AbstractCreature* this, JString* targetID);
         * ```
         */
        getPower: new NativeFunctionInfo(0x168, 'pointer', ['pointer', 'pointer']),
        /**
         * ```c
         * bool STS::AbstractCreature::hasPower(STS::AbstractCreature* this, JString* targetID);
         * ```
         */
        hasPower: new NativeFunctionInfo(0x170, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         * bool STS::AbstractCreature::getDeadOrEscaped(STS::AbstractCreature* this);
         * ```
         */
        getDeadOrEscaped: new NativeFunctionInfo(0x178, 'bool', ['pointer']),
        /**
         * ```c
         * void STS::AbstractCreature::loseGold(STS::AbstractCreature* this, int32_t goldAmount);
         * ```
         */
        loseGold: new NativeFunctionInfo(0x180, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void STS::AbstractCreature::gainGold(STS::AbstractCreature* this, int32_t goldAmount);
         * ```
         */
        gainGold: new NativeFunctionInfo(0x188, 'void', ['pointer', 'int32']),
    };

    addBlock(amount: number) {
        let addBlockFunc = this.getVirtualFunction(AbstractCreature.#vfunctionMap.addBlock);
        addBlockFunc(this.rawPtr, amount);
    }

    heal(amount: number, showEffect: boolean) {
        let healFunc = this.getVirtualFunction(AbstractCreature.#vfunctionMap.heal);
        healFunc(this.rawPtr, amount, Number(showEffect));
    }

    get name() {
        return this.readOffsetJString(0x8);
    }
    set name(value) {
        this.writeOffsetJString(0x8, value);
    }

    get id() {
        return this.readOffsetJString(0xC);
    }
    set id(value) {
        this.writeOffsetJString(0xC, value);
    }

    get isPlayer() {
        return this.readOffsetBool(0x14);
    }
    set isPlayer(value) {
        this.writeOffsetBool(0x14, value);
    }

    get isBloodied() {
        return this.readOffsetBool(0x15);
    }
    set isBloodied(value) {
        this.writeOffsetBool(0x15, value);
    }

    get gold() {
        return this.readOffsetS32(0x2C);
    }
    set gold(value) {
        this.writeOffsetS32(0x2C, value);
    }

    get displayGold() {
        return this.readOffsetS32(0x30);
    }
    set displayGold(value) {
        this.writeOffsetS32(0x30, value);
    }

    get isDying() {
        return this.readOffsetBool(0x34);
    }
    set isDying(value) {
        this.writeOffsetBool(0x34, value);
    }

    get isDead() {
        return this.readOffsetBool(0x35);
    }
    set isDead(value) {
        this.writeOffsetBool(0x35, value);
    }

    get isEscaping() {
        return this.readOffsetBool(0x40);
    }
    set isEscaping(value) {
        this.writeOffsetBool(0x40, value);
    }

    get currentHealth() {
        return this.readOffsetS32(0x64);
    }
    set currentHealth(value) {
        this.writeOffsetS32(0x64, value);
    }

    get maxHealth() {
        return this.readOffsetS32(0x68);
    }
    set maxHealth(value) {
        this.writeOffsetS32(0x68, value);
    }

    get currentBlock() {
        return this.readOffsetS32(0x6C);
    }
    set currentBlock(value) {
        this.writeOffsetS32(0x6C, value);
    }
}