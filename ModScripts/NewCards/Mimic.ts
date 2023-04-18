import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";

interface MimicExtraMember {
    cardPtr1: NativePointer;
    cardPtr2: NativePointer;
    cardPtr3: NativePointer;
};

const extraVarMap = new Map<number, MimicExtraMember>();

function callCardUse(cardPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) {
    const wrapCard = new AbstractCard(cardPtr);
    wrapCard.use(playerPtr, monsterPtr)
};

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        const extraVars = extraVarMap.get(thisPtr.toUInt32());
        if (extraVars !== undefined) {
            callCardUse(extraVars.cardPtr1, playerPtr, monsterPtr);
            callCardUse(extraVars.cardPtr2, playerPtr, monsterPtr);
            callCardUse(extraVars.cardPtr3, playerPtr, monsterPtr);
            wrapCard.upgradeMagicNumber(-1);
            if (wrapCard.baseMagicNumber <= 0) {
                wrapCard.exhaust = true;
            }
        }
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeMagicNumber(3);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const extraVars = extraVarMap.get(thisPtr.toUInt32());
        if (extraVars === undefined) {
            return NULL;
        }
        let copyObj = Mimic(thisPtr, extraVars.cardPtr1, extraVars.cardPtr2, extraVars.cardPtr3);
        return copyObj;
    },
    onObjectDector: (thisPtrValue: number) => {
        if (extraVarMap.has(thisPtrValue)) {
            extraVarMap.delete(thisPtrValue);
        }
    },
};

export const Mimic = (thisPtr: NativePointer, cardPtr1: NativePointer, cardPtr2: NativePointer, cardPtr3: NativePointer): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("Mimic", "拟态", "colorless/skill/Mimic", 1, "消耗 !M! 。", CardType.SKILL,
        CardColor.COLORLESS, CardRarity.RARE, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);

    extraVarMap.set(wrapCard.rawPtr.toUInt32(), { cardPtr1, cardPtr2, cardPtr3 });
    wrapCard.baseMagicNumber = 2;
    wrapCard.magicNumber = 2;
    return wrapCard.rawPtr;
}