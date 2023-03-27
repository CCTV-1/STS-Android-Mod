import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const CalculatedGambleAction = {
    Ctor(upgraded: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.CalculatedGamble.Ctor)(PatchHelper.nullptr, Number(upgraded));
    },
};