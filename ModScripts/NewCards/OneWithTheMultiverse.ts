import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { OneWithTheMultiverseAction } from "../NewActions/OneWithTheMultiverseAction.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        wrapCard.addToBot(OneWithTheMultiverseAction(wrapCard.magicNumber));
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeMagicNumber(2);
            wrapCard.upgradeName();
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = OneWithTheMultiverse(thisPtr);
        return copyObj;
    },
};

export const OneWithTheMultiverse = (thisPtr: NativePointer): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("OneWithTheMultiverse", "多重宇宙加身", "colorless/skill/OneWithTheMultiverse", 1, "从 !M! 张随机金牌中选择1张加入你的手牌。这张牌在本回合耗能变为0。 NL 消耗 。", CardType.SKILL,
        CardColor.COLORLESS, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.baseMagicNumber = 3;
    wrapCard.magicNumber = 3;
    wrapCard.exhaust = true;

    return wrapCard.rawPtr;
}