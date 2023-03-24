import { PatchManager } from "../PatchManager.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativeVFX = {
    ShowCardBrieflyEffect: {
        Ctor(cardPtr: NativePointer): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.VFX.ShowCardBrieflyEffect.Ctor)(PatchManager.nullptr, cardPtr);
        }
    },
    UpgradeShineEffect: {
        Ctor(x: number, y: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.VFX.UpgradeShineEffect.Ctor)(PatchManager.nullptr, x, y);
        }
    }
};