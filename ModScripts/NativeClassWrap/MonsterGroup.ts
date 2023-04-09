import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { ArrayList } from "./ArrayList.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";

export class MonsterGroup extends NativeClassWrapper {
    //NativePointer MonsterGroup *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void MonsterGroup::init(MonsterGroup* this)
         * ```
         */
        init: new NativeFunctionInfo(0x40, 'void', ['pointer']),
        /**
         * ```c
         * void MonsterGroup::init(MonsterGroup* this, AbstractMonster* monsterPtr)
         * ```
         */
        add: new NativeFunctionInfo(0x48, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void MonsterGroup::usePreBattleAction(MonsterGroup* this)
         * ```
         */
        usePreBattleAction: new NativeFunctionInfo(0x50, 'void', ['pointer']),
        /**
         * ```c
         * bool MonsterGroup::areMonstersDead(MonsterGroup* this)
         * ```
         */
        areMonstersDead: new NativeFunctionInfo(0x58, 'bool', ['pointer']),
        /**
         * ```c
         * bool MonsterGroup::areMonstersBasicallyDead(MonsterGroup* this)
         * ```
         */
        areMonstersBasicallyDead: new NativeFunctionInfo(0x60, 'bool', ['pointer']),
        /**
         * ```c
         * AbstractMonster* MonsterGroup::getMonster(MonsterGroup* this, JString* monsterId)
         * ```
         */
        getMonster: new NativeFunctionInfo(0x70, 'pointer', ['pointer', 'pointer']),
        /**
         * ```c
         * bool MonsterGroup::haveMonstersEscaped(MonsterGroup* this)
         * ```
         */
        haveMonstersEscaped: new NativeFunctionInfo(0x80, 'bool', ['pointer']),
        /**
         * ```c
         * AbstractMonster* MonsterGroup::getRandomMonster(MonsterGroup* this, AbstractMonster* exception, bool aliveOnly, Random* rng)
         * ```
         */
        getRandomMonster3: new NativeFunctionInfo(0xA8, 'pointer', ['pointer', 'pointer', 'bool', 'pointer']),
        /**
         * ```c
         *AbstractMonster* MonsterGroup::getRandomMonster(MonsterGroup* this, AbstractMonster* exception, bool aliveOnly)
         * ```
         * 
         * 0x98 getRandomMonster just call `getRandomMonster4(this, null, false)`
         * 
         * 0xA0 getRandomMonster2 just call `getRandomMonster4(this, null, aliveOnly)`
         */
        getRandomMonster4: new NativeFunctionInfo(0xB0, 'pointer', ['pointer', 'pointer', 'bool']),
        /**
         * ```c
         * void MonsterGroup::escape(MonsterGroup* this)
         * ```
         */
        escape: new NativeFunctionInfo(0xD0, 'void', ['pointer']),
        /**
         * ```c
         * void MonsterGroup::unhover(MonsterGroup* this)
         * ```
         */
        unhover: new NativeFunctionInfo(0xD8, 'void', ['pointer']),
        /**
         * ```c
         * void MonsterGroup::applyEndOfTurnPowers(MonsterGroup* this)
         * ```
         */
        applyEndOfTurnPowers: new NativeFunctionInfo(0xE8, 'void', ['pointer']),
    }

    init() {
        PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.init)(this.rawPtr);
    }

    add(monsterPtr: NativePointer) {
        PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.add)(this.rawPtr, monsterPtr);
    }

    usePreBattleAction() {
        PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.usePreBattleAction)(this.rawPtr);
    }

    areMonstersDead(): boolean {
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.areMonstersDead)(this.rawPtr);
    }

    areMonstersBasicallyDead(): boolean {
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.areMonstersBasicallyDead)(this.rawPtr);
    }

    getMonster(monsterId: string) {
        let nativeMonsterId = NativeSTDLib.JString.Ctor(monsterId);
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.getMonster)(this.rawPtr, nativeMonsterId);
    }

    haveMonstersEscaped(): boolean {
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.haveMonstersEscaped)(this.rawPtr);
    }

    getRandomMonster(): NativePointer {
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.getRandomMonster4)(this.rawPtr, NULL, Number(false));
    }
    getRandomMonster3(exceptionMonster: NativePointer, aliveOnly: boolean, stsRng: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.getRandomMonster3)(this.rawPtr, exceptionMonster, Number(aliveOnly), stsRng);
    }
    getRandomMonster4(exceptionMonster: NativePointer, aliveOnly: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.getRandomMonster4)(this.rawPtr, exceptionMonster, Number(aliveOnly));
    }

    escape() {
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.escape)(this.rawPtr);
    }

    unhover() {
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.unhover)(this.rawPtr);
    }

    applyEndOfTurnPowers() {
        return PatchHelper.GetNativeFunction(MonsterGroup.#vfunctionMap.applyEndOfTurnPowers)(this.rawPtr);
    }

    /** ArrayList\<AbstractMonster\>* */
    get monsters() {
        return new ArrayList(this.readOffsetPointer(0x8));
    }

    /** AbstractMonster* */
    get hoveredMonster(): NativePointer {
        return this.readOffsetPointer(0xC);
    }
}