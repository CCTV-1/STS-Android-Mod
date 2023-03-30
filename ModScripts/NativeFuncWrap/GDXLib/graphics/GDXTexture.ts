import { GDXPixMapFormat } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeGDXLibInfo } from "../NativeGDXLibInfo.js";

export const GDXTexture = {
    Ctor(internalPath: string): NativePointer {
        let nativePath = NativeSTDLib.JString.Ctor(internalPath);
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Texture.Ctor)(PatchHelper.nullptr, nativePath);
    },
    Ctor2(gdkFilehandle: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Texture.Ctor2)(PatchHelper.nullptr, gdkFilehandle);
    },
    Ctor3(gdkFilehandle: NativePointer, useMipMaps: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Texture.Ctor3)(PatchHelper.nullptr, gdkFilehandle, Number(useMipMaps));
    },
    Ctor4(gdkFilehandle: NativePointer, format: GDXPixMapFormat, useMipMaps: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.Texture.Ctor4)(PatchHelper.nullptr, gdkFilehandle, Number(format), Number(useMipMaps));
    },
};