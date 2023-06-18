import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractPower, NewPowerVFuncType } from "../NativeClassWrap/AbstractPower.js"
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";

interface EndlessCyclePowerVars {
    cardList: Array<NativePointer>;
};

const powerVarMap = new Map<number, EndlessCyclePowerVars>();

const vfuncs: NewPowerVFuncType = {
    atStartOfTurnPostDraw: (thisPtr) => {
        let vars = powerVarMap.get(thisPtr.toUInt32());
        if (vars === undefined) {
            return;
        }

        const wrapPower = new AbstractPower(thisPtr);
        let discardAllCardAction = NativeActions.common.Discard.Ctor2(wrapPower.owner, wrapPower.owner, 10, true, false);
        wrapPower.addToBot(discardAllCardAction);
        for (const cardPtr of vars.cardList) {
            let wrapCard = new AbstractCard(cardPtr);
            let copyCard = wrapCard.makeStatEquivalentCopy();
            wrapPower.addToBot(NativeActions.common.MakeTempCardInHand.Ctor(copyCard, 1, false));
        }
    },
    onObjectDector: (thisPtrValue: number) => {
        if (powerVarMap.has(thisPtrValue)) {
            powerVarMap.delete(thisPtrValue);
        }
    },
};

export const EndlessCyclePower = (ownerCreature: NativePointer, cardList: Array<NativePointer>): NativePointer => {
    let cardNames = "";
    for (const cardPtr of cardList) {
        let wrapCard = new AbstractCard(cardPtr);
        cardNames += wrapCard.name + "|";
    }
    let powerPtr = AbstractPower.NewPowerCtor("EndlessCyclePower", "无尽循环", "每个回合开始时弃掉你的手牌，然后将" + cardNames + "加入你的手牌。", ownerCreature, 1, vfuncs);

    powerVarMap.set(powerPtr.toUInt32(), { cardList: cardList });
    return powerPtr;
};