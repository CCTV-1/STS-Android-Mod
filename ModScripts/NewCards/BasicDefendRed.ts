import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        const gainBlockAction = NativeActions.common.GainBlock.Ctor2(playerPtr, playerPtr, wrapCard.block);
        wrapCard.addToBot(gainBlockAction);
    },
    triggerOnExhaust: (thisPtr) => {
        const wrapCard = new AbstractCard(thisPtr);
        const currentPlayer = AbstractDungeon.getInstance().player;
        const metallicizePower = NativePowers.Common.Metallicize.Ctor(currentPlayer.rawPtr, wrapCard.magicNumber);
        const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer.rawPtr, currentPlayer.rawPtr, metallicizePower, wrapCard.magicNumber);
        wrapCard.addToBot(applyPowerAction);
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeBlock(2);
            wrapCard.upgradeMagicNumber(2);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = BasicDefendRed(thisPtr);
        return copyObj;
    },
};

export const BasicDefendRed = (thisPtr: NativePointer): NativePointer => {
    const wrapCard = AbstractCard.NewCardCtor("BasicDefend_R", "鲜血护盾", "red/skill/defend", 1, "获得 !B! 点格挡。 NL 被消耗时获得 !M! 层金属化。", CardType.SKILL, CardColor.RED, CardRarity.BASIC, CardTarget.SELF, DamageType.NORMAL, vfuncs);
    wrapCard.baseBlock = 5;
    wrapCard.baseMagicNumber = 1;
    wrapCard.magicNumber = 1;

    return wrapCard.rawPtr;
};