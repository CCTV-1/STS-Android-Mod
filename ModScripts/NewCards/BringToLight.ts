import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { ArrayList } from "../NativeClassWrap/ArrayList.js";
import { BlueCardGen } from "./OptionCards/BlueCardGen.js";
import { ColorLessCardGen } from "./OptionCards/ColorLessCardGen.js";
import { GreenCardGen } from "./OptionCards/GreenCardGen.js";
import { PurpleCardGen } from "./OptionCards/PurpleCardGen.js";
import { RedCardGen } from "./OptionCards/RedCardGen.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        let cardArr = new Array<NativePointer>();
        cardArr.push(BlueCardGen(NULL));
        cardArr.push(ColorLessCardGen(NULL));
        cardArr.push(GreenCardGen(NULL));
        cardArr.push(PurpleCardGen(NULL));
        cardArr.push(RedCardGen(NULL));

        let optionCards = NativeSTDLib.ArrayList.AbstractCard.Ctor();
        const wrapOptionCardList = new ArrayList(optionCards);
        for (let index = 0; index < cardArr.length; index++) {
            if (wrapCard.upgraded) {
                let wrapOpCard = new AbstractCard(cardArr[index]);
                wrapOpCard.upgrade();
            }
            NativeSTDLib.ArrayList.AbstractCard.Add(wrapOptionCardList, cardArr[index]);
        }
        wrapCard.addToBot(NativeActions.watcher.ChooseOne.Ctor(optionCards));
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeBaseCost(5);
            wrapCard.rawDescription = "消耗。 NL 将任意一张牌的复制品置于你的手上，其费用变为0且额外具有 消耗。";
            wrapCard.initializeDescription();
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = BringToLight(thisPtr);
        return copyObj;
    },
};

export const BringToLight = (thisPtr: NativePointer): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("BringToLight", "得见天光", "purple/skill/BringToLight", 3, "消耗。 NL 将任意一张牌的复制品置于你的手上，其额外具有 消耗。", CardType.SKILL, CardColor.PURPLE, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.exhaust = true;
    return wrapCard.rawPtr;
}