import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { ChaosRingAction } from "../NewActions/ChaosRingAction.js";
import { LandingSound, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    atTurnStartPostDraw: (thisPtr: NativePointer) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.addToBot(ChaosRingAction());
        wrapRelic.flash();
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = TheChaosRing(thisPtr);
        return copyObj;
    },
};

export const TheChaosRing = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("TheChaosRing", "混沌戒指", "效果不明。", "锟斤拷烫烫烫", "TheChaosRing.png", RelicTier.BOSS, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
