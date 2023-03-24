import { LandingSound, RelicTier } from "../enums.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";
import { NativeSTSLib } from "./NativeSTSLib.js";

export const NativeRelics = {
    AbstractRelic: {
        Ctor(relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound): NativePointer {
            let nativeRelicId = NativeSTSLib.JString.Ctor(relicId);
            let nativeImgUrl = NativeSTSLib.JString.Ctor(imgName);
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Relics.AbstractRelic.Ctor)(PatchHelper.nullptr, nativeRelicId, nativeImgUrl, Number(tier), Number(sfx));
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer, relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer):
            (relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Relics.AbstractRelic.Ctor, newCtor);
        },
    },
    BurningBlood: {
        OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Relics.BurningBlood.onVictory, newCallback);
        }
    },
    BlackBlood: {
        OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Relics.BlackBlood.onVictory, newCallback);
        }
    },
    Ginger: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Relics.Ginger.Ctor)(PatchHelper.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Relics.Ginger.Ctor, newCtor);
        }
    },
    SacredBark: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Relics.SacredBark.Ctor)(PatchHelper.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Relics.SacredBark.Ctor, newCtor);
        },
    },
    CoffeeDripper: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor)(PatchHelper.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor, newCtor);
        },
    },
    MarkofPain: {
        OverrideatBattleStart(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Relics.MarkofPain.atBattleStart, newCallback);
        },
    },
    RunicPyramid: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Relics.RunicPyramid.Ctor)(PatchHelper.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Relics.RunicPyramid.Ctor, newCtor);
        },
    },
};