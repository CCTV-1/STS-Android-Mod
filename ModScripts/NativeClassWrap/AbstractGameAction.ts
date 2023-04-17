import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export interface NewGameActionVFuncType {
    update: (thisPtr: NativePointer) => void,
};

export class AbstractGameAction extends NativeClassWrapper {
    //NativePointer AbstractGameAction *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * new card id => (v func name => v func)
     */
    static #rewriteVFuncMap = new Map<number, NewGameActionVFuncType>();

    static readonly #NewGameActionVFuncProxys: NewGameActionVFuncType = {
        update: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractGameAction.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const updateFunc = cardVFuncMap.update;
                if (updateFunc !== undefined) {
                    updateFunc(thisPtr);
                }
            }
        },
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void AbstractGameAction::setValues(STS::AbstractGameAction * this, STS::AbstractCreature* targetCR, DamageInfo* dmgInfo);
         * ```
         */
        setValues: new NativeFunctionInfo(0x20, 'void', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * void AbstractGameAction::setValues(STS::AbstractGameAction * this, STS::AbstractCreature* targetCR, STS::AbstractCreature* sourceCR
         *      int32_t amount);
         * ```
         * 
         * 0x30 setValues3 just call `setValues2(this, target, source, 0)`
         */
        setValues2: new NativeFunctionInfo(0x28, 'void', ['pointer', 'pointer', 'pointer', 'int32']),
        /**
         * ```c
         *  bool AbstractGameAction::isDeadOrEscaped(STS::AbstractGameAction* this, STS::AbstractCreature* targetCR)
         * ```
         */
        isDeadOrEscaped: new NativeFunctionInfo(0x38, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractGameAction::addToTop(STS::AbstractGameAction* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToBot: new NativeFunctionInfo(0x40, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractGameAction::addToTop(STS::AbstractGameAction* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0x48, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractGameAction::update(STS::AbstractGameAction* this)
         * ```
         */
        update: new NativeFunctionInfo(0x50, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractGameAction::tickDuration(STS::AbstractGameAction* this)
         * ```
         */
        tickDuration: new NativeFunctionInfo(0x58, 'void', ['pointer']),
        /**
         * ```c
         *  bool AbstractGameAction::shouldCancelAction(STS::AbstractGameAction* this)
         * ```
         */
        shouldCancelAction: new NativeFunctionInfo(0x60, 'bool', ['pointer']),
    };

    static NewActionCtor(newFuncs: NewGameActionVFuncType): NativePointer {
        let origActionPtr = NativeActions.Abstract.Ctor();

        let wrapAction = new AbstractGameAction(origActionPtr);
        let actionId = origActionPtr.toUInt32();
        //previous action object memory maybe will be reused, so origActionPtr value not necessarily unique.
        AbstractGameAction.#rewriteVFuncMap.set(actionId, newFuncs);

        if (!AbstractGameAction.#rewriteVFuncMap.has(-1)) {
            let funcName = "AbstractGameAction_BasicNewAction_update";
            wrapAction.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractGameAction.#vfunctionMap.update, AbstractGameAction.#NewGameActionVFuncProxys.update);
            AbstractGameAction.#rewriteVFuncMap.set(-1, AbstractGameAction.#NewGameActionVFuncProxys);
        }

        return origActionPtr;
    };

    static OnNativeObjectAlloc(ptrValue: number) {
        const vfuncs = AbstractGameAction.#rewriteVFuncMap.get(ptrValue);
        if (vfuncs !== undefined) {
            AbstractGameAction.#rewriteVFuncMap.delete(ptrValue);
        }
    }

    setValues(targetCreature: NativePointer, dmgInfo: NativePointer): void {
        this.getVirtualFunction(AbstractGameAction.#vfunctionMap.setValues)(this.rawPtr, targetCreature, dmgInfo);
    }

    setValues2(targetCreature: NativePointer, sourceCreature: NativePointer, amount: number): void {
        this.getVirtualFunction(AbstractGameAction.#vfunctionMap.setValues)(this.rawPtr, targetCreature, sourceCreature, amount);
    }

    isDeadOrEscaped(targetCreature: NativePointer): boolean {
        return this.getVirtualFunction(AbstractGameAction.#vfunctionMap.setValues)(this.rawPtr, targetCreature);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractGameAction.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractGameAction.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    tickDuration(): void {
        this.getVirtualFunction(AbstractGameAction.#vfunctionMap.tickDuration)(this.rawPtr);
    }

    shouldCancelAction(): boolean {
        return this.getVirtualFunction(AbstractGameAction.#vfunctionMap.shouldCancelAction)(this.rawPtr);
    }

    get duration() {
        return this.readOffsetFloat(0x8);
    }
    set duration(value) {
        this.writeOffsetFloat(0x8, value);
    }

    get startDuration() {
        return this.readOffsetFloat(0xc);
    }
    set startDuration(value) {
        this.writeOffsetFloat(0xc, value);
    }

    get actionType() {
        return this.readOffsetU32(0x10);
    }
    set actionType(value) {
        this.writeOffsetU32(0x10, value);
    }

    get attackEffect() {
        return this.readOffsetU32(0x14);
    }
    set attackEffect(value) {
        this.writeOffsetU32(0x14, value);
    }

    get damageType() {
        return this.readOffsetU32(0x18);
    }
    set damageType(value) {
        this.writeOffsetU32(0x18, value);
    }

    get isDone() {
        return this.readOffsetBool(0x1C);
    }
    set isDone(value) {
        this.writeOffsetBool(0x1C, value);
    }

    get amount() {
        return this.readOffsetS32(0x20);
    }
    set amount(value) {
        this.writeOffsetS32(0x20, value);
    }

    get target() {
        return this.readOffsetPointer(0x20);
    }
    set target(value) {
        this.writeOffsetPointer(0x20, value);
    }

    get source() {
        return this.readOffsetPointer(0x24);
    }
    set source(value) {
        this.writeOffsetPointer(0x24, value);
    }
}