import { ModUtility } from "../ModUtility.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractPower, NewPowerVFuncType } from "../NativeClassWrap/AbstractPower.js"

const vfuncs: NewPowerVFuncType = {
    onVictory: (thisPtr) => {
        const currentPlayer = AbstractDungeon.getInstance().player;
        ModUtility.UpgradeRandomCard(currentPlayer, 2);
    },
};

export const ApocalypsePower = (ownerCreature: NativePointer): NativePointer => {
    let powerPtr = AbstractPower.NewPowerCtor("ApocalypsePower", "天启之力", "战斗胜利时，随机升级两张牌。", ownerCreature, 1, vfuncs);
    return powerPtr;
};