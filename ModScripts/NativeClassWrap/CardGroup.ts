import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { ArrayList } from "./ArrayList.js";
import { CardGroupType, CardRarity, CardType } from "../enums.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";

export class CardGroup extends NativeClassWrapper {
    //NativePointer CardGroup *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void CardGroup::clear(CardGroup* this)
         * ```
         */
        clear: new NativeFunctionInfo(0x38, 'void', ['pointer']),
        /**
         * ```c
         * void CardGroup::contains(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        contains: new NativeFunctionInfo(0x40, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::removeCard(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        removeCard: new NativeFunctionInfo(0x78, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::removeCard(CardGroup* this, JString* cardId)
         * ```
         */
        removeCard2: new NativeFunctionInfo(0x80, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::addToHand(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        addToHand: new NativeFunctionInfo(0x88, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::addToTop(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0xB0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::addToBottom(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        addToBottom: new NativeFunctionInfo(0xB8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::addToRandomSpot(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        addToRandomSpot: new NativeFunctionInfo(0xC0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * AbstractCard* CardGroup::getTopCad(CardGroup* this)
         * ```
         */
        getTopCard: new NativeFunctionInfo(0xC8, 'pointer', ['pointer']),
        /**
         * ```c
         * AbstractCard* CardGroup::getBottomCard(CardGroup* this)
         * ```
         */
        getBottomCard: new NativeFunctionInfo(0xD8, 'pointer', ['pointer']),
        /**
         * ```c
         * AbstractCard* CardGroup::getRandomCard(CardGroup* this, Random* rng)
         * ```
         */
        getRandomCard: new NativeFunctionInfo(0xE8, 'pointer', ['pointer', 'pointer']),
        /**
         * ```c
         * AbstractCard* CardGroup::getRandomCard(CardGroup* this, bool useRng)
         * ```
         */
        getRandomCard2: new NativeFunctionInfo(0xF0, 'pointer', ['pointer', 'bool']),
        /**
         * ```c
         * AbstractCard* CardGroup::getRandomCard(CardGroup* this, bool useRng, CardRarity rarity)
         * ```
         */
        getRandomCard3: new NativeFunctionInfo(0xF8, 'pointer', ['pointer', 'bool', 'uint32']),
        /**
         * ```c
         * AbstractCard* CardGroup::getRandomCard(CardGroup* this, Random* rng, CardRarity rarity)
         * ```
         */
        getRandomCard4: new NativeFunctionInfo(0x100, 'pointer', ['pointer', 'pointer', 'uint32']),
        /**
         * ```c
         * AbstractCard* CardGroup::getRandomCard(CardGroup* this, CardType type, bool useRng)
         * ```
         */
        getRandomCard5: new NativeFunctionInfo(0x108, 'pointer', ['pointer', 'uint32', 'bool']),
        /**
         * ```c
         * void CardGroup::removeTopCard(CardGroup* this)
         * ```
         */
        removeTopCard: new NativeFunctionInfo(0x110, 'void', ['pointer']),
        /**
         * ```c
         * void CardGroup::shuffle(CardGroup* this)
         * ```
         */
        shuffle: new NativeFunctionInfo(0x118, 'void', ['pointer']),
        /**
         * ```c
         * void CardGroup::shuffle(CardGroup* this, Random* rng)
         * ```
         */
        shuffle2: new NativeFunctionInfo(0x120, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::moveToDiscardPile(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        moveToDiscardPile: new NativeFunctionInfo(0x190, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::moveToExhaustPile(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        moveToExhaustPile: new NativeFunctionInfo(0x1A0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::moveToHand(CardGroup* this, AbstractCard* cardPtr, CardGroup* groupPtr)
         * ```
         */
        moveToHand: new NativeFunctionInfo(0x1A8, 'void', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::moveToHand(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        moveToHand2: new NativeFunctionInfo(0x1B0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void CardGroup::moveToDeck(CardGroup* this, AbstractCard* cardPtr, bool randomSpot)
         * ```
         */
        moveToDeck: new NativeFunctionInfo(0x1B8, 'void', ['pointer', 'pointer', 'bool']),
        /**
         * ```c
         * void CardGroup::moveToBottomOfDeck(CardGroup* this, AbstractCard* cardPtr)
         * ```
         */
        moveToBottomOfDeck: new NativeFunctionInfo(0x1C0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * bool CardGroup::isEmpty(CardGroup* this)
         * ```
         */
        isEmpty: new NativeFunctionInfo(0x1C8, 'bool', ['pointer']),
        /**
         * ```c
         * int32_t CardGroup::size(CardGroup* this)
         * ```
         */
        size: new NativeFunctionInfo(0x1D8, 'int32', ['pointer']),
    };

    clear(): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.clear)(this.rawPtr);
    }

    contains(cardPtr: NativePointer): boolean {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.contains)(this.rawPtr, cardPtr);
    }

    removeCard(cardPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.removeCard)(this.rawPtr, cardPtr);
    }

    removeCard2(cardId: string): void {
        const nativeId = NativeSTDLib.JString.Ctor(cardId);
        this.getVirtualFunction(CardGroup.#vfunctionMap.removeCard)(this.rawPtr, nativeId);
    }

    addToHand(cardPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.addToHand)(this.rawPtr, cardPtr);
    }

    addToTop(cardPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.addToTop)(this.rawPtr, cardPtr);
    }

    addToBottom(cardPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.addToBottom)(this.rawPtr, cardPtr);
    }

    addToRandomSpot(cardPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.addToRandomSpot)(this.rawPtr, cardPtr);
    }

    getTopCard(): NativePointer {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.getTopCard)(this.rawPtr);
    }

    getBottomCard(): NativePointer {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.getBottomCard)(this.rawPtr);
    }

    getRandomCard(rngPtr: NativePointer): NativePointer {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.getRandomCard)(this.rawPtr, rngPtr);
    }

    getRandomCard2(useRng: boolean): NativePointer {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.getRandomCard2)(this.rawPtr, Number(useRng));
    }

    getRandomCard3(useRng: boolean, cardRarity: CardRarity): NativePointer {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.getRandomCard3)(this.rawPtr, Number(useRng), Number(cardRarity));
    }

    getRandomCard4(rngPtr: NativePointer, cardRarity: CardRarity): NativePointer {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.getRandomCard4)(this.rawPtr, rngPtr, Number(cardRarity));
    }

    getRandomCard5(cardType: CardType, useRng: boolean): NativePointer {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.getRandomCard5)(this.rawPtr, Number(cardType), Number(useRng));
    }

    removeTopCard(): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.removeTopCard)(this.rawPtr);
    }

    shuffle(): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.shuffle)(this.rawPtr);
    }

    shuffle2(rngPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.shuffle2)(this.rawPtr, rngPtr);
    }

    moveToDiscardPile(cardPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.moveToDiscardPile)(this.rawPtr, cardPtr);
    }

    moveToExhaustPile(cardPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.moveToExhaustPile)(this.rawPtr, cardPtr);
    }

    moveToHand(cardPtr: NativePointer, groupPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.moveToHand)(this.rawPtr, cardPtr, groupPtr);
    }

    moveToHand2(cardPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.moveToHand2)(this.rawPtr, cardPtr);
    }

    moveToDeck(cardPtr: NativePointer, randomSpot: boolean): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.moveToDeck)(this.rawPtr, cardPtr, Number(randomSpot));
    }

    moveToBottomOfDeck(cardPtr: NativePointer): void {
        this.getVirtualFunction(CardGroup.#vfunctionMap.moveToBottomOfDeck)(this.rawPtr, cardPtr);
    }

    isEmpty(): boolean {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.isEmpty)(this.rawPtr);
    }

    size(): number {
        return this.getVirtualFunction(CardGroup.#vfunctionMap.size)(this.rawPtr);
    }

    /** ArrayList\<AbstractCard\> */
    get group() {
        return new ArrayList(this.readOffsetPointer(0x8));
    }

    get type(): CardGroupType {
        return this.readOffsetU32(0x14);
    }

    /** ArrayList\<AbstractCard\> */
    get queued() {
        return new ArrayList(this.readOffsetPointer(0x1C));
    }

    /** ArrayList\<AbstractCard\> */
    get inHand() {
        return new ArrayList(this.readOffsetPointer(0x20));
    }
}