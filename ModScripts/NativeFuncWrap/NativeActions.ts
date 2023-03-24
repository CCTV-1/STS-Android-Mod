import { AttackEffect } from "../enums.js";
import { PatchManager } from "../PatchManager.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativeActions = {
    Heal: {
        Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.Heal.Ctor)(PatchManager.nullptr, target, source, amount);
        }
    },
    ApplyPower: {
        Ctor(target: NativePointer, source: NativePointer, power: NativePointer, amount: number, isFast: boolean, effect: AttackEffect): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.ApplyPower.Ctor)(PatchManager.nullptr, target, source, power, amount, Number(isFast), Number(effect));
        },
        Ctor2(target: NativePointer, source: NativePointer, power: NativePointer, amount: number): NativePointer {
            return NativeActions.ApplyPower.Ctor(target, source, power, amount, false, AttackEffect.NONE);
        },
    },
    Scry: {
        Ctor(numcards: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.Scry.Ctor)(PatchManager.nullptr, numcards);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer, numCards: number) => NativePointer): (thisPtr: NativePointer, numCards: number) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Actions.Scry.Ctor, newCtor);
        },
    },
    MakeTempCardInHand: {
        Ctor(cardPtr: NativePointer, numCards: number, isOtherCardInCenter: boolean): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.MakeTempCardInHand.Ctor2)(PatchManager.nullptr, cardPtr, numCards, Number(isOtherCardInCenter));
        }
    },
    RelicAboveCreature: {
        Ctor(creaturePtr: NativePointer, relicPtr: NativePointer): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.RelicAboveCreature.Ctor)(PatchManager.nullptr, creaturePtr, relicPtr);
        }
    },
    Discard: {
        Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
            return NativeActions.Discard.Ctor2(target, source, amount, false, false);
        },
        Ctor2(target: NativePointer, source: NativePointer, amount: number, isRandom: boolean, endTurn: boolean): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.Discard.Ctor2)(PatchManager.nullptr, target, source, amount, Number(isRandom), Number(endTurn));
        },
    },
    DrawCard: {
        Ctor(source: NativePointer, cardAmount: number, endTurnDraw: boolean): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.DrawCard.Ctor)(PatchManager.nullptr, source, cardAmount, Number(endTurnDraw));
        },
        Ctor2(cardAmount: number): NativePointer {
            return NativeActions.DrawCard.Ctor(PatchManager.nullptr, cardAmount, false);
        },
    },
    Damage: {
        Ctor(target: NativePointer, dmgInfo: NativePointer, effect: AttackEffect): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.Damage.Ctor)(PatchManager.nullptr, target, dmgInfo, Number(effect));
        },
    },
    GainBlock: {
        Ctor(target: NativePointer, amount: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor)(PatchManager.nullptr, target, amount);
        },
        Ctor2(target: NativePointer, source: NativePointer, amount: number): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor2)(PatchManager.nullptr, target, source, amount);
        },
        Ctor3(target: NativePointer, amount: number, superFast: boolean): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor3)(PatchManager.nullptr, target, amount, Number(superFast));
        },
        Ctor4(target: NativePointer, source: NativePointer, amount: number, superFast: boolean): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor2)(PatchManager.nullptr, target, source, amount, Number(superFast));
        },
    },
    LoseHP: {
        Ctor(target: NativePointer, source: NativePointer, amount: number, atkEffect: AttackEffect): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Actions.LoseHP.Ctor)(PatchManager.nullptr, target, source, amount, Number(atkEffect));
        },
    },
};