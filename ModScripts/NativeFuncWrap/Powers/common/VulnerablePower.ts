import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const VulnerablePower = {
    Ctor(owner: NativePointer, amount: number, isSourceMonster: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.common.Vulnerable.Ctor)(NULL, owner, amount, Number(isSourceMonster));
    },
};