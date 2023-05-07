import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractMonster } from "../NativeClassWrap/AbstractMonster.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { EnemyType, PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const wrapMonster = new AbstractMonster(targetCreature);
            if (wrapMonster.type === EnemyType.NORMAL) {
                const currentPlayer = AbstractDungeon.getInstance().player;
                const playerDiff = wrapMonster.currentHealth - currentPlayer.currentHealth;
                const monsterDiff = currentPlayer.currentHealth - wrapMonster.currentHealth;
                currentPlayer.heal2(playerDiff);
                wrapMonster.heal2(monsterDiff);
            }
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        const wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        wrapPotion.description = "与一个普通怪物交换当前血量。"
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("换血药剂", "与一个普通怪物交换当前血量。");
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 0;
    },
};

export const SwapLifePotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("换血药剂", "SwapLifePotion", PotionRarity.RARE, PotionSize.JAR, PotionColor.POISON, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.targetRequired = true;
    wrapPotion.isThrown = true;
    return rawPotionPtr;
}