import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const MasterRealityPower = {
    Ctor(owner: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.MasterReality.Ctor)(PatchHelper.nullptr, owner);
    }
};