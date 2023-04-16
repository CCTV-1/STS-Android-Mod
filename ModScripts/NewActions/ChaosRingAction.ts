import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { Random } from "../NativeClassWrap/Random.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";

const vfuncs: NewGameActionVFuncType = {
    update: (thisPtr: NativePointer) => {
        let wrapAction = new AbstractGameAction(thisPtr);
        const currentPlayer = AbstractDungeon.getInstance().player;
        const playerHand = currentPlayer.hand;
        if (playerHand.size() <= 0) {
            wrapAction.isDone = true;
            return;
        }
        const randCard = playerHand.getRandomCard2(true);
        const wrapCard = new AbstractCard(randCard);
        const eventRng = new Random(AbstractDungeon.getInstance().eventRng);
        if (wrapCard.canUpgrade()) {
            wrapCard.upgrade();
            if (wrapCard.cost >= 0) {
                wrapCard.upgradeBaseCost(eventRng.randomI32_2(0, 3));
            }
            if (wrapCard.baseDamage >= 0) {
                wrapCard.upgradeDamage(eventRng.randomI32_2(-wrapCard.baseDamage, wrapCard.baseDamage * 4));
            }
            if (wrapCard.baseBlock >= 0) {
                wrapCard.upgradeBlock(eventRng.randomI32_2(-wrapCard.baseBlock, wrapCard.baseBlock * 4));
            }
            if (wrapCard.baseMagicNumber >= 0) {
                wrapCard.upgradeMagicNumber(eventRng.randomI32_2(-wrapCard.baseMagicNumber, wrapCard.baseMagicNumber * 4));
            }
            wrapCard.flash();
        } else {
            const DrawCount = eventRng.randomI32_2(1, 3);
            const drawAction = NativeActions.common.DrawCard.Ctor(currentPlayer.rawPtr, DrawCount, false);
            const randDiscardAction = NativeActions.common.Discard.Ctor(currentPlayer.rawPtr, currentPlayer.rawPtr, eventRng.randomI32_2(1, 2 * DrawCount));
            wrapAction.addToBot(drawAction);
            wrapAction.addToBot(randDiscardAction);
        }
        wrapAction.isDone = true;
    }
};

export const ChaosRingAction = () => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);

    return actionObj;
}