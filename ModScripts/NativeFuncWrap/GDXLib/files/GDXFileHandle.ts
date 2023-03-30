import { GDXFileType } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeGDXLibInfo } from "../NativeGDXLibInfo.js";

export const GDXFileHandle = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.Ctor)(PatchHelper.nullptr);
    },
    Ctor2(fileName: string, fileType: GDXFileType): NativePointer {
        let nativeFileName = NativeSTDLib.JString.Ctor(fileName);
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.Ctor2)(PatchHelper.nullptr, nativeFileName, Number(fileType));
    },
    Ctor3(JavaFileHandle: NativePointer, fileType: GDXFileType): NativePointer {
        return PatchHelper.GetNativeFunction(NativeGDXLibInfo.files.FileHandle.Ctor3)(PatchHelper.nullptr, JavaFileHandle, Number(fileType));
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
};