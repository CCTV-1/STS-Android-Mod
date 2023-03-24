import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";

export class AbstractPotion extends NativeClassWrapper {
    //NativePointer AbstractPotion *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

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
         * void AbstractPotion::flash(STS::AbstractPotion* thisPtr, STS::AbstractCreature* creaturePtr)
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
        canUse: new NativeFunctionInfo(0x58, 'void', ['pointer']),
        /**
         * ```c
         * int32_t AbstractPotion::getPotency(STS::AbstractPotion* thisPtr, int32_t ascensionLevel)
         * ```
         * 
         * 0xB8: `int32_t AbstractPotion::getPotency(STS::AbstractPotion* thisPtr)` call `getPotency(thisPtr, AbstractDungeon.ascensionLevel)`
         * and implement Relic SacredBark abilit. 
         */
        getPotency: new NativeFunctionInfo(0xB0, 'void', ['pointer', 'int32']),
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
}