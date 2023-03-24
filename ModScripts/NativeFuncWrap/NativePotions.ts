import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativePotions = {
    PotionSlot: {
        Ctor(index: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Potions.PotionSlot.Ctor)(PatchHelper.nullptr, index);
        }
    }
};