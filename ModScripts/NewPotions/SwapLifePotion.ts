import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractMonster } from "../NativeClassWrap/AbstractMonster.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeVFX } from "../NativeFuncWrap/NativeVFX.js";
import { EnemyType, PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const wrapMonster = new AbstractMonster(targetCreature);
            const currentPlayer = AbstractDungeon.getInstance().player;
            switch (wrapMonster.type) {
                case EnemyType.NORMAL: {
                    const playerDiff = wrapMonster.currentHealth - currentPlayer.currentHealth;
                    const monsterDiff = currentPlayer.currentHealth - wrapMonster.currentHealth;
                    currentPlayer.heal2(playerDiff);
                    wrapMonster.heal2(monsterDiff);
                    return;
                }
                case EnemyType.ELITE:
                case EnemyType.BOSS: {
                    const effectList = AbstractDungeon.getInstance().effectList;
                    const thoughtBubbleEffect = NativeVFX.ThoughtBubble.Ctor(currentPlayer.dialogX, currentPlayer.dialogY, 3.0, "这个敌人过于强大，药剂只汲取了它的15点生命。", true);
                    NativeSTDLib.ArrayList.AbstractGameEffect.Add(effectList, thoughtBubbleEffect);
                    currentPlayer.heal2(15);
                    wrapMonster.heal2(-15);
                    return ;
                }
                default: {
                    //???
                }
            }
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        const wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        wrapPotion.description = "与一个怪物交换当前血量。"
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("换血药剂", "与一个怪物交换当前血量。");
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