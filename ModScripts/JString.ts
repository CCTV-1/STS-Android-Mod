import { PatchManager } from "./PatchManager.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class JString extends NativeClassWrapper {    
    //NativePointer JString *
    constructor(CThisPtr: NativePointer) {
        super(CThisPtr);
    }

    static CreateJString(str:string) {
        let nativeCtor = PatchManager.GetNativeFunction(PatchManager.STSNativeLib.JString_Ctor);
        let nativeMem = Memory.allocUtf16String(str);
        let nativeStrPtr = nativeCtor(new NativePointer(0), nativeMem);
        return new JString(nativeStrPtr);
    }

    get len() {
        return this.readOffsetS32(0x8);
    }

    get content() {
        return this.readOffsetUtf16String(0xC) || "";
    }
    set content(str: string) {
        this.writeOffsetS32(0x8, str.length);
        this.writeOffsetUtf16String(0xC, str);
    }
}