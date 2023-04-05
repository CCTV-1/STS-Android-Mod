import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const TriggerMarksAction = {
    Ctor(callingCard: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.TriggerMarks.Ctor)(PatchHelper.nullptr, callingCard);
    },
};
