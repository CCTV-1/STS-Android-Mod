import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ReduceCostAction = {
    Ctor(UUIDV1: number, UUIDV2: number, UUIDV3: number, UUIDV4: number, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ReduceCost.Ctor)(PatchHelper.nullptr, UUIDV1, UUIDV2, UUIDV3, UUIDV4, amount);
    },
    Ctor2(cardPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ReduceCost.Ctor2)(PatchHelper.nullptr, cardPtr);
    },
};