import { NativeOrbs } from "../NativeFuncWrap/NativeOrbs.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

/**
 * thisPtr will is ```nullptr```.
 */
export type STSOrbCtor = (thisPtr: NativePointer) => NativePointer;

export interface NewOrbVFuncType {
    updateDescription: (thisPtr: NativePointer) => void,
    onEvoke: (thisPtr: NativePointer) => void,
    onStartOfTurn?: (thisPtr: NativePointer) => void,
    onEndOfTurn?: (thisPtr: NativePointer) => void,
    applyFocus?: (thisPtr: NativePointer) => void,
    makeCopy: (thisPtr: NativePointer) => NativePointer,
    //update: (thisPtr: NativePointer) => void,
    //updateAnimation: (thisPtr: NativePointer) => void,
    //setSlot: (thisPtr: NativePointer, slotNum: number, maxOrbs: number) => void,
    render: (thisPtr: NativePointer, spriteBatchPtr: NativePointer) => void,
    triggerEvokeAnimation?: (thisPtr: NativePointer) => void,
    //showEvokeValue?: (thisPtr: NativePointer) => void,
    //hideEvokeValues?: (thisPtr: NativePointer) => void,
    playChannelSFX: (thisPtr: NativePointer) => void,
    onObjectDector?: (thisPtrValue: number) => void,
};

export class AbstractOrb extends NativeClassWrapper {
    //NativePointer AbstractOrb *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * new orb id => (v func name => v func)
     * 
     * NativePointer current don't exist toUInt64, Frida(Duktape) current don't support BigInt,
     * so current proxy implement need all C pointer size equal sizeof(uint32_t).
     * 
     * use ptr.toString() or new Uint64(ptr.toString()) can support pointer size equal sizeof(uint64_t) architecture.
     * but there is more performance overhead.
     */
    static #rewriteVFuncMap = new Map<number, NewOrbVFuncType>();

