import { PatchManager } from "./PatchManager.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

export class NativeClassWrapper {
    static #overridMap = new Map<string, CModule>();

    rawPtr: NativePointer;
    #vfuncMapPtr: NativePointer;
    //NativePointer AbstractCreature *
    constructor(CthisPtr: NativePointer) {
        if (!(CthisPtr instanceof NativePointer)) {
            throw "need a NativePointer";
        }
        if (CthisPtr.isNull()) {
            throw "need a non-nullptr";
        }
        this.rawPtr = CthisPtr;
        this.#vfuncMapPtr = CthisPtr.readPointer().add(0x4).readPointer();
    }

    getVirtualFunction(funcInfo: NativeFunctionInfo) {
        let vFuncPtr = this.#vfuncMapPtr.add(funcInfo.funcOffset).readPointer();
        return PatchManager.GetNativeVFunction(vFuncPtr, funcInfo.retType, funcInfo.argTypes);
    }
    /**
     * 
     * @param funcName global unique c variable name string, e.g: Abstract_Gingeron__onPlayCard
     * @param fakecode 
     * not to do anything c function code,the name small is funcName arguemt e.g:
     * ```c
     *  void Abstract_Gingeron__onPlayCard(void * arg1, void* arg2, void* arg3) { return ; }
     * ```
     * @param funcInfo `new NativeFunctionInfo(vtableIndex,retType, argType)`
     * @param newVFunc a javascript function
     * @returns origin virtual function pointer
     */
    setVirtualFunction(funcName: string, fakecode: string, funcInfo: NativeFunctionInfo, newVFunc: any): NativePointer  {
        let tmpFunc = NativeClassWrapper.#overridMap.get(funcName)
        if (tmpFunc === undefined) {
            tmpFunc = new CModule(fakecode);
            NativeClassWrapper.#overridMap.set(funcName, tmpFunc);
            let overridVFunc = new NativeCallback(newVFunc, funcInfo.retType, funcInfo.argTypes);
            Interceptor.replace(tmpFunc[funcName], overridVFunc);
        }

        let origVFuncPtr = this.#vfuncMapPtr.add(funcInfo.funcOffset).readPointer();

        this.#vfuncMapPtr.add(funcInfo.funcOffset).writePointer(tmpFunc[funcName]);
        this.#vfuncMapPtr.add(funcInfo.funcOffset + 0x4).writeU8(0);

        return origVFuncPtr;
    }

    readOffsetPointer(offset: number) {
        return this.rawPtr.add(offset).readPointer();
    }
    writeOffsetPointer(offset: number, value: NativePointer) {
        return this.rawPtr.add(offset).writePointer(value);
    }

    readOffsetBool(offset: number) {
        return Boolean(this.rawPtr.add(offset).readU8());
    }

    writeOffsetBool(offset: number, value: boolean) {
        this.rawPtr.add(offset).writeU8(Number(value));
    }

    readOffsetU8(offset: number) {
        return this.rawPtr.add(offset).readU8();
    }

    writeOffsetU8(offset: number, value: number) {
        this.rawPtr.add(offset).writeU8(value);
    }

    readOffsetU32(offset: number) {
        return this.rawPtr.add(offset).readU32();
    }

    writeOffsetU32(offset: number, value: number) {
        this.rawPtr.add(offset).writeU32(value);
    }

    readOffsetS32(offset: number) {
        return this.rawPtr.add(offset).readS32();
    }

    writeOffsetS32(offset: number, value: number) {
        this.rawPtr.add(offset).writeS32(value);
    }

    readOffsetFloat(offset: number) {
        return this.rawPtr.add(offset).readFloat();
    }

    writeOffsetFloat(offset: number, value: number) {
        this.rawPtr.add(offset).writeFloat(value);
    }

    readOffsetJString(offset: number) {
        return this.rawPtr.add(offset).readPointer().add(0xc).readUtf16String() || "";
    }

    writeOffsetJString(offset: number, value: string) {
        this.rawPtr.add(offset).readPointer().add(0x8).writeS32(value.length);
        this.rawPtr.add(offset).readPointer().add(0xc).writeUtf16String(value);
    }

    readOffsetUtf16String(offset: number) {
        return this.rawPtr.add(offset).readUtf16String();
    }

    writeOffsetUtf16String(offset: number, value: string) {
        this.rawPtr.add(offset).writeUtf16String(value);
    }
}