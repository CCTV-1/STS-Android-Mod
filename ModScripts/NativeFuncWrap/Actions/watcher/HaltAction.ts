import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const HaltAction = {
    Ctor(targetCreature: NativePointer, block: number, additional: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.Halt.Ctor)(NULL, targetCreature, block, additional);
    },
};
