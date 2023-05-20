import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { AttackEffect } from "../enums.js";

const vfuncs: NewGameActionVFuncType = {
    update: (thisPtr: NativePointer) => {
        const wrapAction = new AbstractGameAction(thisPtr);
        let currentPlayer = AbstractDungeon.getInstance().player;
        let playerPtr = currentPlayer.rawPtr;
        const handList = currentPlayer.hand.group;
        const handSize = handList.size;

        const exhaustAction = NativeActions.common.Exhaust.Ctor(99, true, false, false);
        wrapAction.addToBot(exhaustAction);

        const loseHandSizeHPAction = NativeActions.common.LoseHP.Ctor(playerPtr, playerPtr, handSize, AttackEffect.NONE);
        wrapAction.addToBot(loseHandSizeHPAction);

        const strPower = NativePowers.Common.Strength.Ctor(playerPtr, handSize);
        const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(playerPtr, playerPtr, strPower, handSize);
        wrapAction.addToBot(applyPowerAction);

        const removeDebuffAction = NativeActions.unique.RemoveDebuffs.Ctor(playerPtr);
        wrapAction.addToBot(removeDebuffAction);
        wrapAction.isDone = true;
    }
};

export const DemonicPurgeAction = () => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);

    return actionObj;
}