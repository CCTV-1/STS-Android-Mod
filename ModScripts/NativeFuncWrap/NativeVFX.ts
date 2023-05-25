import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const VFX = {
    ShowCardBrieflyEffect: {
        /**
         * ```c
         * STS::AbstractGameEffect * VFX::ShowCardBrieflyEffect::Ctor(STS::AbstractGameEffect * thisPtr, STS::AbstractCard * cardPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1B5843D, 'pointer', ['pointer', 'pointer']),
        /**
         * ```c
         * STS::AbstractGameEffect * VFX::ShowCardBrieflyEffect::Ctor(STS::AbstractGameEffect * thisPtr, STS::AbstractCard * cardPtr, float x, float y)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x1B58B0D, 'pointer', ['pointer', 'pointer', 'float', 'float']),
    },
    UpgradeShineEffect: {
        /**
         * ```c
         * STS::AbstractGameEffect * VFX::ShowCardBrieflyEffect::Ctor(STS::AbstractGameEffect * thisPtr, float x, float y)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1BDB775, 'pointer', ['pointer', 'float', 'float']),
    },
};

export const NativeVFX = {
    ShowCardBrieflyEffect: {
        Ctor(cardPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.ShowCardBrieflyEffect.Ctor)(NULL, cardPtr);
        },
        Ctor2(cardPtr: NativePointer, x: number, y: number): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.ShowCardBrieflyEffect.Ctor2)(NULL, cardPtr, x, y);
        },
    },
    UpgradeShineEffect: {
        Ctor(x: number, y: number): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.UpgradeShineEffect.Ctor)(NULL, x, y);
        }
    }
};