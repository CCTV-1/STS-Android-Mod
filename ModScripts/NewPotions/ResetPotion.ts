import { AbstractMonster } from "../NativeClassWrap/AbstractMonster.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { ArrayList } from "../NativeClassWrap/ArrayList.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { EnemyType, PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const wrapPotion = new AbstractPotion(thisPtr);
            const wrapMonster = new AbstractMonster(targetCreature);
            if (wrapMonster.type === EnemyType.BOSS) {
                const strengthPower = NativePowers.Common.Strength.Ctor(targetCreature, -wrapPotion.potency);
                const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(targetCreature, targetCreature, strengthPower, -wrapPotion.potency);
                wrapPotion.addToBot(applyPowerAction);
            } else {
                const powers = new ArrayList(wrapMonster.powers);
                const powersNumber = powers.size;
                for (let index = 0 ; index < powersNumber; index++) {
                    const powerRef = NativeSTDLib.ArrayList.AbstractPower.get(powers, index);
                    const removePowerAction = NativeActions.common.RemoveSpecificPower.Ctor2(targetCreature, targetCreature, powerRef);
                    wrapPotion.addToBot(removePowerAction);
                }
            }
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        const wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = wrapPotion.getPotency2();
        wrapPotion.description = "移除目标非BOSS怪物身上的能力。降低BOSS怪物的力量。"
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("重置药剂", "移除目标非BOSS怪物身上的能力。降低BOSS怪物的力量。");
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 4;
    },
};

export const ResetPotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("重置药剂", "ResetPotion", PotionRarity.UNCOMMON, PotionSize.JAR, PotionColor.POWER, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.targetRequired = true;
    wrapPotion.isThrown = true;
    return rawPotionPtr;
}