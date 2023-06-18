import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { EndlessCyclePower } from "../NewPowers/EndlessCyclePower.js";
import { PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const currentPlayer = AbstractDungeon.getInstance().player;
            const playerHand = currentPlayer.hand;
            const handSize = playerHand.size();
            if (handSize <= 0) {
                return;
            }

            let cardList = new Array<NativePointer>();
            for (let index = 0; index < handSize; index++) {
                let cardRef = NativeSTDLib.ArrayList.AbstractCard.get(playerHand.group, index);
                cardList.push(cardRef);
            }
            const wrapPotion = new AbstractPotion(thisPtr);
            const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer.rawPtr, currentPlayer.rawPtr, EndlessCyclePower(currentPlayer.rawPtr, cardList), 1);
            wrapPotion.addToBot(applyPowerAction);
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        let wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        wrapPotion.description = "每回合开始时弃掉你的手牌，然后将你当前手牌的复制加入你的手牌。"
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("无尽轮回药剂", "每回合开始时弃掉你的手牌，然后将你当前手牌的复制加入你的手牌。");
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 0;
    },
};

export const EndlessCyclePotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("无尽轮回药剂", "EndlessCyclePotion", PotionRarity.RARE, PotionSize.EYE, PotionColor.SNECKO, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.isThrown = false;
    return rawPotionPtr;
}