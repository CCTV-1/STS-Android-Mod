import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ScryAction = {
    Ctor(numcards: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.utility.Scry.Ctor)(NULL, numcards);
    },
    OverrideCtor(newCtor: (thisPtr: NativePointer, numCards: number) => NativePointer): (thisPtr: NativePointer, numCards: number) => NativePointer {
        return PatchHelper.HookSTSFunction(NativeActionInfo.utility.Scry.Ctor, newCtor);
    },
};