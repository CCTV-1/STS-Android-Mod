import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { ArrayList } from "../NativeClassWrap/ArrayList.js";
import { CardRewardScreen } from "../NativeClassWrap/CardRewardScreen.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeVFX } from "../NativeFuncWrap/NativeVFX.js";
import { CardRarity } from "../enums.js";

const vfuncs: NewGameActionVFuncType = {
    update: (thisPtr: NativePointer) => {
        let wrapAction = new AbstractGameAction(thisPtr);
        let abstractDungeon = AbstractDungeon.getInstance();
        let rewardScreen = new CardRewardScreen(abstractDungeon.cardRewardScreen);
        if (Math.abs(wrapAction.duration - 0.1) <= 1e-5) {
            let rewardCards = NativeSTDLib.ArrayList.AbstractCard.Ctor();
            let wrapCards = new ArrayList(rewardCards);
            for (let index = 0; index < wrapAction.amount; index++) {
                NativeSTDLib.ArrayList.AbstractCard.Add(wrapCards, NativeAbstractDungeon.getCard(CardRarity.RARE));
            }
            rewardScreen.customCombatOpen(rewardCards, "选择一张牌。", true);
            wrapAction.tickDuration();
            return ;
        }
        if (rewardScreen.discoveryCard != NULL) {
            let chosenCard = rewardScreen.discoveryCard;
            let wrapCard = new AbstractCard(chosenCard);
            let copyCard = wrapCard.makeStatEquivalentCopy();
            wrapCard = new AbstractCard(copyCard);
            wrapCard.costForTurn = 0;
            let effectList = abstractDungeon.effectList;
            NativeSTDLib.ArrayList.AbstractGameEffect.Add(effectList, NativeVFX.ShowCardAndAddToHandEffect.Ctor(copyCard));
            rewardScreen.discoveryCard = NULL;
            wrapAction.isDone = true;
        }
        wrapAction.tickDuration();
    }
};

export const OneWithTheMultiverseAction = (cardNumber: number) => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);

    let wrapAction = new AbstractGameAction(actionObj);
    wrapAction.amount = cardNumber;
    wrapAction.duration = 0.1;
    return actionObj;
}