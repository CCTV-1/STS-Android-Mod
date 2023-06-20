import { PowerType } from "../enums.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { PatchHelper } from "../PatchHelper.js";
import { ArrayList } from "./ArrayList.js";
import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export interface NewPowerVFuncType {
    updateParticles?: (thisPtr: NativePointer) => void,
    updateDescription?: (thisPtr: NativePointer) => void,
    atStartOfTurn?: (thisPtr: NativePointer) => void,
    duringTurn?: (thisPtr: NativePointer) => void,
    atStartOfTurnPostDraw?: (thisPtr: NativePointer) => void,
    atEndOfTurn?: (thisPtr: NativePointer, isPlayer: boolean) => void,
    atEndOfTurnPreEndTurnCards?: (thisPtr: NativePointer, isPlayer: boolean) => void,
    atEndOfRound?: (thisPtr: NativePointer) => void,
    onScry?: (thisPtr: NativePointer) => void,
    /**
     * damageArray type is JObjectArray\<int32_t\>
     */
    onDamageAllEnemies?: (thisPtr: NativePointer, damageArray: NativePointer) => void,
    onHeal?: (thisPtr: NativePointer, healAmount: number) => number,
    onAttacked?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => number,
    onAttack?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number, targetCreature: NativePointer) => void,
    onAttackedToChangeDamage?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => number,
    onAttackToChangeDamage?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => number,
    onInflictDamage?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number, targetCreature: NativePointer) => void,
    onEvokeOrb?: (thisPtr: NativePointer, orbPtr: NativePointer) => void,
    onCardDraw?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onPlayCard?: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => void,
    onUseCard?: (thisPtr: NativePointer, cardPtr: NativePointer, useCardActionPtr: NativePointer) => void,
    onAfterUseCard?: (thisPtr: NativePointer, cardPtr: NativePointer, useCardActionPtr: NativePointer) => void,
    wasHPLost?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => void,
    onSpecificTrigger?: (thisPtr: NativePointer) => void,
    triggerMarks?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onDeath?: (thisPtr: NativePointer) => void,
    onChannel?: (thisPtr: NativePointer, orbPtr: NativePointer) => void,
    atEnergyGain?: (thisPtr: NativePointer) => void,
    onExhaust?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onChangeStance?: (thisPtr: NativePointer, oldStance: NativePointer, newStance: NativePointer) => void,
    modifyBlock?: (thisPtr: NativePointer, blockAmount: number) => number,
    modifyBlock2?: (thisPtr: NativePointer, blockAmount: number, cardPtr: NativePointer) => number,
    onGainedBlock?: (thisPtr: NativePointer, blockAmount: number) => void,
    /**`int (*func)(float)`*/
    onPlayerGainedBlock?: (thisPtr: NativePointer, blockAmount: number) => number,
    /**  `int (*func)(int)`  */
    onPlayerGainedBlock2?: (thisPtr: NativePointer, blockAmount: number) => number,
    onGainCharge?: (thisPtr: NativePointer, chargeAmount: number) => void,
    onRemove?: (thisPtr: NativePointer) => void,
    onEnergyRecharge?: (thisPtr: NativePointer) => void,
    onDrawOrDiscard?: (thisPtr: NativePointer) => void,
    onAfterCardPlayed?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onInitialApplication?: (thisPtr: NativePointer) => void,
    onApplyPower?: (thisPtr: NativePointer, powerPtr: NativePointer, targetCreature: NativePointer, sourceCreature: NativePointer) => void,
    onLoseHp?: (thisPtr: NativePointer, damageAmount: number) => number,
    onVictory?: (thisPtr: NativePointer) => void,
    canPlayCard?: (thisPtr: NativePointer, cardPtr: NativePointer) => number,
    onObjectDector?: (thisPtrValue: number) => void,
};

