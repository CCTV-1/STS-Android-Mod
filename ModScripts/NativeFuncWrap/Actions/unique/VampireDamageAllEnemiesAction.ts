
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const VampireDamageAllEnemiesAction = {
    Ctor(sourceCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.VampireDamageAllEnemies.Ctor)(PatchHelper.nullptr);
    },
};
