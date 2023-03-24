import { PatchManager } from "../PatchManager.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativeCharacters = {
    AbstractPlayer: {
        loseGold(thisPtr: NativePointer, gold: number): void {
            PatchManager.GetNativeFunction(NativeFunctionInfoMap.Characters.AbstractPlayer.loseGold)(thisPtr, gold);
        },
        OverridloseGold(newFunc: (thisPtr: NativePointer, gold: number) => void): (thisPtr: NativePointer, gold: number) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Characters.AbstractPlayer.loseGold, newFunc);
        },
        gainGold(thisPtr: NativePointer, gold: number): void {
            PatchManager.GetNativeFunction(NativeFunctionInfoMap.Characters.AbstractPlayer.gainGold)(thisPtr, gold);
        },
        OverridgainGold(newFunc: (thisPtr: NativePointer, gold: number) => void): (thisPtr: NativePointer, gold: number) => void {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Characters.AbstractPlayer.gainGold, newFunc);
        },
    },
    Ironclad: {
        getStartingDeck(thisPtr: NativePointer): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Characters.Ironclad.getStartingDeck)(thisPtr);
        },
        OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Characters.Ironclad.getStartingDeck, newFunc);
        },
    },
    TheSilent: {
        getStartingDeck(thisPtr: NativePointer): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Characters.TheSilent.getStartingDeck)(thisPtr);
        },
        OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Characters.TheSilent.getStartingDeck, newFunc);
        },
    },
    Defect: {
        getStartingDeck(thisPtr: NativePointer): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Characters.Defect.getStartingDeck)(thisPtr);
        },
        OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Characters.Defect.getStartingDeck, newFunc);
        },
    },
    Watcher: {
        getStartingDeck(thisPtr: NativePointer): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Characters.Watcher.getStartingDeck)(thisPtr);
        },
        OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Characters.Watcher.getStartingDeck, newFunc);
        },
    },
};