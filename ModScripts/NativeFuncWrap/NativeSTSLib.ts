import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const NativeSTSLibInfo = {
    /**
     * ```c
     * JObjectArray<uint8_t>* STS::console::ConsoleRead::ReadAllBytes(JString* filePath);
     * ```
     */
    openAssestFile: new NativeFunctionInfo(0x1375C69, 'pointer', ['pointer']),
};

export const NativeSTSLib = {
    /**
     * filePath is const char*, return JObjectArray\<uint8_t\>*
     * 
     * because of the "bad implementation" of this function, GDX::Texture/Pixmap/... can't load file from external.
     * 
     * `GDX::Files::FileHandle::readBytes` use `FileHandle.path` call `Spire::spire::console::ConsoleRead::ReadAllBytes`, 
     * `Spire::spire::console::ConsoleRead::ReadAllBytes` convert `JString*` to `const char *`, then use it call `openAssestFile`
     */
    openAssestFile(filePath: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeSTSLibInfo.openAssestFile)(filePath);
    },
    OverrideopenAssestFile(newImplement: (filePath: NativePointer) => NativePointer): (filePath: NativePointer) => NativePointer {
        return PatchHelper.HookSTSFunction(NativeSTSLibInfo.openAssestFile, newImplement);
    }
};