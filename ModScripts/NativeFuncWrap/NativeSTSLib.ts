import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativeSTSLib = {
    ArrayList: {
        JString: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.JString.Ctor)(PatchHelper.nullptr);
            },
            AddNativeStr(thisPtr: NativePointer, JStringPtr: NativePointer): boolean {
                return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.JString.Add)(thisPtr, JStringPtr);
            },
            Add(thisPtr: NativePointer, str: string): boolean {
                let nativeStr = NativeSTSLib.JString.Ctor(str);
                return NativeSTSLib.ArrayList.JString.AddNativeStr(thisPtr, nativeStr);
            },
        },
        AbstractGameEffect: {
            Add(thisPtr: NativePointer, effectPtr: NativePointer): boolean {
                return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractGameEffect.Add)(thisPtr, effectPtr);
            },
        },
        AbstractPotion: {
            Add(thisPtr: NativePointer, potionPtr: NativePointer): boolean {
                return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractPotion.Add)(thisPtr, potionPtr);
            },
        },
        AbstractCard: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractCard.Ctor)(PatchHelper.nullptr);
            },
            get(dataPtr: NativePointer, index: number): NativePointer {
                return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractCard.get)(dataPtr, index);
            }
        },
    },
    JString: {
        /** UTF-16 string ctor*/
        Ctor(str: string): NativePointer {
            let nativeMem = Memory.allocUtf16String(str);
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor)(PatchHelper.nullptr, nativeMem);
        },
        /** UTF-16 string ctor*/
        Ctor2(str: string, start: number, len: number): NativePointer {
            let nativeMem = Memory.allocUtf16String(str);
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor2)(PatchHelper.nullptr, nativeMem, start, len);
        },
        /** C string ctor, don't use this*/
        Ctor3(str: string): NativePointer {
            let nativeMem = Memory.allocAnsiString(str);
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor3)(PatchHelper.nullptr, nativeMem);
        },
        /** C string ctor, don't use this*/
        Ctor4(str: string, start: number, len: number): NativePointer {
            let nativeMem = Memory.allocAnsiString(str);
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor4)(PatchHelper.nullptr, nativeMem, start, len);
        },
    },
};
