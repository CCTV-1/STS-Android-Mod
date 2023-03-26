import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { LandingSound, RelicTier } from "../enums.js";
import { NativeSTSLib } from "../NativeFuncWrap/NativeSTSLib.js";
import { NativeActions } from "../NativeFuncWrap/Actions/NativeActions.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";

export const Mechanization = (thisPtr: NativePointer): NativePointer => {
    const vfuncs: NewRelicVFuncType = {
        getUpdatedDescription: (thisPtr: NativePointer) => {
            return NativeSTSLib.JString.Ctor("你每次将抽牌堆洗牌时，获得一层人工制品。");
        },
        onShuffle: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            wrapRelic.flash();
            let currentPlayer = PatchHelper.STSGlobalVars.AbstractDungeon_player;
            let artifactPower = NativePowers.Artifact.Ctor(currentPlayer.rawPtr, 1);
            let applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer.rawPtr, currentPlayer.rawPtr, artifactPower, 1);
            wrapRelic.addToTop(applyPowerAction);
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = Mechanization(thisPtr);
            return copyObj;
        },
    };

    let relicObj = AbstractRelic.NewRelicCtor("Mechanization", "机械化", "你每次将抽牌堆洗牌时，获得一层人工制品。", "血肉痛苦，机械飞升", "burningBlood.png", RelicTier.SHOP, LandingSound.HEAVY, vfuncs);

    return relicObj;
};