import { AbstractPower, NewPowerVFuncType } from "../NativeClassWrap/AbstractPower.js"
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";

const vfuncs: NewPowerVFuncType = {
    atStartOfTurn: (thisPtr) => {
        const wrapPower = new AbstractPower(thisPtr);
        const changeStanceAction = NativeActions.watcher.ChangeStance.Ctor("Wrath");
        wrapPower.addToBot(changeStanceAction);
    },
    atEndOfTurn: (thisPtr, isPlayer) => {
        if (isPlayer) {
            const wrapPower = new AbstractPower(thisPtr);
            const changeStanceAction = NativeActions.watcher.ChangeStance.Ctor("Calm");
            wrapPower.addToBot(changeStanceAction);
        }
    },
};

export const ForceOfWillPower = (ownerCreature: NativePointer): NativePointer => {
    let powerPtr = AbstractPower.NewPowerCtor("ForceOfWillPower", "意志之力", "回合开始时进入愤怒。回合结束时进入平静。", ownerCreature, 1, vfuncs);
    return powerPtr;
};