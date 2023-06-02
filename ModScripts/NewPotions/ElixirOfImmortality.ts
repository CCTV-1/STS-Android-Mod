import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { ElixirOfImmortalityAction } from "../NewActions/ElixirOfImmortalityAction.js";
import { PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const wrapPotion = new AbstractPotion(thisPtr);
            wrapPotion.addToBot(ElixirOfImmortalityAction());
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        let wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        const abilityStr = "选择一张手牌，其失去消耗。";
        wrapPotion.description = abilityStr;
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("永生琼浆", abilityStr);
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 0;
    },
};

export const ElixirOfImmortality = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("永生琼浆", "ElixirOfImmortality", PotionRarity.RARE, PotionSize.FAIRY, PotionColor.EXPLOSIVE, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.isThrown = false;
    return rawPotionPtr;
}