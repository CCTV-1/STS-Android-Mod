import { PatchHelper } from "../../../../PatchHelper.js";
import { NativeGDXLibInfo } from "../../NativeGDXLibInfo.js";

export const GDXTextureRegion = {
    Ctor(texturePtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.TextureRegion.Ctor)(NULL, texturePtr);
    },
    Ctor2(texturePtr: NativePointer, x: number, y: number, width: number, height: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.TextureRegion.Ctor2)(NULL, texturePtr, x, y, width, height);
    },
    setRegion(thisPtr: NativePointer, u: number, v: number, u2: number, v2: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.TextureRegion.setRegion)(thisPtr, u, v, u2, v2);
    },
    setRegion2(thisPtr: NativePointer, x: number, y: number, width: number, height: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.TextureRegion.setRegion2)(thisPtr, x, y, width, height);
    },
};