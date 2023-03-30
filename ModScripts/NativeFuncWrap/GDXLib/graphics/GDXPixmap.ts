import { GDXPixMapFormat } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeGDXLibInfo } from "../NativeGDXLibInfo.js";

export const GDXPixmap = {
    Ctor(GDXFileHandle: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.PixMap.Ctor)(PatchHelper.nullptr, GDXFileHandle);
    },
    Ctor2(width: number, height: number, format: GDXPixMapFormat): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.PixMap.Ctor2)(PatchHelper.nullptr, width, height, Number(format));
    },
};