import { PatchHelper } from "../PatchHelper.js";
import { PotionRarity, PotionSize, PotionColor } from "../enums.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { NativeSTDLib } from "./NativeSTDLib.js";

const Potions = {
    Abstract: {
        /**
         * ```c
         * STS::AbstractPotion* AbstractPotion::Ctor(STS::AbstractPotion* thisPtr, JString* name, JString* id, PotionRarity rarity, PotionSize size, PotionColor color)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1941ED9, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'uint32', 'uint32']),
        /**
         * ```c
         * STS::AbstractPotion* AbstractPotion::Ctor(STS::AbstractPotion* thisPtr, JString* name, JString* id, PotionRarity rarity, PotionSize size, PotionColor color
         *      GDX::Color* liquidColor, GDX::Color* hybridColor, GDX::Color* spotsColor)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x1941611, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'uint32', 'uint32', 'pointer', 'pointer', 'pointer']),
    },
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
    Abstract: {
        Ctor(name: string, id: string, rarity: PotionRarity, size: PotionSize, color: PotionColor) {
            let nativeName = NativeSTDLib.JString.Ctor(name);
            let nativeId = NativeSTDLib.JString.Ctor(id);
            return PatchHelper.GetNativeFunction(Potions.Abstract.Ctor)(NULL, nativeName, nativeId, Number(rarity), Number(size), Number(color));
        },
        Ctor2(name: string, id: string, rarity: PotionRarity, size: PotionSize, color: PotionColor, liquidColor: NativePointer,
            hybridColor: NativePointer, spotsColor: NativePointer) {
            let nativeName = NativeSTDLib.JString.Ctor(name);
            let nativeId = NativeSTDLib.JString.Ctor(id);
            return PatchHelper.GetNativeFunction(Potions.Abstract.Ctor2)(NULL, nativeName, nativeId, Number(rarity), Number(size), Number(color),
                liquidColor, hybridColor, spotsColor);
        },
    },
    PotionSlot: {
        Ctor(index: number): NativePointer {
            return PatchHelper.GetNativeFunction(Potions.PotionSlot.Ctor)(NULL, index);
        }
    },
};