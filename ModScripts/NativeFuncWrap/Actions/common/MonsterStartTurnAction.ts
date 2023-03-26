import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MonsterStartTurnAction = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.MonsterStartTurn.Ctor)(PatchHelper.nullptr);
    }
};