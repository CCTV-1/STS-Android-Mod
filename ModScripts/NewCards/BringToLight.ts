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
    canUpgrade: (thisPtr) => {
        let wrapCard = new AbstractCard(thisPtr);
        return Number(wrapCard.timesUpgraded < 4);
    },
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        let castCost = wrapCard.cost;

        let cardArr = new Array<NativePointer>();
        cardArr.push(RedCardGen(castCost));
        cardArr.push(GreenCardGen(castCost));
        cardArr.push(BlueCardGen(castCost));
        cardArr.push(PurpleCardGen(castCost));
        cardArr.push(ColorLessCardGen(castCost));

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
        if (wrapCard.timesUpgraded < 4) {
            wrapCard.timesUpgraded++;
            wrapCard.name = "得见天光+" + wrapCard.timesUpgraded;
            wrapCard.initializeTitle();
            wrapCard.upgradeBaseCost(wrapCard.timesUpgraded);
            wrapCard.costForTurn = wrapCard.timesUpgraded;
            if (wrapCard.timesUpgraded > 2) {
                wrapCard.upgraded = true;
                wrapCard.rawDescription = "选择一张费用小于等于得见天光费用的牌的复制品置于你的手上，其费用为0且额外具有消耗。 NL 消耗 。";
                wrapCard.initializeDescription();
            }
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = BringToLight(thisPtr);
        return copyObj;
    },
};

export const BringToLight = (thisPtr: NativePointer): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("BringToLight", "得见天光", "purple/skill/BringToLight", 0, "选择一张费用小于等于得见天光的牌的复制品置于你的手上，其额外具有消耗。 NL 消耗 。", CardType.SKILL, CardColor.PURPLE, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.exhaust = true;
    return wrapCard.rawPtr;
}