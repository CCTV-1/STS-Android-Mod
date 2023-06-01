import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            let currentPlayer = AbstractDungeon.getInstance().player;
            let handSize = currentPlayer.hand.group.size;
            for (let i = 0; i < handSize; i++) {
                let handCard = NativeSTDLib.ArrayList.AbstractCard.get(currentPlayer.hand.group, i);
                let wrapCard = new AbstractCard(handCard);
                if (wrapCard.cost > 0) {
                    wrapCard.costForTurn = 0;
                    wrapCard.isCostModified = true;
                }
            }
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        let wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        wrapPotion.description = "将你手牌中所有非X费的牌本回合费用变为0。"
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("全知全能药水", "将你手牌中所有非X费的牌本回合费用变为0。");
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 0;
    },
};

export const OmniscientPotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("全知全能药水", "OmniscientPotion", PotionRarity.RARE, PotionSize.EYE, PotionColor.ENERGY, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.isThrown = false;
    return rawPotionPtr;
}