import { PatchHelper } from "../../PatchHelper.js";
import { NativeActionInfo } from "./NativeActionInfo.js";

export const NativeAbstractGameAction = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.AbstractGame.Ctor)(NULL);
    },
    OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
        return PatchHelper.HookSTSFunction(NativeActionInfo.AbstractGame.Ctor, newCtor);
    },
};