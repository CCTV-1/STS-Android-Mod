import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativeVFX = {
    ShowCardBrieflyEffect: {
        Ctor(cardPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.VFX.ShowCardBrieflyEffect.Ctor)(PatchHelper.nullptr, cardPtr);
        }
    },
    UpgradeShineEffect: {
        Ctor(x: number, y: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.VFX.UpgradeShineEffect.Ctor)(PatchHelper.nullptr, x, y);
        }
    }
};