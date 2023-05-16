import { PatchHelper } from "../../../../PatchHelper.js";
import { NativeGDXLibInfo } from "../../NativeGDXLibInfo.js";

export const GDX2DSpriteBatch = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.Ctor)(NULL);
    },
    Ctor2(size: number, defaultShader: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.Ctor2)(NULL, size, defaultShader);
    },
    begin(thisPtr: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.begin)(thisPtr);
    },
    end(thisPtr: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.end)(thisPtr);
    },
    setColor(thisPtr: NativePointer, r: number, g: number, b: number, a: number) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.setColor)(thisPtr, r, g, b, a);
    },
    setColor2(thisPtr: NativePointer, colorPtr: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.setColor2)(thisPtr, colorPtr);
    },
    getColor(thisPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.getColor)(thisPtr);
    },
    draw(thisPtr: NativePointer, texturePtr: NativePointer, spriteVertices: NativePointer, offset: number, count: number) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.draw)(thisPtr, texturePtr, spriteVertices, offset, count);
    },
    draw2(thisPtr: NativePointer, texturePtr: NativePointer, x: number, y: number, width: number, height: number) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.draw2)(thisPtr, texturePtr, x, y, width, height);
    },
    draw3(thisPtr: NativePointer, texturePtr: NativePointer, x: number, y: number, originX: number, originY: number, width: number, height: number,
        scaleX: number, scaleY: number, rotation: number, srcX: number, srcY: number, srcWidth: number, srcHeight: number, flipX: boolean, flipY: boolean) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.draw3)(thisPtr, texturePtr, x, y, originX, originY, width, height, scaleX,
            scaleY, rotation, srcX, srcY, srcWidth, srcHeight, Number(flipX), Number(flipY));
    },
    draw4(thisPtr: NativePointer, texturePtr: NativePointer, x: number, y: number, width: number, height: number, srcX: number, srcY: number, srcWidth: number, srcHeight: number, flipX: boolean, flipY: boolean) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.draw4)(thisPtr, texturePtr, x, y, width, height, srcX, srcY, srcWidth, srcHeight,
            Number(flipX), Number(flipY));
    },
    draw5(thisPtr: NativePointer, regionPtr: NativePointer, x: number, y: number, width: number, height: number) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.draw5)(thisPtr, regionPtr, x, y, width, height);
    },
    draw6(thisPtr: NativePointer, regionPtr: NativePointer, x: number, y: number, originX: number, originY: number, width: number, height: number,
        scaleX: number, scaleY: number, rotation: number) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.draw6)(thisPtr, regionPtr, x, y, originX, originY, width, height, scaleX,
            scaleY, rotation);
    },
    flush(thisPtr: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.flush)(thisPtr);
    },
    setBlendFunction(thisPtr: NativePointer, srcFunc: number, dstFunc: number) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.setBlendFunction)(thisPtr, srcFunc, dstFunc);
    },
    dispose(thisPtr: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.dispose)(thisPtr);
    },
    setProjectionMatrix(thisPtr: NativePointer, projection: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.setProjectionMatrix)(thisPtr, projection);
    },
    setTransformMatrix(thisPtr: NativePointer, transform: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.setTransformMatrix)(thisPtr, transform);
    },
    setupMatrices(thisPtr: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.setupMatrices)(thisPtr);
    },
    switchTexture(thisPtr: NativePointer, texture: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.switchTexture)(thisPtr, texture);
    },
    setShader(thisPtr: NativePointer, shader: NativePointer) {
        PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.setShader)(thisPtr, shader);
    },
    isBlendingEnabled(thisPtr: NativePointer): boolean {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.G2D.SpriteBatch.isBlendingEnabled)(thisPtr);
    },
};
