import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { LandingSound, RelicTier } from "../enums.js";

export const TheRingOfPower = (thisPtr: NativePointer): NativePointer => {
    const vfuncs: NewRelicVFuncType = {
        atTurnStart: (thisPtr: NativePointer) => {
            const currentPlayer = AbstractDungeon.getInstance().player.rawPtr;
            const wrapRelic = new AbstractRelic(thisPtr);
            const strengthPower = NativePowers.Common.Strength.Ctor(currentPlayer, 4);
            let applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer, currentPlayer, strengthPower, 4);
            wrapRelic.addToBot(applyPowerAction);
            const dexterityPower = NativePowers.Common.Dexterity.Ctor(currentPlayer, -2);
            applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer, currentPlayer, dexterityPower, -2);
            wrapRelic.addToBot(applyPowerAction);
            wrapRelic.flash();
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = TheRingOfPower(thisPtr);
            return copyObj;
        },
    };

    let relicObj = AbstractRelic.NewRelicCtor("TheRingOfPower", "力量魔戒", "在每回合开始时获得4点力量并失去2点敏捷。", "手握日月摘星辰，世间无我这般人。", "TheRingOfPower.png", RelicTier.BOSS, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
