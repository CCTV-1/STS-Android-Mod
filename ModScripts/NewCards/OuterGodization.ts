import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        let changeStanceAction = NativeActions.watcher.ChangeStance.Ctor("Divinity");
        wrapCard.addToBot(changeStanceAction);
        let confusionPower = NativePowers.Common.Confusion.Ctor(playerPtr);
        let applyPowerAction = NativeActions.common.ApplyPower.Ctor2(playerPtr, playerPtr, confusionPower, 1);
        wrapCard.addToBot(applyPowerAction);
        let randomCostAction = NativeActions.unique.RandomizeHandCost.Ctor();
        wrapCard.addToBot(randomCostAction);
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeBaseCost(1);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = OuterGodization(thisPtr);
        return copyObj;
    },
};

export const OuterGodization: STSCardCtor = (thisPtr: NativePointer) => {
    let wrapCard = AbstractCard.NewCardCtor("OuterGodization", "古神化", "purple/skill/OuterGodization", 2, "进入神格。 NL 随机化手牌的耗能。 NL 获得混乱。", CardType.SKILL,
        CardColor.PURPLE, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    return wrapCard.rawPtr;
};