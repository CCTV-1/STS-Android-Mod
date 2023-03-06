import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class AbstractCreature extends NativeClassWrapper {
    //NativePointer AbstractCreature *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    get currentHealth() {
        return this.readOffsetS32(0x64);
    }
    set currentHealth(value) {
        this.writeOffsetS32(0x64, value);
    }

    get maxHealth() {
        return this.readOffsetS32(0x68);
    }
    set maxHealth(value) {
        this.writeOffsetS32(0x68, value);
    }
}