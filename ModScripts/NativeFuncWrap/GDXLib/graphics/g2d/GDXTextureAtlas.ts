import { PatchHelper } from "../../../../PatchHelper.js";
import { NativeSTDLib } from "../../../NativeSTDLib.js";
import { NativeGDXLibInfo } from "../../NativeGDXLibInfo.js";

export const GDXTextureAtlas = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.TextureAtlas.Ctor)(PatchHelper.nullptr);
    },
    /** GDX::Files::FileHandle */
    Ctor2(packFile: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.TextureAtlas.Ctor2)(PatchHelper.nullptr, packFile);
    },
    /** GDX::Files::FileHandle, GDX::Files::FileHandle */
    Ctor3(packFile: NativePointer, imagesDir: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.TextureAtlas.Ctor3)(PatchHelper.nullptr, packFile, imagesDir);
    },
    /** GDX::Files::FileHandle, GDX::Files::FileHandle */
    Ctor4(packFile: NativePointer, imagesDir: NativePointer, flip: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.TextureAtlas.Ctor4)(PatchHelper.nullptr, packFile, imagesDir, Number(flip));
    },
    /** return TextureAtlas::AtlasRegion* */
    findRegion(thisPtr: NativePointer, name: string) {
        let nativeName = NativeSTDLib.JString.Ctor(name);
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.TextureAtlas.findRegion)(thisPtr, nativeName);
    },
}