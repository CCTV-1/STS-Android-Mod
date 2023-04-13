import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { LandingSound, RelicTier } from "../enums.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";

const vfuncs: NewRelicVFuncType = {
    getUpdatedDescription: (thisPtr: NativePointer) => {
        return NativeSTDLib.JString.Ctor("在每场战斗开始时失去三分之一的生命，在每回合开始时获得 [E]  [E]  [E] 。");
    },
    onEquip: (thisPtr: NativePointer) => {
        let currentPlayer = AbstractDungeon.getInstance().player;
        let energy = currentPlayer.energy;
        energy.energyMaster += 3;
    },
    onUnequip: (thisPtr: NativePointer) => {
        let currentPlayer = AbstractDungeon.getInstance().player;
        let energy = currentPlayer.energy;
        energy.energyMaster -= 3;
    },
    atBattleStart: (thisPtr: NativePointer) => {
        let currentPlayer = AbstractDungeon.getInstance().player;
        currentPlayer.heal(-currentPlayer.currentHealth / 3, true);
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = TheOneRing(thisPtr);
        return copyObj;
    },
};

export const TheOneRing = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("TheOneRing", "至尊魔戒", "在每场战斗开始时失去三分之一的生命，在每回合开始时获得 [E]  [E]  [E] 。", "无穷无尽的力量令人沉醉。", "TheOneRing.png", RelicTier.BOSS, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
