import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ChooseOneAction = {
    /** ArrayList\<AbstractCard>\* choices */
    Ctor(choices: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.ChooseOne.Ctor)(PatchHelper.nullptr, choices);
    },
};