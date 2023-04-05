import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ModifyBlockAction = {
    Ctor(UUIDV1: number, UUIDV2: number, UUIDV3: number, UUIDV4: number, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ModifyBlock.Ctor)(NULL, UUIDV1, UUIDV2, UUIDV3, UUIDV4, amount);
    }
};