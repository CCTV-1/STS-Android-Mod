import { AbstractCreature } from "./AbstractCreature.js";
import { CardGroup } from "./CardGroup.js";

export class AbstractPlayer extends AbstractCreature {
    //NativePointer AbstractPlayer *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    get masterDeck() {
        return new CardGroup(this.readOffsetPointer(0x114));
    }
}