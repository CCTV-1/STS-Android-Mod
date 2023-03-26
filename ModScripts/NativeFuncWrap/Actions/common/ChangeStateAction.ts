import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTSLib } from "../../NativeSTSLib.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ChangeStateAction = {
    Ctor(monster: NativePointer, stateName: string): NativePointer {
        let nativeStateName = NativeSTSLib.JString.Ctor(stateName);
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ChangeState.Ctor)(PatchHelper.nullptr, monster, nativeStateName);
    },
};