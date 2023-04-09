import { AbstractCreature } from "./AbstractCreature.js";

export class AbstractMonster extends AbstractCreature {
    //NativePointer AbstractMonster *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }
}