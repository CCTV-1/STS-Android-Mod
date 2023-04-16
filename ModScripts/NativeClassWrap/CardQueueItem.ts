import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class CardQueueItem extends NativeClassWrapper {    
    //NativePointer CardQueueItem *
    constructor(CThisPtr: NativePointer) {
        super(CThisPtr);
    }

    /** STS::AbstractCard* */
    get card() {
        return this.readOffsetPointer(0x8);
    }
    set card(value) {
        this.writeOffsetPointer(0x8, value);
    }

    /** STS::AbstractMonster* */
    get monster() {
        return this.readOffsetPointer(0xC);
    }
    set monster(value) {
        this.writeOffsetPointer(0xC, value);
    }

    /** STS::AbstractMonster* */
    get energyOnUse() {
        return this.readOffsetS32(0x10);
    }
    set energyOnUse(value) {
        this.writeOffsetS32(0x10, value);
    }

    get ignoreEnergyTotal() {
        return this.readOffsetBool(0x14);
    }
    set ignoreEnergyTotal(value) {
        this.writeOffsetBool(0x14, value);
    }

    get autoplayCard() {
        return this.readOffsetBool(0x15);
    }
    set autoplayCard(value) {
        this.writeOffsetBool(0x15, value);
    }

    get randomTarget() {
        return this.readOffsetBool(0x16);
    }
    set randomTarget(value) {
        this.writeOffsetBool(0x16, value);
    }

    get isEndTurnAutoPlay() {
        return this.readOffsetBool(0x17);
    }
    set isEndTurnAutoPlay(value) {
        this.writeOffsetBool(0x17, value);
    }
}