import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const CardLibrary = {
    /**
     * ```c
     * void initialize(STS::CardLibrary* this)
     * ```
     */
    initialize: new NativeFunctionInfo(0x1830B15, 'void', ['pointer']),
    /**
     * ```c
     * void Add(STS::CardLibrary* this, STS::AbstractCard* cardPtr)
     * ```
     */
    Add: new NativeFunctionInfo(0x1832405, 'void', ['pointer']),
};
const RelicLibrary = {
    /**
     * ```c
     * void initialize(STS::RelicLibrary* this)
     * ```
     */
    initialize: new NativeFunctionInfo(0x1884C71, 'void', ['pointer']),
    /**
     * ```c
     * void Add(STS::RelicLibrary* this, STS::AbstractRelic* relicPtr)
     * ```
     */
    Add: new NativeFunctionInfo(0x18854C9, 'void', ['pointer']),
};

export const NativeHelpers = {
    CardLibrary: {
        initialize() {
            PatchHelper.GetNativeFunction(CardLibrary.initialize)(PatchHelper.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(CardLibrary.initialize, newIniter);
        },
        Add(cardPtr: NativePointer): void {
            PatchHelper.GetNativeFunction(CardLibrary.Add)(cardPtr);
        },
        OverrideAdd(newFunc: (cardPtr: NativePointer) => void): (cardPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(CardLibrary.Add, newFunc);
        }
    },
    RelicLibrary: {
        initialize() {
            PatchHelper.GetNativeFunction(RelicLibrary.initialize)(PatchHelper.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(RelicLibrary.initialize, newIniter);
        },
        Add(relicPtr: NativePointer): void {
            PatchHelper.GetNativeFunction(RelicLibrary.Add)(relicPtr);
        },
        OverrideAdd(newFunc: (relicPtr: NativePointer) => void): (relicPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(RelicLibrary.Add, newFunc);
        }
    },
}