export class AbstractPower extends NativeClassWrapper {
    //NativePointer AbstractPower *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * new Power id => (v func name => v func)
     * 
     * NativePointer current don't exist toUInt64, Frida(Duktape) current don't support BigInt,
     * so current proxy implement need all C pointer size equal sizeof(uint32_t).
     * 
     * use ptr.toString() or new Uint64(ptr.toString()) can support pointer size equal sizeof(uint64_t) architecture.
     * but there is more performance overhead.
     */
    static #rewriteVFuncMap = new Map<number, NewPowerVFuncType>();
    static readonly #NewRelicVFuncProxys: NewPowerVFuncType = {
        updateParticles: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.updateParticles;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        updateDescription: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.updateDescription;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        atStartOfTurn: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atStartOfTurn;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        duringTurn: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.duringTurn;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        atStartOfTurnPostDraw: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atStartOfTurnPostDraw;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        atEndOfTurn: (thisPtr: NativePointer, isPlayer: boolean) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atEndOfTurn;
                if (Func !== undefined) {
                    Func(thisPtr, isPlayer);
                }
            }
        },
        atEndOfTurnPreEndTurnCards: (thisPtr: NativePointer, isPlayer: boolean) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atEndOfTurnPreEndTurnCards;
                if (Func !== undefined) {
                    Func(thisPtr, isPlayer);
                }
            }
        },
        atEndOfRound: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atEndOfRound;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onScry: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onScry;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onDamageAllEnemies: (thisPtr: NativePointer, damageArray: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onDamageAllEnemies;
                if (Func !== undefined) {
                    Func(thisPtr, damageArray);
                }
            }
        },
        onHeal: (thisPtr: NativePointer, healAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onHeal;
                if (Func !== undefined) {
                    return Func(thisPtr, healAmount);
                }
            }
            return healAmount;
        },
        onAttacked: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAttacked;
                if (Func !== undefined) {
                    return Func(thisPtr, dmgInfo, damageAmount);
                }
            }
            return damageAmount;
        },
        onAttack: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number, targetCreature: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAttack;
                if (Func !== undefined) {
                    Func(thisPtr, dmgInfo, damageAmount, targetCreature);
                }
            }
        },
        onAttackedToChangeDamage: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAttackedToChangeDamage;
                if (Func !== undefined) {
                    return Func(thisPtr, dmgInfo, damageAmount);
                }
            }
            return damageAmount;
        },
        onAttackToChangeDamage: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAttackToChangeDamage;
                if (Func !== undefined) {
                    return Func(thisPtr, dmgInfo, damageAmount);
                }
            }
            return damageAmount;
        },
        onInflictDamage: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number, targetCreature: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onInflictDamage;
                if (Func !== undefined) {
                    Func(thisPtr, dmgInfo, damageAmount, targetCreature);
                }
            }
        },
        onEvokeOrb: (thisPtr: NativePointer, orbPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onEvokeOrb;
                if (Func !== undefined) {
                    Func(thisPtr, orbPtr);
                }
            }
        },
        onCardDraw: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onCardDraw;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        onPlayCard: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onPlayCard;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr, monsterPtr);
                }
            }
        },
        onUseCard: (thisPtr: NativePointer, cardPtr: NativePointer, useCardActionPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onUseCard;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr, useCardActionPtr);
                }
            }
        },
        onAfterUseCard: (thisPtr: NativePointer, cardPtr: NativePointer, useCardActionPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAfterUseCard;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr, useCardActionPtr);
                }
            }
        },
        wasHPLost: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.wasHPLost;
                if (Func !== undefined) {
                    Func(thisPtr, dmgInfo, damageAmount);
                }
            }
        },
        onSpecificTrigger: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onSpecificTrigger;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        triggerMarks: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.triggerMarks;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        onDeath: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onDeath;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onChannel: (thisPtr: NativePointer, orbPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onChannel;
                if (Func !== undefined) {
                    Func(thisPtr, orbPtr);
                }
            }
        },
        atEnergyGain: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.atEnergyGain;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onExhaust: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onExhaust;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        onChangeStance: (thisPtr: NativePointer, oldStance: NativePointer, newStance: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onChangeStance;
                if (Func !== undefined) {
                    Func(thisPtr, oldStance, newStance);
                }
            }
        },
        modifyBlock: (thisPtr: NativePointer, blockAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.modifyBlock;
                if (Func !== undefined) {
                    return Func(thisPtr, blockAmount);
                }
            }
            return blockAmount;
        },
        modifyBlock2: (thisPtr: NativePointer, blockAmount: number, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.modifyBlock2;
                if (Func !== undefined) {
                    return Func(thisPtr, blockAmount, cardPtr);
                }
            }

            const wrapPower = new AbstractPower(thisPtr);
            return wrapPower.modifyBlock(blockAmount);
        },
        onGainedBlock: (thisPtr: NativePointer, blockAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onGainedBlock;
                if (Func !== undefined) {
                    Func(thisPtr, blockAmount);
                }
            }
        },
        onPlayerGainedBlock: (thisPtr: NativePointer, blockAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onPlayerGainedBlock;
                if (Func !== undefined) {
                    return Func(thisPtr, blockAmount);
                }
            }
            return blockAmount;
        },
        onPlayerGainedBlock2: (thisPtr: NativePointer, blockAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onPlayerGainedBlock2;
                if (Func !== undefined) {
                    return Func(thisPtr, blockAmount);
                }
            }
            return blockAmount;
        },
        onGainCharge: (thisPtr: NativePointer, chargeAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onGainCharge;
                if (Func !== undefined) {
                    Func(thisPtr, chargeAmount);
                }
            }
        },
        onRemove: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onRemove;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onEnergyRecharge: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onEnergyRecharge;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onDrawOrDiscard: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onDrawOrDiscard;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onAfterCardPlayed: (thisPtr: NativePointer, cardPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onAfterCardPlayed;
                if (Func !== undefined) {
                    Func(thisPtr, cardPtr);
                }
            }
        },
        onInitialApplication: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onInitialApplication;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        onApplyPower: (thisPtr: NativePointer, powerPtr: NativePointer, targetCreature: NativePointer, sourceCreature: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onApplyPower;
                if (Func !== undefined) {
                    Func(thisPtr, powerPtr, targetCreature, sourceCreature);
                }
            }
        },
        onLoseHp: (thisPtr: NativePointer, damageAmount: number) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onLoseHp;
                if (Func !== undefined) {
                    return Func(thisPtr, damageAmount);
                }
            }
            return damageAmount;
        },
        onVictory: (thisPtr: NativePointer) => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.onVictory;
                if (Func !== undefined) {
                    Func(thisPtr);
                }
            }
        },
        canPlayCard: (thisPtr: NativePointer, cardPtr: NativePointer): number => {
            let cardVFuncMap = AbstractPower.#rewriteVFuncMap.get(thisPtr.toUInt32());
            if (cardVFuncMap !== undefined) {
                const Func = cardVFuncMap.canPlayCard;
                if (Func !== undefined) {
                    return Number(Func(thisPtr, cardPtr));
                }
            }

            return Number(true);
        },
    };

    static readonly #vfunctionMap = {
        /**
         * ```c
        * void AbstractPower::loadRegion(STS::AbstractPower* thisPtr, JString* fileName)
         * ```
         */
        loadRegion: new NativeFunctionInfo(0x20, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::playApplyPowerSfx(STS::AbstractPower* thisPtr)
         * ```
         */
        playApplyPowerSfx: new NativeFunctionInfo(0x28, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::updateParticles(STS::AbstractPower* thisPtr)
         * ```
         */
        updateParticles: new NativeFunctionInfo(0x30, 'void', ['pointer']),
        /**
         * ```c
         *  void AbstractPower::addToTop(STS::AbstractPower* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToBot: new NativeFunctionInfo(0x40, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractPower::addToTop(STS::AbstractPower* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0x48, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::updateDescription(STS::AbstractPower* thisPtr)
         * ```
         */
        updateDescription: new NativeFunctionInfo(0x50, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::stackPower(STS::AbstractPower* thisPtr, int32_t stackAmount)
         * ```
         */
        stackPower: new NativeFunctionInfo(0x58, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractPower::reducePower(STS::AbstractPower* thisPtr, int32_t reduceAmount)
         * ```
         */
        reducePower: new NativeFunctionInfo(0x60, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * float AbstractPower::atDamageGive(STS::AbstractPower* thisPtr, float damage, DamageType type)
         * ```
         */
        atDamageGive: new NativeFunctionInfo(0x80, 'float', ['pointer', 'float', 'uint32']),
        /**
         * ```c
         * float AbstractPower::atDamageFinalGive(STS::AbstractPower* thisPtr, float damage, DamageType type)
         * ```
         */
        atDamageFinalGive: new NativeFunctionInfo(0x88, 'float', ['pointer', 'float', 'uint32']),
        /**
         * ```c
         * float AbstractPower::atDamageFinalReceive(STS::AbstractPower* thisPtr, float damage, DamageType type)
         * ```
         */
        atDamageFinalReceive: new NativeFunctionInfo(0x90, 'float', ['pointer', 'float', 'uint32']),
        /**
         * ```c
         * float AbstractPower::atDamageReceive(STS::AbstractPower* thisPtr, float damage, DamageType type)
         * ```
         */
        atDamageReceive: new NativeFunctionInfo(0x98, 'float', ['pointer', 'float', 'uint32']),
        /**
         * ```c
         * float AbstractPower::atDamageGive(STS::AbstractPower* thisPtr, float damage, DamageType type, STS::AbstractCard card * cardPtr)
         * ```
         */
        atDamageGive2: new NativeFunctionInfo(0xA0, 'float', ['pointer', 'float', 'uint32', 'pointer']),
        /**
         * ```c
         * float AbstractPower::atDamageFinalGive(STS::AbstractPower* thisPtr, float damage, DamageType type, STS::AbstractCard card * cardPtr)
         * ```
         */
        atDamageFinalGive2: new NativeFunctionInfo(0xA8, 'float', ['pointer', 'float', 'uint32', 'pointer']),
        /**
         * ```c
         * float AbstractPower::atDamageFinalReceive(STS::AbstractPower* thisPtr, float damage, DamageType type, STS::AbstractCard card * cardPtr)
         * ```
         */
        atDamageFinalReceive2: new NativeFunctionInfo(0xB0, 'float', ['pointer', 'float', 'uint32', 'pointer']),
        /**
         * ```c
         * float AbstractPower::atDamageReceive(STS::AbstractPower* thisPtr, float damage, DamageType type, STS::AbstractCard card * cardPtr)
         * ```
         */
        atDamageReceive2: new NativeFunctionInfo(0xB8, 'float', ['pointer', 'float', 'uint32', 'pointer']),
        /**
         * ```c
         * void AbstractPower::atStartOfTurn(STS::AbstractPower* thisPtr)
         * ```
         */
        atStartOfTurn: new NativeFunctionInfo(0xC0, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::duringTurn(STS::AbstractPower* thisPtr)
         * ```
         */
        duringTurn: new NativeFunctionInfo(0xC8, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::atStartOfTurnPostDraw(STS::AbstractPower* thisPtr)
         * ```
         */
        atStartOfTurnPostDraw: new NativeFunctionInfo(0xD0, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::atEndOfTurn(STS::AbstractPower* thisPtr, bool isPlayer)
         * ```
         */
        atEndOfTurn: new NativeFunctionInfo(0xD8, 'void', ['pointer', 'bool']),
        /**
         * ```c
         * void AbstractPower::atEndOfTurnPreEndTurnCards(STS::AbstractPower* thisPtr, bool isPlayer)
         * ```
         */
        atEndOfTurnPreEndTurnCards: new NativeFunctionInfo(0xE0, 'void', ['pointer', 'bool']),
        /**
         * ```c
         * void AbstractPower::atEndOfRound(STS::AbstractPower* thisPtr)
         * ```
         */
        atEndOfRound: new NativeFunctionInfo(0xE8, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::onScry(STS::AbstractPower* thisPtr)
         * ```
         */
        onScry: new NativeFunctionInfo(0xF0, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::onDamageAllEnemies(STS::AbstractPower* thisPtr, JObjectArray<int32_t>* damageArray)
         * ```
         */
        onDamageAllEnemies: new NativeFunctionInfo(0xF8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * int32_t AbstractPower::onHeal(STS::AbstractPower* thisPtr, int32_t healAmount)
         * ```
         */
        onHeal: new NativeFunctionInfo(0x100, 'int32', ['pointer', 'int32']),
        /**
         * ```c
         * int32_t AbstractPower::onAttacked(STS::AbstractPower* thisPtr, DamageInfo* dmgInfo, int32_t damageAmount)
         * ```
         */
        onAttacked: new NativeFunctionInfo(0x108, 'int32', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * void AbstractPower::onAttack(STS::AbstractPower* thisPtr, DamageInfo* dmgInfo, int32_t damageAmount, STS::AbstractCreature* targetCreature)
         * ```
         */
        onAttack: new NativeFunctionInfo(0x110, 'void', ['pointer', 'pointer', 'int32', 'pointer']),
        /**
         * ```c
         * int32_t AbstractPower::onAttackedToChangeDamage(STS::AbstractPower* thisPtr, DamageInfo* dmgInfo, int32_t damageAmount)
         * ```
         */
        onAttackedToChangeDamage: new NativeFunctionInfo(0x118, 'int32', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * int32_t AbstractPower::onAttackToChangeDamage(STS::AbstractPower* thisPtr, DamageInfo* dmgInfo, int32_t damageAmount)
         * ```
         */
        onAttackToChangeDamage: new NativeFunctionInfo(0x120, 'int32', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * void AbstractPower::onInflictDamage(STS::AbstractPower* thisPtr, DamageInfo* dmgInfo, int32_t damageAmount, STS::AbstractCreature* targetCreature)
         * ```
         */
        onInflictDamage: new NativeFunctionInfo(0x128, 'void', ['pointer', 'pointer', 'int32', 'pointer']),
        /**
         * ```c
         * void AbstractPower::onEvokeOrb(STS::AbstractPower* thisPtr, STS::AbstractOrb* orb)
         * ```
         */
        onEvokeOrb: new NativeFunctionInfo(0x130, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::onCardDraw(STS::AbstractPower* thisPtr, STS::AbstractCard* cardPtr)
         * ```
         */
        onCardDraw: new NativeFunctionInfo(0x138, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::onPlayCard(STS::AbstractPower* thisPtr, STS::AbstractCard* cardPtr, STS::UseCardAction* action)
         * ```
         * 
         * `class UseCardAction : public AbstractGameAction {};`
         */
        onPlayCard: new NativeFunctionInfo(0x140, 'void', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::onUseCard(STS::AbstractPower* thisPtr, STS::AbstractCard* cardPtr, STS::UseCardAction* action)
         * ```
         * 
         * `class UseCardAction : public AbstractGameAction {};`
         */
        onUseCard: new NativeFunctionInfo(0x148, 'void', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::onAfterUseCard(STS::AbstractPower* thisPtr, STS::AbstractCard* cardPtr, STS::UseCardAction* action)
         * ```
         * 
         * `class UseCardAction : public AbstractGameAction {};`
         */
        onAfterUseCard: new NativeFunctionInfo(0x150, 'void', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::wasHPLost(STS::AbstractPower* thisPtr, DamageInfo* dmgInfo, int32_t damageAmount)
         * ```
         */
        wasHPLost: new NativeFunctionInfo(0x158, 'void', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * void AbstractPower::onSpecificTrigger(STS::AbstractPower* thisPtr)
         * ```
         */
        onSpecificTrigger: new NativeFunctionInfo(0x160, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::triggerMarks(STS::AbstractPower* thisPtr, STS::AbstractCard* cardPtr)
         * ```
         */
        triggerMarks: new NativeFunctionInfo(0x168, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::onDeath(STS::AbstractPower* thisPtr)
         * ```
         */
        onDeath: new NativeFunctionInfo(0x170, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::onChannel(STS::AbstractPower* thisPtr, STS::AbstractOrb* orb)
         * ```
         */
        onChannel: new NativeFunctionInfo(0x178, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::atEnergyGain(STS::AbstractPower* thisPtr)
         * ```
         */
        atEnergyGain: new NativeFunctionInfo(0x180, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::onExhaust(STS::AbstractPower* thisPtr, STS::AbstractCard* cardPtr)
         * ```
         */
        onExhaust: new NativeFunctionInfo(0x188, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::onChangeStance(STS::AbstractPower* thisPtr, STS::AbstractStance* oldStance, STS::AbstractStance* newStance)
         * ```
         */
        onChangeStance: new NativeFunctionInfo(0x190, 'void', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * float AbstractPower::modifyBlock(STS::AbstractPower* thisPtr, float blockAmount)
         * ```
         */
        modifyBlock: new NativeFunctionInfo(0x198, 'float', ['pointer', 'float']),
        /**
         * ```c
         * float AbstractPower::modifyBlock2(STS::AbstractPower* thisPtr, float blockAmount, STS::AbstractCard* cardPtr)
         * ```
         */
        modifyBlock2: new NativeFunctionInfo(0x1A0, 'float', ['pointer', 'float', 'pointer']),
        /**
         * ```c
         * void AbstractPower::onGainedBlock(STS::AbstractPower* thisPtr, float blockAmount)
         * ```
         */
        onGainedBlock: new NativeFunctionInfo(0x1A8, 'void', ['pointer', 'float']),
        /**
         * ```c
         * int32_t AbstractPower::onPlayerGainedBlock(STS::AbstractPower* thisPtr, float blockAmount)
         * ```
         */
        onPlayerGainedBlock: new NativeFunctionInfo(0x1B0, 'int32', ['pointer', 'float']),
        /**
         * ```c
         * int32_t AbstractPower::onPlayerGainedBlock(STS::AbstractPower* thisPtr, int32_t blockAmount)
         * ```
         */
        onPlayerGainedBlock2: new NativeFunctionInfo(0x1B8, 'int32', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractPower::onGainCharge(STS::AbstractPower* thisPtr, int32_t blockAmount)
         * ```
         */
        onGainCharge: new NativeFunctionInfo(0x1C0, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractPower::onRemove(STS::AbstractPower* thisPtr)
         * ```
         */
        onRemove: new NativeFunctionInfo(0x1C8, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::onEnergyRecharge(STS::AbstractPower* thisPtr)
         * ```
         */
        onEnergyRecharge: new NativeFunctionInfo(0x1D0, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::onDrawOrDiscard(STS::AbstractPower* thisPtr)
         * ```
         */
        onDrawOrDiscard: new NativeFunctionInfo(0x1D8, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::onAfterCardPlayed(STS::AbstractPower* thisPtr, STS::AbstractCard* cardPtr)
         * ```
         */
        onAfterCardPlayed: new NativeFunctionInfo(0x1E0, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * void AbstractPower::onInitialApplication(STS::AbstractPower* thisPtr)
         * ```
         */
        onInitialApplication: new NativeFunctionInfo(0x1E8, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::flash(STS::AbstractPower* thisPtr)
         * ```
         */
        flash: new NativeFunctionInfo(0x1F8, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::flash(STS::AbstractPower* thisPtr)
         * ```
         */
        flashWithoutSound: new NativeFunctionInfo(0x200, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractPower::onApplyPower(STS::AbstractPower* thisPtr, STS::AbstractPower* powerPtr, STS::AbstractCreature targetCreature, STS::AbstractCreature* sourceCreature)
         * ```
         */
        onApplyPower: new NativeFunctionInfo(0x208, 'void', ['pointer', 'pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * int32_t AbstractPower::onLoseHp(STS::AbstractPower* thisPtr, int32_t damageAmount)
         * ```
         */
        onLoseHp: new NativeFunctionInfo(0x210, 'int32', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractPower::onVictory(STS::AbstractPower* thisPtr)
         * ```
         */
        onVictory: new NativeFunctionInfo(0x218, 'void', ['pointer']),
        /**
         * ```c
         * bool AbstractPower::canPlayCard(STS::AbstractPower* thisPtr, STS::AbstractCard cardPtr)
         * ```
         */
        canPlayCard: new NativeFunctionInfo(0x220, 'bool', ['pointer', 'pointer']),
    };

    static readonly #vFuncNamePrefix = "AbstractPower_";

    static NewPowerCtor(powerId: string, powerName: string, description: string, ownerCreature: NativePointer, amount: number, newVFuncs: NewPowerVFuncType): NativePointer {
        let origPowerPtr = NativePowers.Abstract.Ctor();

        let wrapPower = new AbstractPower(origPowerPtr);
        //previous power object memory maybe will be reused, so origPowerPtr value not necessarily unique.
        AbstractPower.#rewriteVFuncMap.set(origPowerPtr.toUInt32(), newVFuncs);

        wrapPower.ID = powerId;
        wrapPower.name = powerName;
        wrapPower.description = description;
        wrapPower.owner = ownerCreature;
        wrapPower.amount = amount;
        wrapPower.loadRegion("afterImage");

        if (!AbstractPower.#rewriteVFuncMap.has(-1)) {
            const VFuncMap = AbstractPower.#vfunctionMap;
            const VFuncProxys = AbstractPower.#NewRelicVFuncProxys;
            let funcName = "AbstractPowerVFuncProxy_updateDescription";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.updateDescription, VFuncProxys.updateDescription);
            funcName = "AbstractPowerVFuncProxy_updateParticles";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.updateParticles, VFuncProxys.updateParticles);
            funcName = "AbstractPowerVFuncProxy_atStartOfTurn";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atStartOfTurn, VFuncProxys.atStartOfTurn);
            funcName = "AbstractPowerVFuncProxy_duringTurn";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.duringTurn, VFuncProxys.duringTurn);
            funcName = "AbstractPowerVFuncProxy_atStartOfTurnPostDraw";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atStartOfTurnPostDraw, VFuncProxys.atStartOfTurnPostDraw);
            funcName = "AbstractPowerVFuncProxy_atEndOfTurn";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PB_Func(funcName), VFuncMap.atEndOfTurn, VFuncProxys.atEndOfTurn);
            funcName = "AbstractPowerVFuncProxy_atEndOfTurnPreEndTurnCards";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PB_Func(funcName), VFuncMap.atEndOfTurnPreEndTurnCards, VFuncProxys.atEndOfTurnPreEndTurnCards);
            funcName = "AbstractPowerVFuncProxy_atEndOfRound";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atEndOfRound, VFuncProxys.atEndOfRound);
            funcName = "AbstractPowerVFuncProxy_onScry";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onScry, VFuncProxys.onScry);
            funcName = "AbstractPowerVFuncProxy_onDamageAllEnemies";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onDamageAllEnemies, VFuncProxys.onDamageAllEnemies);
            funcName = "AbstractPowerVFuncProxy_onHeal";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), VFuncMap.onHeal, VFuncProxys.onHeal);
            funcName = "AbstractPowerVFuncProxy_onAttacked";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PPI32_Func(funcName), VFuncMap.onAttacked, VFuncProxys.onAttacked);
            funcName = "AbstractPowerVFuncProxy_onAttack";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPI32P_Func(funcName), VFuncMap.onAttack, VFuncProxys.onAttack);
            funcName = "AbstractPowerVFuncProxy_onAttackedToChangeDamage";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PPI32_Func(funcName), VFuncMap.onAttackedToChangeDamage, VFuncProxys.onAttackedToChangeDamage);
            funcName = "AbstractPowerVFuncProxy_onAttackToChangeDamage";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PPI32_Func(funcName), VFuncMap.onAttackToChangeDamage, VFuncProxys.onAttackToChangeDamage);
            funcName = "AbstractPowerVFuncProxy_onInflictDamage";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPI32P_Func(funcName), VFuncMap.onInflictDamage, VFuncProxys.onInflictDamage);
            funcName = "AbstractPowerVFuncProxy_onEvokeOrb";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onEvokeOrb, VFuncProxys.onEvokeOrb);
            funcName = "AbstractPowerVFuncProxy_onCardDraw";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onCardDraw, VFuncProxys.onCardDraw);
            funcName = "AbstractPowerVFuncProxy_onPlayCard";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), VFuncMap.onPlayCard, VFuncProxys.onPlayCard);
            funcName = "AbstractPowerVFuncProxy_onUseCard";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), VFuncMap.onUseCard, VFuncProxys.onUseCard);
            funcName = "AbstractPowerVFuncProxy_onAfterUseCard";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), VFuncMap.onAfterUseCard, VFuncProxys.onAfterUseCard);
            funcName = "AbstractPowerVFuncProxy_wasHPLost";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPI32_Func(funcName), VFuncMap.wasHPLost, VFuncProxys.wasHPLost);
            funcName = "AbstractPowerVFuncProxy_onSpecificTrigger";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onSpecificTrigger, VFuncProxys.onSpecificTrigger);
            funcName = "AbstractPowerVFuncProxy_triggerMarks";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.triggerMarks, VFuncProxys.triggerMarks);
            funcName = "AbstractPowerVFuncProxy_onDeath";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onDeath, VFuncProxys.onDeath);
            funcName = "AbstractPowerVFuncProxy_onChannel";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onChannel, VFuncProxys.onChannel);
            funcName = "AbstractPowerVFuncProxy_atEnergyGain";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.atEnergyGain, VFuncProxys.atEnergyGain);
            funcName = "AbstractPowerVFuncProxy_onExhaust";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onExhaust, VFuncProxys.onExhaust);
            funcName = "AbstractPowerVFuncProxy_onChangeStance";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), VFuncMap.onChangeStance, VFuncProxys.onChangeStance);
            funcName = "AbstractPowerVFuncProxy_modifyBlock";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.F_PF_Func(funcName), VFuncMap.modifyBlock, VFuncProxys.modifyBlock);
            funcName = "AbstractPowerVFuncProxy_modifyBlock2";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.F_PFP_Func(funcName), VFuncMap.modifyBlock2, VFuncProxys.modifyBlock2);
            funcName = "AbstractPowerVFuncProxy_onGainedBlock";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PF_Func(funcName), VFuncMap.onGainedBlock, VFuncProxys.onGainedBlock);
            funcName = "AbstractPowerVFuncProxy_onPlayerGainedBlock";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PF_Func(funcName), VFuncMap.onPlayerGainedBlock, VFuncProxys.onPlayerGainedBlock);
            funcName = "AbstractPowerVFuncProxy_onPlayerGainedBlock2";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), VFuncMap.onPlayerGainedBlock2, VFuncProxys.onPlayerGainedBlock2);
            funcName = "AbstractPowerVFuncProxy_onGainCharge";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PI32_Func(funcName), VFuncMap.onGainCharge, VFuncProxys.onGainCharge);
            funcName = "AbstractPowerVFuncProxy_onRemove";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onRemove, VFuncProxys.onRemove);
            funcName = "AbstractPowerVFuncProxy_onEnergyRecharge";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onEnergyRecharge, VFuncProxys.onEnergyRecharge);
            funcName = "AbstractPowerVFuncProxy_onDrawOrDiscard";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onDrawOrDiscard, VFuncProxys.onDrawOrDiscard);
            funcName = "AbstractPowerVFuncProxy_onAfterCardPlayed";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PP_Func(funcName), VFuncMap.onAfterCardPlayed, VFuncProxys.onAfterCardPlayed);
            funcName = "AbstractPowerVFuncProxy_onInitialApplication";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onInitialApplication, VFuncProxys.onInitialApplication);
            funcName = "AbstractPowerVFuncProxy_onApplyPower";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPPP_Func(funcName), VFuncMap.onApplyPower, VFuncProxys.onApplyPower);
            funcName = "AbstractPowerVFuncProxy_onLoseHp";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.I32_PI32_Func(funcName), VFuncMap.onLoseHp, VFuncProxys.onLoseHp);
            funcName = "AbstractPowerVFuncProxy_onVictory";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), VFuncMap.onVictory, VFuncProxys.onVictory);
            funcName = "AbstractPowerVFuncProxy_canPlayCard";
            wrapPower.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.B_PP_Func(funcName), VFuncMap.canPlayCard, VFuncProxys.canPlayCard);
            AbstractPower.#rewriteVFuncMap.set(-1, AbstractPower.#NewRelicVFuncProxys);
        }

        return origPowerPtr;
    }

    static OnNativeObjectAlloc(ptrValue: number) {
        const vfuncs = AbstractPower.#rewriteVFuncMap.get(ptrValue);
        if (vfuncs !== undefined) {
            const deCtor = vfuncs.onObjectDector;
            if (deCtor !== undefined) {
                deCtor(ptrValue);
            }
            AbstractPower.#rewriteVFuncMap.delete(ptrValue);
        }
    }

    OverrideonCardDraw(newVFunc: (thisPtr: NativePointer, cardPtr: NativePointer) => void) {
        let funcName = (AbstractPower.#vFuncNamePrefix + this.ID + "_onCardDraw").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractPower.#vfunctionMap.onCardDraw, newVFunc);
    }

    loadRegion(fileName: string) {
        let nativeFileName = NativeSTDLib.JString.Ctor(fileName);
        this.getVirtualFunction(AbstractPower.#vfunctionMap.loadRegion)(this.rawPtr, nativeFileName);
    }

    playApplyPowerSfx() {
        this.getVirtualFunction(AbstractPower.#vfunctionMap.playApplyPowerSfx)(this.rawPtr);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractPower.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractPower.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    stackPower(stackAmount: number): void {
        this.getVirtualFunction(AbstractPower.#vfunctionMap.stackPower)(this.rawPtr, stackAmount);
    }

    reducePower(reduceAmount: number): void {
        this.getVirtualFunction(AbstractPower.#vfunctionMap.reducePower)(this.rawPtr, reduceAmount);
    }

    modifyBlock(amount: number): number {
        return this.getVirtualFunction(AbstractPower.#vfunctionMap.modifyBlock)(this.rawPtr, amount);
    }

    flash(): void {
        this.getVirtualFunction(AbstractPower.#vfunctionMap.flash)(this.rawPtr);
    }

    flashWithoutSound(): void {
        this.getVirtualFunction(AbstractPower.#vfunctionMap.flashWithoutSound)(this.rawPtr);
    }

    get region48() {
        return this.readOffsetPointer(0x8);
    }

    get region128() {
        return this.readOffsetPointer(0xC);
    }

    get fontScale() {
        return this.readOffsetFloat(0x10);
    }
    set fontScale(value) {
        this.writeOffsetFloat(0x10, value);
    }

    get color() {
        return this.readOffsetPointer(0x14);
    }

    get redColor() {
        return this.readOffsetPointer(0x18);
    }

    get greenColor() {
        return this.readOffsetPointer(0x1C);
    }

    /**
     * effect type is ArrayList\<AbstractGameEffect\>
     */
    get effect() {
        return new ArrayList(this.readOffsetPointer(0x20));
    }

    /**
     * ```c
     * STS::AbstractCreature* owner
     * ```
     */
    get owner() {
        return this.readOffsetPointer(0x24);
    }
    set owner(value) {
        this.writeOffsetPointer(0x24, value);
    }

    get name() {
        return this.readOffsetJString(0x28).content;
    }
    set name(value) {
        this.writeOffsetJString(0x28, JString.CreateJString(value));
    }

    get description() {
        return this.readOffsetJString(0x2C).content;
    }
    set description(value) {
        this.writeOffsetJString(0x2C, JString.CreateJString(value));
    }

    get ID() {
        return this.readOffsetJString(0x30).content;
    }
    set ID(value) {
        this.writeOffsetJString(0x30, JString.CreateJString(value));
    }

    get img() {
        return this.readOffsetPointer(0x34);
    }
    set img(value) {
        this.writeOffsetPointer(0x34, value);
    }

    get amount() {
        return this.readOffsetS32(0x38);
    }
    set amount(value) {
        this.writeOffsetS32(0x38, value);
    }

    get priority() {
        return this.readOffsetS32(0x3C);
    }
    set priority(value) {
        this.writeOffsetS32(0x3C, value);
    }

    get type(): PowerType {
        return this.readOffsetU32(0x40);
    }
    set type(value) {
        this.writeOffsetU32(0x40, value);
    }

    get isTurnBased() {
        return this.readOffsetBool(0x44);
    }
    set isTurnBased(value) {
        this.writeOffsetBool(0x44, value);
    }

    get isPostActionPower() {
        return this.readOffsetBool(0x45);
    }
    set isPostActionPower(value) {
        this.writeOffsetBool(0x45, value);
    }

    get canGoNegative() {
        return this.readOffsetBool(0x46);
    }
    set canGoNegative(value) {
        this.writeOffsetBool(0x46, value);
    }
}