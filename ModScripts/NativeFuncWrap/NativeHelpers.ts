import { JString } from "../NativeClassWrap/JString.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const CardLibrary = {
    /**
     * ```c
     * void initialize(STS::CardLibrary* this)
     * ```
     */
    initialize: new NativeFunctionInfo(0x1830B15, 'void', ['pointer']),
    /**
     * ```c
     * void Add(STS::CardLibrary* this, STS::AbstractCard* cardPtr)
     * ```
     */
    Add: new NativeFunctionInfo(0x1832405, 'void', ['pointer']),
};
const RelicLibrary = {
    /**
     * ```c
     * void initialize(STS::RelicLibrary* this)
     * ```
     */
    initialize: new NativeFunctionInfo(0x1884C71, 'void', ['pointer']),
    /**
     * ```c
     * void Add(STS::RelicLibrary* this, STS::AbstractRelic* relicPtr)
     * ```
     */
    Add: new NativeFunctionInfo(0x18854C9, 'void', ['pointer']),
};
const PowerTip = {
    /**
     * ```c
     * STS::PowerTip* PowerTip::Ctor(STS::PowerTip* thisPtr, JString* header, JString*  body)
     * ```
     */
    Ctor: new NativeFunctionInfo(0x18840A9, 'pointer', ['pointer', 'pointer', 'pointer']),
    /**
     * ```c
     * STS::PowerTip* PowerTip::Ctor2(STS::PowerTip* thisPtr, JString* header, JString*  body, GDX::Texture img)
     * ```
     */
    Ctor2: new NativeFunctionInfo(0x1884135, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']),
    /**
     * ```c
     * STS::PowerTip* PowerTip::Ctor3(STS::PowerTip* thisPtr, JString* header, JString*  body, GDX::TextureAtlas.AtlasRegion region48)
     * ```
     */
    Ctor3: new NativeFunctionInfo(0x18841C9, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']),
}

export const NativeHelpers = {
    CardLibrary: {
        initialize() {
            PatchHelper.GetNativeFunction(CardLibrary.initialize)(PatchHelper.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(CardLibrary.initialize, newIniter);
        },
        Add(cardPtr: NativePointer): void {
            PatchHelper.GetNativeFunction(CardLibrary.Add)(cardPtr);
        },
        OverrideAdd(newFunc: (cardPtr: NativePointer) => void): (cardPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(CardLibrary.Add, newFunc);
        }
    },
    RelicLibrary: {
        initialize() {
            PatchHelper.GetNativeFunction(RelicLibrary.initialize)(PatchHelper.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(RelicLibrary.initialize, newIniter);
        },
        Add(relicPtr: NativePointer): void {
            PatchHelper.GetNativeFunction(RelicLibrary.Add)(relicPtr);
        },
        OverrideAdd(newFunc: (relicPtr: NativePointer) => void): (relicPtr: NativePointer) => void {
            return PatchHelper.HookSTSFunction(RelicLibrary.Add, newFunc);
        }
    },
    PowerTip: {
        Ctor(header: string, body: string) {
            let nativeHeader = JString.CreateJString(header);
            let nativeBody = JString.CreateJString(body);
            PatchHelper.GetNativeFunction(PowerTip.Ctor)(PatchHelper.nullptr, nativeHeader, nativeBody);
        }
    }
}
