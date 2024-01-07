import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        const exhaustAction = NativeActions.common.Exhaust.Ctor(1, false, false, false);
        const intangiblePlayer = NativePowers.Common.IntangiblePlayer.Ctor(playerPtr, wrapCard.magicNumber);
        const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(playerPtr, playerPtr, intangiblePlayer, wrapCard.magicNumber);
        const gainLifeAction = NativeActions.common.Heal.Ctor(playerPtr, playerPtr, wrapCard.block);
        const skipSelfTurnAction = NativeActions.watcher.PressEndTurnButton.Ctor();
        wrapCard.addToBot(exhaustAction);
        wrapCard.addToBot(applyPowerAction);
        wrapCard.addToBot(gainLifeAction);
        wrapCard.addToBot(skipSelfTurnAction);
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeBaseCost(3);
            wrapCard.upgradeBlock(2);
            wrapCard.upgradeMagicNumber(1);
            wrapCard.upgradeName();
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = IronStomach(thisPtr);
        return copyObj;
    },
};

export const IronStomach: STSCardCtor = (thisPtr: NativePointer) => {
    let wrapCard = AbstractCard.NewCardCtor("IronStomach", "钢铁之胃", "red/skill/Impervious", 2,
        "消耗一张牌，获得 !M! 层无实体，恢复 !B! 点生命。 NL 结束当前回合。 NL 保留 。 NL 消耗 。",
        CardType.SKILL, CardColor.RED, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.baseBlock = 3;
    wrapCard.baseMagicNumber = 1;
    wrapCard.exhaust = true;
    wrapCard.selfRetain = true;
    return wrapCard.rawPtr;
};