import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const wrapPotion = new AbstractPotion(thisPtr);
            const currentPlayer = AbstractDungeon.getInstance().player;
            const playerHand = currentPlayer.hand;
            const handSize = playerHand.size();
            while (!playerHand.isEmpty()) {
                playerHand.removeTopCard()
            }

            for (let index = 0; index < handSize; index++) {
                const randCardRef = NativeAbstractDungeon.returnTrulyRandomCard();
                const wrapRandCard = new AbstractCard(randCardRef);
                const copyCardRef = wrapRandCard.makeCopy();
                const addCardAction = NativeActions.common.MakeTempCardInHand.Ctor(copyCardRef, 1, false);
                wrapPotion.addToBot(addCardAction);
            }
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        const wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        wrapPotion.description = "将你的手牌变为随机牌。"
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("致幻药剂", "将你的手牌变为随机牌。");
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 0;
    },
};

export const IllusionPotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("致幻药剂", "IllusionPotion", PotionRarity.UNCOMMON, PotionSize.JAR, PotionColor.SMOKE, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.isThrown = false;
    return rawPotionPtr;
}