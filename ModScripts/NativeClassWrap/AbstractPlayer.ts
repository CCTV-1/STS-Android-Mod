import { AbstractCard } from "./AbstractCard.js";
import { AbstractCreature } from "./AbstractCreature.js";
import { ArrayList } from "./ArrayList.js";
import { CardGroup } from "./CardGroup.js";
import { PlayerClass } from "../enums.js";
import { JString } from "./JString.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { EnergyManager } from "./EnergyManager.js";

export class AbstractPlayer extends AbstractCreature {
    //NativePointer AbstractPlayer *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    static readonly #vfunctionMap = {
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
         * bool AbstractPlayer::hasRelic(STS::AbstractPlayer * this, JString * relicId);
         * ```
         */
        hasRelic: new NativeFunctionInfo(0x410, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         * bool AbstractPlayer::hasPotion(STS::AbstractPlayer * this, JString * potionId);
         * ```
         */
        hasPotion: new NativeFunctionInfo(0x420, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPlayer::evokeOrb(STS::AbstractPlayer * this);
         * ```
         */
        evokeOrb: new NativeFunctionInfo(0x488, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPlayer::evokeNewestOrb(STS::AbstractPlayer * this);
         * ```
         */
        evokeNewestOrb: new NativeFunctionInfo(0x490, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPlayer::evokeWithoutLosingOrb(STS::AbstractPlayer * this);
         * ```
         */
        evokeWithoutLosingOrb: new NativeFunctionInfo(0x498, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPlayer::removeNextOrb(STS::AbstractPlayer * this);
         * ```
         */
        removeNextOrb: new NativeFunctionInfo(0x4A0, 'void', ['pointer']),
        /**
         * ```c
         * bool AbstractPlayer::hasEmptyOrb(STS::AbstractPlayer * this);
         * ```
         */
        hasEmptyOrb: new NativeFunctionInfo(0x4A8, 'bool', ['pointer']),
        /**
         * ```c
         * bool AbstractPlayer::hasOrb(STS::AbstractPlayer * this);
         * ```
         */
        hasOrb: new NativeFunctionInfo(0x4B0, 'bool', ['pointer']),
        /**
         * ```c
         * int32_t AbstractPlayer::filledOrbCount(STS::AbstractPlayer * this);
         * ```
         */
        filledOrbCount: new NativeFunctionInfo(0x4B8, 'int32', ['pointer']),
        /**
         * ```c
         * void AbstractPlayer::removeNextOrb(STS::AbstractPlayer * this, AbstractOrb* orbToSet);
         * ```
         */
        channelOrb: new NativeFunctionInfo(0x4C0, 'void', ['pointer', 'pointer']),
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

    gainEnergy(energyAmount: number) {
        let gainEnergyFunc = this.getVirtualFunction(AbstractPlayer.#vfunctionMap.gainEnergy);
        gainEnergyFunc(this.rawPtr, energyAmount);
    }

    draw1() {
        let draw1Func = this.getVirtualFunction(AbstractPlayer.#vfunctionMap.draw1);
        draw1Func(this.rawPtr);
    }

    hasRelic(relicId: string): boolean {
        let hasRelicFunc = this.getVirtualFunction(AbstractPlayer.#vfunctionMap.hasRelic);
        let nativeStr = JString.CreateJString(relicId);
        return hasRelicFunc(this.rawPtr, nativeStr.rawPtr);
    }

    hasPotion(potionId: string): boolean {
        let hasPotionFunc = this.getVirtualFunction(AbstractPlayer.#vfunctionMap.hasPotion);
        let nativeStr = JString.CreateJString(potionId);
        return hasPotionFunc(this.rawPtr, nativeStr);
    }

    evokeOrb() {
        this.getVirtualFunction(AbstractPlayer.#vfunctionMap.evokeOrb)(this.rawPtr);
    }

    evokeNewestOrb() {
        this.getVirtualFunction(AbstractPlayer.#vfunctionMap.evokeNewestOrb)(this.rawPtr);
    }

    evokeWithoutLosingOrb() {
        this.getVirtualFunction(AbstractPlayer.#vfunctionMap.evokeWithoutLosingOrb)(this.rawPtr);
    }

    removeNextOrb() {
        this.getVirtualFunction(AbstractPlayer.#vfunctionMap.removeNextOrb)(this.rawPtr);
    }

    hasEmptyOrb(): boolean {
        return this.getVirtualFunction(AbstractPlayer.#vfunctionMap.hasEmptyOrb)(this.rawPtr);
    }

    hasOrb(): boolean {
        return this.getVirtualFunction(AbstractPlayer.#vfunctionMap.hasOrb)(this.rawPtr);
    }

    filledOrbCount(): number {
        return this.getVirtualFunction(AbstractPlayer.#vfunctionMap.filledOrbCount)(this.rawPtr);
    }

    channelOrb(orbToSet: NativePointer) {
        this.getVirtualFunction(AbstractPlayer.#vfunctionMap.removeNextOrb)(this.rawPtr, orbToSet);
    }
    
    get chosenClass(): PlayerClass {
        return this.readOffsetS32(0x104);
    }
    set chosenClass(value) {
        this.writeOffsetS32(0x104, value);
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

    /**
     *  type: ArrayList\<AbstractPotion\>
     */
    get potions() {
        return new ArrayList(this.readOffsetPointer(0x138));
    }

    get energy() {
        return new EnergyManager(this.readOffsetPointer(0x13C));
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
