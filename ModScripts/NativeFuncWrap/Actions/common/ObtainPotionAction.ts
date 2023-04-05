import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ObtainPotionAction = {
    Ctor(potion: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ObtainPotion.Ctor)(NULL, potion);
    }
};