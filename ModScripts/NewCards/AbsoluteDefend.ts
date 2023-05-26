import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType, CardTags } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        wrapCard.addToBot(NativeActions.common.GainBlock.Ctor(playerPtr, wrapCard.block));
    },
    canUpgrade: (thisPtr) => {
        return Number(true);
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        wrapCard.timesUpgraded++;
        wrapCard.name = "绝对防御+" + wrapCard.timesUpgraded;
        wrapCard.upgraded = true;
        wrapCard.initializeTitle();
        wrapCard.upgradeBlock(2*wrapCard.timesUpgraded + 1);
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = AbsoluteDefend(thisPtr);
        return copyObj;
    },
};

export const AbsoluteDefend: STSCardCtor = (thisPtr: NativePointer) => {
    const wrapCard = AbstractCard.NewCardCtor("AbsoluteDefend", "绝对防御", "colorless/skill/AbsoluteDefend", 1,
        "可无限升级。 NL 获得 !B! 点格挡。", CardType.SKILL, CardColor.COLORLESS, CardRarity.COMMON, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.baseBlock = 6;
    const tags = wrapCard.tags;
    NativeSTDLib.ArrayList.CardTags.add(tags, CardTags.STARTER_DEFEND);
    return wrapCard.rawPtr;
};