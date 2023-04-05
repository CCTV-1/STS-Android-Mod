import { CardType } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DiscoveryAction = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Discovery.Ctor)(NULL);
    },
    Ctor2(colorless: boolean, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Discovery.Ctor2)(NULL, Number(colorless), amount);
    },
    Ctor3(type: CardType, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Discovery.Ctor3)(NULL, Number(type), amount);
    },
};