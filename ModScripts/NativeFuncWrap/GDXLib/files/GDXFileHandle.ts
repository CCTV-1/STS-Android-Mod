import { GDXFileType } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeGDXLibInfo } from "../NativeGDXLibInfo.js";

export const GDXFileHandle = {
    /**
     * don't use this, it doNothing.
     */
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.Ctor)(NULL);
    },
    /**
     * if pass to `GDX::Texture`/`GDX::Pixmap`/..., only work in internal file(for apk), game dev modified GDX::FileHandle::readBytes implement.
     */
    Ctor2(fileName: string, fileType: GDXFileType): NativePointer {
        let nativeFileName = NativeSTDLib.JString.Ctor(fileName);
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.Ctor2)(NULL, nativeFileName, Number(fileType));
    },
    /**
     * if pass to `GDX::Texture`/`GDX::Pixmap`/..., only work in internal file(for apk), game dev modified GDX::FileHandle::readBytes implement.
     */
    Ctor3(JavaFileHandle: NativePointer, fileType: GDXFileType): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.Ctor3)(NULL, JavaFileHandle, Number(fileType));
    },
    child(thisPtr: NativePointer, name: string): NativePointer {
        let NativeName = NativeSTDLib.JString.Ctor(name);
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.child)(thisPtr, NativeName);
    },
    exists(thisPtr: NativePointer): boolean {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.exists)(thisPtr);
    },
    /** return `JString*` */
    extension(thisPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.extension)(thisPtr);
    },
    /** return JavaFileHandle */
    file(thisPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.file)(thisPtr);
    },
    length(thisPtr: NativePointer): number {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.length)(thisPtr);
    },
    /** return `JString*` */
    path(thisPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.path)(thisPtr);
    },
    /** this function modified by game dev,can only read internal file(for apk,obb file)*/
    readBytes(thisPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.readBytes)(thisPtr);
    },
    /** return `InputStream*` */
    read(thisPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.read)(thisPtr);
    },
};