import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const Powers = {
    ConfusionPower: {
        /**
         * ```c
         * void ConfusionPower::onCardDraw(STS::AbstractPower * thisPtr, STS::AbstractCard * card)
         * ```
         */
        onCardDraw: new NativeFunctionInfo(0x195C54D, 'void', ['pointer', 'pointer'])
    },
    DemonFormPower: {
        /**
         * ```c
         * STS::AbstractPower* Powers::DemonFormPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x195EBB1, 'pointer', ['pointer', 'pointer', 'int32'])
    },
    IntangiblePlayerPower: {
        /**
         * ```c
         * STS::AbstractPower* Powers::IntangiblePlayerPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x19693B9, 'pointer', ['pointer', 'pointer', 'int32'])
    },
    EchoPower: {
        /**
         * ```c
         * STS::AbstractPower* Powers::EchoPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1961C21, 'pointer', ['pointer', 'pointer', 'int32'])
    },
    DevaPower: {
        /**
         * ```c
         * STS::AbstractPower* Powers::DevaPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x197CC09, 'pointer', ['pointer', 'pointer', 'int32'])
    },
    FreeAttackPower: {
        /**
         * ```c
         * STS::AbstractPower* Powers::FreeAttackPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x197E9B1, 'pointer', ['pointer', 'pointer', 'int32'])
    }
};

export const NativePowers = {
    Confusion: {
        OverrideonCardDraw(newCallback: (thisPtr: NativePointer, cardPtr: NativePointer) => void): (thisPtr: NativePointer, cardPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(Powers.ConfusionPower.onCardDraw, newCallback);
        }
    },
    DemonForm: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(Powers.DemonFormPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
    IntangiblePlayer: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(Powers.IntangiblePlayerPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
    Echo: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(Powers.EchoPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
    Deva: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(Powers.DevaPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
    FreeAttack: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(Powers.FreeAttackPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
};