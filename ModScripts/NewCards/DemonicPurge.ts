import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType } from "../enums.js";

export const DemonicPurge: STSCardCtor = (thisPtr: NativePointer) => {
    const vfuncs: NewCardVFuncType = {
        use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            let currentPlayer = AbstractDungeon.getInstance().player;
            const handList = currentPlayer.hand.group;
            const handSize = handList.size;
            const drawPileList = currentPlayer.drawPile.group;
            let drawPileSize = drawPileList.size;
            const numCards = handSize + drawPileSize;

            let exhaustAction = NativeActions.common.Exhaust.Ctor(99, true, false, false);
            wrapCard.addToBot(exhaustAction);

            while (drawPileSize > 0) {
                let drawAction = NativeActions.common.DrawCard.Ctor(playerPtr, drawPileSize % 10, false);
                wrapCard.addToBot(drawAction);
                drawPileSize = drawPileSize - drawPileSize % 10;
                let exhaustAction = NativeActions.common.Exhaust.Ctor(99, true, false, false);
                wrapCard.addToBot(exhaustAction);
            }

            let removeDebuffAction = NativeActions.unique.RemoveDebuffs.Ctor(playerPtr);
            wrapCard.addToBot(removeDebuffAction);

            let makeTempCardAtBottomOfDeckAction = NativeActions.common.MakeTempCardAtBottomOfDeck.Ctor(numCards);
            wrapCard.addToBot(makeTempCardAtBottomOfDeckAction);
        },
        upgrade: (thisPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            if (!wrapCard.upgraded) {
                wrapCard.upgradeBaseCost(2);
                wrapCard.upgradeName();
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = DemonicPurge(thisPtr);
            return copyObj;
        },
    };

    let wrapCard = AbstractCard.NewCardCtor("DemonicPurge", "邪恶净化", "red/skill/DemonicPurge", 3,
        "消耗手牌和抽牌堆，在牌库底生成等量的牌。 NL 清除所有负面状态。",
        CardType.SKILL, CardColor.RED, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);

    return wrapCard.rawPtr;
};