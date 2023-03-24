import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const Characters = {
    AbstractPlayer: {
        /**
         * ```c
         * void AbstractPlayer::loseGold(STS::AbstractPlayer * player, int gold)
         * ```
         */
        loseGold: new NativeFunctionInfo(0x1756c69, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractPlayer::gainGold(STS::AbstractPlayer * player, int gold)
         * ```
         */
        gainGold: new NativeFunctionInfo(0x1756FE5, 'void', ['pointer', 'int32']),
    },
    Ironclad: {
        /**
         * ```c
         * ArrayList* Ironclad::getStartingDeck(STS::Ironclad* thisPtr)
         * ```
         */
        getStartingDeck: new NativeFunctionInfo(0x1777921, 'pointer', ['pointer']),
    },
    TheSilent: {
        /**
         * ```c
         * ArrayList* TheSilent::getStartingDeck(STS::TheSilent* thisPtr)
         * ```
         */
        getStartingDeck: new NativeFunctionInfo(0x1778D71, 'pointer', ['pointer']),
    },
    Defect: {
        /**
         * ```c
         * ArrayList* Defect::getStartingDeck(STS::Defect* thisPtr)
         * ```
         */
        getStartingDeck: new NativeFunctionInfo(0x1776289, 'pointer', ['pointer']),
    },
    Watcher: {
        /**
         * ```c
         * ArrayList* Watcher::getStartingDeck(STS::Watcher* thisPtr)
         * ```
         */
        getStartingDeck: new NativeFunctionInfo(0x177A7DD, 'pointer', ['pointer']),
    },
};

export const NativeCharacters = {
    AbstractPlayer: {
        loseGold(thisPtr: NativePointer, gold: number): void {
            PatchHelper.GetNativeFunction(Characters.AbstractPlayer.loseGold)(thisPtr, gold);
        },
        OverridloseGold(newFunc: (thisPtr: NativePointer, gold: number) => void): (thisPtr: NativePointer, gold: number) => void {
            return PatchHelper.HookSTSFunction(Characters.AbstractPlayer.loseGold, newFunc);
        },
        gainGold(thisPtr: NativePointer, gold: number): void {
            PatchHelper.GetNativeFunction(Characters.AbstractPlayer.gainGold)(thisPtr, gold);
        },
        OverridgainGold(newFunc: (thisPtr: NativePointer, gold: number) => void): (thisPtr: NativePointer, gold: number) => void {
            return PatchHelper.HookSTSFunction(Characters.AbstractPlayer.gainGold, newFunc);
        },
    },
    Ironclad: {
        getStartingDeck(thisPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(Characters.Ironclad.getStartingDeck)(thisPtr);
        },
        OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Characters.Ironclad.getStartingDeck, newFunc);
        },
    },
    TheSilent: {
        getStartingDeck(thisPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(Characters.TheSilent.getStartingDeck)(thisPtr);
        },
        OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Characters.TheSilent.getStartingDeck, newFunc);
        },
    },
    Defect: {
        getStartingDeck(thisPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(Characters.Defect.getStartingDeck)(thisPtr);
        },
        OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Characters.Defect.getStartingDeck, newFunc);
        },
    },
    Watcher: {
        getStartingDeck(thisPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(Characters.Watcher.getStartingDeck)(thisPtr);
        },
        OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Characters.Watcher.getStartingDeck, newFunc);
        },
    },
};