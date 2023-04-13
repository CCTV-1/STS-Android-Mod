import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"

const vfuncs: NewGameActionVFuncType = {
    update: (thisPtr: NativePointer) => {
        let wrapAction = new AbstractGameAction(thisPtr);
        let currentPlayer = AbstractDungeon.getInstance().player;
        currentPlayer.gainGold(currentPlayer.gold);
        wrapAction.isDone = true;
    }
};

export const DoubleGoldAction = () => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);

    return actionObj;
}