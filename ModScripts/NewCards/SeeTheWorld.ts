import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { OmniscientPotion } from "../NewPotions/OmniscientPotion.js";

export const OneWithTheMultiverse = (thisPtr: NativePointer): NativePointer => {
    const vfuncs: NewCardVFuncType = {
        use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            const wrapCard = new AbstractCard(thisPtr);
            let currentPlayer = AbstractDungeon.getInstance().player;
            if (currentPlayer.gold >= wrapCard.magicNumber) {
                currentPlayer.loseGold(wrapCard.magicNumber);
                let addPotionAction = NativeActions.common.ObtainPotion.Ctor(OmniscientPotion());
                wrapCard.addToBot(addPotionAction);
            }
        },
        upgrade: (thisPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            if (!wrapCard.upgraded) {
                wrapCard.upgradeName();
                wrapCard.upgradeMagicNumber(-30);
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = OneWithTheMultiverse(thisPtr);
            return copyObj;
        },
    };

    let wrapCard = AbstractCard.NewCardCtor("OneWithTheMultiverse", "意识飞升", "colorless/skill/OneWithTheMultiverse", 1, "消耗 !M! 金币，生成全知全能药水。 NL 消耗。", CardType.SKILL,
        CardColor.COLORLESS, CardRarity.UNCOMMON, CardTarget.NONE, DamageType.NORMAL, vfuncs);
    wrapCard.baseMagicNumber = 100;
    wrapCard.magicNumber = 100;
    wrapCard.exhaust = true;

    return wrapCard.rawPtr;
}