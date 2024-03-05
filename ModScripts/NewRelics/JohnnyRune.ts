import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { LandingSound, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    atTurnStart: (thisPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.counter = 3;
    },
    onPlayCard: (thisPtr, cardPtr, monsterPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        const wrapCard = new AbstractCard(cardPtr);
        const abstractDungeon = AbstractDungeon.getInstance();
        const currentPlayer = abstractDungeon.player;

        if (wrapRelic.counter >= wrapCard.costForTurn) {
            wrapRelic.counter++;
        } else {
            wrapRelic.counter--;
        }

        if (wrapRelic.counter == 0) {
            wrapRelic.addToBot(NativeActions.common.GainEnergy.Ctor(3));
            wrapRelic.addToBot(NativeActions.common.Heal.Ctor(currentPlayer.rawPtr, currentPlayer.rawPtr, 5));
            wrapRelic.addToBot(NativeActions.common.DrawCard.Ctor(currentPlayer.rawPtr, 2, false));
            wrapRelic.flash();
            wrapRelic.counter = 3;
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
    let relicObj = AbstractRelic.NewRelicCtor("JohnnyRune", "组合技符文", "每个回合开始时，指示物重置为3。 NL 每当打出一张费用大于等于遗物上指示物数量的牌，指示物减一，反之加一。 NL 每当遗物的指示物变为0，指示物重置并获得 [E][E][E] 和6点生命值并抓三张。", "这个符文上充斥着上古先民对组合技的执念。", "JohnnyRune.png", RelicTier.UNCOMMON, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
