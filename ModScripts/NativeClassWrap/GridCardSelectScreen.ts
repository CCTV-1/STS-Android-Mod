import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class GridCardSelectScreen extends NativeClassWrapper {
    //NativePointer GridCardSelectScreen *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }
    static readonly #vfunctionMap = {
        /**
         * ```c
         * void GridCardSelectScreen::open(GridCardSelectScreen* thisPtr, CardGroup* group, int32_t numCards, bool anyNumber, JString* msg)
         * ```
         */
        open: new NativeFunctionInfo(0x28, 'void', ['pointer', 'pointer', 'int32', 'bool', 'pointer']),
        /**
         * ```c
         * void GridCardSelectScreen::open(GridCardSelectScreen* thisPtr, CardGroup* group, int32_t numCards, JString* tipMsg, bool forUpgrade, bool forTransform, bool canCancel, bool forPurge)
         * ```
         * 
         * 0x38 open3 `open2(thisPtr, group, numCards, tipMsg, forUpgrade, forTransform, true, false);`
         * 0x40 open4 `open2(thisPtr, group, numCards, tipMsg, forUpgrade, false, true, false);`
         */
        open2: new NativeFunctionInfo(0x30, 'void', ['pointer', 'pointer', 'int32', 'pointer', 'bool', 'bool', 'bool', 'bool']),
        /**
         * ```c
         * void GridCardSelectScreen::openConfirmationGrid(GridCardSelectScreen* thisPtr, CardGroup* group, JString* tipMsg)
         * ```
         */
        openConfirmationGrid: new NativeFunctionInfo(0x48, 'void', ['pointer', 'pointer', 'pointer']),
    };

    open(groupPtr: NativePointer, numCards: number, anyNumber: boolean, msg: string) {
        const nativeMsg = NativeSTDLib.JString.Ctor(msg);
        this.getVirtualFunction(GridCardSelectScreen.#vfunctionMap.open)(this.rawPtr, groupPtr, numCards, Number(anyNumber), nativeMsg);
    };

    open2(groupPtr: NativePointer, numCards: number, tipMsg: string, forUpgrade: boolean, forTransform: boolean, canCancel: boolean, forPurge: boolean) {
        const nativeTipMsg = NativeSTDLib.JString.Ctor(tipMsg);
        this.getVirtualFunction(GridCardSelectScreen.#vfunctionMap.open2)(this.rawPtr, groupPtr, numCards, nativeTipMsg, Number(forUpgrade), Number(forTransform), Number(canCancel), Number(forPurge));
    };

    openConfirmationGrid(groupPtr: NativePointer, tipMsg: string) {
        const nativeTipMsg = NativeSTDLib.JString.Ctor(tipMsg);
        this.getVirtualFunction(GridCardSelectScreen.#vfunctionMap.openConfirmationGrid)(this.rawPtr, groupPtr, nativeTipMsg);
    };

    get grabStartY() {
        return this.readOffsetFloat(0x8);
    }
    set grabStartY(value) {
        this.writeOffsetFloat(0x8, value);
    }

    get currentDiffY() {
        return this.readOffsetFloat(0xC);
    }
    set currentDiffY(value) {
        this.writeOffsetFloat(0xC, value);
    }

    /** ArrayList\<AbstractCard\>* */
    get selectedCards() {
        return this.readOffsetPointer(0x10);
    }
    set selectedCards(value) {
        this.writeOffsetPointer(0x10, value);
    }

    /** CardGroup* */
    get targetGroup() {
        return this.readOffsetPointer(0x14);
    }
    set targetGroup(value) {
        this.writeOffsetPointer(0x14, value);
    }

    /** AbstractCard* */
    get hoveredCard() {
        return this.readOffsetPointer(0x18);
    }
    set hoveredCard(value) {
        this.writeOffsetPointer(0x18, value);
    }

    /** AbstractCard* */
    get upgradePreviewCard() {
        return this.readOffsetPointer(0x1C);
    }
    set upgradePreviewCard(value) {
        this.writeOffsetPointer(0x1C, value);
    }

    get numCards() {
        return this.readOffsetS32(0x20);
    }
    set numCards(value) {
        this.writeOffsetS32(0x20, value);
    }

    get cardSelectAmount() {
        return this.readOffsetS32(0x24);
    }
    set cardSelectAmount(value) {
        this.writeOffsetS32(0x24, value);
    }

    get scrollLowerBound() {
        return this.readOffsetFloat(0x28);
    }
    set scrollLowerBound(value) {
        this.writeOffsetFloat(0x28, value);
    }

    get scrollUpperBound() {
        return this.readOffsetFloat(0x2C);
    }
    set scrollUpperBound(value) {
        this.writeOffsetFloat(0x2C, value);
    }

    get grabbedScreen() {
        return this.readOffsetBool(0x30);
    }
    set grabbedScreen(value) {
        this.writeOffsetBool(0x30, value);
    }

    get canCancel() {
        return this.readOffsetBool(0x31);
    }
    set canCancel(value) {
        this.writeOffsetBool(0x31, value);
    }

    get forUpgrade() {
        return this.readOffsetBool(0x32);
    }
    set forUpgrade(value) {
        this.writeOffsetBool(0x32, value);
    }

    get forTransform() {
        return this.readOffsetBool(0x33);
    }
    set forTransform(value) {
        this.writeOffsetBool(0x33, value);
    }

    get forPurge() {
        return this.readOffsetBool(0x34);
    }
    set forPurge(value) {
        this.writeOffsetBool(0x34, value);
    }

    get confirmScreenUp() {
        return this.readOffsetBool(0x35);
    }
    set confirmScreenUp(value) {
        this.writeOffsetBool(0x35, value);
    }

    get isJustForConfirming() {
        return this.readOffsetBool(0x36);
    }
    set isJustForConfirming(value) {
        this.writeOffsetBool(0x36, value);
    }

    get confirmButton() {
        return this.readOffsetPointer(0x38);
    }

    get peekButton() {
        return this.readOffsetPointer(0x3C);
    }

    get tipMsg() {
        return this.readOffsetJString(0x40);
    }
    set tipMsg(value) {
        this.writeOffsetJString(0x40, value);
    }

    get lastTip() {
        return this.readOffsetJString(0x44);
    }
    set lastTip(value) {
        this.writeOffsetJString(0x44, value);
    }

    get ritualAnimTimer() {
        return this.readOffsetFloat(0x48);
    }
    set ritualAnimTimer(value) {
        this.writeOffsetFloat(0x48, value);
    }

    get prevDeckSize() {
        return this.readOffsetS32(0x4C);
    }
    set prevDeckSize(value) {
        this.writeOffsetS32(0x4C, value);
    }

    get cancelWasOn() {
        return this.readOffsetBool(0x50);
    }
    set cancelWasOn(value) {
        this.writeOffsetBool(0x50, value);
    }

    get anyNumber() {
        return this.readOffsetBool(0x51);
    }
    set anyNumber(value) {
        this.writeOffsetBool(0x51, value);
    }

    get forClarity() {
        return this.readOffsetBool(0x52);
    }
    set forClarity(value) {
        this.writeOffsetBool(0x52, value);
    }

    get cancelText() {
        return this.readOffsetJString(0x54);
    }
    set cancelText(value) {
        this.writeOffsetJString(0x54, value);
    }

    get scrollBar() {
        return this.readOffsetPointer(0x58);
    }

    /** AbstractCard* */
    get controllerCard() {
        return this.readOffsetPointer(0x5C);
    }
    set controllerCard(value) {
        this.writeOffsetPointer(0x5C, value);
    }

    get arrowScale1() {
        return this.readOffsetFloat(0x60);
    }
    set arrowScale1(value) {
        this.writeOffsetFloat(0x60, value);
    }

    get arrowScale2() {
        return this.readOffsetFloat(0x64);
    }
    set arrowScale2(value) {
        this.writeOffsetFloat(0x64, value);
    }

    get arrowScale3() {
        return this.readOffsetFloat(0x68);
    }
    set arrowScale3(value) {
        this.writeOffsetFloat(0x68, value);
    }

    get arrowTimer() {
        return this.readOffsetFloat(0x6C);
    }
    set arrowTimer(value) {
        this.writeOffsetFloat(0x6C, value);
    }
}