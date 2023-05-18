import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";

const vfuncs: NewGameActionVFuncType = {
    update: (thisPtr: NativePointer) => {
        const wrapAction = new AbstractGameAction(thisPtr);
        const currentPlayer = AbstractDungeon.getInstance().player;
        const playerHand = currentPlayer.hand;
        const handSize = playerHand.size();
        if (handSize <= 0) {
            wrapAction.isDone = true;
            return;
        }

        for(let index = 0 ; index < handSize; index++) {
            const cardRef = NativeSTDLib.ArrayList.AbstractCard.get(playerHand.group, index);
            const wrapCard = new AbstractCard(cardRef);
            wrapCard.upgradeBlock(wrapAction.amount);
            wrapCard.upgradeDamage(wrapAction.amount);
            wrapCard.upgradeMagicNumber(wrapAction.amount);
            wrapCard.flash();
        }
        wrapAction.isDone = true;
    }
};

export const CompilationOptimization = (amount: number = 1) => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);
    const wrapAction = new AbstractGameAction(actionObj);

    wrapAction.amount = amount;
    return actionObj;
}