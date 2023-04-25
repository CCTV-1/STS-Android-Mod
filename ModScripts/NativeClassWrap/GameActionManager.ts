import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";
import { GamePhase } from "../enums.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

class GameActionManagerConstants extends NativeClassWrapper {
    constructor(CThisPtr: NativePointer) {
        super(CThisPtr, false);
    }

    get logger() {
        return this.readOffsetPointer(0x0);
    }

    get totalDiscardedThisTurn() {
        return this.readOffsetS32(0x4);
    }
    set totalDiscardedThisTurn(value) {
        this.writeOffsetS32(0x4, value);
    }

    get damageReceivedThisTurn() {
        return this.readOffsetS32(0x8);
    }
    set damageReceivedThisTurn(value) {
        this.writeOffsetS32(0x8, value);
    }

    get damageReceivedThisCombat() {
        return this.readOffsetS32(0xC);
    }
    set damageReceivedThisCombat(value) {
        this.writeOffsetS32(0xC, value);
    }

    get hpLossThisCombat() {
        return this.readOffsetS32(0x10);
    }
    set hpLossThisCombat(value) {
        this.writeOffsetS32(0x10, value);
    }

    get energyGainedThisCombat() {
        return this.readOffsetS32(0x14);
    }
    set energyGainedThisCombat(value) {
        this.writeOffsetS32(0x14, value);
    }

    get turn() {
        return this.readOffsetS32(0x18);
    }
    set turn(value) {
        this.writeOffsetS32(0x18, value);
    }
}

export class GameActionManager extends NativeClassWrapper {
    private static instance: GameActionManagerConstants | undefined = undefined;

    //NativePointer GameActionManager *
    constructor(CThisPtr: NativePointer) {
        super(CThisPtr);
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void GameActionManager::useNextCombatActions(GameActionManager* thisPtr)
         * ```
         */
        useNextCombatActions: new NativeFunctionInfo(0x28, 'void', ['pointer']),
        /**
         * ```c
         * void GameActionManager::addToBottom(GameActionManager* thisPtr, AbstractGameAction* action)
         * ```
         */
        addToBottom: new NativeFunctionInfo(0x30, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void GameActionManager::addCardQueueItem(GameActionManager* thisPtr, CardQueueItem* c, bool inFrontOfQueue)
         * ```
         */
        addCardQueueItem: new NativeFunctionInfo(0x38, 'void', ['pointer', 'pointer', 'bool']),
        /**
         * ```c
         * void GameActionManager::removeFromQueue(GameActionManager* thisPtr, AbstractCard* cardPtr)
         * ```
         */
        removeFromQueue: new NativeFunctionInfo(0x40, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void GameActionManager::clearPostCombatActions(GameActionManager* thisPtr)
         * ```
         */
        clearPostCombatActions: new NativeFunctionInfo(0x50, 'void', ['pointer']),
        /**
         * ```c
         * void GameActionManager::addToTop(GameActionManager* thisPtr, AbstractGameAction* action)
         * ```
         */
        addToTop: new NativeFunctionInfo(0x58, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void GameActionManager::addToTurnStart(GameActionManager* thisPtr, AbstractGameAction* action)
         * ```
         */
        addToTurnStart: new NativeFunctionInfo(0x60, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void GameActionManager::endTurn(GameActionManager* thisPtr)
         * ```
         */
        endTurn: new NativeFunctionInfo(0x70, 'void', ['pointer']),
        /**
         * ```c
         * void GameActionManager::cleanCardQueue(GameActionManager* thisPtr)
         * ```
         */
        cleanCardQueue: new NativeFunctionInfo(0x80, 'void', ['pointer']),
        /**
         * ```c
         * bool GameActionManager::isEmpty(GameActionManager* thisPtr)
         * ```
         */
        isEmpty: new NativeFunctionInfo(0x88, 'bool', ['pointer']),
        /**
         * ```c
         * void GameActionManager::clear(GameActionManager* thisPtr)
         * ```
         */
        clear: new NativeFunctionInfo(0x98, 'void', ['pointer']),
    };

    static getConstantHandle(): GameActionManagerConstants {
        if (this.instance === undefined) {
            this.instance = new GameActionManagerConstants(PatchHelper.STSGlobalVars.GameActionManagerConstantsPtr);
        }

        return this.instance;
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(GameActionManager.#vfunctionMap.addToBottom)(this.rawPtr, actionPtr);
    }

    addCardQueueItem(cardPtr: NativePointer, inFrontOfQueue: boolean) {
        this.getVirtualFunction(GameActionManager.#vfunctionMap.addCardQueueItem)(this.rawPtr, cardPtr, Number(inFrontOfQueue));
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(GameActionManager.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    isEmpty(): boolean {
        return this.getVirtualFunction(GameActionManager.#vfunctionMap.isEmpty)(this.rawPtr);
    }

    /** ArrayList\<AbstractGameAction\>* */
    get nextCombatActions() {
        return this.readOffsetPointer(0x8);
    }

    /** ArrayList\<AbstractGameAction\>* */
    get actions() {
        return this.readOffsetPointer(0xC);
    }

    /** ArrayList\<AbstractGameAction\>* */
    get preTurnActions() {
        return this.readOffsetPointer(0x10);
    }

    /** ArrayList\<CardQueueItem\>* */
    get cardQueue() {
        return this.readOffsetPointer(0x14);
    }

    /** ArrayList\<MonsterQueueItem\>* */
    get monsterQueue() {
        return this.readOffsetPointer(0x18);
    }

    /** ArrayList\<AbstractCard\>* */
    get cardsPlayedThisTurn() {
        return this.readOffsetPointer(0x1C);
    }

    /** ArrayList\<AbstractCard\>* */
    get cardsPlayedThisCombat() {
        return this.readOffsetPointer(0x20);
    }

    /** ArrayList\<AbstractCard\>* */
    get orbsChanneledThisCombat() {
        return this.readOffsetPointer(0x24);
    }

    /** ArrayList\<AbstractCard\>* */
    get orbsChanneledThisTurn() {
        return this.readOffsetPointer(0x28);
    }

    get mantraGained() {
        return this.readOffsetS32(0x30);
    }
    set mantraGained(value) {
        this.writeOffsetS32(0x30, value);
    }

    /** AbstractGameAction* */
    get currentAction() {
        return this.readOffsetPointer(0x34);
    }

    /** AbstractGameAction* */
    get previousAction() {
        return this.readOffsetPointer(0x38);
    }

    /** AbstractGameAction* */
    get turnStartCurrentAction() {
        return this.readOffsetPointer(0x3C);
    }

    /** AbstractCard* */
    get lastCard() {
        return this.readOffsetPointer(0x40);
    }

    get phase(): GamePhase {
        return this.readOffsetU8(0x44);
    }

    get hasControl() {
        return this.readOffsetBool(0x48);
    }

    get turnHasEnded() {
        return this.readOffsetBool(0x49);
    }

    get usingCard() {
        return this.readOffsetBool(0x4A);
    }

    get monsterAttacksQueued() {
        return this.readOffsetBool(0x4B);
    }
}