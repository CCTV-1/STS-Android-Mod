import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { CardGroup } from "../NativeClassWrap/CardGroup.js";
import { HandCardSelectScreen } from "../NativeClassWrap/HandCardSelectScreen.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";

interface ElixirOfImmortalityActionVars {
    targetNumber: number;
};

const actionVarMap = new Map<number, ElixirOfImmortalityActionVars>();

const vfuncs: NewGameActionVFuncType = {
    update: (thisPtr: NativePointer) => {
        let targetNumber = 1;
        const wrapAction = new AbstractGameAction(thisPtr);
        let varMap = actionVarMap.get(thisPtr.toUInt32());
        if (varMap === undefined) {
            wrapAction.isDone = true;
            return;
        }
        targetNumber = varMap.targetNumber;

        const dungeonInstance = AbstractDungeon.getInstance();
        const currentPlayer = dungeonInstance.player;
        const selectScreen = new HandCardSelectScreen(dungeonInstance.handCardSelectScreen);
        if (Math.abs(wrapAction.duration - 0.1) <= 1e-5) {
            if (currentPlayer.hand.size() < targetNumber) {
                wrapAction.isDone = true;
                return;
            }
            selectScreen.open2("灌注永生琼浆", targetNumber, false, false);
            wrapAction.tickDuration();
            return;
        }
        if (!selectScreen.wereCardsRetrieved) {
            const selectCards = new CardGroup(selectScreen.selectedCards);
            if (selectCards.size() != targetNumber) {
                wrapAction.isDone = true;
                return;
            }

            const selectNumber = selectCards.size()
            for (let index = 0; index < selectNumber; index++) {
                const selectCard = NativeSTDLib.ArrayList.AbstractCard.get(selectCards.group, index);
                const wrapCard = new AbstractCard(selectCard);
                wrapCard.exhaust = false;
                wrapCard.rawDescription += " NL 失去消耗。";
                wrapCard.initializeDescription();
                currentPlayer.hand.addToTop(selectCard);
            }
            selectCards.clear();
            selectScreen.wereCardsRetrieved = true;
        }
        wrapAction.tickDuration();
    }
};

export const ElixirOfImmortalityAction = (targetNumber: number = 1) => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);
    actionVarMap.set(actionObj.toUInt32(), { targetNumber: targetNumber });

    const wrapAction = new AbstractGameAction(actionObj);
    wrapAction.duration = 0.1;
    return actionObj;
}