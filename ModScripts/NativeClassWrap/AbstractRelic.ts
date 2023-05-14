import { GDXFileType, LandingSound, PlayerClass, RelicTier } from "../enums.js";
import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeRelics } from "../NativeFuncWrap/NativeRelics.js";
import { JObjectArray } from "./JObjectArray.js";
import { ArrayList } from "./ArrayList.js";
import { PowerTip } from "./PowerTip.js";
import { NativeGDXLib } from "../NativeFuncWrap/NativeGDXLib.js";

/**
 * thisPtr will is ```nullptr```.
 */
export type STSRelicCtor = (thisPtr: NativePointer) => NativePointer;

export interface NewRelicVFuncType {
    updateDescription?: (thisPtr: NativePointer, playerClass: PlayerClass) => void,
    getUpdatedDescription?: (thisPtr: NativePointer) => NativePointer,
    onPlayCard?: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => void,
    onPreviewObtainCard?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onObtainCard?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onGainGold?: (thisPtr: NativePointer) => void,
    onLoseGold?: (thisPtr: NativePointer) => void,
    onSpendGold?: (thisPtr: NativePointer) => void,
    onEquip?: (thisPtr: NativePointer) => void,
    onUnequip?: (thisPtr: NativePointer) => void,
    atPreBattle?: (thisPtr: NativePointer) => void,
    atBattleStart?: (thisPtr: NativePointer) => void,
    onSpawnMonster?: (thisPtr: NativePointer, monsterPtr: NativePointer) => void,
    atBattleStartPreDraw?: (thisPtr: NativePointer) => void,
    atTurnStart?: (thisPtr: NativePointer) => void,
    atTurnStartPostDraw?: (thisPtr: NativePointer) => void,
    onPlayerEndTurn?: (thisPtr: NativePointer) => void,
    onBloodied?: (thisPtr: NativePointer) => void,
    onNotBloodied?: (thisPtr: NativePointer) => void,
    onManualDiscard?: (thisPtr: NativePointer) => void,
    onUseCard?: (thisPtr: NativePointer, cardPtr: NativePointer, useCardAction: NativePointer) => void,
    onVictory?: (thisPtr: NativePointer) => void,
    onMonsterDeath?: (thisPtr: NativePointer, monsterPtr: NativePointer) => void,
    onBlockBroken?: (thisPtr: NativePointer, creaturePtr: NativePointer) => void,
    onPlayerGainedBlock?: (thisPtr: NativePointer, blockAmount: number) => number,
    onPlayerHeal?: (thisPtr: NativePointer, healAmount: number) => number,
    onEnergyRecharge?: (thisPtr: NativePointer) => void,
    /** ArrayList\<AbstractCampfireOption\>* options */
    addCampfireOption?: (thisPtr: NativePointer, options: NativePointer) => void,
    /** AbstractCampfireOption* option */
    canUseCampfireOption?: (thisPtr: NativePointer, option: NativePointer) => number,
    onRest?: (thisPtr: NativePointer) => void,
    onEnterRestRoom?: (thisPtr: NativePointer) => void,
    onRefreshHand?: (thisPtr: NativePointer) => void,
    onShuffle?: (thisPtr: NativePointer) => void,
    onSmith?: (thisPtr: NativePointer) => void,
    onAttack?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number, targetCreature: NativePointer) => void,
    onAttacked?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => number,
    onAttackedToChangeDamage?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => number,
    onAttackToChangeDamage?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => number,
    onExhaust?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onTrigger?: (thisPtr: NativePointer) => void,
    onTrigger2?: (thisPtr: NativePointer, targetCreature: NativePointer) => void,
    checkTrigger?: (thisPtr: NativePointer, cardPtr: NativePointer) => number,
    onEnterRoom?: (thisPtr: NativePointer, roomPtr: NativePointer) => void,
    justEnteredRoom?: (thisPtr: NativePointer, roomPtr: NativePointer) => void,
    onCardDraw?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onChestOpen?: (thisPtr: NativePointer, bossChest: boolean) => void,
    onChestOpenAfter?: (thisPtr: NativePointer, bossChest: boolean) => void,
    onDrawOrDiscard?: (thisPtr: NativePointer) => void,
    onMasterDeckChange?: (thisPtr: NativePointer) => void,
    atDamageModify?: (thisPtr: NativePointer, damage: number, cardPtr: NativePointer) => number,
    changeNumberOfCardsInReward?: (thisPtr: NativePointer, numberOfCards: number) => number,
    changeRareCardRewardChance?: (thisPtr: NativePointer, rareCardChance: number) => number,
    changeUncommonCardRewardChance?: (thisPtr: NativePointer, uncommonCardChance: number) => number,
    canPlay?: (thisPtr: NativePointer, cardPtr: NativePointer) => number,
    makeCopy: (thisPtr: NativePointer) => NativePointer,
    canSpawn?: (thisPtr: NativePointer) => number,
    onUsePotion?: (thisPtr: NativePointer) => void,
    onChangeStance?: (thisPtr: NativePointer, oldStance: NativePointer, newStance: NativePointer) => void,
    onLoseHp?: (thisPtr: NativePointer, damageAmount: number) => void,
    onLoseHpLast?: (thisPtr: NativePointer, damageAmount: number) => number,
    wasHPLost?: (thisPtr: NativePointer, damageAmount: number) => void,
};

