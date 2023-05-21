import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";
import { ApocalypsePower } from "../NewPowers/ApocalypsePower.js"

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const wrapPotion = new AbstractPotion(thisPtr);
            const currentPlayer = AbstractDungeon.getInstance().player;
            const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer.rawPtr, currentPlayer.rawPtr, ApocalypsePower(currentPlayer.rawPtr), 1);
            wrapPotion.addToBot(applyPowerAction);
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        const wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        wrapPotion.description = "战斗胜利时，随机升级两张牌。"
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("天启药剂", "战斗胜利时，随机升级两张牌。");
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 0;
    },
};

export const ApocalypsePotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("天启药剂", "ApocalypsePotion", PotionRarity.UNCOMMON, PotionSize.SPHERE, PotionColor.SKILL, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.targetRequired = true;
    wrapPotion.isThrown = true;
    return rawPotionPtr;
}