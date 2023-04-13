import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { LandingSound, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    onEquip: (thisPtr: NativePointer) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.counter = 0;
    },
    onVictory: (thisPtr: NativePointer) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        let currentCounter = wrapRelic.counter;
        if (currentCounter >= 8) {
            const currentPlayer = AbstractDungeon.getInstance().player;
            const energy = currentPlayer.energy;
            energy.energyMaster += 1;
            wrapRelic.flash();
            wrapRelic.counter = 0;
        } else {
            wrapRelic.counter++;
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = TheSoulRing(thisPtr);
        return copyObj;
    },
};

export const TheSoulRing = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("TheSoulRing", "灵魂魔戒", "每赢得9场战斗，便在每回合开始时获得 [E] 。", "多么鲜美的灵魂。", "TheSoulRing.png", RelicTier.BOSS, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
