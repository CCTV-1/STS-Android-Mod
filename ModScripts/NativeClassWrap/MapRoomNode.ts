import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class MapRoomNode extends NativeClassWrapper {
    //NativePointer MapRoomNode *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    get offsetX() {
        return this.readOffsetFloat(0x8);
    }
    set offsetX(value) {
        this.writeOffsetFloat(0x8, value);
    }

    get offsetY() {
        return this.readOffsetFloat(0xC);
    }
    set offsetY(value) {
        this.writeOffsetFloat(0xC, value);
    }

    /** ArrayList\<MapRoomNode\>* */
    get parents() {
        return this.readOffsetPointer(0x24);
    }

    /** AbstractRoom* */
    get room() {
        return this.readOffsetPointer(0x38);
    }
}