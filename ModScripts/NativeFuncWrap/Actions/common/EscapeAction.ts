import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const EscapeAction = {
    Ctor(source: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.Escape.Ctor)(NULL, source);
    },
};