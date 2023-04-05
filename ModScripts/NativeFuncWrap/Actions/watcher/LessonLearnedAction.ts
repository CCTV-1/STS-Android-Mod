import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const LessonLearnedAction = {
    Ctor(targetCreature: NativePointer, dmgInfo: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.LessonLearned.Ctor)(PatchHelper.nullptr, targetCreature, dmgInfo);
    },
};
