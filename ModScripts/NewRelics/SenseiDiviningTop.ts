import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { LandingSound, RelicTier } from "../enums.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";

const vfuncs: NewRelicVFuncType = {
    atTurnStartPostDraw: (thisPtr: NativePointer) => {
        let wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.flash();
        let currentPlayer = AbstractDungeon.getInstance().player;
        let putOnDeckAction = NativeActions.common.PutOnDeck.Ctor(currentPlayer.rawPtr, currentPlayer.rawPtr, 1, false);
        wrapRelic.addToTop(putOnDeckAction);
        let drawAction = NativeActions.common.DrawCard.Ctor(currentPlayer.rawPtr, 1, false);
        wrapRelic.addToTop(drawAction);
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = SenseiDiviningTop(thisPtr);
        return copyObj;
    },
};

export const SenseiDiviningTop = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("SenseiDiviningTop", "师范占卜陀螺", "每个回合开始时，抽一张牌。 NL 将手牌中的一张牌放到你的抽牌堆顶部。", "控顶的下一步是什么来着？", "SenseiDiviningTop.png", RelicTier.SHOP, LandingSound.HEAVY, vfuncs);

    return relicObj;
};