    static readonly #NewOrbVFuncProxys: NewOrbVFuncType = {
        updateDescription: (thisPtr: NativePointer) => {
            let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (orbVFuncMap !== undefined) {
                const Func = orbVFuncMap.updateDescription;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onEvoke: (thisPtr: NativePointer) => {
            let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (orbVFuncMap !== undefined) {
                const Func = orbVFuncMap.onEvoke;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onStartOfTurn: (thisPtr: NativePointer) => {
            let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (orbVFuncMap !== undefined) {
                const Func = orbVFuncMap.onStartOfTurn;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onEndOfTurn: (thisPtr: NativePointer) => {
            let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (orbVFuncMap !== undefined) {
                const Func = orbVFuncMap.onEndOfTurn;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        applyFocus: (thisPtr: NativePointer) => {
            let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (orbVFuncMap !== undefined) {
                const Func = orbVFuncMap.applyFocus;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (orbVFuncMap !== undefined) {
                const Func = orbVFuncMap.makeCopy;
                if (Func !== undefined) {
                    return Func(thisPtr);
                }
            }

            const wrapOrb = new AbstractOrb(thisPtr);
            PatchHelper.LogV(wrapOrb.ID.content + " miss register Orb::makeCopy vfunc???");
            return NULL;
        },
        //update: (thisPtr: NativePointer) => {
        //    let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
        //    if (orbVFuncMap !== undefined) {
        //        const Func = orbVFuncMap.update;
        //        if (Func !== undefined) {
        //            Func(thisPtr);
        //        }
        //    }
        //},
        //updateAnimation: (thisPtr: NativePointer) => {
        //    let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
        //    if (orbVFuncMap !== undefined) {
        //        const Func = orbVFuncMap.updateAnimation;
        //        if (Func !== undefined) {
        //            Func(thisPtr);
        //        }
        //    }
        //},
        //setSlot: (thisPtr: NativePointer, slotNum: number, maxOrbs: number) => {
        //    let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
        //    if (orbVFuncMap !== undefined) {
        //        const Func = orbVFuncMap.setSlot;
        //        if (Func !== undefined) {
        //            Func(thisPtr, slotNum, maxOrbs);
        //        }
        //    }
        //},
        render: (thisPtr: NativePointer, spriteBatchPtr: NativePointer) => {
            let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (orbVFuncMap !== undefined) {
                const Func = orbVFuncMap.render;
                if (Func !== undefined) {
                    Func(thisPtr, spriteBatchPtr);
                }
            }
        },
        triggerEvokeAnimation: (thisPtr: NativePointer) => {
            let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (orbVFuncMap !== undefined) {
                const Func = orbVFuncMap.triggerEvokeAnimation;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        //showEvokeValue?: (thisPtr: NativePointer) => {
        //    let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
        //    if (orbVFuncMap !== undefined) {
        //        const Func = orbVFuncMap.showEvokeValue;
        //        if (Func !== undefined) {
        //            Func(thisPtr);
        //        }
        //    }
        //},
        //hideEvokeValues?: (thisPtr: NativePointer) => {
        //    let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
        //    if (orbVFuncMap !== undefined) {
        //        const Func = orbVFuncMap.hideEvokeValues;
        //        if (Func !== undefined) {
        //            Func(thisPtr);
        //        }
        //    }
        //},
        playChannelSFX: (thisPtr: NativePointer) => {
            let orbVFuncMap = AbstractOrb.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (orbVFuncMap !== undefined) {
                const Func = orbVFuncMap.playChannelSFX;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void AbstractOrb::updateDescription(STS::AbstractCard* this)
         * ```
         */
        updateDescription: new NativeFunctionInfo(0x20, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::onEvoke(STS::AbstractCard* this)
         * ```
         */
        onEvoke: new NativeFunctionInfo(0x28, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::onStartOfTurn(STS::AbstractCard* this)
         * ```
         */
        onStartOfTurn: new NativeFunctionInfo(0x30, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::onEndOfTurn(STS::AbstractCard* this)
         * ```
         */
        onEndOfTurn: new NativeFunctionInfo(0x38, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::applyFocus(STS::AbstractCard* this)
         * ```
         */
        applyFocus: new NativeFunctionInfo(0x40, 'void', ['pointer']),
        /**
         * ```c
         * AbstractOrb* AbstractOrb::makeCopy(STS::AbstractCard* this)
         * ```
         */
        makeCopy: new NativeFunctionInfo(0x48, 'pointer', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::update(STS::AbstractCard* this)
         * ```
         */
        update: new NativeFunctionInfo(0x50, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::updateAnimation(STS::AbstractCard* this)
         * ```
         */
        updateAnimation: new NativeFunctionInfo(0x58, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::setSlot(STS::AbstractCard* this, int32_t slotNum, int32_t maxOrbs)
         * ```
         */
        setSlot: new NativeFunctionInfo(0x60, 'void', ['pointer', 'int32', 'int32']),
        /**
         * ```c
         * void AbstractOrb::render(STS::AbstractCard* this, GDX::graphics::g2d::SpriteBatch* sb)
         * ```
         */
        render: new NativeFunctionInfo(0x68, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractOrb::renderText(STS::AbstractCard* this, GDX::graphics::g2d::SpriteBatch* sb)
         * ```
         */
        renderText: new NativeFunctionInfo(0x70, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractOrb::triggerEvokeAnimation(STS::AbstractCard* this)
         * ```
         */
        triggerEvokeAnimation: new NativeFunctionInfo(0x78, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::showEvokeValue(STS::AbstractCard* this)
         * ```
         */
        showEvokeValue: new NativeFunctionInfo(0x80, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::hideEvokeValues(STS::AbstractCard* this)
         * ```
         */
        hideEvokeValues: new NativeFunctionInfo(0x88, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractOrb::playChannelSFX(STS::AbstractCard* this)
         * ```
         */
        playChannelSFX: new NativeFunctionInfo(0x90, 'void', ['pointer'])
    };

    static #vFuncNamePrefix = "AbstractOrb_";

    static NewOrbCtor(newFuncs: NewOrbVFuncType) {
        const origOrbPtr = NativeOrbs.AbstractOrb.Ctor();

        //previous action object memory maybe will be reused, so origActionPtr value not necessarily unique.
        AbstractOrb.#rewriteVFuncMap.set(origOrbPtr.toUInt32(), newFuncs);

        if (!AbstractOrb.#rewriteVFuncMap.has(-1)) {
            const VFuncMap = AbstractOrb.#vfunctionMap;
            const VFuncProxys = AbstractOrb.#NewOrbVFuncProxys;
            const wrapOrb = new AbstractOrb(origOrbPtr);

            let funcName = "AbstractOrbVFuncProxy_updateDescription";
            wrapOrb.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.updateDescription, VFuncProxys.updateDescription);
            funcName = "AbstractOrbVFuncProxy_onEvoke";
            wrapOrb.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onEvoke, VFuncProxys.onEvoke);
            funcName = "AbstractOrbVFuncProxy_onStartOfTurn";
            wrapOrb.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onStartOfTurn, VFuncProxys.onStartOfTurn);
            funcName = "AbstractOrbVFuncProxy_onEndOfTurn";
            wrapOrb.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onEndOfTurn, VFuncProxys.onEndOfTurn);
            funcName = "AbstractOrbVFuncProxy_applyFocus";
            wrapOrb.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.applyFocus, VFuncProxys.applyFocus);
            funcName = "AbstractOrbVFuncProxy_makeCopy";
            wrapOrb.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), VFuncMap.makeCopy, VFuncProxys.makeCopy);
            funcName = "AbstractOrbVFuncProxy_render";
            wrapOrb.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.render, VFuncProxys.render);
            funcName = "AbstractOrbVFuncProxy_triggerEvokeAnimation";
            wrapOrb.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.triggerEvokeAnimation, VFuncProxys.triggerEvokeAnimation);
            funcName = "AbstractOrbVFuncProxy_playChannelSFX";
            wrapOrb.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.playChannelSFX, VFuncProxys.playChannelSFX);

            AbstractOrb.#rewriteVFuncMap.set(-1, AbstractOrb.#NewOrbVFuncProxys);
        }
    }

    static OnNativeObjectAlloc(ptrValue: number) {
        const vfuncs = AbstractOrb.#rewriteVFuncMap.get(ptrValue);
        if (vfuncs !== undefined) {
            AbstractOrb.#rewriteVFuncMap.delete(ptrValue);
        }
    }

    get name() {
        return this.readOffsetJString(0x8);
    }
    set name(value) {
        this.writeOffsetJString(0x8, value);
    }

    get description() {
        return this.readOffsetJString(0xC);
    }
    set description(value) {
        this.writeOffsetJString(0xC, value);
    }

    get ID() {
        return this.readOffsetJString(0x10);
    }
    set ID(value) {
        this.writeOffsetJString(0x10, value);
    }

    /** ArrayList\<PowerTip\>* */
    get tips() {
        return this.readOffsetPointer(0x14);
    }

    get evokeAmount() {
        return this.readOffsetS32(0x18);
    }
    set evokeAmount(value) {
        this.writeOffsetS32(0x18, value);
    }

    get passiveAmount() {
        return this.readOffsetS32(0x1C);
    }
    set passiveAmount(value) {
        this.writeOffsetS32(0x1C, value);
    }

    get baseEvokeAmount() {
        return this.readOffsetS32(0x20);
    }
    set baseEvokeAmount(value) {
        this.writeOffsetS32(0x20, value);
    }

    get basePassiveAmount() {
        return this.readOffsetS32(0x24);
    }
    set basePassiveAmount(value) {
        this.writeOffsetS32(0x24, value);
    }

    get cX() {
        return this.readOffsetFloat(0x28);
    }
    set cX(value) {
        this.writeOffsetFloat(0x28, value);
    }

    get cY() {
        return this.readOffsetFloat(0x2C);
    }
    set cY(value) {
        this.writeOffsetFloat(0x2C, value);
    }

    get yX() {
        return this.readOffsetFloat(0x30);
    }
    set yX(value) {
        this.writeOffsetFloat(0x30, value);
    }

    get tY() {
        return this.readOffsetFloat(0x34);
    }
    set tY(value) {
        this.writeOffsetFloat(0x34, value);
    }

    /** GDX::Color* */
    get c() {
        return this.readOffsetPointer(0x38);
    }

    /** GDX::Color* */
    get shineColor() {
        return this.readOffsetPointer(0x3C);
    }

    /** Hitbox* */
    get hb() {
        return this.readOffsetPointer(0x40);
    }

    /** GDX::Texture* */
    get img() {
        return this.readOffsetPointer(0x44);
    }

    /** BobEffect* */
    get bobEffect() {
        return this.readOffsetPointer(0x48);
    }

    get angle() {
        return this.readOffsetFloat(0x4C);
    }
    set angle(value) {
        this.writeOffsetFloat(0x4C, value);
    }

    get scale() {
        return this.readOffsetFloat(0x50);
    }
    set scale(value) {
        this.writeOffsetFloat(0x50, value);
    }

    get fontScale() {
        return this.readOffsetFloat(0x54);
    }
    set fontScale(value) {
        this.writeOffsetFloat(0x54, value);
    }

    get showEvokeValue() {
        return this.readOffsetBool(0x58);
    }
    set showEvokeValue(value) {
        this.writeOffsetBool(0x58, value);
    }

    get channelAnimTimer() {
        return this.readOffsetFloat(0x5C);
    }
    set channelAnimTimer(value) {
        this.writeOffsetFloat(0x5C, value);
    }
}