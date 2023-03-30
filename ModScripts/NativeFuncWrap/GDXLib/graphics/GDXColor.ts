import { PatchHelper } from "../../../PatchHelper.js";
import { NativeGDXLibInfo } from "../NativeGDXLibInfo.js";

export const GDXColor = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Color.Ctor)(PatchHelper.nullptr);
    },
    Ctor2(sourceColor: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Color.Ctor2)(PatchHelper.nullptr, sourceColor);
    },
    Ctor3(r: number, g: number, b: number, a: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Color.Ctor3)(PatchHelper.nullptr, r, g, b, a);
    },
    /** 4 times uint8_t([0,255]) => uint32_t */
    Ctor4(rgba: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Color.Ctor4)(PatchHelper.nullptr, rgba);
    },
};