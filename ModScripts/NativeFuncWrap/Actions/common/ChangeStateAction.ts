import { JString } from "../../../NativeClassWrap/JString.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ChangeStateAction = {
    Ctor(monster: NativePointer, stateName: string): NativePointer {
        let nativeStateName = JString.CreateJString(stateName);
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ChangeState.Ctor)(PatchHelper.nullptr, monster, nativeStateName);
    },
};