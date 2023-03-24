import { AttackEffect } from "../enums.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const Actions = {
    Heal: {
        /**
         * ```c
         * AbstractGameAction* HealAction(AbstractGameAction* this, STS::AbstractCreature* target, STS::AbstractCreature* source, int amount)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1682A11, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
    },
    ApplyPower: {
        /**
         * ```c
         * AbstractGameAction* Actions::ApplyPowerAction::Ctor(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
         *      STS::AbstractCreature* source, STS::AbstractPower* powerToApply, int32_t stackAmount, bool isFast, STS::AttackEffect effect)
         * 
         * ```
         * 
         * default args call: `ApplyPowerAction::Ctor(this, target, source, powerPtr, powerPtr->amount, false, AttackEffect.NONE);`
         */
        Ctor: new NativeFunctionInfo(0x1672CFD, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'int32', 'bool', 'uint32']),
    },
    Scry: {
        /**
         * ```c
         * AbstractGameAction* Actions::ScryAction(STS::AbstractGameAction* thisPtr, int32_t numCards)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x16B01F9, 'pointer', ['pointer', 'int32']),
    },
    MakeTempCardInHand: {
        /**
         * ```c
         * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, bool isOtherCardInCenter)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1684519, 'pointer', ['pointer', 'pointer', 'bool']),
        /**
         * ```c
         * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, int32_t cardAmount)
         * ```
         */
        Ctor1: new NativeFunctionInfo(0x16847B5, 'pointer', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, int32_t cardAmount, bool isOtherCardInCenter)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x16849A1, 'pointer', ['pointer', 'pointer', 'int32', 'bool']),
        /**
         * ```c
         * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, bool isOtherCardInCenter, bool sameUUID)
         * ```
         */
        Ctor3: new NativeFunctionInfo(0x1684A59, 'pointer', ['pointer', 'pointer', 'bool', 'bool']),
    },
    RelicAboveCreature: {
        /**
         * ```c
         * AbstractGameAction* Actions::RelicAboveCreatureAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source, STS::AbstractRelic* relic)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1688E25, 'pointer', ['pointer', 'pointer', 'pointer']),
    },
    Discard: {
        /**
         * ```c
         * AbstractGameAction* Actions::DiscardAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t cardAmount, bool isRandom, bool drawinEndTurn)
         * ```
         * 
         * Ctor just call ```Ctor2(thisPtr, target, source, amount, isRandom, false);```
         */
        Ctor2: new NativeFunctionInfo(0x167CBD5, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'bool', 'bool']),
    },
    DrawCard: {
        /**
         * ```c
         * AbstractGameAction* Actions::DrawCardAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source, int32_t cardAmount, bool endTurnDraw)
         * ```
         * 
         * Ctor2 just call ```Ctor(thisPtr, source, cardAmount, false);```
         * 
         * Ctor4 just call ```Ctor(thisPtr, nullptr, cardAmount, false);```
         */
        Ctor: new NativeFunctionInfo(0x167EB71, 'pointer', ['pointer', 'pointer', 'int32', 'bool']),
        /**
         * ```c
         * AbstractGameAction* Actions::DrawCardAction(STS::AbstractGameAction* thisPtr, int32_t cardAmount, bool clearDrawHistory)
         * ```
         */
        Ctor3: new NativeFunctionInfo(0x167EDF9, 'pointer', ['pointer', 'int32', 'bool']),
        /**
         * ```c
         * AbstractGameAction* Actions::DrawCardAction(STS::AbstractGameAction* thisPtr, int32_t cardAmount, STS::AbstractGameAction* action, bool clearDrawHistory)
         * ```
         * 
         * Ctor5 just call ```Ctor6(thisPtr, amount, action, true);```
         */
        Ctor6: new NativeFunctionInfo(0x167F005, 'pointer', ['pointer', 'int32', 'pointer', 'bool']),
    },
    Damage: {
        /**
         * ```c
         * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, AttackEffect effect)
         * ```
         * 
         * Ctor3 just call ```Ctor(thisPtr, target, dmgInfo, AttackEffect.NONE)```
         */
        Ctor: new NativeFunctionInfo(0x167A165, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32']),
        /**
         * ```c
         * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, int stealGoldAmount)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x167A225, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
        /**
         * ```c
         * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, bool superFast)
         * ```
         * 
         * call ```Ctor(thisPtr, target, dmgInfo, AttackEffect.NONE)``` and ```this.skipWait = superFast;```
         */
        Ctor4: new NativeFunctionInfo(0x167A33D, 'pointer', ['pointer', 'pointer', 'pointer', 'bool']),
        /**
         * ```c
         * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, AttackEffect effect, bool superFast)
         * ```
         * 
         * forward to ```Ctor``` and ```this.skipWait = superFast;```
         */
        Ctor5: new NativeFunctionInfo(0x167A3D1, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'bool']),
        /**
         * ```c
         * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, AttackEffect effect, bool superFast)
         * ```
         * 
         * forward to ```Ctor5``` and ```this.muteSfx = muteSfx;```
         */
        Ctor6: new NativeFunctionInfo(0x167A465, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'bool', 'bool']),
    },
    GainBlock: {
        /**
         * ```c
         * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, int32_t amount)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1681BDD, 'pointer', ['pointer', 'pointer', 'int32']),
        /**
         * ```c
         * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x1681C85, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
        /**
         * ```c
         * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, int32_t amount, bool superFast)
         * ```
         */
        Ctor3: new NativeFunctionInfo(0x1681D41, 'pointer', ['pointer', 'pointer', 'int32', 'bool']),
        /**
         * ```c
         * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount, bool superFast)
         * ```
         */
        Ctor4: new NativeFunctionInfo(0x1681E09, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'bool']),
    },
    LoseHP: {
        /**
         * ```c
         * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount, AttackEffect effect)
         * ```
         * 
         * Ctor2 just call ```Ctor(target, source, amount, AttackEffect.NONE);```
         */
        Ctor: new NativeFunctionInfo(0x1682DFD, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'uint32']),
    },
};

