import { AttackEffect } from "../enums.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";

export const NativeActions = {
    Heal: {
        Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.Heal.Ctor)(PatchHelper.nullptr, target, source, amount);
        }
    },
    ApplyPower: {
        Ctor(target: NativePointer, source: NativePointer, power: NativePointer, amount: number, isFast: boolean, effect: AttackEffect): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.ApplyPower.Ctor)(PatchHelper.nullptr, target, source, power, amount, Number(isFast), Number(effect));
        },
        Ctor2(target: NativePointer, source: NativePointer, power: NativePointer, amount: number): NativePointer {
            return NativeActions.ApplyPower.Ctor(target, source, power, amount, false, AttackEffect.NONE);
        },
    },
    Scry: {
        Ctor(numcards: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.Scry.Ctor)(PatchHelper.nullptr, numcards);
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer, numCards: number) => NativePointer): (thisPtr: NativePointer, numCards: number) => NativePointer {
            return PatchHelper.HookSTSFunction(NativeFunctionInfoMap.Actions.Scry.Ctor, newCtor);
        },
    },
    MakeTempCardInHand: {
        Ctor(cardPtr: NativePointer, numCards: number, isOtherCardInCenter: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.MakeTempCardInHand.Ctor2)(PatchHelper.nullptr, cardPtr, numCards, Number(isOtherCardInCenter));
        }
    },
    RelicAboveCreature: {
        Ctor(creaturePtr: NativePointer, relicPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.RelicAboveCreature.Ctor)(PatchHelper.nullptr, creaturePtr, relicPtr);
        }
    },
    Discard: {
        Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
            return NativeActions.Discard.Ctor2(target, source, amount, false, false);
        },
        Ctor2(target: NativePointer, source: NativePointer, amount: number, isRandom: boolean, endTurn: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.Discard.Ctor2)(PatchHelper.nullptr, target, source, amount, Number(isRandom), Number(endTurn));
        },
    },
    DrawCard: {
        Ctor(source: NativePointer, cardAmount: number, endTurnDraw: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.DrawCard.Ctor)(PatchHelper.nullptr, source, cardAmount, Number(endTurnDraw));
        },
        Ctor2(cardAmount: number): NativePointer {
            return NativeActions.DrawCard.Ctor(PatchHelper.nullptr, cardAmount, false);
        },
    },
    Damage: {
        Ctor(target: NativePointer, dmgInfo: NativePointer, effect: AttackEffect): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.Damage.Ctor)(PatchHelper.nullptr, target, dmgInfo, Number(effect));
        },
    },
    GainBlock: {
        Ctor(target: NativePointer, amount: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor)(PatchHelper.nullptr, target, amount);
        },
        Ctor2(target: NativePointer, source: NativePointer, amount: number): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor2)(PatchHelper.nullptr, target, source, amount);
        },
        Ctor3(target: NativePointer, amount: number, superFast: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor3)(PatchHelper.nullptr, target, amount, Number(superFast));
        },
        Ctor4(target: NativePointer, source: NativePointer, amount: number, superFast: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor2)(PatchHelper.nullptr, target, source, amount, Number(superFast));
        },
    },
    LoseHP: {
        Ctor(target: NativePointer, source: NativePointer, amount: number, atkEffect: AttackEffect): NativePointer {
            return PatchHelper.GetNativeFunction(NativeFunctionInfoMap.Actions.LoseHP.Ctor)(PatchHelper.nullptr, target, source, amount, Number(atkEffect));
        },
    },
};