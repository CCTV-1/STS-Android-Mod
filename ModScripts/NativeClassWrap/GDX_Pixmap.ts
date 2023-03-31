import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class GDX_Pixmap extends NativeClassWrapper {
    //NativePointer GDX::Pixmap *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /** type is GDX::G2D::2DPixmap */
    get pixmap() {
        return this.readOffsetPointer(0x8);
    }
    set pixmap(value) {
        this.writeOffsetPointer(0x8, value);
    }

    get color() {
        return this.readOffsetS32(0xC);
    }
    set color(value) {
        this.writeOffsetS32(0xC, value);
    }

    get disposed() {
        return this.readOffsetBool(0x10);
    }
}