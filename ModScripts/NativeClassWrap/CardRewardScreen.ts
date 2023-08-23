import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class CardRewardScreen extends NativeClassWrapper {
    //NativePointer CardRewardScreen *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }
    static readonly #vfunctionMap = {
        /**
         * ```c
         * void CardRewardScreen::open(CardRewardScreen* thisPtr, ArrayList<AbstractCard>* cards, RewardItem *rItem, JString* header)
         * ```
         */
        open: new NativeFunctionInfo(0x40, 'void', ['pointer', 'pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * void CardRewardScreen::customCombatOpen(CardRewardScreen* thisPtr, ArrayList<AbstractCard>* choices, JString* text, bool skippable)
         * ```
         */
        customCombatOpen: new NativeFunctionInfo(0x48, 'void', ['pointer', 'pointer', 'pointer', 'bool']),
        /**
         * ```c
         * void CardRewardScreen::chooseOneOpen(CardRewardScreen* thisPtr, ArrayList<AbstractCard>* choices)
         * ```
         */
        chooseOneOpen: new NativeFunctionInfo(0x50, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardRewardScreen::draftOpen(CardRewardScreen* thisPtr
         * ```
         */
        draftOpen: new NativeFunctionInfo(0x58, 'void', ['pointer']),
    };

    open(cards: NativePointer, rItem: NativePointer, header: string) {
        const nativeHeader = NativeSTDLib.JString.Ctor(header);
        this.getVirtualFunction(CardRewardScreen.#vfunctionMap.open)(this.rawPtr, cards, rItem, nativeHeader);
    };

    customCombatOpen(choices: NativePointer, text: string, skippable: boolean) {
        const nativeText = NativeSTDLib.JString.Ctor(text);
        this.getVirtualFunction(CardRewardScreen.#vfunctionMap.customCombatOpen)(this.rawPtr, choices, nativeText, Number(skippable));
    };

    chooseOneOpen(choices: NativePointer) {
        this.getVirtualFunction(CardRewardScreen.#vfunctionMap.chooseOneOpen)(this.rawPtr, choices);
    };

    draftOpen() {
        this.getVirtualFunction(CardRewardScreen.#vfunctionMap.draftOpen)(this.rawPtr);
    };

    /** `ArrayList<AbstractCard>*` */
    get rewardGroup() {
        return this.readOffsetPointer(0xC);
    }

    /** `AbstractCard*` */
    get discoveryCard() {
        return this.readOffsetPointer(0x10);
    }
    set discoveryCard(value) {
        this.writeOffsetPointer(0x10, value);
    }
    
    get hasTakenAll() {
        return this.readOffsetBool(0x14);
    }
    set hasTakenAll(value) {
        this.writeOffsetBool(0x14, value)
    }

    get cardOnly() {
        return this.readOffsetBool(0x15);
    }
    set cardOnly(value) {
        this.writeOffsetBool(0x15, value)
    }

    /** `RewardItem*` */
    get rItem() {
        return this.readOffsetPointer(0x18);
    }

    get draft() {
        return this.readOffsetBool(0x1C);
    }
    set draft(value) {
        this.writeOffsetBool(0x1C, value)
    }

    get discovery() {
        return this.readOffsetBool(0x1D);
    }
    set discovery(value) {
        this.writeOffsetBool(0x1D, value)
    }

    get chooseOne() {
        return this.readOffsetBool(0x1E);
    }
    set chooseOne(value) {
        this.writeOffsetBool(0x1E, value)
    }

    get skippable() {
        return this.readOffsetBool(0x1F);
    }
    set skippable(value) {
        this.writeOffsetBool(0x1F, value)
    }

    get header() {
        return this.readOffsetJString(0x20);
    }

    get draftCount() {
        return this.readOffsetS32(0x38);
    }
}