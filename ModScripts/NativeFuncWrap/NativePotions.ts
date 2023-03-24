import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const Potions = {
    PotionSlot: {
        /**
         * ```c
         *  AbstractPotion* Potions::PotionSlot::Ctor(AbstractPotion* this, int32_t slot)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1950881, 'pointer', ['pointer', 'int32']),
    },
}

export const NativePotions = {
    PotionSlot: {
        Ctor(index: number): NativePointer {
            return PatchHelper.GetNativeFunction(Potions.PotionSlot.Ctor)(PatchHelper.nullptr, index);
        }
    }
};