
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RandomizeHandCostAction = {
    Ctor(sourceCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.RandomizeHandCost.Ctor)(NULL);
    },
};
