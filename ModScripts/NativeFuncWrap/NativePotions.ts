import { PatchManager } from "../PatchManager.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativePotions = {
    PotionSlot: {
        Ctor(index: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Potions.PotionSlot.Ctor)(PatchManager.nullptr, index);
        }
    }
};