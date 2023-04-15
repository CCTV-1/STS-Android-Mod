import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class Random extends NativeClassWrapper {
    //NativePointer Random *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void STS::Random::setCounter(Random* this, int32_t targetCounter)
         * ```
         */
        setCounter: new NativeFunctionInfo(0x28, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * int32_t STS::Random::random(Random* this, int32_t range)
         * ```
         */
        randomI32: new NativeFunctionInfo(0x30, 'int32', ['pointer', 'int32']),
        /**
         * ```c
         * int32_t STS::Random::random(Random* this, int32_t start, int32_t end)
         * ```
         */
        randomI32_2: new NativeFunctionInfo(0x38, 'int32', ['pointer', 'int32', 'int32']),
        /**
         * ```c
         * int64_t STS::Random::randomLong(Random* this)
         * ```
         */
        randomI64: new NativeFunctionInfo(0x50, 'int64', ['pointer']),
        /**
         * ```c
         * bool STS::Random::randomBoolean(Random* this)
         * ```
         */
        randomBoolean: new NativeFunctionInfo(0x58, 'bool', ['pointer']),
        /**
         * ```c
         * bool STS::Random::randomBoolean(Random* this, float chance)
         * ```
         */
        randomBoolean2: new NativeFunctionInfo(0x58, 'bool', ['pointer', 'float']),
        /**
         * ```c
         * float STS::Random::randomFloat(Random* this)
         * ```
         */
        randomFloat: new NativeFunctionInfo(0x68, 'float', ['pointer']),
        /**
         * ```c
         * float STS::Random::randomFloat(Random* this, float range)
         * ```
         */
        randomFloat2: new NativeFunctionInfo(0x70, 'float', ['pointer', 'float']),
        /**
         * ```c
         * float STS::Random::randomFloat(Random* this, float start, float end)
         * ```
         */
        randomFloat3: new NativeFunctionInfo(0x78, 'float', ['pointer', 'float', 'float']),
    }

    setCounter(targetCounter: number) {
        this.getVirtualFunction(Random.#vfunctionMap.setCounter)(this.rawPtr, targetCounter);
    }

    randomI32(range: number): number {
        return this.getVirtualFunction(Random.#vfunctionMap.randomI32)(this.rawPtr, range);
    }

    randomI32_2(start: number, end: number): number {
        return this.getVirtualFunction(Random.#vfunctionMap.randomI32_2)(this.rawPtr, start, end);
    }

    randomI64(): Int64 {
        return this.getVirtualFunction(Random.#vfunctionMap.randomI64)(this.rawPtr);
    }

    randomBoolean(): boolean {
        return this.getVirtualFunction(Random.#vfunctionMap.randomBoolean)(this.rawPtr);
    }

    randomBoolean2(chance: number): boolean {
        return this.getVirtualFunction(Random.#vfunctionMap.randomBoolean2)(this.rawPtr, chance);
    }

    randomFloat(): number {
        return this.getVirtualFunction(Random.#vfunctionMap.randomFloat)(this.rawPtr);
    }

    randomFloat2(range: number): number {
        return this.getVirtualFunction(Random.#vfunctionMap.randomFloat2)(this.rawPtr, range);
    }

    randomFloat3(start: number, end: number): number {
        return this.getVirtualFunction(Random.#vfunctionMap.randomFloat2)(this.rawPtr, start, end);
    }

    /** GDX::RandomXS128* */
    get randomHandle() {
        return this.readOffsetPointer(0x8);
    }

    get counter() {
        return this.readOffsetS32(0xC);
    }
}