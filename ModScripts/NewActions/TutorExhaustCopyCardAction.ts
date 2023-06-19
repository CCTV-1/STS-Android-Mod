import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractGameAction, NewGameActionVFuncType } from "../NativeClassWrap/AbstractGameAction.js"
import { ArrayList } from "../NativeClassWrap/ArrayList.js";
import { CardGroup } from "../NativeClassWrap/CardGroup.js";
import { GridCardSelectScreen } from "../NativeClassWrap/GridCardSelectScreen.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { CardGroupType, LibraryType } from "../enums.js";

interface TutorExhaustCopyCardActionVars {
    libraryType: LibraryType;
    freeCost: Boolean;
    tutorNumber: number;
};

const actionVarMap = new Map<number, TutorExhaustCopyCardActionVars>();

const vfuncs: NewGameActionVFuncType = {
    update: (thisPtr: NativePointer) => {
        let varMap = actionVarMap.get(thisPtr.toUInt32());
        const wrapAction = new AbstractGameAction(thisPtr);
        if (varMap === undefined) {
            wrapAction.isDone = true;
            return;
        }
        const dungeon = AbstractDungeon.getInstance();
        const gridSelectScreen = new GridCardSelectScreen(dungeon.gridSelectScreen);
        if (Math.abs(wrapAction.duration - wrapAction.startDuration) <= 1e-5) {
            let cardList = NativeHelpers.CardLibrary.getCardList(varMap.libraryType);
            let wrapCardList = new ArrayList(cardList);
            let choosenCards = NativeCards.CardGroup.Ctor(CardGroupType.UNSPECIFIED);
            let wrapCardGroup = new CardGroup(choosenCards);
            for (let index = 0; index < wrapCardList.size; index++) {
                let cardRef = NativeSTDLib.ArrayList.AbstractCard.get(wrapCardList, index);
                wrapCardGroup.addToTop(cardRef);
            }

            gridSelectScreen.open2(wrapCardGroup.rawPtr, varMap.tutorNumber, "选择要生成的牌。", false, false, true, false);
            wrapAction.tickDuration();
            return;
        }

        const selectCards = new ArrayList(gridSelectScreen.selectedCards);
        if (selectCards.size >= varMap.tutorNumber) {
            for (let index = 0; index < varMap.tutorNumber; index++) {
                const selectCardPtr = NativeSTDLib.ArrayList.AbstractCard.get(selectCards, index);
                const wrapSelectCard = new AbstractCard(selectCardPtr);
                let copyCard = wrapSelectCard.makeStatEquivalentCopy();
                let wrapCopyCard = new AbstractCard(copyCard);
                if (varMap.freeCost) {
                    wrapCopyCard.upgradeBaseCost(0);
                }
                wrapCopyCard.exhaust = true;
                wrapCopyCard.rawDescription += " NL 消耗。";
                wrapCopyCard.initializeDescription();
                wrapAction.addToBot(NativeActions.common.MakeTempCardInHand.Ctor(copyCard, 1, false));
            }
            NativeSTDLib.ArrayList.AbstractCard.Clear(selectCards);
            wrapAction.isDone = true;
        }
        wrapAction.tickDuration();
    }
};

export const TutorExhaustCopyCardAction = (libraryType: LibraryType, freeCost: boolean = false, tutorNumber: number = 1) => {
    const actionObj = AbstractGameAction.NewActionCtor(vfuncs);
    actionVarMap.set(actionObj.toUInt32(), { libraryType: libraryType, freeCost: freeCost, tutorNumber: tutorNumber });

    let wrapAction = new AbstractGameAction(actionObj);
    wrapAction.startDuration = 0.1;
    wrapAction.duration = 0.1;
    return actionObj;
}