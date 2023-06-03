import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { CardGroup } from "../NativeClassWrap/CardGroup.js";
import { HandCardSelectScreen } from "../NativeClassWrap/HandCardSelectScreen.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";

const vfuncs: NewGameActionVFuncType = {
    update: (thisPtr: NativePointer) => {
        const wrapAction = new AbstractGameAction(thisPtr);
        const dungeonInstance = AbstractDungeon.getInstance();
        const currentPlayer = dungeonInstance.player;
        const selectScreen = new HandCardSelectScreen(dungeonInstance.handCardSelectScreen);
        if (Math.abs(wrapAction.duration - 0.1) <= 1e-5) {
            if (currentPlayer.hand.size() < 3) {
                wrapAction.isDone = true;
                return;
            }
            selectScreen.open2("灌注永生琼浆", 1, false, false);
            wrapAction.tickDuration();
            return;
        }
        if (!selectScreen.wereCardsRetrieved) {
            const selectCards = new CardGroup(selectScreen.selectedCards);
            if (selectCards.size() != 1) {
                wrapAction.isDone = true;
                return;
            }
            const selectCard = NativeSTDLib.ArrayList.AbstractCard.get(selectCards.group, 0);
            selectCards.clear();
            selectScreen.wereCardsRetrieved = true;
            const wrapCard = new AbstractCard(selectCard);
            wrapCard.exhaust = false;
            wrapCard.rawDescription += " NL 失去消耗。";
            wrapCard.initializeDescription();
            currentPlayer.hand.addToTop(selectCard);
        }
        wrapAction.tickDuration();
    }
};

export const ElixirOfImmortalityAction = () => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);

    const wrapAction = new AbstractGameAction(actionObj);

    wrapAction.duration = 0.1;
    return actionObj;
}