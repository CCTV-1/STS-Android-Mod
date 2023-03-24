import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class ArrayList extends NativeClassWrapper {
    //NativePointer ArrayList<T> *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    get data() {
        return this.readOffsetPointer(0x8);
    }

    get size() {
        return this.readOffsetU32(0xc);
    }

}