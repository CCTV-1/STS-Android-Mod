import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { PatchHelper } from "../PatchHelper.js";

export const DoubleGoldAction = () => {
    let vfuncs: NewGameActionVFuncType = {
        update: (thisPtr: NativePointer) => {
            let wrapAction = new AbstractGameAction(thisPtr);
            let currentPlayer = PatchHelper.STSGlobalVars.AbstractDungeon_player;
            currentPlayer.gold *= 2;
            wrapAction.isDone = true;
        }
    };
    let actionObj = AbstractGameAction.NewActionCtor("DoubleGoldAction", vfuncs);

    return actionObj;
}