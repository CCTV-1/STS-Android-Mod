import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SuicideAction = {
    Ctor(monster: NativePointer, triggerRelics: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.Suicide.Ctor)(PatchHelper.nullptr, monster, Number(triggerRelics));
    },
};