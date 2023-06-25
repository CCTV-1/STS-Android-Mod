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
        wrapCard.addToBot(TutorExhaustCopyCardAction(LibraryType.BLUE, wrapCard.upgraded, wrapCard.magicNumber));
    },
    makeCopy: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        let copyObj = BlueCardGen(wrapCard.magicNumber);
        return copyObj;
    },
};

export const BlueCardGen = (castCost: number): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("BlueCardGen", "生成蓝色牌", "blue/power/creative_ai", -2, "选择一张要生成的蓝色牌。", CardType.SKILL, CardColor.COLORLESS, CardRarity.SPECIAL, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.magicNumber = castCost;
    return wrapCard.rawPtr;
}