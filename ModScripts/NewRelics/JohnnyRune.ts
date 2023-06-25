import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { LandingSound, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    atTurnStart: (thisPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.counter = 0;
    },
    canPlay: (thisPtr, cardPtr) => {
        const wrapCard = new AbstractCard(cardPtr);
        switch (wrapCard.costForTurn) {
            case 0:
            case 1: {
                return Number(true);
            }
            default: {
                return Number(false);
            }
        }
    },
    onPlayCard: (thisPtr, cardPtr, monsterPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        const abstractDungeon = AbstractDungeon.getInstance();
        const currentPlayer = abstractDungeon.player;
        const wrapCard = new AbstractCard(cardPtr);
        if (wrapCard.costForTurn == 0) {
            wrapRelic.counter++;
        }
        if (wrapRelic.counter >= 4) {
            wrapRelic.addToBot(NativeActions.common.GainEnergy.Ctor(1));
            wrapRelic.addToBot(NativeActions.common.DrawCard.Ctor(currentPlayer.rawPtr, 1, false));
            wrapRelic.flash();
            wrapRelic.counter = 0;
        }
    },
    onVictory: (thisPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.counter = -1;
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = JohnnyRune(thisPtr);
        return copyObj;
    },
};

export const JohnnyRune = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("JohnnyRune", "组合技符文", "你只能打出0费和1费牌。 NL 每当你在一个回合中打出4张0费牌，获得1点能量并抓一张。", "这个符文上充斥着上古先民对组合技的执念。", "JohnnyRune.png", RelicTier.UNCOMMON, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
