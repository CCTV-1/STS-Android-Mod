import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { LandingSound, RelicTier } from "../enums.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";

export const Mechanization = (thisPtr: NativePointer): NativePointer => {
    const vfuncs: NewRelicVFuncType = {
        getUpdatedDescription: (thisPtr: NativePointer) => {
            return NativeSTDLib.JString.Ctor("你每次将抽牌堆洗牌时，获得一层人工制品。");
        },
        onShuffle: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            wrapRelic.flash();
            let currentPlayer = AbstractDungeon.getInstance().player;
            let artifactPower = NativePowers.Common.Artifact.Ctor(currentPlayer.rawPtr, 1);
            let applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer.rawPtr, currentPlayer.rawPtr, artifactPower, 1);
            wrapRelic.addToTop(applyPowerAction);
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = Mechanization(thisPtr);
            return copyObj;
        },
    };

    let relicObj = AbstractRelic.NewRelicCtor("Mechanization", "机械化", "你每次将抽牌堆洗牌时，获得一层人工制品。", "血肉痛苦，机械飞升", "Mechanization.png", RelicTier.SHOP, LandingSound.HEAVY, vfuncs);

    return relicObj;
};