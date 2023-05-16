import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ChannelAction = {
    Ctor(newOrbPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.defect.Channel.Ctor)(NULL, newOrbPtr);
    },
    Ctor2(newOrbPtr: NativePointer, autoEvoke: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.defect.Channel.Ctor2)(NULL, newOrbPtr, Number(autoEvoke));
    },
};