import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const Orbs = {
    AbstractOrb: {
        /**
         * ```c
         * static AbstractOrb* AbstractOrb::Ctor(AbstractOrb* thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x193CDD1, 'pointer', ['pointer']),
        /**
         * ```c
         * static AbstractOrb* AbstractOrb::getRandomOrb(bool useCardRng)
         * ```
         */
        getRandomOrb: new NativeFunctionInfo(0x193C239, 'pointer', ['bool']),
        /**
         * ```c
         * static int32_t AbstractOrb::applyLockOn(AbstractCreature* target, int32 dmg)
         * ```
         */
        applyLockOn: new NativeFunctionInfo(0x193C4E1, 'int32', ['pointer', 'int32']),
    },
    Dark: {
        /**
         * ```c
         * static AbstractOrb* Dark::Ctor(AbstractOrb* thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x193CFF5, 'pointer', ['pointer']),
    },
    Frost: {
        /**
         * ```c
         * static AbstractOrb* Frost::Ctor(AbstractOrb* thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x193E8B1, 'pointer', ['pointer']),
    },
    Lightning: {
        /**
         * ```c
         * static AbstractOrb* Lightning::Ctor(AbstractOrb* thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x193F741, 'pointer', ['pointer']),
    },
    Plasma: {
        /**
         * ```c
         * static AbstractOrb* Plasma::Ctor(AbstractOrb* thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x19407F1, 'pointer', ['pointer']),
    }
};

export const NativeOrbs = {
    AbstractOrb: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Orbs.AbstractOrb.Ctor)(NULL);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Orbs.AbstractOrb.Ctor, newCtor);
        },

        getRandomOrb(useCardRng: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(Orbs.AbstractOrb.getRandomOrb)(NULL, Number(useCardRng));
        },
        OverridegetRandomOrb(newImp: (thisPtr: NativePointer, useCardRng: boolean) => NativePointer): (thisPtr: NativePointer, useCardRng: boolean) => NativePointer {
            return PatchHelper.HookSTSFunction(Orbs.AbstractOrb.getRandomOrb, newImp);
        },

        applyLockOn(dmg: number): number {
            return PatchHelper.GetNativeFunction(Orbs.AbstractOrb.applyLockOn)(NULL, dmg);
        },
        OverrideapplyLockOn(newImp: (thisPtr: NativePointer, dmg: number) => number): (thisPtr: NativePointer, dmg: number) => number {
            return PatchHelper.HookSTSFunction(Orbs.AbstractOrb.applyLockOn, newImp);
        },
    },
    Dark: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Orbs.Dark.Ctor)(NULL);
        },
    },
    Frost: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Orbs.Frost.Ctor)(NULL);
        },
    },
    Lightning: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Orbs.Lightning.Ctor)(NULL);
        },
    },
    Plasma: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Orbs.Plasma.Ctor)(NULL);
        },
    }
};