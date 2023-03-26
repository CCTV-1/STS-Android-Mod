import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class EnergyManager extends NativeClassWrapper {
    //NativePointer EnergyManager *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    get energy() {
        return this.readOffsetS32(0x8);
    }
    set energy(value) {
        this.writeOffsetS32(0x8, value);
    }

    get energyMaster() {
        return this.readOffsetS32(0xC);
    }
    set energyMaster(value) {
        this.writeOffsetS32(0xC, value);
    }
}