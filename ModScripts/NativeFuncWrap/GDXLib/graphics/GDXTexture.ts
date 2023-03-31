import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeGDXLibInfo } from "../NativeGDXLibInfo.js";

export const GDXTexture = {
    Ctor(internalPath: string): NativePointer {
        let nativePath = NativeSTDLib.JString.Ctor(internalPath);
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Texture.Ctor)(PatchHelper.nullptr, nativePath);
    },
    /**
     * because GDX::Files::FileHandle::readBytes modified by game dev,this ctor olny work in internal file(for apk/obb)
     */
    Ctor2(gdkFilehandle: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Texture.Ctor2)(PatchHelper.nullptr, gdkFilehandle);
    },
    /**
     * because GDX::Files::FileHandle::readBytes modified by game dev,this ctor olny work in internal file(for apk/obb)
     */
    Ctor3(gdkFilehandle: NativePointer, useMipMaps: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Texture.Ctor3)(PatchHelper.nullptr, gdkFilehandle, Number(useMipMaps));
    },
    /**
     * because GDX::Files::FileHandle::readBytes modified by game dev,this ctor olny work in internal file(for apk/obb)
     * 
     * formatPtr see GDX::graphics::Pixmap::getFormatObjPtr
     */
    Ctor4(gdkFilehandle: NativePointer, formatPtr: NativePointer, useMipMaps: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Texture.Ctor4)(PatchHelper.nullptr, gdkFilehandle, formatPtr, Number(useMipMaps));
    },
    Ctor5(TextureDataPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Texture.Ctor5)(PatchHelper.nullptr, TextureDataPtr);
    },
};