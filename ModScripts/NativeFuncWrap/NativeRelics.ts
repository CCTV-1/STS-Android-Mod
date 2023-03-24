import { LandingSound, RelicTier } from "../enums.js";
import { PatchManager } from "../PatchManager.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";
import { NativeSTSLib } from "./NativeSTSLib.js";

export const NativeRelics = {
    AbstractRelic: {
        Ctor(relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound): NativePointer {
            let nativeRelicId = NativeSTSLib.JString.Ctor(relicId);
            let nativeImgUrl = NativeSTSLib.JString.Ctor(imgName);
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.AbstractRelic.Ctor)(PatchManager.nullptr, nativeRelicId, nativeImgUrl, Number(tier), Number(sfx));
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer, relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer):
            (relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.AbstractRelic.Ctor, newCtor);
        },
    },
    BurningBlood: {
        OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.BurningBlood.onVictory, newCallback);
        }
    },
    BlackBlood: {
        OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.BlackBlood.onVictory, newCallback);
        }
    },
    Ginger: {
        Ctor(): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.Ginger.Ctor)(PatchManager.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.Ginger.Ctor, newCtor);
        }
    },
    SacredBark: {
        Ctor(): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.SacredBark.Ctor)(PatchManager.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.SacredBark.Ctor, newCtor);
        },
    },
    CoffeeDripper: {
        Ctor(): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor)(PatchManager.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor, newCtor);
        },
    },
    MarkofPain: {
        OverrideatBattleStart(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.MarkofPain.atBattleStart, newCallback);
        },
    },
    RunicPyramid: {
        Ctor(): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.RunicPyramid.Ctor)(PatchManager.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.RunicPyramid.Ctor, newCtor);
        },
    },
};