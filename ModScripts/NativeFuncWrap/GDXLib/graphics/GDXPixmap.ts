import { GDXPixMapFormat } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeGDXLibInfo } from "../NativeGDXLibInfo.js";

export const GDXPixmap = {
    /**
     * because GDX::Files::FileHandle::readBytes modified by game dev,this ctor olny work in internal file(for apk/obb)
     */
    Ctor(GDXFileHandle: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.PixMap.Ctor)(PatchHelper.nullptr, GDXFileHandle);
    },
    /** see getFormatObjPtr function */
    Ctor2(width: number, height: number, formatObject: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.graphics.PixMap.Ctor2)(PatchHelper.nullptr, width, height, formatObject);
    },
    getFormatObjPtr(format: GDXPixMapFormat): NativePointer {
        switch(format) {
            default:
            case GDXPixMapFormat.Alpha: {
                return PatchHelper.STSModuleBaseAddress.add(0x3495CF0);
            }
            case GDXPixMapFormat.Intensity: {
                return PatchHelper.STSModuleBaseAddress.add(0x3495CF4);
            }
            case GDXPixMapFormat.LuminanceAlpha: {
                return PatchHelper.STSModuleBaseAddress.add(0x3495CF8);
            }
            case GDXPixMapFormat.RGB565: {
                return PatchHelper.STSModuleBaseAddress.add(0x3495CFC);
            }
            case GDXPixMapFormat.RGB888: {
                return PatchHelper.STSModuleBaseAddress.add(0x3495D00);
            }
            case GDXPixMapFormat.RGBA4444: {
                return PatchHelper.STSModuleBaseAddress.add(0x3495D04);
            }
            case GDXPixMapFormat.RGBA8888: {
                return PatchHelper.STSModuleBaseAddress.add(0x3495D08);
            }
        }
    },
};