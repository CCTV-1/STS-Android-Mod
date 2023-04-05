import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const JudgementAction = {
    Ctor(targetCreature: NativePointer, cutoff: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.Judgement.Ctor)(PatchHelper.nullptr, targetCreature, cutoff);
    },
};
