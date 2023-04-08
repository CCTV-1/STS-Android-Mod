import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RitualDaggerAction = {
    /** UUID field use Little-Endian */
    Ctor(targetCreature: NativePointer, dmgInfo: NativePointer, incAmount: number, UUIDV1: number, UUIDV2: number,
        UUIDV3: number, UUIDV4: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.RitualDagger.Ctor)(NULL, targetCreature, dmgInfo, incAmount, UUIDV1,
            UUIDV2, UUIDV3, UUIDV4);
    },
};
