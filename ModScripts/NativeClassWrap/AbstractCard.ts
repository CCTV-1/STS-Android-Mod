import { CardColor, CardRarity, CardTarget, DamageType, CardType, CardTags } from "../enums.js";
import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { AbstractDungeon } from "./AbstractDungeon.js";

/**
 * thisPtr will is ```nullptr```.
 */
export type STSCardCtor = (thisPtr: NativePointer) => NativePointer;

export interface NewCardVFuncType {
    canUpgrade?: (thisPtr: NativePointer) => number,
    upgrade: (thisPtr: NativePointer) => void,
    onRemoveFromMasterDeck?: (thisPtr: NativePointer) => void,
    tookDamage?: (thisPtr: NativePointer) => void,
    didDiscard?: (thisPtr: NativePointer) => void,
    switchedStance?: (thisPtr: NativePointer) => void,
    canPlay?: (thisPtr: NativePointer, cardPtr: NativePointer) => number,
    canUse?: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => number,
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => void,
    onMoveToDiscard?: (thisPtr: NativePointer) => void,
    triggerWhenDrawn?: (thisPtr: NativePointer) => void,
    triggerWhenCopied?: (thisPtr: NativePointer) => void,
    triggerOnEndOfPlayerTurn?: (thisPtr: NativePointer) => void,
    triggerOnEndOfTurnForPlayingCard?: (thisPtr: NativePointer) => void,
    triggerOnOtherCardPlayed?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    triggerOnGainEnergy?: (thisPtr: NativePointer, energyCount: number, dueToCard: boolean) => void,
    triggerOnManualDiscard?: (thisPtr: NativePointer) => void,
    triggerOnCardPlayed?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    triggerOnScry?: (thisPtr: NativePointer) => void,
    triggerExhaustedCardsOnStanceChange?: (thisPtr: NativePointer, newStance: NativePointer) => void,
    triggerAtStartOfTurn?: (thisPtr: NativePointer) => void,
    onPlayCard?: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => void,
    atTurnStart?: (thisPtr: NativePointer) => void,
    atTurnStartPreDraw?: (thisPtr: NativePointer) => void,
    onChoseThisOption?: (thisPtr: NativePointer) => void,
    onRetained?: (thisPtr: NativePointer) => void,
    triggerOnExhaust?: (thisPtr: NativePointer) => void,
    triggerOnGlowCheck?: (thisPtr: NativePointer) => void,
    makeCopy: (thisPtr: NativePointer) => NativePointer,
};

export class AbstractCard extends NativeClassWrapper {
    //NativePointer AbstractCard *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * new card id => (v func name => v func)
     * 
     * NativePointer current don't exist toUInt64, Frida(Duktape) current don't support BigInt,
     * so current proxy implement need all C pointer size equal sizeof(uint32_t).
     * 
     * use ptr.toString() or new Uint64(ptr.toString()) can support pointer size equal sizeof(uint64_t) architecture.
     * but there is more performance overhead.
     */
    static #rewriteVFuncMap = new Map<number, NewCardVFuncType>();

