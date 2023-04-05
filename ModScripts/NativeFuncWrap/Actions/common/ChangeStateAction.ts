import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ChangeStateAction = {
    Ctor(monster: NativePointer, stateName: string): NativePointer {
        let nativeStateName = NativeSTDLib.JString.Ctor(stateName);
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ChangeState.Ctor)(NULL, monster, nativeStateName);
    },
};