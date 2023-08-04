import { AbstractCreature } from "../NativeClassWrap/AbstractCreature.js";
import { AbstractPower, NewPowerVFuncType } from "../NativeClassWrap/AbstractPower.js"
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { DamageType } from "../enums.js";

const vfuncs: NewPowerVFuncType = {
    atDamageFinalReceive: (thisPtr: NativePointer, damage: number, dmgType: DamageType) => {
        const wrapPower = new AbstractPower(thisPtr);
        const owenCreature = new AbstractCreature(wrapPower.owner);
        if (damage >= owenCreature.currentHealth) {
            return 0.0;
        }

        return damage;
    },
    atEndOfRound: (thisPtr) => {
        const wrapPower = new AbstractPower(thisPtr);
        wrapPower.flash();
        if (wrapPower.amount == 0) {
            wrapPower.addToBot(NativeActions.common.ReducePower.Ctor(wrapPower.owner, wrapPower.owner, "AngelGracePower", 1));
        } else {
            wrapPower.addToBot(NativeActions.common.RemoveSpecificPower.Ctor(wrapPower.owner, wrapPower.owner, "AngelGracePower"));
        }
    },
};

export const AngelGracePower = (ownerCreature: NativePointer, turns: number): NativePointer => {
    let powerPtr = AbstractPower.NewPowerCtor("AngelGracePower", "天使的祝福", "免疫一切致死伤害。", ownerCreature, 1, vfuncs);

    const wrapPower = new AbstractPower(powerPtr);
    wrapPower.amount = turns;
    wrapPower.owner = ownerCreature;
    return powerPtr;
};