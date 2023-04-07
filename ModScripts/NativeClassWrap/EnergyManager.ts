import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class EnergyManager extends NativeClassWrapper {
    //NativePointer EnergyManager *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void EnergyManager::use(EnergyManager* thisPtr, int32_t energyAmount)
         * ```
         */
        use: new NativeFunctionInfo(0x1794FBD, 'void', ['pointer', 'int32']),
    }

    use(energyAmount: number) {
        PatchHelper.GetNativeFunction(EnergyManager.#vfunctionMap.use)(this.rawPtr, energyAmount);
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