import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const BouncingFlaskAction = {
    Ctor(targetCreature: NativePointer, amount: number, numTimes: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.BouncingFlask.Ctor)(PatchHelper.nullptr, targetCreature, amount, numTimes);
    },
};