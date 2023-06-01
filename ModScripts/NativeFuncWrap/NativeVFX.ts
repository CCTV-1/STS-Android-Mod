import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { NativeSTDLib } from "./NativeSTDLib.js";

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
    ThoughtBubble: {
        /**
         * ```c
         * STS::AbstractGameEffect * VFX::ThoughtBubble::Ctor(STS::AbstractGameEffect * thisPtr, float x, float y, float duration, JString* msg, bool isPlayer)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1BD7365, 'pointer', ['pointer', 'float', 'float', 'float', 'pointer', 'bool']),
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
    ThoughtBubble: {
        Ctor(x: number, y: number, duration: number, msg: string, isPlayer: boolean): NativePointer {
            let nativeMsg = NativeSTDLib.JString.Ctor(msg);
            return PatchHelper.GetNativeFunction(VFX.ThoughtBubble.Ctor)(NULL, x, y, duration, nativeMsg, Number(isPlayer));
        },
    },
    UpgradeShineEffect: {
        Ctor(x: number, y: number): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.UpgradeShineEffect.Ctor)(NULL, x, y);
        }
    }
};