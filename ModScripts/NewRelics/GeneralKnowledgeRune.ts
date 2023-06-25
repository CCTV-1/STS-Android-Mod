import { ModUtility } from "../ModUtility.js";
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
        const removeRefs = new Array<NativePointer>();
        for (let index = 0; index < masterDeckSize; index++) {
            const cardRef = NativeSTDLib.ArrayList.AbstractCard.get(masterDeck.group, index);
            const wrapCard = new AbstractCard(cardRef);
            if (wrapCard.hasTag(CardTags.STARTER_STRIKE)) {
                removeRefs.push(cardRef);
                strikeNumber++;
            } else if (wrapCard.hasTag(CardTags.STARTER_DEFEND)) {
                removeRefs.push(cardRef);
                defendNumber++;
            }
        }

        for (let index = 0; index < removeRefs.length; index++) {
            masterDeck.removeCard(removeRefs[index]);
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
    atBattleStart: (thisPtr) => {
        let wrapRelic = new AbstractRelic(thisPtr);
        const currentPlayer = AbstractDungeon.getInstance().player;
        wrapRelic.counter = currentPlayer.currentHealth;
    },
    onVictory: (thisPtr) => {
        let wrapRelic = new AbstractRelic(thisPtr);
        const currentPlayer = AbstractDungeon.getInstance().player;
        const diff = Math.abs(wrapRelic.counter - currentPlayer.currentHealth);
        const masterDeck = currentPlayer.masterDeck;
        const masterDeckSize = masterDeck.size();
        wrapRelic.counter = -1;
        if (masterDeckSize == 0) {
            return;
        }

        let canUpgradeCards = new Array<NativePointer>();
        let targetTag = CardTags.STARTER_STRIKE;
        if (diff >= 20) {
            targetTag = CardTags.STARTER_DEFEND;
        } else if (diff > 5) {
            return ;
        }

        for (let index = 0; index < masterDeckSize; index++) {
            const cardRef = NativeSTDLib.ArrayList.AbstractCard.get(masterDeck.group, index);
            const wrapCard = new AbstractCard(cardRef);
            if (wrapCard.hasTag(targetTag) && wrapCard.canUpgrade()) {
                canUpgradeCards.push(cardRef);
            }
        }

        ModUtility.Shuffle(canUpgradeCards);
        ModUtility.upgradeCards(canUpgradeCards, 1);
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = GeneralKnowledgeRune(thisPtr);
        return copyObj;
    },
};

export const GeneralKnowledgeRune = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("GeneralKnowledgeRune", "通识符文", "拾取时，将你的所有 打击与 防御替换为 #y致命一击与 #y绝对防御。 NL 战斗胜利后，若生命值变化大于等于20则随机升级一张防御牌，小于等于5则随机升级一张打击牌。", "符文内蕴藏着先古之民留下的传承。", "GeneralKnowledgeRune.png", RelicTier.UNCOMMON, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
