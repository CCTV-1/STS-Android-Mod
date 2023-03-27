import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ArmamentsAction = {
    Ctor(armamentsPlus: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Armaments.Ctor)(PatchHelper.nullptr, Number(armamentsPlus));
    },
};