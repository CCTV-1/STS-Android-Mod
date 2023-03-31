import { PatchHelper } from "../../../../PatchHelper.js";
import { NativeGDXLibInfo } from "../../NativeGDXLibInfo.js";

export const GDX2DPixmap = {
    Ctor(encodedData: NativePointer, offset: number, len: number, requestedFormat: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.G2DPixmap.Ctor)(PatchHelper.nullptr, encodedData, offset, len, requestedFormat);
    },
    Ctor2(width: number, height: number, format: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.G2DPixmap.Ctor2)(PatchHelper.nullptr, width, height, format);
    },
    dispose(thisPtr: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.G2DPixmap.dispose)(thisPtr)
    }
};