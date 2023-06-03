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
                    wrapCard.upgradeBaseCost(wrapCard.cost - 1);
                }
                wrapCard.exhaust = true;
                wrapCard.rawDescription += " NL 消耗。";
                wrapCard.initializeDescription();
            }
        }
    },
    initializeData: (thisPtr: NativePointer) => {
        const wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        const abilityStr = "使手牌中的所有牌耗能减少1，且额外具有消耗。";
        wrapPotion.description = abilityStr;
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("荒疫药剂", abilityStr);
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 0;
    },
};

export const BlightsPotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("荒疫药剂", "BlightsPotion", PotionRarity.UNCOMMON, PotionSize.GHOST, PotionColor.GREEN, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.isThrown = false;
    return rawPotionPtr;
}