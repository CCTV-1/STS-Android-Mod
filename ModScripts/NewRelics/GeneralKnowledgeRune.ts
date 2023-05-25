import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { AbsoluteDefend } from "../NewCards/AbsoluteDefend.js";
import { DeadlyStrike } from "../NewCards/DeadlyStrike.js";
import { CardTags, LandingSound, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    onEquip: (thisPtr: NativePointer) => {
        const currentPlayer = AbstractDungeon.getInstance().player;
        const masterDeck = currentPlayer.masterDeck;
        const masterDeckSize = masterDeck.size();
        if (masterDeckSize == 0) {
            return;
        }

        let strikeNumber = 0;
        let defendNumber = 0
        for (let index = 0; index < masterDeckSize; index++) {
            const cardRef = NativeSTDLib.ArrayList.AbstractCard.get(masterDeck.group, index);
            const wrapCard = new AbstractCard(cardRef);
            if (wrapCard.hasTag(CardTags.STARTER_STRIKE)) {
                masterDeck.removeCard(cardRef);
                strikeNumber++;
            } else if (wrapCard.hasTag(CardTags.STARTER_DEFEND)) {
                masterDeck.removeCard(cardRef);
                defendNumber++;
            }
        }

        for (let index = 0; index < strikeNumber; index++) {
            const deadStrikeCard = DeadlyStrike(NULL);
            masterDeck.addToTop(deadStrikeCard);
        }
        for (let index = 0; index < strikeNumber; index++) {
            const absoluteDefendCard = AbsoluteDefend(NULL);
            masterDeck.addToTop(absoluteDefendCard);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = GeneralKnowledgeRune(thisPtr);
        return copyObj;
    },
};

export const GeneralKnowledgeRune = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("GeneralKnowledgeRune", "通识符文", "拾取时，将你的所有 打击与 防御替换为 致命一击与 绝对防御。", "符文内蕴藏着先古之民留下的传承。", "GeneralKnowledgeRune.png", RelicTier.COMMON, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
