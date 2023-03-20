import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class AbstractPotion extends NativeClassWrapper {
    //NativePointer AbstractPotion *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }
}