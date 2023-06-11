import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { JString } from "./JString.js";

export class NativeClassWrapper {
    static #overridMap = new Map<string, CModule>();

    rawPtr: NativePointer;
    #vfuncMapPtr: NativePointer;
    
    /** if want wrap static class, shall pass hasVFuncMap = false,and get/setVirtualFunction unusable */
    constructor(CthisPtr: NativePointer, hasVFuncMap: boolean = true) {
        if (!(CthisPtr instanceof NativePointer)) {
            throw new Error("need a NativePointer");
        }
        if (CthisPtr.isNull()) {
            throw new Error("need a non-nullptr");
        }
        this.rawPtr = CthisPtr;
        if (hasVFuncMap) {
            this.#vfuncMapPtr = CthisPtr.readPointer().add(0x4).readPointer();
        } else {
            this.#vfuncMapPtr = NULL;
        }
    }

    protected getVirtualFunction(funcInfo: NativeFunctionInfo) {
        let vFuncPtr = this.#vfuncMapPtr.add(funcInfo.funcOffset).readPointer();
        return PatchHelper.GetNativeVFunction(vFuncPtr, funcInfo.retType, funcInfo.argTypes);
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
    protected setVirtualFunction(funcName: string, fakecode: string, funcInfo: NativeFunctionInfo, newVFunc: any): NativePointer {
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

    protected readOffsetPointer(offset: number) {
        return this.rawPtr.add(offset).readPointer();
    }
    protected writeOffsetPointer(offset: number, value: NativePointer) {
        return this.rawPtr.add(offset).writePointer(value);
    }

    protected readOffsetBool(offset: number) {
        return Boolean(this.rawPtr.add(offset).readU8());
    }

    protected writeOffsetBool(offset: number, value: boolean) {
        this.rawPtr.add(offset).writeU8(Number(value));
    }

    protected readOffsetU8(offset: number) {
        return this.rawPtr.add(offset).readU8();
    }

    protected writeOffsetU8(offset: number, value: number) {
        this.rawPtr.add(offset).writeU8(value);
    }

    protected readOffsetU32(offset: number) {
        return this.rawPtr.add(offset).readU32();
    }

    protected writeOffsetU32(offset: number, value: number) {
        this.rawPtr.add(offset).writeU32(value);
    }

    protected readOffsetS32(offset: number) {
        return this.rawPtr.add(offset).readS32();
    }

    protected writeOffsetS32(offset: number, value: number) {
        this.rawPtr.add(offset).writeS32(value);
    }

    protected readOffsetS64(offset: number) {
        return this.rawPtr.add(offset).readS64();
    }

    protected writeOffsetS64(offset: number, value: Int64) {
        this.rawPtr.add(offset).writeS64(value);
    }

    protected readOffsetFloat(offset: number) {
        return this.rawPtr.add(offset).readFloat();
    }

    protected writeOffsetFloat(offset: number, value: number) {
        this.rawPtr.add(offset).writeFloat(value);
    }

    protected readOffsetJString(offset: number) {
        let JStr = new JString(this.rawPtr.add(offset).readPointer());
        return JStr;
    }

    protected writeOffsetJString(offset: number, value: JString) {
        this.rawPtr.add(offset).writePointer(value.rawPtr)
    }

    protected readOffsetUtf16String(offset: number) {
        return this.rawPtr.add(offset).readUtf16String();
    }

    protected writeOffsetUtf16String(offset: number, value: string) {
        this.rawPtr.add(offset).writeUtf16String(value);
    }
}