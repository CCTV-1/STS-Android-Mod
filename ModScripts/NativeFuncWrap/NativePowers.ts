import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativePowers = {
    Confusion: {
        OverrideonCardDraw(newCallback: (thisPtr: NativePointer, cardPtr: NativePointer) => void): (thisPtr: NativePointer, cardPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Powers.ConfusionPower.onCardDraw, newCallback);
        }
    },
    DemonForm: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Powers.DemonFormPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
    IntangiblePlayer: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Powers.IntangiblePlayerPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
    Echo: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Powers.EchoPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
    Deva: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Powers.DevaPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
    FreeAttack: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Powers.FreeAttackPower.Ctor)(PatchHelper.nullptr, owner, strengthAmount);
        }
    },
};