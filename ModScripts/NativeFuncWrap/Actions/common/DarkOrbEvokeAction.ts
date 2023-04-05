import { AttackEffect } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DarkOrbEvokeAction = {
    Ctor(info: NativePointer, effect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.DarkOrbEvoke.Ctor)(NULL, info, Number(effect));
    },
};