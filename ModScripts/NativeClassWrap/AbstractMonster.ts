import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { EnemyType } from "../enums.js";
import { AbstractCreature } from "./AbstractCreature.js";

export interface NewMonsterVFuncType {
    takeTurn: (thisPtr: NativePointer) => void,
    getMove: (thisPtr: NativePointer, index: number) => void,
};

export class AbstractMonster extends AbstractCreature {
    //NativePointer AbstractMonster *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void AbstractMonster::flashIntent(AbstractMonster* thisPtr)
         * ```
         */
        flashIntent: new NativeFunctionInfo(0x1D8, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractMonster::createIntent(AbstractMonster* thisPtr)
         * ```
         */
        createIntent: new NativeFunctionInfo(0x1E0, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractMonster::rollMove(AbstractMonster* thisPtr)
         * ```
         */
        rollMove: new NativeFunctionInfo(0x218, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractMonster::init(AbstractMonster* thisPtr)
         * ```
         */
        init: new NativeFunctionInfo(0x248, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractMonster::escape(AbstractMonster* thisPtr)
         * ```
         */
        escape: new NativeFunctionInfo(0x290, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractMonster::die(AbstractMonster* thisPtr, bool triggerRelics)
         * ```
         */
        die: new NativeFunctionInfo(0x2A0, 'void', ['pointer', 'bool']),
        /**
         * ```c
         * void AbstractMonster::changeState(AbstractMonster* thisPtr, JString* stateName)
         * ```
         */
        changeState: new NativeFunctionInfo(0x2C8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractMonster::addToTop(STS::AbstractCard* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToBot: new NativeFunctionInfo(0x2D0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractMonster::addToTop(STS::AbstractCard* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0x2D8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  int32_t AbstractMonster::getIntentBaseDmg(STS::AbstractCard* this)
         * ```
         */
        getIntentBaseDmg: new NativeFunctionInfo(0x2F8, 'int32', ['pointer']),
    };

    flashIntent() {
        this.getVirtualFunction(AbstractMonster.#vfunctionMap.flashIntent)(this.rawPtr);
    }

    createIntent() {
        this.getVirtualFunction(AbstractMonster.#vfunctionMap.createIntent)(this.rawPtr);
    }

    rollMove() {
        this.getVirtualFunction(AbstractMonster.#vfunctionMap.rollMove)(this.rawPtr);
    }

    init() {
        this.getVirtualFunction(AbstractMonster.#vfunctionMap.init)(this.rawPtr);
    }

    escape() {
        this.getVirtualFunction(AbstractMonster.#vfunctionMap.escape)(this.rawPtr);
    }

    die(triggerRelics: boolean) {
        this.getVirtualFunction(AbstractMonster.#vfunctionMap.die)(this.rawPtr, Number(triggerRelics));
    }

    changeState(stateName: string) {
        const nativeStateName = NativeSTDLib.JString.Ctor(stateName);
        this.getVirtualFunction(AbstractMonster.#vfunctionMap.changeState)(this.rawPtr, nativeStateName);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractMonster.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractMonster.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    getIntentBaseDmg(): number {
        return this.getVirtualFunction(AbstractMonster.#vfunctionMap.getIntentBaseDmg)(this.rawPtr);
    }

    get deathTimer() {
        return this.readOffsetFloat(0x104);
    }

    get nameColor() {
        return this.readOffsetPointer(0x108);
    }

    /** GDX::Texture* */
    get img() {
        return this.readOffsetPointer(0x110);
    }

    get escaped() {
        return this.readOffsetBool(0x11C);
    }

    get escapeNext() {
        return this.readOffsetBool(0x11D);
    }

    /** PowerTip* */
    get intentTip() {
        return this.readOffsetPointer(0x120);
    }

    get type(): EnemyType {
        return this.readOffsetU32(0x124);
    }

    get cannotEscape() {
        return this.readOffsetBool(0x12C);
    }

    get nextMove() {
        return this.readOffsetU8(0x148);
    }

    /** GDX::Texture* */
    get intentImg() {
        return this.readOffsetPointer(0x168);
    }

    /** GDX::Texture* */
    get intentBg() {
        return this.readOffsetPointer(0x16C);
    }

    get intentDmg() {
        return this.readOffsetS32(0x170);
    }

    get intentBaseDmg() {
        return this.readOffsetS32(0x174);
    }

    get intentMultiAmt() {
        return this.readOffsetS32(0x178);
    }

    get isMultiDmg() {
        return this.readOffsetBool(0x17C);
    }
}