import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { CardGroup } from "../NativeClassWrap/CardGroup.js";
import { HandCardSelectScreen } from "../NativeClassWrap/HandCardSelectScreen.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { Mimic } from "../NewCards/Mimic.js";

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
            selectScreen.open2("作为融合素材", 3, false, false);
            wrapAction.tickDuration();
            return;
        }
        if (!selectScreen.wereCardsRetrieved) {
            const selectCards = new CardGroup(selectScreen.selectedCards);
            if (selectCards.size() != 3) {
                wrapAction.isDone = true;
                return;
            }
            const selectCard1 = NativeSTDLib.ArrayList.AbstractCard.get(selectCards.group, 0);
            const selectCard2 = NativeSTDLib.ArrayList.AbstractCard.get(selectCards.group, 1);
            const selectCard3 = NativeSTDLib.ArrayList.AbstractCard.get(selectCards.group, 2);
            selectCards.clear();
            selectScreen.wereCardsRetrieved = true;
            currentPlayer.hand.moveToExhaustPile(selectCard1);
            currentPlayer.hand.moveToExhaustPile(selectCard2);
            currentPlayer.hand.moveToExhaustPile(selectCard3);

            const MimicCard = Mimic(NULL, selectCard1, selectCard2, selectCard3);
            const addCardtoHand = NativeActions.common.MakeTempCardInHand.Ctor(MimicCard, 1, false);
            wrapAction.addToBot(addCardtoHand);
        }
        wrapAction.tickDuration();
    }
};

export const SuperPolymerizationAction = () => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);

    const wrapAction = new AbstractGameAction(actionObj);

    wrapAction.duration = 0.1;
    return actionObj;
}