import { GDXColor } from "./graphics/GDXColor.js";
import { GDXG2D } from "./graphics/GDXG2D.js";
import { GDXGlutils } from "./graphics/GDXGlutils.js";
import { GDXPixmap } from "./graphics/GDXPixmap.js";
import { GDXTexture } from "./graphics/GDXTexture.js";

export const NativeGDXGraphics = {
    Color: GDXColor,
    G2D: GDXG2D,
    Glutils: GDXGlutils,
    Pixmap: GDXPixmap,
    Texture: GDXTexture,
};