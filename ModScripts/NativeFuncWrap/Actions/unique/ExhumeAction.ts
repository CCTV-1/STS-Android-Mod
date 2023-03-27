import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ExhumeAction = {
    Ctor(upgrade: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Exhume.Ctor)(PatchHelper.nullptr, Number(upgrade));
    },
};