import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const ScreenFuncsInfo = {
    PotionViewScreen: {
        /**
         * ```c
         * sts::PotionViewScreen* Screens::PotionViewScreen::Ctor(STS::PotionViewScreen * thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x19F45BD, 'pointer', ['pointer']),
        /**
         * ```c
         * void* Screens::PotionViewScreen::open(STS::PotionViewScreen * thisPtr)
         * ```
         */
        open: new NativeFunctionInfo(0x19F46FD, 'void', ['pointer']),
    },
}

export const NativeScreens = {
    PotionViewScreen: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(ScreenFuncsInfo.PotionViewScreen.Ctor)(NULL);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(ScreenFuncsInfo.PotionViewScreen.Ctor, newCtor);
        },

        Overrideopen(newImp: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(ScreenFuncsInfo.PotionViewScreen.open, newImp);
        },
    },
};