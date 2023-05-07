import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { LandingSound, RelicTier } from "../enums.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";

const vfuncs: NewRelicVFuncType = {
    onEquip: (thisPtr: NativePointer) => {
        const currentPlayer = AbstractDungeon.getInstance().player;
        const energyManager = currentPlayer.energy;
        energyManager.energyMaster += 3;
    },
    onUnequip: (thisPtr: NativePointer) => {
        const currentPlayer = AbstractDungeon.getInstance().player;
        const energyManager = currentPlayer.energy;
        energyManager.energyMaster -= 3;
    },
    atBattleStart: (thisPtr: NativePointer) => {
        const currentPlayer = AbstractDungeon.getInstance().player;
        const wrapRelic = new AbstractRelic(thisPtr);
        currentPlayer.heal2(-currentPlayer.currentHealth / 3);
        wrapRelic.flash();
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = TheOneRing(thisPtr);
        return copyObj;
    },
};

export const TheOneRing = (thisPtr: NativePointer): NativePointer => {
    const relicObj = AbstractRelic.NewRelicCtor("TheOneRing", "至尊魔戒", "在每场战斗开始时失去三分之一的生命，在每回合开始时获得 [E]  [E]  [E] 。", "无穷无尽的力量令人沉醉。", "TheOneRing.png", RelicTier.BOSS, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
