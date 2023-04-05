import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const PressEndTurnButtonAction = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.PressEndTurnButton.Ctor)(NULL);
    },
};
