import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const NotStanceCheckAction = {
    Ctor(stanceToCheck: string, actionToCheck: NativePointer): NativePointer {
        let nativeStanceId = NativeSTDLib.JString.Ctor(stanceToCheck);
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.NotStanceCheck.Ctor)(PatchHelper.nullptr, nativeStanceId, actionToCheck);
    },
};
