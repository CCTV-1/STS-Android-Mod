import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { MapRoomNode } from "../NativeClassWrap/MapRoomNode.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";

export const OmniscientPotion = (): NativePointer => {
    let vfunc: NewPotionVFuncType = {
        use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
            let abstractDungeon = AbstractDungeon.getInstance();
            let currentMapNode = new MapRoomNode(abstractDungeon.currMapNode);
            let currentRoom = new AbstractRoom(currentMapNode.room);
            if (currentRoom.phase === RoomPhase.COMBAT) {
                let currentPlayer = AbstractDungeon.getInstance().player;
                let handSize = currentPlayer.hand.group.size;
                for (let i = 0; i < handSize - 1; i++) {
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

    let rawPotionPtr = AbstractPotion.NewPotionCtor("全知全能药水", "OmniscientPotion", PotionRarity.RARE, PotionSize.EYE, PotionColor.ENERGY, vfunc);

    return rawPotionPtr;
}