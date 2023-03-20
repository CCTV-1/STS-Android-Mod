import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { ArrayList } from "./ArrayList.js";
import { CardGroupType } from "./enums.js";

export class CardGroup extends NativeClassWrapper {
    //NativePointer CardGroup *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    //ArrayList<AbstractCard>
    get group() {
        return new ArrayList(this.readOffsetPointer(0x8));
    }

    get type(): CardGroupType {
        return this.readOffsetU32(0x14);
    }
}