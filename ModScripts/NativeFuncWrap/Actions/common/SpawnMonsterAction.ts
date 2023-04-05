import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SpawnMonsterAction = {
    Ctor(monster: NativePointer, isMinion: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.SpawnMonster.Ctor)(NULL, monster, Number(isMinion));
    },
};