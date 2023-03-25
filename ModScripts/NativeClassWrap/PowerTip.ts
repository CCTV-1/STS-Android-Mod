import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class PowerTip extends NativeClassWrapper {
    //NativePointer PowerTip *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    get header() {
        return this.readOffsetJString(0x10).content;
    }
    set header(str:string) {
        this.writeOffsetJString(0x10, JString.CreateJString(str));
    }

    get body() {
        return this.readOffsetJString(0x14).content;
    }
    set body(str:string) {
        this.writeOffsetJString(0x14, JString.CreateJString(str));
    }
}