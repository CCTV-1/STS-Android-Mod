import { LandingSound, RelicTier } from "../enums.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { NativeSTSLib } from "./NativeSTSLib.js";

const Relics = {
    AbstractRelic: {
        /**
         * ```c
         * sts::AbstractRelic* Relics::AbstractRelic::Ctor(STS::AbstractRelic * thisPtr, STS::JString* relicId, STS::JString* imgName, RelicTier tier, LandingSound sfx)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x19841AD, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'uint32']),
    },
    BurningBlood: {
        /**
         * ```c
         * void Relics::BurningBlood::onVictory(STS::AbstractRelic * thisPtr)
         * ```
         */
        onVictory: new NativeFunctionInfo(0x198F901, 'void', ['pointer'])
    },
    BlackBlood: {
        /**
         * ```c
         * void Relics::BlackBlood::onVictory(STS::AbstractRelic * thisPtr)
         * ```
         */
        onVictory: new NativeFunctionInfo(0x198BF31, 'void', ['pointer'])
    },
    Ginger: {
        /**
         * ```c
         * STS::AbstractRelic * Relics::Ginger::Ctor(STS::AbstractRelic *)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1998921, 'pointer', ['pointer']),
    },
    SacredBark: {
        /**
         * ```c
         * STS::AbstractRelic * Relics::SacredBark::Ctor(STS::AbstractRelic *)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x19A67A5, 'pointer', ['pointer']),
    },
    CoffeeDripper: {
        /**
         * ```c
         * STS::AbstractRelic * Relics::CoffeeDripper::Ctor(STS::AbstractRelic *)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1992629, 'pointer', ['pointer']),
    },
    MarkofPain: {
        /**
         * ```c
         * void Relics::MarkofPain::atBattleStart(STS::AbstractRelic *)
         * ```
         */
        atBattleStart: new NativeFunctionInfo(0x199C255, 'void', ['pointer']),
    },
    RunicPyramid: {
        /**
         * ```c
         * STS::AbstractRelic * Relics::RunicPyramid::Ctor(STS::AbstractRelic *)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x19A6681, 'pointer', ['pointer']),
    },
};

export const NativeRelics = {
    AbstractRelic: {
        Ctor(relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound): NativePointer {
            let nativeRelicId = NativeSTSLib.JString.Ctor(relicId);
            let nativeImgUrl = NativeSTSLib.JString.Ctor(imgName);
            return PatchHelper.GetNativeFunction(Relics.AbstractRelic.Ctor)(PatchHelper.nullptr, nativeRelicId, nativeImgUrl, Number(tier), Number(sfx));
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer, relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer):
            (relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer {
            return PatchHelper.HookSTSFunction(Relics.AbstractRelic.Ctor, newCtor);
        },
    },
    BurningBlood: {
        OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(Relics.BurningBlood.onVictory, newCallback);
        }
    },
    BlackBlood: {
        OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(Relics.BlackBlood.onVictory, newCallback);
        }
    },
    Ginger: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Relics.Ginger.Ctor)(PatchHelper.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Relics.Ginger.Ctor, newCtor);
        }
    },
    SacredBark: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Relics.SacredBark.Ctor)(PatchHelper.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Relics.SacredBark.Ctor, newCtor);
        },
    },
    CoffeeDripper: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Relics.CoffeeDripper.Ctor)(PatchHelper.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Relics.CoffeeDripper.Ctor, newCtor);
        },
    },
    MarkofPain: {
        OverrideatBattleStart(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(Relics.MarkofPain.atBattleStart, newCallback);
        },
    },
    RunicPyramid: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Relics.RunicPyramid.Ctor)(PatchHelper.nullptr);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Relics.RunicPyramid.Ctor, newCtor);
        },
    },
};