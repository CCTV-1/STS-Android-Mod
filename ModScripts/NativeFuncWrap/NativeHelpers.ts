import { PatchHelper } from "../PatchHelper.js";
import { PlayerClass } from "../enums.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { NativeSTDLib } from "./NativeSTDLib.js";

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
};
const PotionHelper = {
    /**
     * ```c
     * ArrayList<String>* PotionHelper::getPotions(PlayerClass class, bool getAll)
     * ```
     */
    getPotions: new NativeFunctionInfo(0x1882D19, 'pointer', ['uint32', 'bool']),
    /**
     * ```c
     * STS::AbstractPotion * PotionHelper::getPotion(JString* potionId)
     * ```
     */
    getPotion: new NativeFunctionInfo(0x1883339, 'pointer', ['pointer']),
};

export const NativeHelpers = {
    CardLibrary: {
        initialize() {
            PatchHelper.GetNativeFunction(CardLibrary.initialize)(NULL);
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
            PatchHelper.GetNativeFunction(RelicLibrary.initialize)(NULL);
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
    PotionHelper: {
        getPotions(playerClass: PlayerClass, getAll: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(PotionHelper.getPotions)(NULL, Number(playerClass), Number(getAll));
        },
        OverridegetPotions(newFunc: (playerClass: number, getAll: number) => NativePointer): (playerClass: number, getAll: number) => NativePointer {
            return PatchHelper.HookSTSFunction(PotionHelper.getPotions, newFunc);
        },
        getPotion(potionId: string): NativePointer {
            const nativePotionId = NativeSTDLib.JString.Ctor(potionId);
            return PatchHelper.GetNativeFunction(PotionHelper.getPotion)(NULL, nativePotionId);
        },
        /** JString* potionId, return AbstractPotion* */
        OverridegetPotion(newFunc: (potionId: NativePointer) => NativePointer): (potionId: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(PotionHelper.getPotion, newFunc);
        },
    },
    PowerTip: {
        Ctor(header: string, body: string): NativePointer {
            let nativeHeader = NativeSTDLib.JString.Ctor(header);
            let nativeBody = NativeSTDLib.JString.Ctor(body);
            return PatchHelper.GetNativeFunction(PowerTip.Ctor)(NULL, nativeHeader, nativeBody);
        },
    }
}
