import { PatchManager } from "../PatchManager.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativeHelpers = {
    CardLibrary: {
        initialize() {
            PatchManager.GetNativeFunction(NativeFunctionInfoMap.CardLibrary.initialize)(PatchManager.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.CardLibrary.initialize, newIniter);
        },
        Add(cardPtr: NativePointer): void {
            PatchManager.GetNativeFunction(NativeFunctionInfoMap.CardLibrary.Add)(cardPtr);
        },
        OverrideAdd(newFunc: (cardPtr: NativePointer) => void): (cardPtr: NativePointer) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.CardLibrary.Add, newFunc);
        }
    },
    RelicLibrary: {
        initialize() {
            PatchManager.GetNativeFunction(NativeFunctionInfoMap.RelicLibrary.initialize)(PatchManager.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.RelicLibrary.initialize, newIniter);
        },
        Add(relicPtr: NativePointer): void {
            PatchManager.GetNativeFunction(NativeFunctionInfoMap.RelicLibrary.Add)(relicPtr);
        },
        OverrideAdd(newFunc: (relicPtr: NativePointer) => void): (relicPtr: NativePointer) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.RelicLibrary.Add, newFunc);
        }
    },
}
