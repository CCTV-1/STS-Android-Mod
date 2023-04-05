import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const CrushJointsAction = {
    Ctor(monsterPtr: NativePointer, vulnAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.CrushJoints.Ctor)(PatchHelper.nullptr, monsterPtr, vulnAmount);
    },
};
