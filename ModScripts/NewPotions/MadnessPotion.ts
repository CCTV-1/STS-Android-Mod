import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const wrapPotion = new AbstractPotion(thisPtr);
            for (let index = 0; index < wrapPotion.potency; index++) {
                wrapPotion.addToBot(NativeActions.unique.Madness.Ctor());
            }
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        const wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = wrapPotion.getPotency2();
        const abilityStr = "随机将" + wrapPotion.potency + "张手牌的费用变为0。";
        wrapPotion.description = abilityStr;
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("疯狂药剂", abilityStr);
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 1;
    },
};

export const MadnessPotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("疯狂药剂", "MadnessPotion", PotionRarity.COMMON, PotionSize.JAR, PotionColor.SKILL, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.isThrown = false;
    return rawPotionPtr;
}