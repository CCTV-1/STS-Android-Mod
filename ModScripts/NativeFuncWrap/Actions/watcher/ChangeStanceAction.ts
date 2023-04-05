import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ChangeStanceAction = {
    Ctor(stanceId: string): NativePointer {
        let nativeStanceId = NativeSTDLib.JString.Ctor(stanceId);
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.ChangeStance.Ctor)(NULL, nativeStanceId);
    },
};
