import { ModUtility } from "../ModUtility.js";
import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
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
        if (wrapCard.canUpgrade()) {
            wrapCard.upgrade();
            wrapCard.upgradeBaseCost(ModUtility.FakeRandom(0, 3));
            wrapCard.upgradeDamage(ModUtility.FakeRandom(-wrapCard.baseDamage, wrapCard.baseDamage * 4));
            wrapCard.upgradeBlock(ModUtility.FakeRandom(-wrapCard.baseBlock, wrapCard.baseBlock * 4));
            wrapCard.upgradeMagicNumber(ModUtility.FakeRandom(-wrapCard.baseMagicNumber, wrapCard.baseMagicNumber * 4));
            wrapCard.flash();
        } else {
            const DrawCount = ModUtility.FakeRandom(0,3);
            const drawAction = NativeActions.common.DrawCard.Ctor(currentPlayer.rawPtr, DrawCount, false);
            const randDiscardAction = NativeActions.common.Discard.Ctor(currentPlayer.rawPtr, currentPlayer.rawPtr, ModUtility.FakeRandom(0, 2*DrawCount));
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