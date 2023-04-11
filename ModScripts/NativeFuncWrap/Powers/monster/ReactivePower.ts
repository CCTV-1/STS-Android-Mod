import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const ReactivePower = {
    Ctor(owner: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.monster.Reactive.Ctor)(NULL, owner);
    },
};