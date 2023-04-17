import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class HandCardSelectScreen extends NativeClassWrapper {
    //NativePointer HandCardSelectScreen *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void HandCardSelectScreen::open(HandCardSelectScreen* thisPtr, JString* msg, int32_t amount, bool anyNumber, bool canPickZero, bool forTransform, bool forUpgrade, bool upTo)
         * ```
         * 
         * 0x38 open1 `open(thisPtr, msg, amount, anyNumber, canPickZero, forTransform, forUpgrade, false);`
         * 0x40 open2 `open(thisPtr, msg, amount, anyNumber, canPickZero, forTransform, false, false);`
         * 0x50 open4 `open(thisPtr, msg, amount, anyNumber, canPickZero, false, false, false);`
         */
        open: new NativeFunctionInfo(0x30, 'void', ['pointer', 'pointer', 'int32', 'bool', 'bool', 'bool', 'bool', 'bool']),
        /**
         * ```c
         * void HandCardSelectScreen::open(HandCardSelectScreen* thisPtr, JString* msg, int32_t amount, bool anyNumber, bool canPickZero)
         * ```
         */
        open3: new NativeFunctionInfo(0x48, 'void', ['pointer', 'pointer', 'int32', 'bool', 'bool']),
    };

    open(msg: string, amount: number, anyNumber: boolean, canPickZero: boolean, forTransform: boolean, forUpgrade: boolean, upTo: boolean) {
        const nativeMsg = NativeSTDLib.JString.Ctor(msg);
        this.getVirtualFunction(HandCardSelectScreen.#vfunctionMap.open)(this.rawPtr, nativeMsg, amount, Number(anyNumber), Number(canPickZero), Number(forTransform),
            Number(forUpgrade), Number(upTo));
    };

    open2(msg: string, amount: number, anyNumber: boolean, canPickZero: boolean) {
        const nativeMsg = NativeSTDLib.JString.Ctor(msg);
        this.getVirtualFunction(HandCardSelectScreen.#vfunctionMap.open3)(this.rawPtr, nativeMsg, amount, Number(anyNumber), Number(canPickZero));
    };

    get numCardsToSelect() {
        return this.readOffsetS32(0x8);
    };
    set numCardsToSelect(value) {
        this.writeOffsetS32(0x8, value);
    };

    /** CardGroup * */
    get selectedCards() {
        return this.readOffsetPointer(0xC);
    };
    set selectedCards(value) {
        this.writeOffsetPointer(0xC, value);
    };

    /** AbstractCard * */
    get hoveredCard() {
        return this.readOffsetPointer(0x10);
    };
    set hoveredCard(value) {
        this.writeOffsetPointer(0x10, value);
    };

    /** AbstractCard * */
    get upgradePreviewCard() {
        return this.readOffsetPointer(0x14);
    };
    set upgradePreviewCard(value) {
        this.writeOffsetPointer(0x14, value);
    };

    get selectionReason() {
        return this.readOffsetJString(0x18);
    };
    set selectionReason(value) {
        this.writeOffsetJString(0x18, value);
    };

    get wereCardsRetrieved() {
        return this.readOffsetBool(0x1C);
    };
    set wereCardsRetrieved(value) {
        this.writeOffsetBool(0x1C, value);
    };

    get canPickZero() {
        return this.readOffsetBool(0x1D);
    };
    set canPickZero(value) {
        this.writeOffsetBool(0x1D, value);
    };

    get upTo() {
        return this.readOffsetBool(0x1E);
    };
    set upTo(value) {
        this.writeOffsetBool(0x1E, value);
    };

    get message() {
        return this.readOffsetJString(0x20);
    };
    set message(value) {
        this.writeOffsetJString(0x20, value);
    };

    get confirmButton() {
        return this.readOffsetPointer(0x24);
    };

    get peekButton() {
        return this.readOffsetPointer(0x28);
    };

    get anyNumber() {
        return this.readOffsetBool(0x2C);
    };
    set anyNumber(value) {
        this.writeOffsetBool(0x2C, value);
    };

    get forTransform() {
        return this.readOffsetBool(0x2D);
    };
    set forTransform(value) {
        this.writeOffsetBool(0x2D, value);
    };

    get forUpgrade() {
        return this.readOffsetBool(0x2E);
    };
    set forUpgrade(value) {
        this.writeOffsetBool(0x2E, value);
    };

    get numSelected() {
        return this.readOffsetS32(0x30);
    }
    set numSelected(value) {
        this.writeOffsetS32(0x30, value);
    }

    get waitThenClose() {
        return this.readOffsetBool(0x34);
    };
    set waitThenClose(value) {
        this.writeOffsetBool(0x34, value);
    };

    get waitToCloseTimer() {
        return this.readOffsetFloat(0x38);
    };
    set waitToCloseTimer(value) {
        this.writeOffsetFloat(0x38, value);
    };

    /** CardGroup * */
    get hand() {
        return this.readOffsetPointer(0x3C);
    };
    set hand(value) {
        this.writeOffsetPointer(0x3C, value);
    };

    get arrowScale1() {
        return this.readOffsetFloat(0x40);
    };
    set arrowScale1(value) {
        this.writeOffsetFloat(0x40, value);
    };

    get arrowScale2() {
        return this.readOffsetFloat(0x44);
    };
    set arrowScale2(value) {
        this.writeOffsetFloat(0x44, value);
    };

    get arrowScale3() {
        return this.readOffsetFloat(0x48);
    };
    set arrowScale3(value) {
        this.writeOffsetFloat(0x48, value);
    };

    get arrowTimer() {
        return this.readOffsetFloat(0x4C);
    };
    set arrowTimer(value) {
        this.writeOffsetFloat(0x4C, value);
    };
}