    static readonly #NewCardVFuncProxys: NewCardVFuncType = {
        canUpgrade: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.canUpgrade;
                if (Func !== undefined) {
                    return Func(thisPtr);
                }
            }

            const wrapCard = new AbstractCard(thisPtr);
            //default logic
            if ((wrapCard.type != CardType.CURSE) && (wrapCard.type != CardType.STATUS) && (!wrapCard.upgraded)) {
                return Number(true);
            }

            return Number(false);
        },
        upgrade: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.upgrade;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onRemoveFromMasterDeck: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onRemoveFromMasterDeck;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        tookDamage: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.tookDamage;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        didDiscard: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.didDiscard;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        switchedStance: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.switchedStance;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        canPlay: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.canPlay;
                if (Func !== undefined) {
                    return Func(thisPtr, cardPtr);
                }
            }

            return Number(true);
        },
        canUse: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.canUse;
                if (Func !== undefined) {
                    return Func(thisPtr, playerPtr, monsterPtr);
                }
            }

            //default logic
            let origRet = NativeCards.AbstractCard.canUse(thisPtr, playerPtr, monsterPtr);
            return Number(origRet);
        },
        use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const useFunc = cardVFuncMap.use;
                if (useFunc !== undefined) {
                    useFunc(thisPtr, playerPtr, monsterPtr);
                }
            }
        },
        onMoveToDiscard: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onMoveToDiscard;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        triggerWhenDrawn: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerWhenDrawn;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        triggerWhenCopied: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerWhenCopied;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        triggerOnEndOfPlayerTurn: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerOnEndOfPlayerTurn;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }

            //default logic
            const wrapCard = new AbstractCard(thisPtr);
            if (wrapCard.isEthereal) {
                let currentPlayer = AbstractDungeon.getInstance().player;
                let axhaustSpecificCardAction = NativeActions.common.ExhaustSpecificCard.Ctor(thisPtr, currentPlayer.hand.rawPtr, false);
                wrapCard.addToTop(axhaustSpecificCardAction);
            }
        },
        triggerOnEndOfTurnForPlayingCard: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerOnEndOfTurnForPlayingCard;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        triggerOnOtherCardPlayed: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerOnOtherCardPlayed;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        triggerOnGainEnergy: (thisPtr: NativePointer, energyCount: number, dueToCard: boolean) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerOnGainEnergy;
                if (Func !== undefined) {
                    Func(thisPtr, energyCount, dueToCard);
                }
            }
        },
        triggerOnManualDiscard: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerOnManualDiscard;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        triggerOnCardPlayed: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerOnCardPlayed;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        triggerOnScry: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerOnScry;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        triggerExhaustedCardsOnStanceChange: (thisPtr: NativePointer, newStance: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerExhaustedCardsOnStanceChange;
                if (Func !== undefined) {
                    Func(thisPtr, newStance);
                }
            }
        },
        triggerAtStartOfTurn: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerAtStartOfTurn;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onPlayCard: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onPlayCard;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr, monsterPtr);
                }
            }
        },
        atTurnStart: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atTurnStart;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        atTurnStartPreDraw: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atTurnStartPreDraw;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onChoseThisOption: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onChoseThisOption;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onRetained: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onRetained;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        triggerOnExhaust: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerOnExhaust;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        triggerOnGlowCheck: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerOnGlowCheck;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const makeCopyFunc = cardVFuncMap.makeCopy;
                if (makeCopyFunc !== undefined) {
                    let copyObj = makeCopyFunc(thisPtr);
                    return copyObj;
                }
            }

            const wrapCard = new AbstractCard(thisPtr);
            PatchHelper.LogV(wrapCard.cardID + " miss register Card::makeCopy vfunc???");
            return NULL;
        },
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         * bool AbstractCard::hasTag(STS::AbstractCard* this, CardTags tagToCheck)
         * ```
         */
        hasTag: new NativeFunctionInfo(0x48, 'bool', ['pointer', 'uint32']),
        /**
         * ```c
         *  bool AbstractCard::canUpgrade(STS::AbstractCard* this)
         * ```
         */
        canUpgrade: new NativeFunctionInfo(0x50, 'bool', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::upgrade(STS::AbstractCard* this)
         * ```
         */
        upgrade: new NativeFunctionInfo(0x58, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractCard::upgradeDamage(STS::AbstractCard* this, int32_t amount)
         * ```
         */
        upgradeDamage: new NativeFunctionInfo(0x68, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractCard::upgradeBlock(STS::AbstractCard* this, int32_t amount)
         * ```
         */
        upgradeBlock: new NativeFunctionInfo(0x70, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractCard::upgradeMagicNumber(STS::AbstractCard* this, int32_t amount)
         * ```
         */
        upgradeMagicNumber: new NativeFunctionInfo(0x78, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractCard::upgradeName(STS::AbstractCard* this)
         * ```
         */
        upgradeName: new NativeFunctionInfo(0x80, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractCard::upgradeBaseCost(STS::AbstractCard* this, int32_t newCost)
         * ```
         */
        upgradeBaseCost: new NativeFunctionInfo(0x88, 'void', ['pointer', 'int32']),
        /**
         * ```c
         *  STS::AbstractCard* AbstractCard::makeStatEquivalentCopy(STS::AbstractCard* this)
         * ```
         */
        makeStatEquivalentCopy: new NativeFunctionInfo(0x98, 'pointer', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::onRemoveFromMasterDeck(STS::AbstractCard* this)
         * ```
         */
        onRemoveFromMasterDeck: new NativeFunctionInfo(0xA0, 'void', ['pointer']),
        /**
         * ```c
         *  bool AbstractCard::onRemoveFromMasterDeck(STS::AbstractCard* this, STS::AbstractMonster* monsterPtr)
         * ```
         */
        cardPlayable: new NativeFunctionInfo(0xA8, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         *  bool AbstractCard::hasEnoughEnergy(STS::AbstractCard* this)
         * ```
         */
        hasEnoughEnergy: new NativeFunctionInfo(0xB0, 'bool', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::tookDamage(STS::AbstractCard* this)
         * ```
         */
        tookDamage: new NativeFunctionInfo(0xB8, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::tookDamage(STS::AbstractCard* this)
         * ```
         */
        didDiscard: new NativeFunctionInfo(0xC0, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::switchedStance(STS::AbstractCard* this)
         * ```
         */
        switchedStance: new NativeFunctionInfo(0xC8, 'void', ['pointer']),
        /**
         * ```c
         *  bool AbstractCard::switchedStance(STS::AbstractCard* this, STS::AbstractCard * cardPtr)
         * ```
         */
        canPlay: new NativeFunctionInfo(0xE0, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         *  bool AbstractCard::switchedStance(STS::AbstractCard* this, STS::AbstractPlayer * plyaerPtr, STS::AbstractMonster* MonsterPtr)
         * ```
         */
        canUse: new NativeFunctionInfo(0xE8, 'bool', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * void AbstractCard::use(STS::AbstractCard* this, STS::AbstractPlayer* p, STS::AbstractMonster* m)
         * ```
         */
        use: new NativeFunctionInfo(0xF0, 'pointer', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractCard::onMoveToDiscard(STS::AbstractCard* this)
         * ```
         */
        onMoveToDiscard: new NativeFunctionInfo(0x1C0, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerWhenDrawn(STS::AbstractCard* this)
         * ```
         */
        triggerWhenDrawn: new NativeFunctionInfo(0x1E0, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerWhenCopied(STS::AbstractCard* this)
         * ```
         */
        triggerWhenCopied: new NativeFunctionInfo(0x1E8, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerOnEndOfPlayerTurn(STS::AbstractCard* this)
         * ```
         */
        triggerOnEndOfPlayerTurn: new NativeFunctionInfo(0x1F0, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerOnEndOfTurnForPlayingCard(STS::AbstractCard* this)
         * ```
         */
        triggerOnEndOfTurnForPlayingCard: new NativeFunctionInfo(0x1F8, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerOnOtherCardPlayed(STS::AbstractCard* this, STS::AbstractCard* cardPtr)
         * ```
         */
        triggerOnOtherCardPlayed: new NativeFunctionInfo(0x1F8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractCard::triggerOnGainEnergy(STS::AbstractCard* this, int32_t energyCount, bool dueToCard)
         * ```
         */
        triggerOnGainEnergy: new NativeFunctionInfo(0x208, 'void', ['pointer', 'int32', 'bool']),
        /**
         * ```c
         *  void AbstractCard::triggerOnManualDiscard(STS::AbstractCard* this)
         * ```
         */
        triggerOnManualDiscard: new NativeFunctionInfo(0x210, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerOnCardPlayed(STS::AbstractCard* this, STS::AbstractCard* cardPlayed)
         * ```
         */
        triggerOnCardPlayed: new NativeFunctionInfo(0x218, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerOnScry(STS::AbstractCard* this)
         * ```
         */
        triggerOnScry: new NativeFunctionInfo(0x220, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerExhaustedCardsOnStanceChange(STS::AbstractCard* this, STS::AbstractStance* newStance)
         * ```
         */
        triggerExhaustedCardsOnStanceChange: new NativeFunctionInfo(0x228, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerAtStartOfTurn(STS::AbstractCard* this)
         * ```
         */
        triggerAtStartOfTurn: new NativeFunctionInfo(0x230, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerExhaustedCardsOnStanceChange(STS::AbstractCard* this, STS::AbstractCard* cardPtr, STS::AbstractMonster* monsterPtr)
         * ```
         */
        onPlayCard: new NativeFunctionInfo(0x238, 'void', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractCard::atTurnStart(STS::AbstractCard* this)
         * ```
         */
        atTurnStart: new NativeFunctionInfo(0x240, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::atTurnStartPreDraw(STS::AbstractCard* this)
         * ```
         */
        atTurnStartPreDraw: new NativeFunctionInfo(0x248, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::onChoseThisOption(STS::AbstractCard* this)
         * ```
         */
        onChoseThisOption: new NativeFunctionInfo(0x250, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::onRetained(STS::AbstractCard* this)
         * ```
         */
        onRetained: new NativeFunctionInfo(0x258, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerOnExhaust(STS::AbstractCard* this)
         * ```
         */
        triggerOnExhaust: new NativeFunctionInfo(0x260, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::superFlash(STS::AbstractCard* this, GDX::Color* color)
         * ```
         */
        superFlash: new NativeFunctionInfo(0x2B0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractCard::flash(STS::AbstractCard* this)
         * ```
         */
        superFlash2: new NativeFunctionInfo(0x2B8, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::flash(STS::AbstractCard* this)
         * ```
         */
        flash: new NativeFunctionInfo(0x2C0, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::flash(STS::AbstractCard* this, GDX::Color* color)
         * ```
         */
        flash2: new NativeFunctionInfo(0x2C8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractCard::addToTop(STS::AbstractCard* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToBot: new NativeFunctionInfo(0x2F8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractCard::addToTop(STS::AbstractCard* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0x300, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractCard::triggerOnGlowCheck(STS::AbstractCard* this)
         * ```
         */
        triggerOnGlowCheck: new NativeFunctionInfo(0x330, 'void', ['pointer']),
        /**
         * ```c
         * STS::AbstractCard* AbstractCard::makeCopy(STS::AbstractCard* this)
         * ```
         */
        makeCopy: new NativeFunctionInfo(0x338, 'pointer', ['pointer']),
    }

    static #vFuncNamePrefix = "AbstractCard_";

    static NewCardCtor(id: string, name: string, imgUrl: string, cost: number, rawDescription: string,
        type: CardType, color: CardColor, rarity: CardRarity, target: CardTarget, dType: DamageType, newFuncs: NewCardVFuncType): AbstractCard {

        let origCardPtr = NativeCards.AbstractCard.Ctor(id, name, imgUrl, cost, rawDescription, type, color, rarity, target, dType);

        let wrapCard = new AbstractCard(origCardPtr);
        //previous action object memory maybe will be reused, so origActionPtr value not necessarily unique.
        AbstractCard.#rewriteVFuncMap.set(origCardPtr.toUInt32(), newFuncs);

        if (!AbstractCard.#rewriteVFuncMap.has(-1)) {
            const VFuncMap = AbstractCard.#vfunctionMap;
            const VFuncProxys = AbstractCard.#NewCardVFuncProxys;
            let funcName = "AbstractCard_BasicNewCard_canUpgrade";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.B_P_Func(funcName), VFuncMap.canUpgrade, VFuncProxys.canUpgrade);
            funcName = "AbstractCard_BasicNewCard_upgrade";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.upgrade, VFuncProxys.upgrade);
            funcName = "AbstractCard_BasicNewCard_onRemoveFromMasterDeck";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onRemoveFromMasterDeck, VFuncProxys.onRemoveFromMasterDeck);
            funcName = "AbstractCard_BasicNewCard_tookDamage";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.tookDamage, VFuncProxys.tookDamage);
            funcName = "AbstractCard_BasicNewCard_didDiscard";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.didDiscard, VFuncProxys.didDiscard);
            funcName = "AbstractCard_BasicNewCard_switchedStance";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.switchedStance, VFuncProxys.switchedStance);
            funcName = "AbstractCard_BasicNewCard_canPlay";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.B_PP_Func(funcName), VFuncMap.canPlay, VFuncProxys.canPlay);
            funcName = "AbstractCard_BasicNewCard_canUse";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.B_PPP_Func(funcName), VFuncMap.canUse, VFuncProxys.canUse);
            funcName = "AbstractCard_BasicNewCard_use";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), VFuncMap.use, VFuncProxys.use);
            funcName = "AbstractCard_BasicNewCard_onMoveToDiscard";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onMoveToDiscard, VFuncProxys.onMoveToDiscard);
            funcName = "AbstractCard_BasicNewCard_triggerWhenDrawn";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.triggerWhenDrawn, VFuncProxys.triggerWhenDrawn);
            funcName = "AbstractCard_BasicNewCard_triggerWhenCopied";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.triggerWhenCopied, VFuncProxys.triggerWhenCopied);
            funcName = "AbstractCard_BasicNewCard_triggerOnEndOfPlayerTurn";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.triggerOnEndOfPlayerTurn, VFuncProxys.triggerOnEndOfPlayerTurn);
            funcName = "AbstractCard_BasicNewCard_triggerOnEndOfTurnForPlayingCard";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.triggerOnEndOfTurnForPlayingCard, VFuncProxys.triggerOnEndOfTurnForPlayingCard);
            funcName = "AbstractCard_BasicNewCard_triggerOnOtherCardPlayed";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.triggerOnOtherCardPlayed, VFuncProxys.triggerOnOtherCardPlayed);
            funcName = "AbstractCard_BasicNewCard_triggerOnGainEnergy";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PI32B_Func(funcName), VFuncMap.triggerOnGainEnergy, VFuncProxys.triggerOnGainEnergy);
            funcName = "AbstractCard_BasicNewCard_triggerOnManualDiscard";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.triggerOnManualDiscard, VFuncProxys.triggerOnManualDiscard);
            funcName = "AbstractCard_BasicNewCard_triggerOnCardPlayed";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.triggerOnCardPlayed, VFuncProxys.triggerOnCardPlayed);
            funcName = "AbstractCard_BasicNewCard_triggerOnScry";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.triggerOnScry, VFuncProxys.triggerOnScry);
            funcName = "AbstractCard_BasicNewCard_triggerExhaustedCardsOnStanceChange";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.triggerExhaustedCardsOnStanceChange, VFuncProxys.triggerExhaustedCardsOnStanceChange);
            funcName = "AbstractCard_BasicNewCard_triggerAtStartOfTurn";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.triggerAtStartOfTurn, VFuncProxys.triggerAtStartOfTurn);
            funcName = "AbstractCard_BasicNewCard_onPlayCard";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), VFuncMap.onPlayCard, VFuncProxys.onPlayCard);
            funcName = "AbstractCard_BasicNewCard_atTurnStart";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atTurnStart, VFuncProxys.atTurnStart);
            funcName = "AbstractCard_BasicNewCard_atTurnStartPreDraw";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atTurnStartPreDraw, VFuncProxys.atTurnStartPreDraw);
            funcName = "AbstractCard_BasicNewCard_onChoseThisOption";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onChoseThisOption, VFuncProxys.onChoseThisOption);
            funcName = "AbstractCard_BasicNewCard_onRetained";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onRetained, VFuncProxys.onRetained);
            funcName = "AbstractCard_BasicNewCard_triggerOnExhaust";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.triggerOnExhaust, VFuncProxys.triggerOnExhaust);
            funcName = "AbstractCard_BasicNewCard_triggerOnGlowCheck";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.triggerOnGlowCheck, VFuncProxys.triggerOnGlowCheck);
            funcName = "AbstractCard_BasicNewCard_makeCopy";
            wrapCard.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), VFuncMap.makeCopy, VFuncProxys.makeCopy);
            AbstractCard.#rewriteVFuncMap.set(-1, AbstractCard.#NewCardVFuncProxys);
        }

        return wrapCard;
    };

    hasTag(tag: CardTags): boolean {
        return this.getVirtualFunction(AbstractCard.#vfunctionMap.hasTag)(this.rawPtr, Number(tag));
    }

    canUpgrade(): boolean {
        let canUpgradeFunc = this.getVirtualFunction(AbstractCard.#vfunctionMap.canUpgrade);
        return canUpgradeFunc(this.rawPtr);
    }

    upgrade(): void {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgrade)(this.rawPtr);
    }
    Overrideupgrade(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractCard.#vFuncNamePrefix + this.cardID + "_upgrade").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractCard.#vfunctionMap.upgrade, newVFunc);
    }

    upgradeDamage(newDamage: number) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeDamage)(this.rawPtr, newDamage);
    }

    upgradeBlock(newBlock: number) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeBlock)(this.rawPtr, newBlock);
    }

    upgradeMagicNumber(newMagicNumber: number) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeMagicNumber)(this.rawPtr, newMagicNumber);
    }

    upgradeName() {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeName)(this.rawPtr);
    }

    upgradeBaseCost(newCost: number) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeBaseCost)(this.rawPtr, newCost);
    }

    makeStatEquivalentCopy(): NativePointer {
        let makeStatEquivalentCopyFunc = this.getVirtualFunction(AbstractCard.#vfunctionMap.makeStatEquivalentCopy);
        return makeStatEquivalentCopyFunc(this.rawPtr);
    }
    OverridemakeStatEquivalentCopy(newVFunc: (thisPtr: NativePointer) => NativePointer) {
        let funcName = (AbstractCard.#vFuncNamePrefix + this.cardID + "_makeStatEquivalentCopy").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), AbstractCard.#vfunctionMap.makeStatEquivalentCopy, newVFunc);
    }

    cardPlayable(monsterPtr: NativePointer): boolean {
        return this.getVirtualFunction(AbstractCard.#vfunctionMap.cardPlayable)(this.rawPtr, monsterPtr);
    }

    hasEnoughEnergy(): boolean {
        return this.getVirtualFunction(AbstractCard.#vfunctionMap.hasEnoughEnergy)(this.rawPtr);
    }

    Overrideuse(newVFunc: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => void) {
        let funcName = (AbstractCard.#vFuncNamePrefix + this.cardID + "_use").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), AbstractCard.#vfunctionMap.use, newVFunc);
    }

    superFlash(colorPtr: NativePointer) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.superFlash)(this.rawPtr, colorPtr);
    }
    superFlash2() {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.superFlash2)(this.rawPtr);
    }

    flash() {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.flash)(this.rawPtr);
    }
    flash2(colorPtr: NativePointer) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.flash2)(this.rawPtr, colorPtr);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    OverridemakeCopy(newVFunc: (thisPtr: NativePointer) => NativePointer) {
        let funcName = (AbstractCard.#vFuncNamePrefix + this.cardID + "_makeCopy").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), AbstractCard.#vfunctionMap.makeCopy, newVFunc);
    }

    get type(): CardType {
        return this.readOffsetU32(0x8);
    }
    set type(value) {
        this.writeOffsetU32(0x8, value);
    }

    get cost() {
        return this.readOffsetS32(0xc);
    }
    set cost(value) {
        this.writeOffsetS32(0xc, value);
    }

    get costForTurn() {
        return this.readOffsetS32(0x10);
    }
    set costForTurn(value) {
        this.writeOffsetS32(0x10, value);
    }

    get price() {
        return this.readOffsetS32(0x14);
    }
    set price(value) {
        this.writeOffsetS32(0x14, value);
    }

    get chargeCost() {
        return this.readOffsetS32(0x18);
    }
    set chargeCost(value) {
        this.writeOffsetS32(0x18, value);
    }

    get isCostModified() {
        return this.readOffsetBool(0x1c);
    }
    set isCostModified(value) {
        this.writeOffsetBool(0x1c, value);
    }

    get isCostModifiedForTurn() {
        return this.readOffsetBool(0x1d);
    }
    set isCostModifiedForTurn(value) {
        this.writeOffsetBool(0x1d, value);
    }

    get retain() {
        return this.readOffsetBool(0x1e);
    }
    set retain(value) {
        this.writeOffsetBool(0x1e, value);
    }

    get selfRetain() {
        return this.readOffsetBool(0x1f);
    }
    set selfRetain(value) {
        this.writeOffsetBool(0x1f, value);
    }

    get dontTriggerOnUseCard() {
        return this.readOffsetBool(0x20);
    }
    set dontTriggerOnUseCard(value) {
        this.writeOffsetBool(0x20, value);
    }

    get rarity() {
        return this.readOffsetU32(0x24);
    }
    set rarity(value) {
        this.writeOffsetU32(0x24, value);
    }

    get color() {
        return this.readOffsetU32(0x28);
    }
    set color(value) {
        this.writeOffsetU32(0x28, value);
    }

    get isInnate() {
        return this.readOffsetBool(0x2c);
    }
    set isInnate(value) {
        this.writeOffsetBool(0x2c, value);
    }

    get isLocked() {
        return this.readOffsetBool(0x2d);
    }
    set isLocked(value) {
        this.writeOffsetBool(0x2d, value);
    }

    get showEvokeValue() {
        return this.readOffsetBool(0x2e);
    }
    set showEvokeValue(value) {
        this.writeOffsetBool(0x2e, value);
    }

    get showEvokeOrbCount() {
        return this.readOffsetS32(0x30);
    }
    set showEvokeOrbCount(value) {
        this.writeOffsetS32(0x30, value);
    }

    get isUsed() {
        return this.readOffsetBool(0x38);
    }
    set isUsed(value) {
        this.writeOffsetBool(0x38, value);
    }

    get upgraded() {
        return this.readOffsetBool(0x39);
    }
    set upgraded(value) {
        this.writeOffsetBool(0x39, value);
    }

    get timesUpgraded() {
        return this.readOffsetS32(0x3c);
    }
    set timesUpgraded(value) {
        this.writeOffsetS32(0x3c, value);
    }

    get misc() {
        return this.readOffsetS32(0x40);
    }
    set misc(value) {
        this.writeOffsetS32(0x40, value);
    }

    get energyOnUse() {
        return this.readOffsetS32(0x44);
    }
    set energyOnUse(value) {
        this.writeOffsetS32(0x44, value);
    }

    get ignoreEnergyOnUse() {
        return this.readOffsetBool(0x48);
    }
    set ignoreEnergyOnUse(value) {
        this.writeOffsetBool(0x48, value);
    }

    get isSeen() {
        return this.readOffsetBool(0x49);
    }
    set isSeen(value) {
        this.writeOffsetBool(0x49, value);
    }

    get upgradedCost() {
        return this.readOffsetBool(0x4a);
    }
    set upgradedCost(value) {
        this.writeOffsetBool(0x4a, value);
    }

    get upgradedDamage() {
        return this.readOffsetBool(0x4b);
    }
    set upgradedDamage(value) {
        this.writeOffsetBool(0x4b, value);
    }

    get upgradedBlock() {
        return this.readOffsetBool(0x4c);
    }
    set upgradedBlock(value) {
        this.writeOffsetBool(0x4c, value);
    }

    get upgradedMagicNumber() {
        return this.readOffsetBool(0x4d);
    }
    set upgradedMagicNumber(value) {
        this.writeOffsetBool(0x4d, value);
    }

    get isSelected() {
        return this.readOffsetBool(0x60);
    }
    set isSelected(value) {
        this.writeOffsetBool(0x60, value);
    }

    get exhaust() {
        return this.readOffsetBool(0x61);
    }
    set exhaust(value) {
        this.writeOffsetBool(0x61, value);
    }

    get returnToHand() {
        return this.readOffsetBool(0x62);
    }
    set returnToHand(value) {
        this.writeOffsetBool(0x62, value);
    }

    get shuffleBackIntoDrawPile() {
        return this.readOffsetBool(0x63);
    }
    set shuffleBackIntoDrawPile(value) {
        this.writeOffsetBool(0x63, value);
    }

    get isEthereal() {
        return this.readOffsetBool(0x64);
    }
    set isEthereal(value) {
        this.writeOffsetBool(0x64, value);
    }

    get baseDamage() {
        return this.readOffsetU32(0x74);
    }
    set baseDamage(value) {
        this.writeOffsetS32(0x74, value);
    }

    get baseBlock() {
        return this.readOffsetS32(0x78);
    }
    set baseBlock(value) {
        this.writeOffsetS32(0x78, value);
    }

    get baseMagicNumber() {
        return this.readOffsetS32(0x7c);
    }
    set baseMagicNumber(value) {
        this.writeOffsetS32(0x7c, value);
    }

    get baseHeal() {
        return this.readOffsetS32(0x80);
    }
    set baseHeal(value) {
        this.writeOffsetS32(0x80, value);
    }

    get baseDraw() {
        return this.readOffsetS32(0x84);
    }
    set baseDraw(value) {
        this.writeOffsetS32(0x84, value);
    }

    get baseDiscard() {
        return this.readOffsetS32(0x88);
    }
    set baseDiscard(value) {
        this.writeOffsetS32(0x88, value);
    }

    get damage() {
        return this.readOffsetS32(0x8c);
    }
    set damage(value) {
        this.writeOffsetS32(0x8c, value);
    }

    get block() {
        return this.readOffsetS32(0x90);
    }
    set block(value) {
        this.writeOffsetS32(0x90, value);
    }

    get magicNumber() {
        return this.readOffsetS32(0x94);
    }
    set magicNumber(value) {
        this.writeOffsetS32(0x94, value);
    }

    get heal() {
        return this.readOffsetS32(0x98);
    }
    set heal(value) {
        this.writeOffsetS32(0x98, value);
    }

    get draw() {
        return this.readOffsetS32(0x9c);
    }
    set draw(value) {
        this.writeOffsetS32(0x9c, value);
    }

    get discard() {
        return this.readOffsetS32(0xa0);
    }
    set discard(value) {
        this.writeOffsetS32(0xa0, value);
    }

    get isDamageModified() {
        return this.readOffsetBool(0xa4);
    }
    set isDamageModified(value) {
        this.writeOffsetBool(0xa4, value);
    }

    get isBlockModified() {
        return this.readOffsetBool(0xa5);
    }
    set isBlockModified(value) {
        this.writeOffsetBool(0xa5, value);
    }

    get isMagicNumberModified() {
        return this.readOffsetBool(0xa6);
    }
    set isMagicNumberModified(value) {
        this.writeOffsetBool(0xa6, value);
    }

    get damageType(): DamageType {
        return this.readOffsetU32(0xa8);
    }
    set damageType(value) {
        this.writeOffsetU32(0xa8, value);
    }

    get damageTypeForTurn(): DamageType {
        return this.readOffsetU32(0xac);
    }
    set damageTypeForTurn(value) {
        this.writeOffsetU32(0xac, value);
    }

    get target(): CardTarget {
        return this.readOffsetU32(0xb0);
    }
    set target(value) {
        this.writeOffsetU32(0xb0, value);
    }

    get purgeOnUse() {
        return this.readOffsetBool(0xb4);
    }
    set purgeOnUse(value) {
        this.writeOffsetBool(0xb4, value);
    }

    get exhaustOnUseOnce() {
        return this.readOffsetBool(0xb5);
    }
    set exhaustOnUseOnce(value) {
        this.writeOffsetBool(0xb5, value);
    }

    get exhaustOnFire() {
        return this.readOffsetBool(0xb6);
    }
    set exhaustOnFire(value) {
        this.writeOffsetBool(0xb6, value);
    }

    get freeToPlayOnce() {
        return this.readOffsetBool(0xb7);
    }
    set freeToPlayOnce(value) {
        this.writeOffsetBool(0xb7, value);
    }

    get isInAutoplay() {
        return this.readOffsetBool(0xb8);
    }
    set isInAutoplay(value) {
        this.writeOffsetBool(0xb8, value);
    }

    get assetUrl() {
        return this.readOffsetJString(0xc8).content;
    }
    set assetUrl(value) {
        this.writeOffsetJString(0xc8, JString.CreateJString(value));
    }

    get transparency() {
        return this.readOffsetFloat(0xd0);
    }
    set transparency(value) {
        this.writeOffsetFloat(0xd0, value);
    }

    get targetTransparency() {
        return this.readOffsetFloat(0xd4);
    }
    set targetTransparency(value) {
        this.writeOffsetFloat(0xd4, value);
    }

    get targetAngle() {
        return this.readOffsetFloat(0xd8);
    }
    set targetAngle(value) {
        this.writeOffsetFloat(0xd8, value);
    }

    get angle() {
        return this.readOffsetFloat(0xdc);
    }
    set angle(value) {
        this.writeOffsetFloat(0xdc, value);
    }

    get glowTimer() {
        return this.readOffsetFloat(0xf4);
    }
    set glowTimer(value) {
        this.writeOffsetFloat(0xf4, value);
    }

    get drawScale() {
        return this.readOffsetFloat(0x114);
    }
    set drawScale(value) {
        this.writeOffsetFloat(0x114, value);
    }

    get targetDrawScale() {
        return this.readOffsetFloat(0x118);
    }
    set targetDrawScale(value) {
        this.writeOffsetFloat(0x118, value);
    }

    get cardsToPreview() {
        return this.readOffsetPointer(0x134);
    }
    set cardsToPreview(value) {
        this.writeOffsetPointer(0x134, value);
    }

    get originalName() {
        return this.readOffsetJString(0x13c).content;
    }
    set originalName(value) {
        this.writeOffsetJString(0x13c, JString.CreateJString(value));
    }

    get name() {
        return this.readOffsetJString(0x140).content;
    }
    set name(value) {
        this.writeOffsetJString(0x140, JString.CreateJString(value));
    }

    get rawDescription() {
        return this.readOffsetJString(0x144).content;
    }
    set rawDescription(value) {
        this.writeOffsetJString(0x144, JString.CreateJString(value));
    }

    get cardID() {
        return this.readOffsetJString(0x148).content;
    }
    set cardID(value) {
        this.writeOffsetJString(0x148, JString.CreateJString(value));
    }
}