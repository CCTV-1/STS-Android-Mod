import { PatchHelper } from "../../../../PatchHelper.js";
import { NativeGDXLibInfo } from "../../NativeGDXLibInfo.js";

export const GDXPixmapTextureData = {
    /** formatPtr see GDX::graphics::Pixmap::getFormatObjPtr */
    Ctor(pixmapPtr: NativePointer, formatPtr: NativePointer, useMipMaps: boolean, disposePixmap: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Glutils.PixmapTextureData.Ctor)(NULL, pixmapPtr, formatPtr, Number(useMipMaps),
            Number(disposePixmap));
    },
    /** formatPtr see GDX::graphics::Pixmap::getFormatObjPtr */
    Ctor2(pixmapPtr: NativePointer, formatPtr: NativePointer, useMipMaps: boolean): NativePointer {
        return GDXPixmapTextureData.Ctor(pixmapPtr, formatPtr, useMipMaps, false);
    },
};