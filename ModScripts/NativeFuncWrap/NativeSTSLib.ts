import { PatchManager } from "../PatchManager.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativeSTSLib = {
    ArrayList: {
        JString: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.JString.Ctor)(PatchManager.nullptr);
            },
            AddNativeStr(thisPtr: NativePointer, JStringPtr: NativePointer): boolean {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.JString.Add)(thisPtr, JStringPtr);
            },
            Add(thisPtr: NativePointer, str: string): boolean {
                let nativeStr = NativeSTSLib.JString.Ctor(str);
                return NativeSTSLib.ArrayList.JString.AddNativeStr(thisPtr, nativeStr);
            },
        },
        AbstractGameEffect: {
            Add(thisPtr: NativePointer, effectPtr: NativePointer): boolean {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractGameEffect.Add)(thisPtr, effectPtr);
            },
        },
        AbstractPotion: {
            Add(thisPtr: NativePointer, potionPtr: NativePointer): boolean {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractPotion.Add)(thisPtr, potionPtr);
            },
        },
        AbstractCard: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractCard.Ctor)(PatchManager.nullptr);
            },
            get(dataPtr: NativePointer, index: number): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractCard.get)(dataPtr, index);
            }
        },
    },
    JString: {
        /** UTF-16 string ctor*/
        Ctor(str: string): NativePointer {
            let nativeMem = Memory.allocUtf16String(str);
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor)(PatchManager.nullptr, nativeMem);
        },
        /** UTF-16 string ctor*/
        Ctor2(str: string, start: number, len: number): NativePointer {
            let nativeMem = Memory.allocUtf16String(str);
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor2)(PatchManager.nullptr, nativeMem, start, len);
        },
        /** C string ctor, don't use this*/
        Ctor3(str: string): NativePointer {
            let nativeMem = Memory.allocAnsiString(str);
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor3)(PatchManager.nullptr, nativeMem);
        },
        /** C string ctor, don't use this*/
        Ctor4(str: string, start: number, len: number): NativePointer {
            let nativeMem = Memory.allocAnsiString(str);
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor4)(PatchManager.nullptr, nativeMem, start, len);
        },
    },
};
