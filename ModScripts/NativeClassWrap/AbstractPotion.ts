import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";
import { PotionColor, PotionEffect, PotionRarity, PotionSize } from "../enums.js";
import { NativePotions } from "../NativeFuncWrap/NativePotions.js";

export interface NewPotionVFuncType {
    getPrice?: (thisPtr: NativePointer) => number,
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => void,
    canDiscard?: (thisPtr: NativePointer) => number,
    initializeData: (thisPtr: NativePointer) => void,
    canUse?: (thisPtr: NativePointer) => number,
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => number,
    onPlayerDeath?: (thisPtr: NativePointer) => number,
}

export class AbstractPotion extends NativeClassWrapper {
    //NativePointer AbstractPotion *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * new potion id => (v func name => v func)
     * 
     * NativePointer current don't exist toUInt64, Frida(Duktape) current don't support BigInt,
     * so current proxy implement need all C pointer size equal sizeof(uint32_t).
     * 
     * use ptr.toString() or new Uint64(ptr.toString()) can support pointer size equal sizeof(uint64_t) architecture.
     * but there is more performance overhead.
     */
    static #rewriteVFuncMap = new Map<number, NewPotionVFuncType>();

    static readonly #NewRelicVFuncProxys: NewPotionVFuncType = {
        getPrice: (thisPtr: NativePointer) => {
            let wrapPotion = new AbstractPotion(thisPtr);
            let potionVFuncMap = AbstractPotion.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (potionVFuncMap !== undefined) {
                const Func = potionVFuncMap.getPrice;
                if (Func !== undefined) {
                    return Func(thisPtr);
                }
            }

            //default logic
            switch (wrapPotion.rarity) {
                case PotionRarity.COMMON: {
                    return 50;
                }
                case PotionRarity.UNCOMMON: {
                    return 75;
                }
                case PotionRarity.RARE: {
                    return 100;
                }
                default: {
                    return 999;
                }
            }
        },
        use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
            let potionVFuncMap = AbstractPotion.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (potionVFuncMap !== undefined) {
                const Func = potionVFuncMap.use;
                if (Func !== undefined) {
                    Func(thisPtr, targetCreature);
                }
            }
        },
        initializeData: (thisPtr: NativePointer) => {
            let potionVFuncMap = AbstractPotion.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (potionVFuncMap !== undefined) {
                const Func = potionVFuncMap.initializeData;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
            let wrapPotion = new AbstractPotion(thisPtr);
            let potionVFuncMap = AbstractPotion.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (potionVFuncMap !== undefined) {
                const Func = potionVFuncMap.getPotency;
                if (Func !== undefined) {
                    return Func(thisPtr, ascensionLevel);
                }
            }

            PatchHelper.LogV(wrapPotion.potionId + " miss register Potion::getPotency vfunc???");
            return 0;
        },
        onPlayerDeath: (thisPtr: NativePointer) => {
            let potionVFuncMap = AbstractPotion.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (potionVFuncMap !== undefined) {
                const Func = potionVFuncMap.onPlayerDeath;
                if (Func !== undefined) {
                    return Func(thisPtr);
                }
            }

            //default logic
            return Number(false);
        },
    };

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void AbstractPotion::flash(STS::AbstractPotion* thisPtr)
         * ```
         */
        flash: new NativeFunctionInfo(0x20, 'void', ['pointer']),
        /**
         * ```c
         * int32_t AbstractPotion::getPrice(STS::AbstractPotion* thisPtr)
         * ```
         */
        getPrice: new NativeFunctionInfo(0x38, 'int32', ['pointer']),
        /**
         * ```c
         * void AbstractPotion::use(STS::AbstractPotion* thisPtr, STS::AbstractCreature* creaturePtr)
         * ```
         */
        use: new NativeFunctionInfo(0x40, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * bool AbstractPotion::canDiscard(STS::AbstractPotion* thisPtr)
         * ```
         */
        canDiscard: new NativeFunctionInfo(0x48, 'bool', ['pointer']),
        /**
         * ```c
         * void AbstractPotion::initializeData(STS::AbstractPotion* thisPtr)
         * ```
         */
        initializeData: new NativeFunctionInfo(0x50, 'void', ['pointer']),
        /**
         * ```c
         * bool AbstractPotion::canUse(STS::AbstractPotion* thisPtr)
         * ```
         */
        canUse: new NativeFunctionInfo(0x58, 'bool', ['pointer']),
        /**
         * ```c
         * int32_t AbstractPotion::getPotency(STS::AbstractPotion* thisPtr, int32_t ascensionLevel)
         * ```
         * 
         * 0xB8: `int32_t AbstractPotion::getPotency(STS::AbstractPotion* thisPtr)` call `getPotency(thisPtr, AbstractDungeon.ascensionLevel)`
         * and implement Relic SacredBark abilit. 
         */
        getPotency: new NativeFunctionInfo(0xB0, 'int32', ['pointer', 'int32']),
        /**
         * ```c
         * int32_t AbstractPotion::getPotency(STS::AbstractPotion* thisPtr)
         * ```
         */
        getPotency2 : new NativeFunctionInfo(0xB8, 'int32', ['pointer']),
        /**
         * ```c
         * bool AbstractPotion::onPlayerDeath(STS::AbstractPotion* thisPtr)
         * ```
         */
        onPlayerDeath: new NativeFunctionInfo(0xC0, 'bool', ['pointer']),
        /**
         * ```c
         * void AbstractPotion::addToBot(STS::AbstractPotion* thisPtr, STS::AbstractGameAction actionPtr)
         * ```
         */
        addToBot: new NativeFunctionInfo(0xC8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPotion::addToTop(STS::AbstractPotion* thisPtr, STS::AbstractGameAction actionPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0xD0, 'void', ['pointer', 'pointer']),
    };

    static #vFuncNamePrefix = "AbstractPotion_";

    static NewPotionCtor(name: string, id: string, rarity: PotionRarity, size: PotionSize, color: PotionColor, vfuncs: NewPotionVFuncType): NativePointer {
        let origPotionPtr = NativePotions.Abstract.Ctor(name, id, rarity, size, color);

        //previous action object memory maybe will be reused, so origActionPtr value not necessarily unique.
        AbstractPotion.#rewriteVFuncMap.set(origPotionPtr.toUInt32(), vfuncs);

        if (!AbstractPotion.#rewriteVFuncMap.has(-1)) {
            const wrapPotion = new AbstractPotion(origPotionPtr);
            const VFuncMap = AbstractPotion.#vfunctionMap;
            const VFuncProxys = AbstractPotion.#NewRelicVFuncProxys;
            let funcName = "AbstractPotionVFuncProxy_getPrice";
            wrapPotion.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_P_Func(funcName), VFuncMap.getPrice, VFuncProxys.getPrice);
            funcName = "AbstractPotionVFuncProxy_use";
            wrapPotion.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.use, VFuncProxys.use);
            funcName = "AbstractPotionVFuncProxy_initializeData";
            wrapPotion.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.initializeData, VFuncProxys.initializeData);
            funcName = "AbstractPotionVFuncProxy_getPotency";
            wrapPotion.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), VFuncMap.getPotency, VFuncProxys.getPotency);
            funcName = "AbstractPotionVFuncProxy_onPlayerDeath";
            wrapPotion.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.B_P_Func(funcName), VFuncMap.onPlayerDeath, VFuncProxys.onPlayerDeath);
            AbstractPotion.#rewriteVFuncMap.set(-1, AbstractPotion.#NewRelicVFuncProxys);
        }

        //initializeData maybe need call getPotency,so we call it after vfuncs registerd.
        vfuncs.initializeData(origPotionPtr);
        return origPotionPtr;
    }

    static OnNativeObjectAlloc(ptrValue: number) {
        const vfuncs = AbstractPotion.#rewriteVFuncMap.get(ptrValue);
        if (vfuncs !== undefined) {
            AbstractPotion.#rewriteVFuncMap.delete(ptrValue);
        }
    }

    flash(): void {
        this.getVirtualFunction(AbstractPotion.#vfunctionMap.flash)(this.rawPtr);
    }

    getPrice(): number {
        return this.getVirtualFunction(AbstractPotion.#vfunctionMap.getPrice)(this.rawPtr);
    }

    canDiscard(): boolean {
        return this.getVirtualFunction(AbstractPotion.#vfunctionMap.canDiscard)(this.rawPtr);
    }

    initializeData(): void {
        this.getVirtualFunction(AbstractPotion.#vfunctionMap.initializeData)(this.rawPtr);
    }
    OverrideinitializeData(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractPotion.#vFuncNamePrefix + this.potionId + "_initializeData").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractPotion.#vfunctionMap.initializeData, newVFunc);
    }

    canUse(): boolean {
        return this.getVirtualFunction(AbstractPotion.#vfunctionMap.canUse)(this.rawPtr);
    }

    getPotency(ascensionLevel: number): number {
        return this.getVirtualFunction(AbstractPotion.#vfunctionMap.getPotency)(this.rawPtr, ascensionLevel);
    }
    OverridegetPotency(newVFunc: (thisPtr: NativePointer, ascensionLevel: number) => number) {
        let funcName = (AbstractPotion.#vFuncNamePrefix + this.potionId + "_getPotency").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), AbstractPotion.#vfunctionMap.getPotency, newVFunc);
    }
    getPotency2(): number {
        return this.getVirtualFunction(AbstractPotion.#vfunctionMap.getPotency2)(this.rawPtr);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractPotion.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractPotion.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    get potionId() {
        return this.readOffsetJString(0x8).content;
    }
    set potionId(value) {
        this.writeOffsetJString(0x8, JString.CreateJString(value));
    }

    get name() {
        return this.readOffsetJString(0xC).content;
    }
    set name(value) {
        this.writeOffsetJString(0xC, JString.CreateJString(value));
    }

    get description() {
        return this.readOffsetJString(0x10).content;
    }
    set description(value) {
        this.writeOffsetJString(0x10, JString.CreateJString(value));
    }

    get slot() {
        return this.readOffsetS32(0x14);
    }
    set slot(value) {
        this.writeOffsetS32(0x14, value);
    }

    /** ArrayList\<PowerTip\> */
    get tips() {
        return this.readOffsetPointer(0x18);
    }

    /** GDX::Graphics::Texture* */
    get containerImg() {
        return this.readOffsetPointer(0x1C);
    }

    /** GDX::Graphics::Texture* */
    get liquidImg() {
        return this.readOffsetPointer(0x20);
    }

    /** GDX::Graphics::Texture* */
    get hybridImg() {
        return this.readOffsetPointer(0x24);
    }

    /** GDX::Graphics::Texture* */
    get spotsImg() {
        return this.readOffsetPointer(0x28);
    }

    /** GDX::Graphics::Texture* */
    get outlineImg() {
        return this.readOffsetPointer(0x2C);
    }

    get posX() {
        return this.readOffsetS32(0x30);
    }

    /** ArrayList\<FlashPotionEffect\>* */
    get effect() {
        return this.readOffsetPointer(0x3C);
    }

    get scale() {
        return this.readOffsetFloat(0x40);
    }

    get isObtained() {
        return this.readOffsetBool(0x44);
    }

    get sparkleTimer() {
        return this.readOffsetFloat(0x48);
    }

    get flashCount() {
        return this.readOffsetS32(0x4C);
    }
    set flashCount(value) {
        this.writeOffsetS32(0x4C, value);
    }

    get flashTimer() {
        return this.readOffsetFloat(0x50);
    }
    set flashTimer(value) {
        this.writeOffsetS32(0x50, value);
    }

    get potionEffect(): PotionEffect {
        return this.readOffsetU32(0x54);
    }
    set potionEffect(value) {
        this.writeOffsetU32(0x54, Number(value));
    }

    get color(): PotionColor {
        return this.readOffsetU32(0x58);
    }
    set color(value) {
        this.writeOffsetU32(0x58, Number(value));
    }

    get rarity(): PotionRarity {
        return this.readOffsetU32(0x68);
    }
    set rarity(value) {
        this.writeOffsetU32(0x68, Number(value));
    }

    get size(): PotionSize {
        return this.readOffsetU32(0x6C);
    }
    set size(value) {
        this.writeOffsetU32(0x6C, Number(value));
    }

    get potency() {
        return this.readOffsetS32(0x6C);
    }
    set potency(value) {
        this.writeOffsetS32(0x6C, value);
    }

    get canUseFlag() {
        return this.readOffsetBool(0x7C)
    }
    set canUseFlag(value) {
        this.writeOffsetBool(0x7C, value)
    }

    get discarded() {
        return this.readOffsetBool(0x7D)
    }
    set discarded(value) {
        this.writeOffsetBool(0x7D, value)
    }

    get isThrown() {
        return this.readOffsetBool(0x7E)
    }
    set isThrown(value) {
        this.writeOffsetBool(0x7E, value)
    }

    get targetRequired() {
        return this.readOffsetBool(0x7F)
    }
    set targetRequired(value) {
        this.writeOffsetBool(0x7F, value)
    }
}