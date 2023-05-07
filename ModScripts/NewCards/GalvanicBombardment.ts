import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { AttackEffect, CardColor, CardRarity, CardTags, CardTarget, CardType, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const currentPlayer = AbstractDungeon.getInstance().player;
        const masterDeck = currentPlayer.masterDeck;
        const masterDeckSize = masterDeck.size();
        let count = 0;
        for (let index = 0; index < masterDeckSize; index++) {
            const cardRef = NativeSTDLib.ArrayList.AbstractCard.get(masterDeck.group, index);
            const wrapCard = new AbstractCard(cardRef);
            if (wrapCard.hasTag(CardTags.GalvanicBombardment)) {
                count++;
            }
        }

        const damageCount = count + 1;
        const damage = count + 3;
        for (let index = 0; index < damageCount; index++) {
            const wrapCard = new AbstractCard(thisPtr);
            const dmgInfoObj = NativeCards.DamageInfo.Ctor(playerPtr, damage, wrapCard.damageTypeForTurn);
            wrapCard.addToBot(NativeActions.common.Damage.Ctor(monsterPtr, dmgInfoObj, AttackEffect.SLASH_HORIZONTAL));
        }
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeBaseCost(0);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = GalvanicBombardment(thisPtr);
        return copyObj;
    },
};

export const GalvanicBombardment: STSCardCtor = (thisPtr: NativePointer) => {
    let wrapCard = AbstractCard.NewCardCtor("GalvanicBombardment", "电流轰炸", "green/skill/GalvanicBombardment", 1, "造成X次X + 3点伤害。 NL X为卡组中名为电流轰炸的牌的数量加1。", CardType.ATTACK, CardColor.BLUE, CardRarity.COMMON, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);

    wrapCard.baseMagicNumber = 3;
    wrapCard.magicNumber = 3;
    const cardTags = wrapCard.tags;
    NativeSTDLib.ArrayList.CardTags.add(cardTags, CardTags.GalvanicBombardment);
    return wrapCard.rawPtr;
};