import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { DemonicPurgeAction } from "../NewActions/DemonicPurgeAction.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);

        wrapCard.addToBot(DemonicPurgeAction());
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeBaseCost(0);
            wrapCard.upgradeName();
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = DemonicPurge(thisPtr);
        return copyObj;
    },
};

export const DemonicPurge: STSCardCtor = (thisPtr: NativePointer) => {
    let wrapCard = AbstractCard.NewCardCtor("DemonicPurge", "邪恶净化", "red/skill/DemonicPurge", 1,
        "消耗所有手牌。失去等量的生命。获得等量的力量。 NL 清除所有负面状态。 NL 消耗。",
        CardType.SKILL, CardColor.RED, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.exhaust = true;
    return wrapCard.rawPtr;
};