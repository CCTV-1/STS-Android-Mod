import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const STSLib = {
    ArrayList: {
        JString: {
            /**
             * ```c
             * ArrayList * ArrayList<JString>::Ctor(ArrayList * thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1386D19, 'pointer', ['pointer']),
            /**
             * ```c
             * bool ArrayList<JString>::add(ArrayList * thisPtr, JString * strPtr)
             * ```
             */
            Add: new NativeFunctionInfo(0x1386F7D, 'bool', ['pointer', 'pointer']),
        },
        AbstractGameEffect: {
            /**
             * ```c
             * bool ArrayList<AbstractGameEffect>::add(ArrayList * thisPtr, STS::AbstractGameEffect * effectPtr)
             * ```
             */
            Add: new NativeFunctionInfo(0x16706F9, 'bool', ['pointer', 'pointer']),
        },
        AbstractCard: {
            /**
             * ```c
             * ArrayList * ArrayList<AbstractCard>::Ctor(ArrayList * thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1678CA9, 'pointer', ['pointer']),
            /**
             * ```c
             * STS::AbstractCard* ArrayList<AbstractCard>::UnsafeLoad(STS::AbstractCard* dataPtr, int index)
             * ```
             */
            get: new NativeFunctionInfo(0x167E58D, 'pointer', ['pointer', 'uint32']),
        },
        AbstractPotion: {
            /**
             * ```c
             * bool ArrayList<AbstractPotion>::add(ArrayList * thisPtr, STS::AbstractPotion * potionPtr)
             * ```
             */
            Add: new NativeFunctionInfo(0x0175224D, 'bool', ['pointer', 'pointer']),
        }
    },
    JString: {
        /**
         * ```c
         * //use UTF-16 String constructor
         * JString* JString::Ctor(JString* thisPtr, char16_t* str)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x138C77D, 'pointer', ['pointer', 'pointer']),
        /**
         * ```c
         * JString* JString::Ctor(JString* thisPtr, char16_t* str, int32_t start, int32_t len)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x138C899, 'pointer', ['pointer', 'pointer', 'int32', 'int32']),
        /**
         * ```c
         * //use C String constructor
         * JString* JString::Ctor(JString* thisPtr, unsigned char * str)
         * ```
         */
        Ctor3: new NativeFunctionInfo(0x138C935, 'pointer', ['pointer', 'pointer']),
        /**
         * ```c
         * JString* JString::Ctor(JString* thisPtr, unsigned char* str, int32_t start, int32_t len)
         * ```
         */
        Ctor4: new NativeFunctionInfo(0x138C9D5, 'pointer', ['pointer', 'pointer', 'int32', 'int32']),
    },
    BRUTE: {
        /**
         * ```c
         * void * BRUTE::GallocAU(uint32_t size);
         * ```
         */
        GallocAU: new NativeFunctionInfo(0x1380E47, 'pointer', ['uint32']),
        /**
         * ```c
         * void BRUTE::Free(void * memPtr);
         * ```
         */
        Free: new NativeFunctionInfo(0x1380E01, 'void', ['pointer']),
    },
};

export const NativeSTSLib = {
    ArrayList: {
        JString: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(STSLib.ArrayList.JString.Ctor)(PatchHelper.nullptr);
            },
            AddNativeStr(thisPtr: NativePointer, JStringPtr: NativePointer): boolean {
                return PatchHelper.GetNativeFunction(STSLib.ArrayList.JString.Add)(thisPtr, JStringPtr);
            },
            Add(thisPtr: NativePointer, str: string): boolean {
                let nativeStr = NativeSTSLib.JString.Ctor(str);
                return NativeSTSLib.ArrayList.JString.AddNativeStr(thisPtr, nativeStr);
            },
        },
        AbstractGameEffect: {
            Add(thisPtr: NativePointer, effectPtr: NativePointer): boolean {
                return PatchHelper.GetNativeFunction(STSLib.ArrayList.AbstractGameEffect.Add)(thisPtr, effectPtr);
            },
        },
        AbstractPotion: {
            Add(thisPtr: NativePointer, potionPtr: NativePointer): boolean {
                return PatchHelper.GetNativeFunction(STSLib.ArrayList.AbstractPotion.Add)(thisPtr, potionPtr);
            },
        },
        AbstractCard: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(STSLib.ArrayList.AbstractCard.Ctor)(PatchHelper.nullptr);
            },
            get(dataPtr: NativePointer, index: number): NativePointer {
                return PatchHelper.GetNativeFunction(STSLib.ArrayList.AbstractCard.get)(dataPtr, index);
            }
        },
    },
    JString: {
        /** UTF-16 string ctor*/
        Ctor(str: string): NativePointer {
            let nativeMem = Memory.allocUtf16String(str);
            return PatchHelper.GetNativeFunction(STSLib.JString.Ctor)(PatchHelper.nullptr, nativeMem);
        },
        /** UTF-16 string ctor*/
        Ctor2(str: string, start: number, len: number): NativePointer {
            let nativeMem = Memory.allocUtf16String(str);
            return PatchHelper.GetNativeFunction(STSLib.JString.Ctor2)(PatchHelper.nullptr, nativeMem, start, len);
        },
        /** C string ctor, don't use this*/
        Ctor3(str: string): NativePointer {
            let nativeMem = Memory.allocAnsiString(str);
            return PatchHelper.GetNativeFunction(STSLib.JString.Ctor3)(PatchHelper.nullptr, nativeMem);
        },
        /** C string ctor, don't use this*/
        Ctor4(str: string, start: number, len: number): NativePointer {
            let nativeMem = Memory.allocAnsiString(str);
            return PatchHelper.GetNativeFunction(STSLib.JString.Ctor4)(PatchHelper.nullptr, nativeMem, start, len);
        },
    },
};
