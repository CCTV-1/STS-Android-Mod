import { CardType } from "../enums.js";
import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractPower, NewPowerVFuncType } from "../NativeClassWrap/AbstractPower.js"
import { PatchHelper } from "../PatchHelper.js";

export const PlunderPower = (ownerCreature: NativePointer, amount: number): NativePointer => {
    let vfuncs: NewPowerVFuncType = {
        onUseCard: (thisPtr: NativePointer, cardPtr: NativePointer, useCardActionPtr: NativePointer) => {
            let wrapCard = new AbstractCard(cardPtr);
            if (wrapCard.type === CardType.ATTACK) {                
                let wrapPower = new AbstractPower(thisPtr);
                let currentPlayer = PatchHelper.STSGlobalVars.AbstractDungeon_player;
                currentPlayer.gainGold(wrapPower.amount*3);
            }
        },
        updateDescription: (thisPtr: NativePointer) => {
            let wrapPower = new AbstractPower(thisPtr);
            wrapPower.description = "每当打出一张攻击牌,获得" + wrapPower.amount*3 + "金币。"
        },
    };
    let powerPtr = AbstractPower.NewPowerCtor("PlunderPower", "掠夺", "每当打出一张攻击牌,获得3金币。", ownerCreature, amount, vfuncs);
    return powerPtr;
}