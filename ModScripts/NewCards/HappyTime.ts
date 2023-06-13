import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { HappyTimeAction } from "../NewActions/HappyTimeAction.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        wrapCard.addToBot(HappyTimeAction());
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeBaseCost(0);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = HappyTime(thisPtr);
        return copyObj;
    },
};

export const HappyTime = (thisPtr: NativePointer): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("HappyTime", "快乐时间", "colorless/skill/HappyTime", 1, "将你的手牌替换成发现。", CardType.SKILL, CardColor.COLORLESS, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.exhaust = true;
    return wrapCard.rawPtr;
}