export const NativeActions = {
    Heal: {
        Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.Heal.Ctor)(PatchHelper.nullptr, target, source, amount);
        }
    },
    ApplyPower: {
        Ctor(target: NativePointer, source: NativePointer, power: NativePointer, amount: number, isFast: boolean, effect: AttackEffect): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.ApplyPower.Ctor)(PatchHelper.nullptr, target, source, power, amount, Number(isFast), Number(effect));
        },
        Ctor2(target: NativePointer, source: NativePointer, power: NativePointer, amount: number): NativePointer {
            return NativeActions.ApplyPower.Ctor(target, source, power, amount, false, AttackEffect.NONE);
        },
    },
    Scry: {
        Ctor(numcards: number): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.Scry.Ctor)(PatchHelper.nullptr, numcards);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer, numCards: number) => NativePointer): (thisPtr: NativePointer, numCards: number) => NativePointer {
            return PatchHelper.HookSTSFunction(Actions.Scry.Ctor, newCtor);
        },
    },
    MakeTempCardInHand: {
        Ctor(cardPtr: NativePointer, numCards: number, isOtherCardInCenter: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.MakeTempCardInHand.Ctor2)(PatchHelper.nullptr, cardPtr, numCards, Number(isOtherCardInCenter));
        }
    },
    RelicAboveCreature: {
        Ctor(creaturePtr: NativePointer, relicPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.RelicAboveCreature.Ctor)(PatchHelper.nullptr, creaturePtr, relicPtr);
        }
    },
    Discard: {
        Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
            return NativeActions.Discard.Ctor2(target, source, amount, false, false);
        },
        Ctor2(target: NativePointer, source: NativePointer, amount: number, isRandom: boolean, endTurn: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.Discard.Ctor2)(PatchHelper.nullptr, target, source, amount, Number(isRandom), Number(endTurn));
        },
    },
    DrawCard: {
        Ctor(source: NativePointer, cardAmount: number, endTurnDraw: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.DrawCard.Ctor)(PatchHelper.nullptr, source, cardAmount, Number(endTurnDraw));
        },
        Ctor2(cardAmount: number): NativePointer {
            return NativeActions.DrawCard.Ctor(PatchHelper.nullptr, cardAmount, false);
        },
    },
    Damage: {
        Ctor(target: NativePointer, dmgInfo: NativePointer, effect: AttackEffect): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.Damage.Ctor)(PatchHelper.nullptr, target, dmgInfo, Number(effect));
        },
    },
    GainBlock: {
        Ctor(target: NativePointer, amount: number): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.GainBlock.Ctor)(PatchHelper.nullptr, target, amount);
        },
        Ctor2(target: NativePointer, source: NativePointer, amount: number): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.GainBlock.Ctor2)(PatchHelper.nullptr, target, source, amount);
        },
        Ctor3(target: NativePointer, amount: number, superFast: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.GainBlock.Ctor3)(PatchHelper.nullptr, target, amount, Number(superFast));
        },
        Ctor4(target: NativePointer, source: NativePointer, amount: number, superFast: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.GainBlock.Ctor2)(PatchHelper.nullptr, target, source, amount, Number(superFast));
        },
    },
    LoseHP: {
        Ctor(target: NativePointer, source: NativePointer, amount: number, atkEffect: AttackEffect): NativePointer {
            return PatchHelper.GetNativeFunction(Actions.LoseHP.Ctor)(PatchHelper.nullptr, target, source, amount, Number(atkEffect));
        },
    },
};