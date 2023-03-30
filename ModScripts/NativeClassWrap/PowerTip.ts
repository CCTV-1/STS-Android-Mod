import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class PowerTip extends NativeClassWrapper {
    //NativePointer PowerTip *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * GDX::graphics::Texture *
     */
    get img() {
        return this.readOffsetPointer(0x8);
    }
    set img(value) {
        this.writeOffsetPointer(0x8, value);
    }

    /**
     * GDX::graphics::g2d::TextureAtlas.AtlasRegion *
     */
    get imgRegion() {
        return this.readOffsetPointer(0xC);
    }
    set imgRegion(value) {
        this.writeOffsetPointer(0xC, value);
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