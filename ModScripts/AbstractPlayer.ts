import { AbstractCard } from "./AbstractCard.js";
import { AbstractCreature } from "./AbstractCreature.js";
import { CardGroup } from "./CardGroup.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

export class AbstractPlayer extends AbstractCreature {
    //NativePointer AbstractPlayer *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    static #vfunctionMap = {
        /**
         * ```c
         * bool AbstractPlayer::isCursed(STS::AbstractPlayer * this);
         * ```
         */
        isCursed: new NativeFunctionInfo(0x340, 'bool', ['pointer']),
        /**
         * ```c
         * void AbstractPlayer::gainEnergy(STS::AbstractPlayer * this, int32_t energyAmount);
         * ```
         */
        gainEnergy: new NativeFunctionInfo(0x370, 'void', ['pointer', 'int32']), 
        /**
         * ```c
         * void AbstractPlayer::loseEnergy(STS::AbstractPlayer * this, int32_t energyAmount);
         * ```
         */
        loseEnergy: new NativeFunctionInfo(0x378, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractPlayer::draw(STS::AbstractPlayer * this, int32_t numCards);
         * ```
         */
        drawN: new NativeFunctionInfo(0x398, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractPlayer::draw(STS::AbstractPlayer * this);
         * ```
         */
        draw1: new NativeFunctionInfo(0x3A0, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPlayer::increaseMaxOrbSlots(STS::AbstractPlayer * this, int32_t amount, bool playSfx);
         * ```
         */
        increaseMaxOrbSlots: new NativeFunctionInfo(0x4C8, 'void', ['pointer', 'int32', 'bool']),
        /**
         * ```c
         * void AbstractPlayer::decreaseMaxOrbSlots(STS::AbstractPlayer * this, int32_t amount);
         * ```
         */
        decreaseMaxOrbSlots: new NativeFunctionInfo(0x4D0, 'void', ['pointer', 'int32']),
    };

    draw1() {
        let draw1Func = this.getVirtualFunction(AbstractPlayer.#vfunctionMap.draw1);
        draw1Func(this.rawPtr);
    }

    get chosenClass() {
        return this.readOffsetS32(0x104);
    }

    get gameHandSize() {
        return this.readOffsetS32(0x108);
    }
    set gameHandSize(value) {
        this.writeOffsetS32(0x108, value);
    }

    get masterHandSize() {
        return this.readOffsetS32(0x10C);
    }
    set masterHandSize(value) {
        this.writeOffsetS32(0x10C, value);
    }

    get startingMaxHP() {
        return this.readOffsetS32(0x110);
    }
    set startingMaxHP(value) {
        this.writeOffsetS32(0x110, value);
    }

    get masterDeck() {
        return new CardGroup(this.readOffsetPointer(0x114));
    }

    get drawPile() {
        return new CardGroup(this.readOffsetPointer(0x118));
    }

    get hand() {
        return new CardGroup(this.readOffsetPointer(0x11C));
    }

    get discardPile() {
        return new CardGroup(this.readOffsetPointer(0x120));
    }

    get exhaustPile() {
        return new CardGroup(this.readOffsetPointer(0x124));
    }

    get limbo() {
        return new CardGroup(this.readOffsetPointer(0x128));
    }

    get potionSlots() {
        return this.readOffsetS32(0x134);
    }
    set potionSlots(value) {
        this.writeOffsetS32(0x134, value);
    }

    get masterMaxOrbs() {
        return this.readOffsetS32(0x154);
    }
    set masterMaxOrbs(value) {
        this.writeOffsetS32(0x154, value);
    }

    get maxOrbs() {
        return this.readOffsetS32(0x158);
    }
    set maxOrbs(value) {
        this.writeOffsetS32(0x158, value);
    }
    
    get cardsPlayedThisTurn() {
        return this.readOffsetS32(0x160);
    }
    set cardsPlayedThisTurn(value) {
        this.writeOffsetS32(0x160, value);
    }
    
    get hoveredCard() {
        return new AbstractCard(this.readOffsetPointer(0x170));
    }

    get toHover() {
        return new AbstractCard(this.readOffsetPointer(0x174));
    }

    get cardInUse() {
        return new AbstractCard(this.readOffsetPointer(0x178));
    }
    
}