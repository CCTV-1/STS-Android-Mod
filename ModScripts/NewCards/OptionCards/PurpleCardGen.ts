import { AbstractCard, NewCardVFuncType } from "../../NativeClassWrap/AbstractCard.js";
import { TutorExhaustCopyCardAction } from "../../NewActions/TutorExhaustCopyCardAction.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType, LibraryType } from "../../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        wrapCard.onChoseThisOption();
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
        }
    },
    onChoseThisOption: (thisPtr) => {
        let wrapCard = new AbstractCard(thisPtr);
        wrapCard.addToBot(TutorExhaustCopyCardAction(LibraryType.PURPLE, wrapCard.upgraded, wrapCard.magicNumber));
    },
    makeCopy: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        let copyObj = PurpleCardGen(wrapCard.magicNumber);
        return copyObj;
    },
};

export const PurpleCardGen = (castCost: number): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("PurpleCardGen", "生成紫色牌", "purple/skill/omniscience", -2, "选择一张要生成的紫色牌。", CardType.SKILL, CardColor.COLORLESS, CardRarity.SPECIAL, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.magicNumber = castCost;
    return wrapCard.rawPtr;
}