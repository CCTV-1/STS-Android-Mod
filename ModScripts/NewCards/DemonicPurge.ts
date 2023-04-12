import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType, AttackEffect } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        let currentPlayer = AbstractDungeon.getInstance().player;
        const handList = currentPlayer.hand.group;
        const handSize = handList.size;

        const exhaustAction = NativeActions.common.Exhaust.Ctor(99, true, false, false);
        wrapCard.addToBot(exhaustAction);

        const loseHandSizeHPAction = NativeActions.common.LoseHP.Ctor(playerPtr, playerPtr, handSize, AttackEffect.NONE);
        wrapCard.addToBot(loseHandSizeHPAction);

        const strPower = NativePowers.Common.Strength.Ctor(playerPtr, handSize);
        const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(playerPtr, playerPtr, strPower, handSize);
        wrapCard.addToBot(applyPowerAction);

        const removeDebuffAction = NativeActions.unique.RemoveDebuffs.Ctor(playerPtr);
        wrapCard.addToBot(removeDebuffAction);
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