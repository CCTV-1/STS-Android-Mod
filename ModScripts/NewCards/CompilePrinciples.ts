import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { CompilationOptimization } from "../NewActions/CompilationOptimization.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        wrapCard.addToBot(CompilationOptimization(wrapCard.magicNumber));
    },
    canUpgrade: (thisPtr) => {
        const wrapCard = new AbstractCard(thisPtr);
        return Number(wrapCard.timesUpgraded < 3);
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (wrapCard.timesUpgraded < 3) {
            wrapCard.timesUpgraded++;
            wrapCard.name = "编译原理+" + wrapCard.timesUpgraded;
            wrapCard.upgraded = true;
            wrapCard.initializeTitle();
            wrapCard.upgradeMagicNumber(1);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = CompilePrinciples(thisPtr);
        return copyObj;
    },
};

export const CompilePrinciples: STSCardCtor = (thisPtr: NativePointer) => {
    const wrapCard = AbstractCard.NewCardCtor("CompilePrinciples", "编译原理", "blue/skill/CompilePrinciples", 1,
        "可升级三次。 NL 将手牌中的所有牌的基础数值提高 !M! 。 NL 消耗 。", CardType.SKILL, CardColor.BLUE, CardRarity.UNCOMMON, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    wrapCard.baseMagicNumber = 1;
    wrapCard.magicNumber = 1;
    wrapCard.exhaust = true;
    return wrapCard.rawPtr;
};