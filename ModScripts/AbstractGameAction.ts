import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class AbstractGameAction extends NativeClassWrapper {
    //NativePointer AbstractGameAction *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    get duration() {
        return this.readOffsetFloat(0x8);
    }
    set duration(value) {
        this.writeOffsetFloat(0x8, value);
    }

    get startDuration() {
        return this.readOffsetFloat(0xc);
    }
    set startDuration(value) {
        this.writeOffsetFloat(0xc, value);
    }

    get actionType() {
        return this.readOffsetU32(0x10);
    }
    set actionType(value) {
        this.writeOffsetU32(0x10, value);
    }

    get attackEffect() {
        return this.readOffsetU32(0x14);
    }
    set attackEffect(value) {
        this.writeOffsetU32(0x14, value);
    }

    get damageType() {
        return this.readOffsetU32(0x18);
    }
    set damageType(value) {
        this.writeOffsetU32(0x18, value);
    }

    get isDone() {
        return this.readOffsetBool(0x1C);
    }
    set isDone(value) {
        this.writeOffsetBool(0x1C, value);
    }

    get amount() {
        return this.readOffsetS32(0x20);
    }
    set amount(value) {
        this.writeOffsetS32(0x20, value);
    }

    get target() {
        return this.readOffsetPointer(0x20);
    }
    set target(value) {
        this.writeOffsetPointer(0x20, value);
    }

    get source() {
        return this.readOffsetPointer(0x24);
    }
    set source(value) {
        this.writeOffsetPointer(0x24, value);
    }
}