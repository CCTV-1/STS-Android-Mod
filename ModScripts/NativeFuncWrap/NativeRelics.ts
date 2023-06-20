import { LandingSound, RelicTier } from "../enums.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { NativeSTDLib } from "./NativeSTDLib.js";

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
        /**
         * ```c
         * void Relics::SacredBark::onEquip(STS::AbstractRelic *)
         * ```
         */
        onEquip: new NativeFunctionInfo(0x19A68A5, 'void', ['pointer']),
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
            let nativeRelicId = NativeSTDLib.JString.Ctor(relicId);
            let nativeImgUrl = NativeSTDLib.JString.Ctor(imgName);
            return PatchHelper.GetNativeFunction(Relics.AbstractRelic.Ctor)(NULL, nativeRelicId, nativeImgUrl, Number(tier), Number(sfx));
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer, relicId: NativePointer, imgName: NativePointer, tier: Number, sfx: Number) => NativePointer):
            (thisPtr: NativePointer, relicId: NativePointer, imgName: NativePointer, tier: Number, sfx: Number) => NativePointer {
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
            return PatchHelper.GetNativeFunction(Relics.Ginger.Ctor)(NULL);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Relics.Ginger.Ctor, newCtor);
        }
    },
    SacredBark: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Relics.SacredBark.Ctor)(NULL);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Relics.SacredBark.Ctor, newCtor);
        },

        OverrideonEquip(newImp: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(Relics.SacredBark.onEquip, newImp);
        },
    },
    CoffeeDripper: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Relics.CoffeeDripper.Ctor)(NULL);
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
            return PatchHelper.GetNativeFunction(Relics.RunicPyramid.Ctor)(NULL);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Relics.RunicPyramid.Ctor, newCtor);
        },
    },
};