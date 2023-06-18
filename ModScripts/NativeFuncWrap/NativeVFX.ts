import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { NativeSTDLib } from "./NativeSTDLib.js";

const VFX = {
    PurgeCardEffect: {
        /**
         * ```c
         * STS::AbstractGameEffect * VFX::PurgeCardEffect::Ctor(STS::AbstractGameEffect * thisPtr, STS::AbstractCard * cardPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1B52C55, 'pointer', ['pointer', 'pointer']),
        /**
         * ```c
         * STS::AbstractGameEffect * VFX::PurgeCardEffect::Ctor(STS::AbstractGameEffect * thisPtr, STS::AbstractCard * cardPtr, float x, float y)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x1B52D7D, 'pointer', ['pointer', 'pointer', 'float', 'float']),
    },
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
    ShowCardAndObtainEffect: {
        /**
         * ```c
         * STS::AbstractGameEffect * VFX::ShowCardAndObtainEffect::Ctor(STS::AbstractGameEffect * thisPtr, STS::AbstractCard * cardPtr, float x, float y)
         * ```
         * 
         * just call Ctor2(thisPtr, cardPtr, x, y, true);
         */
        Ctor: new NativeFunctionInfo(0x1B57F35, 'pointer', ['pointer', 'pointer', 'float', 'float']),
        /**
         * ```c
         * STS::AbstractGameEffect * VFX::ShowCardAndObtainEffect::Ctor(STS::AbstractGameEffect * thisPtr, STS::AbstractCard * cardPtr, float x, float y, bool convergeCards)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x1B57549, 'pointer', ['pointer', 'pointer', 'float', 'float', 'bool']),
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
    PurgeCardEffect: {
        Ctor(cardPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.PurgeCardEffect.Ctor)(NULL, cardPtr);
        },
        Ctor2(cardPtr: NativePointer, x: number, y: number): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.PurgeCardEffect.Ctor2)(NULL, cardPtr, x, y);
        },
    },
    ShowCardBrieflyEffect: {
        Ctor(cardPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.ShowCardBrieflyEffect.Ctor)(NULL, cardPtr);
        },
        Ctor2(cardPtr: NativePointer, x: number, y: number): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.ShowCardBrieflyEffect.Ctor2)(NULL, cardPtr, x, y);
        },
    },
    ShowCardAndObtainEffect: {
        Ctor(cardPtr: NativePointer, x: number, y: number): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.ShowCardAndObtainEffect.Ctor2)(NULL, cardPtr, x, y, Number(true));
        },
        Ctor2(cardPtr: NativePointer, x: number, y: number, convergeCards: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(VFX.ShowCardAndObtainEffect.Ctor2)(NULL, cardPtr, x, y, Number(convergeCards));
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
    },
};