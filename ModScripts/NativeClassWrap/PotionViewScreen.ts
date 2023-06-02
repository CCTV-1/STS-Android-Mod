import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class PotionViewScreen extends NativeClassWrapper {
    //NativePointer PotionViewScreen *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    get grabbedScreen() {
        return this.readOffsetBool(0x8);
    };

    get scrollY() {
        return this.readOffsetFloat(0xC);
    }
    set scrollY(value) {
        this.writeOffsetFloat(0xC, value);
    }

    get targetY() {
        return this.readOffsetFloat(0x10);
    }
    set targetY(value) {
        this.writeOffsetFloat(0x10, value);
    }

    get scrollUpperBound() {
        return this.readOffsetFloat(0x14);
    }
    set scrollUpperBound(value) {
        this.writeOffsetFloat(0x14, value);
    }

    get scrollLowerBound() {
        return this.readOffsetFloat(0x18);
    }
    set scrollLowerBound(value) {
        this.writeOffsetFloat(0x18, value);
    }
}