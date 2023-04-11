import { PatchHelper } from "../../PatchHelper.js";
import { NativePowerInfo } from "./NativePowerInfo.js";

export const NativeAbstractPowers = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.Abstract.Ctor)(NULL);
    },
    OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
        return PatchHelper.HookSTSFunction(NativePowerInfo.Abstract.Ctor, newCtor);
    },
};