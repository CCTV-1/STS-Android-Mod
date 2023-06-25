import { ModUtility } from "../ModUtility.js";
import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractPower, NewPowerVFuncType } from "../NativeClassWrap/AbstractPower.js"

interface ApocalypsePowerVars {
    cardList: Array<NativePointer>;
};

const powerVarMap = new Map<number, ApocalypsePowerVars>();

const vfuncs: NewPowerVFuncType = {
    onVictory: (thisPtr) => {
        let vars = powerVarMap.get(thisPtr.toUInt32());
        if (vars === undefined) {
            return;
        }

        ModUtility.upgradeCards(vars.cardList);
    },
    onObjectDector: (thisPtrValue: number) => {
        if (powerVarMap.has(thisPtrValue)) {
            powerVarMap.delete(thisPtrValue);
        }
    },
};

export const ApocalypsePower = (ownerCreature: NativePointer, cardList: Array<NativePointer>): NativePointer => {
    let powerDesc = "战斗胜利时，升级：";
    for (const cardPtr of cardList) {
        let wrapCard = new AbstractCard(cardPtr);
        powerDesc += wrapCard.name + "|";
    }
    let powerPtr = AbstractPower.NewPowerCtor("ApocalypsePower", "天启之力", powerDesc, ownerCreature, 1, vfuncs);
    powerVarMap.set(powerPtr.toUInt32(), { cardList: cardList });
    return powerPtr;
};