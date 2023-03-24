import { PatchManager } from "../PatchManager.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativePowers = {
    Confusion: {
        OverrideonCardDraw(newCallback: (thisPtr: NativePointer, cardPtr: NativePointer) => void): (thisPtr: NativePointer, cardPtr: NativePointer) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Powers.ConfusionPower.onCardDraw, newCallback);
        }
    },
    DemonForm: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Powers.DemonFormPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
        }
    },
    IntangiblePlayer: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Powers.IntangiblePlayerPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
        }
    },
    Echo: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Powers.EchoPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
        }
    },
    Deva: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Powers.DevaPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
        }
    },
    FreeAttack: {
        Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Powers.FreeAttackPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
        }
    },
};