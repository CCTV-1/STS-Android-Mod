import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";

const vfuncs: NewGameActionVFuncType = {
    update: (thisPtr: NativePointer) => {
        let wrapAction = new AbstractGameAction(thisPtr);
        let currentPlayer = AbstractDungeon.getInstance().player;
        let playerHand = currentPlayer.hand;
        if (!playerHand.isEmpty()) {
            const handSize = playerHand.size();
            playerHand.clear();
            wrapAction.addToBot(NativeActions.common.MakeTempCardInHand.Ctor(NativeCards.Colorless.Discovery.Ctor(), handSize, false));
        }
        wrapAction.isDone = true;
    }
};

export const HappyTimeAction = () => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);

    return actionObj;
}