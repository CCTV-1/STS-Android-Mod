import { ArrayList } from "../NativeClassWrap/ArrayList.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const STDLib = {
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
             * STS::AbstractCard* STS::ArrayList<AbstractCard>::getItem(STS::ArrayList<AbstractCard>* thisPtr, int index)
             * ```
             */
            get: new NativeFunctionInfo(0x205A631, 'pointer', ['pointer', 'uint32']),
        },
        AbstractMonster: {
            /**
             * ```c
             * STS::AbstractMonster* STS::ArrayList<AbstractMonster>::getItem(STS::ArrayList<AbstractMonster>* thisPtr, int index)
             * ```
             */
            get: new NativeFunctionInfo(0x2096269, 'pointer', ['pointer', 'uint32']),
            
        },
        AbstractPotion: {
            /**
             * ```c
             * bool ArrayList<AbstractPotion>::add(ArrayList * thisPtr, STS::AbstractPotion * potionPtr)
             * ```
             */
            Add: new NativeFunctionInfo(0x0175224D, 'bool', ['pointer', 'pointer']),
        },
        PowerTip: {
            /**
             * ```c
             * void ArrayList<PowerTip>::add(STS::ArrayList<PowerTip>* PowerTip, PowerTip * powerTipPtr)
             * ```
             */
            add: new NativeFunctionInfo(0x16CBC59, 'void', ['pointer', 'pointer']),
            /**
             * ```c
             * void ArrayList<PowerTip>::clear(STS::ArrayList<PowerTip>* PowerTip)
             * ```
             */
            clear: new NativeFunctionInfo(0x16CFB69, 'void', ['pointer']),
            /**
             * ```c
             * STS::PowerTip* ArrayList<PowerTip>::getItem(STS::ArrayList<PowerTip>* PowerTip, int index)
             * ```
             */
            get: new NativeFunctionInfo(0x208CAAD, 'pointer', ['pointer', 'uint32']),
        },
    },
    Array: {
        /**
         * ```c
         * Array<T> STD::Array::CreateInternal(RumTimeType_t * typePtr, uint32_t , int *, int)
         * ```
         */
        CreateInternal: new NativeFunctionInfo(0x1384DD1, 'pointer', ['pointer', 'uint32', 'pointer', 'int32']),
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
    IOException: {
        /**
         * ```c
         * IOException* IOException::Ctor(IOException* thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x13FBF15, 'pointer', ['pointer']),
        /**
         * ```c
         * IOException* IOException::Ctor(IOException* thisPtr, SerializationInfo* InfoPtr, StreamingContext streamContext)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x13FC025, 'pointer', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * IOException* IOException::Ctor(IOException* thisPtr, JString* message)
         * ```
         */
        Ctor3: new NativeFunctionInfo(0x13FBFA1, 'pointer', ['pointer', 'pointer']),
        /**
         * ```c
         * IOException* IOException::Ctor(IOException* thisPtr, JString* message, int32_t fd)
         * ```
         */
        Ctor4: new NativeFunctionInfo(0x13FC0B5, 'pointer', ['pointer', 'pointer', 'int32']),
    },
    Exception: {
        /**
         * ```c
         * Exception* STD::Exception::Ctor(Exception* thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x13E490D, 'pointer', ['pointer']),
        /**
         * ```c
         * Exception* STD::Exception::Ctor(Exception* thisPtr, SerializationInfo *, StreamingContext ctx)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x13E4A21, 'pointer', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * Exception* STD::Exception::Ctor(Exception* thisPtr, JString* message)
         * ```
         */
        Ctor3: new NativeFunctionInfo(0x13E4995, 'pointer', ['pointer', 'pointer']),
        /**
         * ```c
         * Exception* STD::Exception::Ctor(Exception* thisPtr, JString* message, Exception* exceptPtr)
         * ```
         */
        Ctor4: new NativeFunctionInfo(0x13E4DE1, 'pointer', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * JString* STD::Exception::getMessage(STD::Exception * thisPtr)
         * ```
         */
        getMessage: new NativeFunctionInfo(0x13E4EE5, 'pointer', ['pointer']),
    },
    Internal: {
        CreateRuntimeType: {
            Array_uint8_T: new NativeFunctionInfo(0x247E8DD, 'pointer', []),
        },
    }
};

export const NativeSTDLib = {
    ArrayList: {
        JString: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(STDLib.ArrayList.JString.Ctor)(NULL);
            },
            AddNativeStr(thisPtr: NativePointer, JStringPtr: NativePointer): boolean {
                return PatchHelper.GetNativeFunction(STDLib.ArrayList.JString.Add)(thisPtr, JStringPtr);
            },
            Add(thisPtr: NativePointer, str: string): boolean {
                let nativeStr = NativeSTDLib.JString.Ctor(str);
                return NativeSTDLib.ArrayList.JString.AddNativeStr(thisPtr, nativeStr);
            },
        },
        AbstractGameEffect: {
            Add(thisPtr: NativePointer, effectPtr: NativePointer): boolean {
                return PatchHelper.GetNativeFunction(STDLib.ArrayList.AbstractGameEffect.Add)(thisPtr, effectPtr);
            },
        },
        AbstractPotion: {
            Add(thisPtr: NativePointer, potionPtr: NativePointer): boolean {
                return PatchHelper.GetNativeFunction(STDLib.ArrayList.AbstractPotion.Add)(thisPtr, potionPtr);
            },
        },
        AbstractCard: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(STDLib.ArrayList.AbstractCard.Ctor)(NULL);
            },
            get(arrayListPtr: ArrayList, index: number): NativePointer {
                return PatchHelper.GetNativeFunction(STDLib.ArrayList.AbstractCard.get)(arrayListPtr.rawPtr, index);
            },
        },
        AbstractMonster: {
            get(arrayListPtr: ArrayList, index: number): NativePointer {
                return PatchHelper.GetNativeFunction(STDLib.ArrayList.AbstractMonster.get)(arrayListPtr.rawPtr, index);
            },
        },
        PowerTip: {
            add(arrayListPtr: NativePointer, powerTipPtr: NativePointer) {
                PatchHelper.GetNativeFunction(STDLib.ArrayList.PowerTip.add)(arrayListPtr, powerTipPtr);
            },
            clear(arrayListPtr: NativePointer) {
                PatchHelper.GetNativeFunction(STDLib.ArrayList.PowerTip.clear)(arrayListPtr);
            },
            get(arrayListPtr: NativePointer, index: number): NativePointer {
                return PatchHelper.GetNativeFunction(STDLib.ArrayList.PowerTip.get)(arrayListPtr, index);
            }
        },
    },
    Array: {
        CreateInternal(typePtr: NativePointer, elementSize: number, arrSizeInfo: NativePointer, len: number): NativePointer {
            return PatchHelper.GetNativeFunction(STDLib.Array.CreateInternal)(typePtr, elementSize, arrSizeInfo, len);
        },

        CreateByteArray(arrLen: number): NativePointer {
            let sizeMem = Memory.alloc(4*3);
            sizeMem.writeS32(arrLen);
            let typePtr = NativeSTDLib.Internal.CreateRuntimeType.Array_uint8_T();
            return NativeSTDLib.Array.CreateInternal(typePtr, 1, sizeMem, 1);
        },
    },
    JString: {
        /** UTF-16 string ctor*/
        Ctor(str: string): NativePointer {
            let nativeMem = Memory.allocUtf16String(str);
            return PatchHelper.GetNativeFunction(STDLib.JString.Ctor)(NULL, nativeMem);
        },
        /** UTF-16 string ctor*/
        Ctor2(str: string, start: number, len: number): NativePointer {
            let nativeMem = Memory.allocUtf16String(str);
            return PatchHelper.GetNativeFunction(STDLib.JString.Ctor2)(NULL, nativeMem, start, len);
        },
        /** C string ctor, don't use this*/
        Ctor3(str: string): NativePointer {
            let nativeMem = Memory.allocAnsiString(str);
            return PatchHelper.GetNativeFunction(STDLib.JString.Ctor3)(NULL, nativeMem);
        },
        /** C string ctor, don't use this*/
        Ctor4(str: string, start: number, len: number): NativePointer {
            let nativeMem = Memory.allocAnsiString(str);
            return PatchHelper.GetNativeFunction(STDLib.JString.Ctor4)(NULL, nativeMem, start, len);
        },
    },
    Exception: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(STDLib.Exception.Ctor)(NULL);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(STDLib.Exception.Ctor, newCtor);
        },

        Ctor3(message: string): NativePointer {
            let nativeMessage = NativeSTDLib.JString.Ctor(message);
            return PatchHelper.GetNativeFunction(STDLib.Exception.Ctor3)(NULL, nativeMessage);
        },
        OverrideCtor3(newCtor: (thisPtr: NativePointer, message: NativePointer) => NativePointer): (thisPtr: NativePointer, message: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(STDLib.Exception.Ctor3, newCtor);
        },

        Ctor4(message: string, exceptPtr: NativePointer): NativePointer {
            let nativeMessage = NativeSTDLib.JString.Ctor(message);
            return PatchHelper.GetNativeFunction(STDLib.Exception.Ctor4)(NULL, nativeMessage, exceptPtr);
        },
        OverrideCtor4(newCtor: (thisPtr: NativePointer, message: NativePointer, exceptPtr: NativePointer) => NativePointer): (thisPtr: NativePointer, message: NativePointer, exceptPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(STDLib.Exception.Ctor4, newCtor);
        },

        getMessage(thisPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(STDLib.Exception.getMessage)(thisPtr); 
        },
    },
    IOException: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(STDLib.IOException.Ctor)(NULL);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(STDLib.IOException.Ctor, newCtor);
        },

        Ctor3(message: string): NativePointer {
            let nativeMessage = NativeSTDLib.JString.Ctor(message);
            return PatchHelper.GetNativeFunction(STDLib.IOException.Ctor3)(NULL, nativeMessage);
        },
        OverrideCtor3(newCtor: (thisPtr: NativePointer, message: NativePointer) => NativePointer): (thisPtr: NativePointer, message: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(STDLib.IOException.Ctor3, newCtor);
        },
        Ctor4(message: string, fd: number): NativePointer {
            let nativeMessage = NativeSTDLib.JString.Ctor(message);
            return PatchHelper.GetNativeFunction(STDLib.IOException.Ctor4)(NULL, nativeMessage, fd);
        },
        OverrideCtor4(newCtor: (thisPtr: NativePointer, message: NativePointer, fd: number) => NativePointer): (thisPtr: NativePointer, message: NativePointer, fd: number) => NativePointer {
            return PatchHelper.HookSTSFunction(STDLib.IOException.Ctor4, newCtor);
        },
    },
    Internal: {
        CreateRuntimeType: {
            Array_uint8_T() {
                return PatchHelper.GetNativeFunction(STDLib.Internal.CreateRuntimeType.Array_uint8_T)();
            }
        },
    }
};
