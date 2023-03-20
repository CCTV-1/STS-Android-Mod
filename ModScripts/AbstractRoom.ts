import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class AbstractRoom extends NativeClassWrapper {
    //NativePointer AbstractRoom *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }
}