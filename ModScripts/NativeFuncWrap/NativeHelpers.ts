import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativeHelpers = {
    CardLibrary: {
        initialize() {
            PatchHelper.GetNativeFunction(NativeFunctionInfoMap.CardLibrary.initialize)(PatchHelper.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.CardLibrary.initialize, newIniter);
        },
        Add(cardPtr: NativePointer): void {
            PatchHelper.GetNativeFunction(NativeFunctionInfoMap.CardLibrary.Add)(cardPtr);
        },
        OverrideAdd(newFunc: (cardPtr: NativePointer) => void): (cardPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.CardLibrary.Add, newFunc);
        }
    },
    RelicLibrary: {
        initialize() {
            PatchHelper.GetNativeFunction(NativeFunctionInfoMap.RelicLibrary.initialize)(PatchHelper.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.RelicLibrary.initialize, newIniter);
        },
        Add(relicPtr: NativePointer): void {
            PatchHelper.GetNativeFunction(NativeFunctionInfoMap.RelicLibrary.Add)(relicPtr);
        },
        OverrideAdd(newFunc: (relicPtr: NativePointer) => void): (relicPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.RelicLibrary.Add, newFunc);
        }
    },
}
