import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const CodexAction = {
    Ctor(targetCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Codex.Ctor)(PatchHelper.nullptr, targetCreature);
    },
};