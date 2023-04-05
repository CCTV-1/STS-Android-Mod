import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const HeadStompAction = {
    Ctor(monsterPtr: NativePointer, vulnAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.HeadStomp.Ctor)(PatchHelper.nullptr, monsterPtr, vulnAmount);
    },
};
