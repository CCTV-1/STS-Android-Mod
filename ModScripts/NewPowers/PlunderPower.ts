import { CardType } from "../enums.js";
import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractPower, NewPowerVFuncType } from "../NativeClassWrap/AbstractPower.js"

const vfuncs: NewPowerVFuncType = {
    onUseCard: (thisPtr: NativePointer, cardPtr: NativePointer, useCardActionPtr: NativePointer) => {
        let wrapCard = new AbstractCard(cardPtr);
        if (wrapCard.type === CardType.ATTACK) {                
            let wrapPower = new AbstractPower(thisPtr);
            let currentPlayer = AbstractDungeon.getInstance().player;
            currentPlayer.gainGold(wrapPower.amount*3);
        }
    },
    updateDescription: (thisPtr: NativePointer) => {
        let wrapPower = new AbstractPower(thisPtr);
        wrapPower.description = "每当打出一张攻击牌,获得" + wrapPower.amount*3 + "金币。"
    },
};

export const PlunderPower = (ownerCreature: NativePointer, amount: number): NativePointer => {
    let powerPtr = AbstractPower.NewPowerCtor("PlunderPower", "掠夺", "每当打出一张攻击牌,获得3金币。", ownerCreature, amount, vfuncs);
    return powerPtr;
};