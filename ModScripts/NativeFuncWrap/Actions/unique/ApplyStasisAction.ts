import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ApplyStasisAction = {
    Ctor(ownerCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.ApplyStasis.Ctor)(NULL, ownerCreature);
    },
};