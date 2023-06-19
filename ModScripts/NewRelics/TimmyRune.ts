import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { LandingSound, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    atTurnStart: (thisPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.counter = 1;
    },
    onPlayCard: (thisPtr, cardPtr, monsterPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        const wrapCard = new AbstractCard(cardPtr);
        const abstractDungeon = AbstractDungeon.getInstance();
        const currentPlayer = abstractDungeon.player;
        if ((wrapCard.costForTurn >= 3) && (wrapRelic.counter == 1)) {
            wrapRelic.addToBot(NativeActions.common.GainEnergy.Ctor(3));
            wrapRelic.addToBot(NativeActions.common.DrawCard.Ctor(currentPlayer.rawPtr, 1, false));
            wrapRelic.flash();
            wrapRelic.counter = 0;
        } else if (wrapCard.costForTurn == 0) {
            wrapRelic.addToBot(NativeActions.common.Discard.Ctor(currentPlayer.rawPtr, currentPlayer.rawPtr, 1));
            wrapRelic.flash();
        }
    },
    onVictory: (thisPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.counter = -1;
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = TimmyRune(thisPtr);
        return copyObj;
    },
};

export const TimmyRune = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("TimmyRune", "强袭符文", "每回合第一次打出耗能等于或大于3的牌时，获得3点能量并抓一张牌。 NL 每当打出耗能为0的牌时，弃一张牌。", "这个符文上附着着上古先民的强袭意志。", "TimmyRune.png", RelicTier.UNCOMMON, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
