import { NativeSTSLib } from "../NativeFuncWrap/NativeSTSLib.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class JString extends NativeClassWrapper {    
    //NativePointer JString *
    constructor(CThisPtr: NativePointer) {
        super(CThisPtr);
    }

    static CreateJString(str:string) {
        return new JString(NativeSTSLib.JString.Ctor(str));
    }

    get len() {
        return this.readOffsetS32(0x8);
    }

    get content() {
        return this.readOffsetUtf16String(0xC) || "";
    }
}