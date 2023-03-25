import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class JObjectArray extends NativeClassWrapper {
    //NativePointer JObjectArray *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    get(index: number) {
        if (this.size <= index) {
            throw new RangeError("range is: [0, " + this.size + "), try get: " + index + ".");
        }
        return this.readOffsetPointer(0x8).add(index).readPointer();
    }

    unsafeGet(index: number) {
        return this.readOffsetPointer(0x8).add(index).readPointer();
    }

    get size() {
        return this.readOffsetPointer(0x14).readS32();
    }
}