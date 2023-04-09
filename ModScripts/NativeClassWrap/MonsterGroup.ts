import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { ArrayList } from "./ArrayList.js";

export class MonsterGroup extends NativeClassWrapper {
    //NativePointer MonsterGroup *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    /** ArrayList\<AbstractMonster\>* */
    get monsters() {
        return new ArrayList(this.readOffsetPointer(0x8));
    }

    /** AbstractMonster* */
    get hoveredMonster(): NativePointer {
        return this.readOffsetPointer(0xC);
    }
}