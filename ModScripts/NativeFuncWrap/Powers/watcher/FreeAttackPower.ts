import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const FreeAttackPower = {
    Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.FreeAttack.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
    }
};