import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeGDXLibInfo } from "../NativeGDXLibInfo.js";

export const GdxRuntimeException = {
    Ctor(message: string): NativePointer {
        let nativeMessage = NativeSTDLib.JString.Ctor(message);
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.utils.RuntimeException.Ctor)(PatchHelper.nullptr, nativeMessage);
    },
    OverrideCtor(newCtor: (thisPtr: NativePointer, message: NativePointer) => NativePointer): (thisPtr: NativePointer, message: NativePointer) => NativePointer {
        return PatchHelper.HookSTSFunction(NativeGDXLibInfo.utils.RuntimeException.Ctor, newCtor);
    },
    Ctor2(message: string, exceptPtr: NativePointer): NativePointer {
        let nativeMessage = NativeSTDLib.JString.Ctor(message);
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.utils.RuntimeException.Ctor2)(PatchHelper.nullptr, nativeMessage, exceptPtr);
    },
    OverrideCtor2(newCtor: (thisPtr: NativePointer, message: NativePointer, exceptPtr: NativePointer) => NativePointer):
        (thisPtr: NativePointer, message: NativePointer, exceptPtr: NativePointer) => NativePointer {
        return PatchHelper.HookSTSFunction(NativeGDXLibInfo.utils.RuntimeException.Ctor2, newCtor);
    },
}