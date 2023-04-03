import { RoomPhase } from "../enums.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class AbstractRoom extends NativeClassWrapper {
    //NativePointer AbstractRoom *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /** ArrayList\<AbstractPotion\>* */
    get potions() {
        return this.readOffsetPointer(0xC);
    }

    /** ArrayList\<AbstractRelic\>* */
    get relics() {
        return this.readOffsetPointer(0x10);
    }

    /** ArrayList\<RewardItem\>* */
    get rewards() {
        return this.readOffsetPointer(0x14);
    }

    get phase(): RoomPhase {
        return this.readOffsetU32(0x1C);
    }

    get event() {
        return this.readOffsetPointer(0x20);
    }

    get monsters() {
        return this.readOffsetPointer(0x24);
    }
}