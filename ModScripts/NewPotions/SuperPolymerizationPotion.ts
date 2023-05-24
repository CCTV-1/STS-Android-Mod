import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { SuperPolymerizationAction } from "../NewActions/SuperPolymerizationAction.js";
import { PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const wrapPotion = new AbstractPotion(thisPtr);
            wrapPotion.addToBot(SuperPolymerizationAction());
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        let wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        wrapPotion.description = "将手牌中三张牌融合为一张一费牌(手牌数不够将无事发生)。"
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("超融合药水", "将手牌中三张牌融合为一张一费牌(手牌数不够将无事发生)。");
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 0;
    },
};

export const SuperPolymerizationPotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("超融合药水", "SuperPolymerizationPotion", PotionRarity.RARE, PotionSize.CARD, PotionColor.FEAR, vfunc);

    return rawPotionPtr;
}