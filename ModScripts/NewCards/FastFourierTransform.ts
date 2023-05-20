import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeOrbs } from "../NativeFuncWrap/NativeOrbs.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        const currentPlayer = AbstractDungeon.getInstance().player;
        const orbNumber = currentPlayer.filledOrbCount();
        if (orbNumber <= 0) {
            return;
        }

        if (wrapCard.upgraded) {
            const evokeAllOrbsAction = NativeActions.defect.EvokeAllOrbs.Ctor();
            wrapCard.addToBot(evokeAllOrbsAction);
        } else {
            const removeAllOrbsAction = NativeActions.defect.RemoveAllOrbs.Ctor();
            wrapCard.addToBot(removeAllOrbsAction);
        }

        for (let index = 0; index < orbNumber; index++) {
            const channelAction = NativeActions.defect.Channel.Ctor(NativeOrbs.AbstractOrb.getRandomOrb(true));
            wrapCard.addToBot(channelAction);
        }
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeBaseCost(2);
            //if current costForTurn is 0,AbstractCard::upgradeBaseCost don't update costForTurn.so we manually set it.
            //but it maybe break freecast effect.
            wrapCard.costForTurn = 2;
            wrapCard.exhaust = false;
            wrapCard.rawDescription = "激发所有 充能球，创造等量的随机充能球。";
            wrapCard.initializeDescription();
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = FastFourierTransform(thisPtr);
        return copyObj;
    },
};

export const FastFourierTransform: STSCardCtor = (thisPtr: NativePointer) => {
    const wrapCard = AbstractCard.NewCardCtor("FastFourierTransform", "快速傅里叶变换", "blue/skill/FastFourierTransform", 0,
        "移除所有 充能球，创造等量的随机充能球。 NL 消耗。", CardType.SKILL, CardColor.BLUE, CardRarity.UNCOMMON, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.exhaust = true;
    return wrapCard.rawPtr;
};