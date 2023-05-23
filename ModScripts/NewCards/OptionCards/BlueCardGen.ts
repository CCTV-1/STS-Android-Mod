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
        wrapCard.addToBot(TutorExhaustCopyCardAction(LibraryType.BLUE, wrapCard.upgraded));
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = BlueCardGen(thisPtr);
        return copyObj;
    },
};

export const BlueCardGen = (thisPtr: NativePointer): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("BlueCardGen", "生成蓝色牌", "colorless/skill/BlueCardGen", -2, "选择一张要生成的蓝色牌。", CardType.SKILL, CardColor.COLORLESS, CardRarity.SPECIAL, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    return wrapCard.rawPtr;
}