export class AbstractRelic extends NativeClassWrapper {
    //NativePointer AbstractRelic *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * new Relic id => (v func name => v func)
     * 
     * NativePointer current don't exist toUInt64, Frida(Duktape) current don't support BigInt,
     * so current proxy implement need all C pointer size equal sizeof(uint32_t).
     * 
     * use ptr.toString() or new Uint64(ptr.toString()) can support pointer size equal sizeof(uint64_t) architecture.
     * but there is more performance overhead.
     */
    static #rewriteVFuncMap = new Map<number, NewRelicVFuncType>();
    static #tempObjPtrArr = new Array<number>();

    static readonly #NewRelicVFuncProxys: NewRelicVFuncType = {
        updateDescription: (thisPtr: NativePointer, playerClass: PlayerClass) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.updateDescription;
                if (Func !== undefined) {
                    Func(thisPtr, playerClass);
                }
            }
        },
        getUpdatedDescription: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.getUpdatedDescription;
                if (Func !== undefined) {
                    return Func(thisPtr);
                }
            }

            return NativeSTDLib.JString.Ctor("");
        },
        onPlayCard: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onPlayCard;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr, monsterPtr);
                }
            }
        },
        onPreviewObtainCard: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onPreviewObtainCard;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        onObtainCard: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onObtainCard;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        onGainGold: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onGainGold;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onLoseGold: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onLoseGold;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onSpendGold: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onSpendGold;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onEquip: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onEquip;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onUnequip: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onUnequip;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        atPreBattle: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atPreBattle;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        atBattleStart: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atBattleStart;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onSpawnMonster: (thisPtr: NativePointer, monsterPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onSpawnMonster;
                if (Func !== undefined) {
                    Func(thisPtr, monsterPtr);
                }
            }
        },
        atBattleStartPreDraw: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atBattleStartPreDraw;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        atTurnStart: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atTurnStart;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        atTurnStartPostDraw: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atTurnStartPostDraw;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onPlayerEndTurn: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onPlayerEndTurn;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onBloodied: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onBloodied;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onNotBloodied: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onNotBloodied;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onManualDiscard: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onManualDiscard;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onUseCard: (thisPtr: NativePointer, cardPtr: NativePointer, useCardAction: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onUseCard;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr, useCardAction);
                }
            }
        },
        onVictory: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onVictory;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onMonsterDeath: (thisPtr: NativePointer, monsterPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onMonsterDeath;
                if (Func !== undefined) {
                    Func(thisPtr, monsterPtr);
                }
            }
        },
        onBlockBroken: (thisPtr: NativePointer, creaturePtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onBlockBroken;
                if (Func !== undefined) {
                    Func(thisPtr, creaturePtr);
                }
            }
        },
        onPlayerGainedBlock: (thisPtr: NativePointer, blockAmount: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onPlayerGainedBlock;
                if (Func !== undefined) {
                    return Func(thisPtr, blockAmount);
                }
            }

            return blockAmount;
        },
        onPlayerHeal: (thisPtr: NativePointer, healAmount: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onPlayerHeal;
                if (Func !== undefined) {
                    return Func(thisPtr, healAmount);
                }
            }

            return healAmount
        },
        onEnergyRecharge: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onEnergyRecharge;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        /** ArrayList\<AbstractCampfireOption\>* options */
        addCampfireOption: (thisPtr: NativePointer, options: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.addCampfireOption;
                if (Func !== undefined) {
                    Func(thisPtr, options);
                }
            }
        },
        /** AbstractCampfireOption* option */
        canUseCampfireOption: (thisPtr: NativePointer, option: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.canUseCampfireOption;
                if (Func !== undefined) {
                    return Func(thisPtr, option);
                }
            }

            return Number(true);
        },
        onRest: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onRest;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onEnterRestRoom: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onEnterRestRoom;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onRefreshHand: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onRefreshHand;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onShuffle: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onShuffle;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onSmith: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onSmith;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onAttack: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number, targetCreature: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAttack;
                if (Func !== undefined) {
                    Func(thisPtr, dmgInfo, damageAmount, targetCreature);
                }
            }
        },
        onAttacked: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAttacked;
                if (Func !== undefined) {
                    return Func(thisPtr, dmgInfo, damageAmount);
                }
            }

            return damageAmount;
        },
        onAttackedToChangeDamage: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAttackedToChangeDamage;
                if (Func !== undefined) {
                    return Func(thisPtr, dmgInfo, damageAmount);
                }
            }

            return damageAmount;
        },
        onAttackToChangeDamage: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAttackToChangeDamage;
                if (Func !== undefined) {
                    return Func(thisPtr, dmgInfo, damageAmount);
                }
            }

            return damageAmount;
        },
        onExhaust: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onExhaust;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        onTrigger: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onTrigger;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onTrigger2: (thisPtr: NativePointer, targetCreature: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onTrigger2;
                if (Func !== undefined) {
                    Func(thisPtr, targetCreature);
                }
            }
        },
        checkTrigger: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.checkTrigger;
                if (Func !== undefined) {
                    return Func(thisPtr, cardPtr);
                }
            }

            return Number(false);
        },
        onEnterRoom: (thisPtr: NativePointer, roomPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onEnterRoom;
                if (Func !== undefined) {
                    Func(thisPtr, roomPtr);
                }
            }
        },
        justEnteredRoom: (thisPtr: NativePointer, roomPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.justEnteredRoom;
                if (Func !== undefined) {
                    Func(thisPtr, roomPtr);
                }
            }
        },
        onCardDraw: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onCardDraw;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        onChestOpen: (thisPtr: NativePointer, bossChest: boolean) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onChestOpen;
                if (Func !== undefined) {
                    Func(thisPtr, bossChest);
                }
            }
        },
        onChestOpenAfter: (thisPtr: NativePointer, bossChest: boolean) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onChestOpenAfter;
                if (Func !== undefined) {
                    Func(thisPtr, bossChest);
                }
            }
        },
        onDrawOrDiscard: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onDrawOrDiscard;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onMasterDeckChange: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onMasterDeckChange;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        atDamageModify: (thisPtr: NativePointer, damage: number, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atDamageModify;
                if (Func !== undefined) {
                    return Func(thisPtr, damage, cardPtr);
                }
            }

            return damage;
        },
        changeNumberOfCardsInReward: (thisPtr: NativePointer, numberOfCards: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.changeNumberOfCardsInReward;
                if (Func !== undefined) {
                    return Func(thisPtr, numberOfCards);
                }
            }

            return numberOfCards;
        },
        changeRareCardRewardChance: (thisPtr: NativePointer, rareCardChance: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.changeRareCardRewardChance;
                if (Func !== undefined) {
                    return Func(thisPtr, rareCardChance);
                }
            }

            return rareCardChance;
        },
        changeUncommonCardRewardChance: (thisPtr: NativePointer, uncommonCardChance: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.changeUncommonCardRewardChance;
                if (Func !== undefined) {
                    return Func(thisPtr, uncommonCardChance);
                }
            }

            return uncommonCardChance;
        },
        canPlay: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.canPlay;
                if (Func !== undefined) {
                    return Func(thisPtr, cardPtr);
                }
            }

            return Number(true);
        },
        makeCopy: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.makeCopy;
                if (Func !== undefined) {
                    const copyObj = Func(thisPtr);
                    AbstractRelic.#tempObjPtrArr.push(copyObj.toUInt32());
                    return copyObj
                }
            }

            PatchHelper.LogV(wrapRelic.relicId + " miss register Relic::makeCopy vfunc???");
            return NULL;
        },
        canSpawn: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.canSpawn;
                if (Func !== undefined) {
                    return Func(thisPtr);
                }
            }

            return Number(true);
        },
        onUsePotion: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onUsePotion;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onChangeStance: (thisPtr: NativePointer, oldStance: NativePointer, newStance: NativePointer) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onChangeStance;
                if (Func !== undefined) {
                    Func(thisPtr, oldStance, newStance);
                }
            }
        },
        onLoseHp: (thisPtr: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onLoseHp;
                if (Func !== undefined) {
                    Func(thisPtr, damageAmount);
                }
            }
        },
        onLoseHpLast: (thisPtr: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onLoseHpLast;
                if (Func !== undefined) {
                    return Func(thisPtr, damageAmount);
                }
            }

            return damageAmount;
        },
        wasHPLost: (thisPtr: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.wasHPLost;
                if (Func !== undefined) {
                    Func(thisPtr, damageAmount);
                }
            }
        },
    };

    static readonly #vfunctionMap = {
        /**
         * ```c
         * void getUpdatedDescription(STS::AbstractRelic* thisPtr, PlayerClass playerClass)
         * ```
         */
        updateDescription: new NativeFunctionInfo(0x80, 'void', ['pointer', 'uint32']),
        /**
         * ```c
         * STS::JString* getUpdatedDescription(STS::AbstractRelic* thisPtr)
         * ```
         */
        getUpdatedDescription: new NativeFunctionInfo(0x88, 'pointer', ['pointer']),
        //void AbstractRelic::onPlayCard(STS::AbstractRelic* this, STS::AbstractCard* cardPtr, STS::AbstractMonster * monsterPtr)
        onPlayCard: new NativeFunctionInfo(0xA8, 'void', ['pointer', 'pointer', 'pointer']),
        //void AbstractRelic::onPreviewObtainCard(STS::AbstractRelic* this, STS::AbstractCard* cardPtr)
        onPreviewObtainCard: new NativeFunctionInfo(0xB0, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onObtainCard(STS::AbstractRelic* this, STS::AbstractCard* cardPtr)
        onObtainCard: new NativeFunctionInfo(0xB8, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onGainGold(STS::AbstractRelic* this)
        onGainGold: new NativeFunctionInfo(0xC0, 'void', ['pointer']),
        //void AbstractRelic::onGainGold(STS::AbstractRelic* this)
        onLoseGold: new NativeFunctionInfo(0xC8, 'void', ['pointer']),
        //void AbstractRelic::onSpendGold(STS::AbstractRelic* this)
        onSpendGold: new NativeFunctionInfo(0xD0, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractRelic::onEquip(STS::AbstractRelic* this)
         * ```
        */
        onEquip: new NativeFunctionInfo(0xD8, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractRelic::onUnequip(STS::AbstractRelic* this)
         * ```
        */
        onUnequip: new NativeFunctionInfo(0xE0, 'void', ['pointer']),
        //void AbstractRelic::atPreBattle(STS::AbstractRelic* this)
        atPreBattle: new NativeFunctionInfo(0xE8, 'void', ['pointer']),
        //void AbstractRelic::atBattleStart(STS::AbstractRelic* this)
        atBattleStart: new NativeFunctionInfo(0xF0, 'void', ['pointer']),
        //void AbstractRelic::onSpawnMonster(STS::AbstractRelic* this, STS::AbstractMonster * monsterPtr)
        onSpawnMonster: new NativeFunctionInfo(0xF8, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::atBattleStartPreDraw(STS::AbstractRelic* this)
        atBattleStartPreDraw: new NativeFunctionInfo(0x100, 'void', ['pointer']),
        //void AbstractRelic::atTurnStart(STS::AbstractRelic* this)
        atTurnStart: new NativeFunctionInfo(0x108, 'void', ['pointer']),
        //void AbstractRelic::atTurnStartPostDraw(STS::AbstractRelic* this)
        atTurnStartPostDraw: new NativeFunctionInfo(0x110, 'void', ['pointer']),
        //void AbstractRelic::onPlayerEndTurn(STS::AbstractRelic* this)
        onPlayerEndTurn: new NativeFunctionInfo(0x118, 'void', ['pointer']),
        //void AbstractRelic::onBloodied(STS::AbstractRelic* this)
        onBloodied: new NativeFunctionInfo(0x120, 'void', ['pointer']),
        //void AbstractRelic::onNotBloodied(STS::AbstractRelic* this)
        onNotBloodied: new NativeFunctionInfo(0x128, 'void', ['pointer']),
        //void AbstractRelic::onManualDiscard(STS::AbstractRelic* this)
        onManualDiscard: new NativeFunctionInfo(0x130, 'void', ['pointer']),
        //void AbstractRelic::onManualDiscard(STS::AbstractRelic* this, STS::AbstractCard targetCard, STS::AbstractGameAction useCardAction)
        onUseCard: new NativeFunctionInfo(0x138, 'void', ['pointer', 'pointer', 'pointer']),
        //void AbstractRelic::onVictory(STS::AbstractRelic* this)
        onVictory: new NativeFunctionInfo(0x140, 'void', ['pointer']),
        //void AbstractRelic::onMonsterDeath(STS::AbstractRelic* this, STS::AbstractMonster * monsterPtr)
        onMonsterDeath: new NativeFunctionInfo(0x148, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onBlockBroken(STS::AbstractRelic* this, STS::AbstractCreature * monsterPtr)
        onBlockBroken: new NativeFunctionInfo(0x150, 'void', ['pointer', 'pointer']),
        //int32_t AbstractRelic::onPlayerGainedBlock(STS::AbstractRelic* this, int32_t blockAmount)
        //onPlayerGaineBlock: new NativeFunctionInfo(0x158, 'void', ['pointer', 'int32']),
        //int32_t AbstractRelic::onPlayerGainedBlock(STS::AbstractRelic* this, float blockAmount)
        onPlayerGainedBlock: new NativeFunctionInfo(0x160, 'int32', ['pointer', 'float']),
        //int32_t AbstractRelic::onPlayerHeal(STS::AbstractRelic* this, int32_t healAmount)
        onPlayerHeal: new NativeFunctionInfo(0x168, 'int32', ['pointer', 'int32']),
        //void AbstractRelic::onEnergyRecharge(STS::AbstractRelic* this)
        onEnergyRecharge: new NativeFunctionInfo(0x178, 'void', ['pointer']),
        /**
         * ```c
         * void addCampfireOption(STS::AbstractRelic* this, ArrayList<AbstractCampfireOption>* options)
         * ```
         */
        addCampfireOption: new NativeFunctionInfo(0x180, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void canUseCampfireOption(STS::AbstractRelic* this, AbstractCampfireOption* option)
         * ```
         */
        canUseCampfireOption: new NativeFunctionInfo(0x188, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onRest(STS::AbstractRelic* this)
        onRest: new NativeFunctionInfo(0x190, 'void', ['pointer']),
        //void AbstractRelic::onEnterRestRoom(STS::AbstractRelic* this)
        onEnterRestRoom: new NativeFunctionInfo(0x1A0, 'void', ['pointer']),
        //void AbstractRelic::onRefreshHand(STS::AbstractRelic* this)
        onRefreshHand: new NativeFunctionInfo(0x1A8, 'void', ['pointer']),
        //void AbstractRelic::onShuffle(STS::AbstractRelic* this)
        onShuffle: new NativeFunctionInfo(0x1B0, 'void', ['pointer']),
        //void AbstractRelic::onSmith(STS::AbstractRelic* this)
        onSmith: new NativeFunctionInfo(0x1B8, 'void', ['pointer']),
        //void AbstractRelic::onAttack(STS::AbstractRelic* this, STS::DamageInfo* info, int32_t damageAmount, STS::AbstractCreature* target)
        onAttack: new NativeFunctionInfo(0x1C0, 'void', ['pointer', 'pointer', 'int32', 'pointer']),
        /**
         * ```c
         * int32_t AbstractRelic::onAttacked(STS::AbstractRelic* this, STS::DamageInfo* info, int32_t damageAmount)
         * ```
         */
        onAttacked: new NativeFunctionInfo(0x1C8, 'int32', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * int32_t AbstractRelic::onAttackedToChangeDamage(STS::AbstractRelic* this, STS::DamageInfo* info, int32_t damageAmount)
         * ```
         */
        onAttackedToChangeDamage: new NativeFunctionInfo(0x1D0, 'int32', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * int32_t AbstractRelic::onAttackToChangeDamage(STS::AbstractRelic* this, STS::DamageInfo* info, int32_t damageAmount)
         * ```
         */
        onAttackToChangeDamage: new NativeFunctionInfo(0x1D8, 'int32', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * void AbstractRelic::onExhaust(STS::AbstractRelic* this, STS::AbstractCard* cardPtr)
         * ```
         */
        onExhaust: new NativeFunctionInfo(0x1E0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractRelic::onTrigger(STS::AbstractRelic* this)
         * ```
         */
        onTrigger: new NativeFunctionInfo(0x1E8, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractRelic::onTrigger(STS::AbstractRelic* this, STS::AbstractCreature* targetCreature)
         * ```
         */
        onTrigger2: new NativeFunctionInfo(0x1F0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * bool AbstractRelic::checkTrigger(STS::AbstractRelic* this)
         * ```
         */
        checkTrigger: new NativeFunctionInfo(0x1F8, 'bool', ['pointer']),
        //void AbstractRelic::onEnterRoom(STS::AbstractRelic* this, STS::AbstractRoom* room)
        onEnterRoom: new NativeFunctionInfo(0x200, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::justEnteredRoom(STS::AbstractRelic* this, STS::AbstractRoom* room)
        justEnteredRoom: new NativeFunctionInfo(0x208, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onCardDraw(STS::AbstractRelic* this, STS::AbstractCard* drawnCard)
        onCardDraw: new NativeFunctionInfo(0x210, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractRelic::onChestOpen(STS::AbstractRelic* this, bool bossChest)
         * ```
         */
        onChestOpen: new NativeFunctionInfo(0x218, 'void', ['pointer', 'bool']),
        /**
         * ```c
         * void AbstractRelic::onChestOpen(STS::AbstractRelic* this, bool bool)
         * ```
         */
        onChestOpenAfter: new NativeFunctionInfo(0x220, 'void', ['pointer', 'bool']),
        //void AbstractRelic::onDrawOrDiscard(STS::AbstractRelic* this)
        onDrawOrDiscard: new NativeFunctionInfo(0x228, 'void', ['pointer']),
        //void AbstractRelic::onMasterDeckChange(STS::AbstractRelic* this)
        onMasterDeckChange: new NativeFunctionInfo(0x230, 'void', ['pointer']),
        /**
         * ```c
         * float AbstractRelic::atDamageModify(STS::AbstractRelic* this, float damage, STS::AbstractCard* cardPtr)
         * ```
         */
        atDamageModify: new NativeFunctionInfo(0x238, 'float', ['pointer', 'float', 'pointer']),
        /**
         * ```c
         * int32_t AbstractRelic::changeNumberOfCardsInReward(STS::AbstractRelic* this, int32_t numberOfCards)
         * ```
         */
        changeNumberOfCardsInReward: new NativeFunctionInfo(0x240, 'int32', ['pointer', 'int32']),
        /**
         * ```c
         * int32_t AbstractRelic::changeRareCardRewardChance(STS::AbstractRelic* this, int32_t rareCardChance)
         * ```
         */
        changeRareCardRewardChance: new NativeFunctionInfo(0x248, 'int32', ['pointer', 'int32']),
        /**
         * ```c
         * int32_t AbstractRelic::changeUncommonCardRewardChance(STS::AbstractRelic* this, int32_t uncommonCardChance)
         * ```
         */
        changeUncommonCardRewardChance: new NativeFunctionInfo(0x250, 'int32', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractRelic::flash(STS::AbstractRelic* this)
         * ```
         */
        flash: new NativeFunctionInfo(0x2B8, 'void', ['pointer']),
        //bool AbstractRelic::canPlay(STS::AbstractRelic* this, STS::AbstractCard* card)
        canPlay: new NativeFunctionInfo(0x2D0, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         * STS::AbstractRelic* AbstractRelic::makeCopy(STS::AbstractRelic* this)
         * ```
         */
        makeCopy: new NativeFunctionInfo(0x2E8, 'pointer', ['pointer']),
        /**
         * ```c
         * bool AbstractRelic::canSpawn(STS::AbstractRelic* this)
         * ```
         */
        canSpawn: new NativeFunctionInfo(0x300, 'bool', ['pointer']),
        //void AbstractRelic::onUsePotion(STS::AbstractRelic* this)
        onUsePotion: new NativeFunctionInfo(0x308, 'void', ['pointer']),
        /**
         * ```c
         * bool AbstractRelic::canSpawn(STS::AbstractRelic* this, STS::AbstractStance* prevStance, STS::AbstractStance* newStance)
         * ```
         */
        onChangeStance: new NativeFunctionInfo(0x310, 'void', ['pointer', 'pointer', 'pointer']),
        //void AbstractRelic::onLoseHp(STS::AbstractRelic* this, int damageAmount)
        onLoseHp: new NativeFunctionInfo(0x318, 'void', ['pointer', 'int32']),
        /**
         * ```c
         *  void AbstractRelic::addToTop(STS::AbstractRelic* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToBot: new NativeFunctionInfo(0x328, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractRelic::addToTop(STS::AbstractRelic* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0x330, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  int32_t AbstractRelic::onLoseHpLast(STS::AbstractRelic* this, int32_t damageAmount)
         * ```
         */
        onLoseHpLast: new NativeFunctionInfo(0x338, 'int32', ['pointer', 'int32']),
        /**
         * ```c
         *  void AbstractRelic::wasHPLost(STS::AbstractRelic* this, int32_t damageAmount)
         * ```
         */
        wasHPLost: new NativeFunctionInfo(0x340, 'void', ['pointer', 'int32']),
    };

    static readonly #NewRelicImageTextureCache = new Map<string, NativePointer>();

    static readonly #vFuncNamePrefix = "AbstractRelic_";

    static NewRelicCtor(relicId: string, relicName: string, description: string, flavorText: string, imgName: string, tier: RelicTier, sfx: LandingSound, newVFuncs: NewRelicVFuncType): NativePointer {
        let origRelicPtr = NativeRelics.AbstractRelic.Ctor("Circlet", "Circlet.png", tier, sfx);

        let wrapRelic = new AbstractRelic(origRelicPtr);
        //previous action object memory maybe will be reused, so origActionPtr value not necessarily unique.
        AbstractRelic.#rewriteVFuncMap.set(origRelicPtr.toUInt32(), newVFuncs);


        wrapRelic.relicId = relicId;
        wrapRelic.name = relicName;
        wrapRelic.description = description;
        wrapRelic.flavorText = flavorText;

        let wrapTips = new ArrayList(wrapRelic.tips);
        let wrapTip = new PowerTip(NativeSTDLib.ArrayList.PowerTip.get(wrapTips.rawPtr, 0));
        wrapTip.header = relicName;
        wrapTip.body = description;

        const imgPath = PatchHelper.ResourceDir + imgName;
        let newRelicImg = AbstractRelic.#NewRelicImageTextureCache.get(imgPath);
        if (newRelicImg === undefined) {
            try {
                let imgHandle = NativeGDXLib.Files.FileHandle.Ctor2(imgPath, GDXFileType.Absolute);
                if (NativeGDXLib.Files.FileHandle.exists(imgHandle)) {
                    newRelicImg = NativeGDXLib.Graphics.Texture.Ctor2(imgHandle);
                    wrapRelic.img = newRelicImg;
                }
            } catch (error) {
                PatchHelper.LogV("" + (error as Error).stack);
            }
        } else {
            wrapRelic.img = newRelicImg;
        }

        if (!AbstractRelic.#rewriteVFuncMap.has(-1)) {
            const VFuncMap = AbstractRelic.#vfunctionMap;
            const VFuncProxys = AbstractRelic.#NewRelicVFuncProxys;
            let funcName = "AbstractRelicVFuncProxy_updateDescription";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PU32_Func(funcName), VFuncMap.updateDescription, VFuncProxys.updateDescription);
            funcName = "AbstractRelicVFuncProxy_getUpdatedDescription";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), VFuncMap.getUpdatedDescription, VFuncProxys.getUpdatedDescription);
            funcName = "AbstractRelicVFuncProxy_onPlayCard";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), VFuncMap.onPlayCard, VFuncProxys.onPlayCard);
            funcName = "AbstractRelicVFuncProxy_onPreviewObtainCard";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onPreviewObtainCard, VFuncProxys.onPreviewObtainCard);
            funcName = "AbstractRelicVFuncProxy_onObtainCard";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onObtainCard, VFuncProxys.onObtainCard);
            funcName = "AbstractRelicVFuncProxy_onGainGold";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onGainGold, VFuncProxys.onGainGold);
            funcName = "AbstractRelicVFuncProxy_onLoseGold";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onLoseGold, VFuncProxys.onLoseGold);
            funcName = "AbstractRelicVFuncProxy_onSpendGold";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onSpendGold, VFuncProxys.onSpendGold);
            funcName = "AbstractRelicVFuncProxy_onEquip";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onEquip, VFuncProxys.onEquip);
            funcName = "AbstractRelicVFuncProxy_onUnequip";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onUnequip, VFuncProxys.onUnequip);
            funcName = "AbstractRelicVFuncProxy_atPreBattle";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atPreBattle, VFuncProxys.atPreBattle);
            funcName = "AbstractRelicVFuncProxy_atBattleStart";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atBattleStart, VFuncProxys.atBattleStart);
            funcName = "AbstractRelicVFuncProxy_onSpawnMonster";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onSpawnMonster, VFuncProxys.onSpawnMonster);
            funcName = "AbstractRelicVFuncProxy_atBattleStartPreDraw";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atBattleStartPreDraw, VFuncProxys.atBattleStartPreDraw);
            funcName = "AbstractRelicVFuncProxy_atTurnStart";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atTurnStart, VFuncProxys.atTurnStart);
            funcName = "AbstractRelicVFuncProxy_atTurnStartPostDraw";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atTurnStartPostDraw, VFuncProxys.atTurnStartPostDraw);
            funcName = "AbstractRelicVFuncProxy_onPlayerEndTurn";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onPlayerEndTurn, VFuncProxys.onPlayerEndTurn);
            funcName = "AbstractRelicVFuncProxy_onBloodied";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onBloodied, VFuncProxys.onBloodied);
            funcName = "AbstractRelicVFuncProxy_onNotBloodied";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onNotBloodied, VFuncProxys.onNotBloodied);
            funcName = "AbstractRelicVFuncProxy_onManualDiscard";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onManualDiscard, VFuncProxys.onManualDiscard);
            funcName = "AbstractRelicVFuncProxy_onUseCard";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), VFuncMap.onUseCard, VFuncProxys.onUseCard);
            funcName = "AbstractRelicVFuncProxy_onVictory";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onVictory, VFuncProxys.onVictory);
            funcName = "AbstractRelicVFuncProxy_onMonsterDeath";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onMonsterDeath, VFuncProxys.onMonsterDeath);
            funcName = "AbstractRelicVFuncProxy_onBlockBroken";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onBlockBroken, VFuncProxys.onBlockBroken);
            funcName = "AbstractRelicVFuncProxy_onPlayerGainedBlock";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PF_Func(funcName), VFuncMap.onPlayerGainedBlock, VFuncProxys.onPlayerGainedBlock);
            funcName = "AbstractRelicVFuncProxy_onPlayerHeal";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), VFuncMap.onPlayerHeal, VFuncProxys.onPlayerHeal);
            funcName = "AbstractRelicVFuncProxy_onEnergyRecharge";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onEnergyRecharge, VFuncProxys.onEnergyRecharge);
            funcName = "AbstractRelicVFuncProxy_addCampfireOption";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.addCampfireOption, VFuncProxys.addCampfireOption);
            funcName = "AbstractRelicVFuncProxy_canUseCampfireOption";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.B_PP_Func(funcName), VFuncMap.canUseCampfireOption, VFuncProxys.canUseCampfireOption);
            funcName = "AbstractRelicVFuncProxy_onRest";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onRest, VFuncProxys.onRest);
            funcName = "AbstractRelicVFuncProxy_onEnterRestRoom";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onEnterRestRoom, VFuncProxys.onEnterRestRoom);
            funcName = "AbstractRelicVFuncProxy_onRefreshHand";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onRefreshHand, VFuncProxys.onRefreshHand);
            funcName = "AbstractRelicVFuncProxy_onShuffle";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onShuffle, VFuncProxys.onShuffle);
            funcName = "AbstractRelicVFuncProxy_onSmith";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onSmith, VFuncProxys.onSmith);
            funcName = "AbstractRelicVFuncProxy_onAttack";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPI32P_Func(funcName), VFuncMap.onAttack, VFuncProxys.onAttack);
            funcName = "AbstractRelicVFuncProxy_onAttacked";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PPI32_Func(funcName), VFuncMap.onAttacked, VFuncProxys.onAttacked);
            funcName = "AbstractRelicVFuncProxy_onAttackedToChangeDamage";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PPI32_Func(funcName), VFuncMap.onAttackedToChangeDamage, VFuncProxys.onAttackedToChangeDamage);
            funcName = "AbstractRelicVFuncProxy_onAttackToChangeDamage";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PPI32_Func(funcName), VFuncMap.onAttackToChangeDamage, VFuncProxys.onAttackToChangeDamage);
            funcName = "AbstractRelicVFuncProxy_onExhaust";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onExhaust, VFuncProxys.onExhaust);
            funcName = "AbstractRelicVFuncProxy_onTrigger";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onTrigger, VFuncProxys.onTrigger);
            funcName = "AbstractRelicVFuncProxy_onTrigger2";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onTrigger2, VFuncProxys.onTrigger2);
            funcName = "AbstractRelicVFuncProxy_checkTrigger";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.checkTrigger, VFuncProxys.checkTrigger);
            funcName = "AbstractRelicVFuncProxy_onEnterRoom";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onEnterRoom, VFuncProxys.onEnterRoom);
            funcName = "AbstractRelicVFuncProxy_justEnteredRoom";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.justEnteredRoom, VFuncProxys.justEnteredRoom);
            funcName = "AbstractRelicVFuncProxy_onCardDraw";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onCardDraw, VFuncProxys.onCardDraw);
            funcName = "AbstractRelicVFuncProxy_onChestOpen";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PB_Func(funcName), VFuncMap.onChestOpen, VFuncProxys.onChestOpen);
            funcName = "AbstractRelicVFuncProxy_onChestOpenAfter";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PB_Func(funcName), VFuncMap.onChestOpenAfter, VFuncProxys.onChestOpenAfter);
            funcName = "AbstractRelicVFuncProxy_onDrawOrDiscard";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onDrawOrDiscard, VFuncProxys.onDrawOrDiscard);
            funcName = "AbstractRelicVFuncProxy_onMasterDeckChange";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onMasterDeckChange, VFuncProxys.onMasterDeckChange);
            funcName = "AbstractRelicVFuncProxy_atDamageModify";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32P_Func(funcName), VFuncMap.atDamageModify, VFuncProxys.atDamageModify);
            funcName = "AbstractRelicVFuncProxy_changeNumberOfCardsInReward";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), VFuncMap.changeNumberOfCardsInReward, VFuncProxys.changeNumberOfCardsInReward);
            funcName = "AbstractRelicVFuncProxy_changeRareCardRewardChance";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), VFuncMap.changeRareCardRewardChance, VFuncProxys.changeRareCardRewardChance);
            funcName = "AbstractRelicVFuncProxy_changeUncommonCardRewardChance";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), VFuncMap.changeUncommonCardRewardChance, VFuncProxys.changeUncommonCardRewardChance);
            funcName = "AbstractRelicVFuncProxy_canPlay";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.canPlay, VFuncProxys.canPlay);
            funcName = "AbstractRelicVFuncProxy_makeCopy";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), VFuncMap.makeCopy, VFuncProxys.makeCopy);
            funcName = "AbstractRelicVFuncProxy_canSpawn";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.B_P_Func(funcName), VFuncMap.canSpawn, VFuncProxys.canSpawn);
            funcName = "AbstractRelicVFuncProxy_onUsePotion";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onUsePotion, VFuncProxys.onUsePotion);
            funcName = "AbstractRelicVFuncProxy_onChangeStance";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), VFuncMap.onChangeStance, VFuncProxys.onChangeStance);
            funcName = "AbstractRelicVFuncProxy_onLoseHp";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PI32_Func(funcName), VFuncMap.onLoseHp, VFuncProxys.onLoseHp);
            funcName = "AbstractRelicVFuncProxy_onLoseHpLast";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), VFuncMap.onLoseHpLast, VFuncProxys.onLoseHpLast);
            funcName = "AbstractRelicVFuncProxy_wasHPLost";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PI32_Func(funcName), VFuncMap.wasHPLost, VFuncProxys.wasHPLost);

            AbstractRelic.#rewriteVFuncMap.set(-1, AbstractRelic.#NewRelicVFuncProxys);
        }

        return origRelicPtr;
    }

    static OnGameSaveLoad() {
        while (AbstractRelic.#tempObjPtrArr.length) {
            let tempPtr = AbstractRelic.#tempObjPtrArr.pop();
            if (tempPtr !== undefined) {
                AbstractRelic.#rewriteVFuncMap.delete(tempPtr);
            }
        }
    }

    static OnNativeObjectAlloc(ptrValue: number) {
        const vfuncs = AbstractRelic.#rewriteVFuncMap.get(ptrValue);
        if (vfuncs !== undefined) {
            AbstractRelic.#rewriteVFuncMap.delete(ptrValue);
        }
    }

    getUpdatedDescription(): JString {
        return new JString(this.getVirtualFunction(AbstractRelic.#vfunctionMap.getUpdatedDescription)(this.rawPtr));
    }
    OverridegetUpdatedDescription(newVFunc: (thisPtr: NativePointer) => NativePointer) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_getUpdatedDescription").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), AbstractRelic.#vfunctionMap.getUpdatedDescription, newVFunc);
    }

    OverrideonPlayCard(newVFunc: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onPlayCard").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), AbstractRelic.#vfunctionMap.onPlayCard, newVFunc);
    }

    OverrideonEquip(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onEquip").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onEquip, newVFunc);
    }

    OverrideonUnequip(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onUnequip").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onUnequip, newVFunc);
    }

    OverrideatBattleStart(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_atBattleStart").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.atBattleStart, newVFunc);
    }

    OverrideatTurnStart(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_atTurnStart").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.atTurnStart, newVFunc);
    }

    OverrideonPlayerEndTurn(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onPlayerEndTurn").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onPlayerEndTurn, newVFunc);
    }

    OverrideonVictory(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onVictory").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onVictory, newVFunc);
    }

    OverrideonEnterRestRoom(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onEnterRestRoom").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onEnterRestRoom, newVFunc);
    }

    OverrideonShuffle(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onShuffle").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onShuffle, newVFunc);
    }

    flash(): void {
        this.getVirtualFunction(AbstractRelic.#vfunctionMap.flash)(this.rawPtr);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractRelic.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractRelic.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    get name() {
        return this.readOffsetJString(0x8).content;
    }
    set name(value) {
        this.writeOffsetJString(0x8, JString.CreateJString(value));
    }

    get relicId() {
        return this.readOffsetJString(0xC).content;
    }
    set relicId(value) {
        this.writeOffsetJString(0xC, JString.CreateJString(value));
    }

    /**
     * the Object type is JString
     */
    get DESCRIPTIONS() {
        return new JObjectArray(this.readOffsetPointer(0x14));
    }

    get energyBased() {
        return this.readOffsetBool(0x18);
    }
    set energyBased(value) {
        this.writeOffsetBool(0x18, value);
    }

    get usedUp() {
        return this.readOffsetBool(0x19);
    }
    set usedUp(value) {
        this.writeOffsetBool(0x19, value);
    }

    get grayscale() {
        return this.readOffsetBool(0x1A);
    }
    set grayscale(value) {
        this.writeOffsetBool(0x1A, value);
    }

    get description() {
        return this.readOffsetJString(0x1C).content;
    }
    set description(value) {
        this.writeOffsetJString(0x1C, JString.CreateJString(value));
    }

    get flavorText() {
        return this.readOffsetJString(0x20).content;
    }
    set flavorText(value) {
        this.writeOffsetJString(0x20, JString.CreateJString(value));
    }

    get cost() {
        return this.readOffsetS32(0x24);
    }
    set cost(value) {
        this.writeOffsetS32(0x24, value);
    }

    get counter() {
        return this.readOffsetS32(0x28);
    }
    set counter(value) {
        this.writeOffsetS32(0x28, value);
    }

    get tier(): RelicTier {
        return this.readOffsetU32(0x2C);
    }
    set tier(value) {
        this.writeOffsetU32(0x2C, value);
    }

    /**
     * the element type is ArrayList\<PowerTip\>
     */
    get tips() {
        return this.readOffsetPointer(0x30);
    }
    set tips(tipsPtr: NativePointer) {
        this.writeOffsetPointer(0x30, tipsPtr);
    }

    /**
     * GDX::graphics::Texture *
     */
    get img() {
        return this.readOffsetPointer(0x34);
    }
    set img(value) {
        this.writeOffsetPointer(0x34, value);
    }

    /**
     * GDX::graphics::Texture *
     */
    get largeImg() {
        return this.readOffsetPointer(0x38);
    }
    set largeImg(value) {
        this.writeOffsetPointer(0x38, value);
    }

    get outlineImg() {
        return this.readOffsetPointer(0x3C);
    }
    set outlineImg(value) {
        this.writeOffsetPointer(0x3C, value);
    }
}