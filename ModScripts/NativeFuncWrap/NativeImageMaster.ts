import { JString } from "../NativeClassWrap/JString.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { NativeSTDLib } from "./NativeSTDLib.js";

const ImageMasterFuncInfo = {
    /**
     * ```c
     * static AbstractOrb* ImageMaster::loadRelicImg(JString* id, JString* imgUrl)
     * ```
     */
    loadRelicImg: new NativeFunctionInfo(0x186CFF1, 'void', ['pointer', 'pointer']),
    /**
     * ```c
     * static GDX::Graphics::Texture* ImageMaster::getRelicImg(JString* id)
     * ```
     */
    getRelicImg: new NativeFunctionInfo(0x186DB21, 'pointer', ['pointer']),
    /**
     * ```c
     * static GDX::Graphics::Texture* ImageMaster::getRelicOutlineImg(JString* id)
     * ```
     */
    getRelicOutlineImg: new NativeFunctionInfo(0x186DEDD, 'pointer', ['pointer']),
    /**
     * ```c
     * static GDX::Graphics::Texture* ImageMaster::loadImage(JString* imgUrl)
     * ```
     */
    loadImage: new NativeFunctionInfo(0x186CD79, 'pointer', ['pointer']),
    /**
     * ```c
     * static GDX::Graphics::Texture* ImageMaster::loadImage(JString* imgUrl, bool linearFiltering)
     * ```
     */
    loadImage2: new NativeFunctionInfo(0x186CED5, 'pointer', ['pointer', 'bool']),
};

export const NativeImageMaster = {
    loadRelicImg(relicId: string, relicImgUrl: string): NativePointer {
        let nativeId = NativeSTDLib.JString.Ctor(relicId);
        let nativeUrl = NativeSTDLib.JString.Ctor(relicImgUrl);
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.loadRelicImg)(nativeId, nativeUrl);
    },
    loadRelicImg2(relicId: JString, relicImgUrl: JString): NativePointer {
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.loadRelicImg)(relicId.rawPtr, relicImgUrl.rawPtr);
    },

    getRelicImg(relicId: string): NativePointer {
        let nativeId = NativeSTDLib.JString.Ctor(relicId);
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.getRelicImg)(nativeId);
    },
    getRelicImg2(relicId: JString): NativePointer {
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.getRelicImg)(relicId.rawPtr);
    },

    getRelicOutlineImg(relicId: string): NativePointer {
        let nativeId = NativeSTDLib.JString.Ctor(relicId);
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.getRelicOutlineImg)(nativeId);
    },
    getRelicOutlineImg2(relicId: JString): NativePointer {
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.getRelicOutlineImg)(relicId.rawPtr);
    },

    loadImage(relicImgUrl: string): NativePointer {
        let nativeUrl = NativeSTDLib.JString.Ctor(relicImgUrl);
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.loadImage)(nativeUrl);
    },
    loadImage2(relicImgUrl: JString): NativePointer {
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.loadImage)(relicImgUrl.rawPtr);
    },

    loadImage3(relicImgUrl: string, linearFiltering: boolean): NativePointer {
        let nativeUrl = NativeSTDLib.JString.Ctor(relicImgUrl);
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.loadImage2)(nativeUrl, Number(linearFiltering));
    },
    loadImage4(relicImgUrl: JString, linearFiltering: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(ImageMasterFuncInfo.loadImage2)(relicImgUrl.rawPtr, Number(linearFiltering));
    },
};