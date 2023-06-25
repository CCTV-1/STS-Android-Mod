import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { CardGroupType, PotionColor, PotionRarity, PotionSize, RoomPhase } from "../enums.js";
import { ApocalypsePower } from "../NewPowers/ApocalypsePower.js"
import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { CardGroup } from "../NativeClassWrap/CardGroup.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";
import { PatchHelper } from "../PatchHelper.js";

const vfunc: NewPotionVFuncType = {
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const currentRoom = new AbstractRoom(NativeAbstractDungeon.getCurrRoom());
        if (currentRoom.phase === RoomPhase.COMBAT) {
            const wrapPotion = new AbstractPotion(thisPtr);
            const currentPlayer = AbstractDungeon.getInstance().player;
            let masterDeckGroup = currentPlayer.masterDeck.group;
            let deckSize = masterDeckGroup.size;
            let canUpgradeCards = NativeCards.CardGroup.Ctor(CardGroupType.UNSPECIFIED);
            let wrapGroup = new CardGroup(canUpgradeCards);
            for (let i = 0; i < deckSize; i++) {
                let randCard = NativeSTDLib.ArrayList.AbstractCard.get(masterDeckGroup, i);
                let wrapCard = new AbstractCard(randCard);
                if (wrapCard.canUpgrade()) {
                    wrapGroup.addToTop(randCard);
                }
            }
            wrapGroup.shuffle();
            let upgradeList = new Array<NativePointer>();
            let listSize = wrapGroup.size();
            let upgradeNumber = wrapPotion.potency;
            if (upgradeNumber > listSize) {
                upgradeNumber = listSize;
            }
            while (upgradeNumber--) {
                let cardRef = wrapGroup.getBottomCard();
                upgradeList.push(cardRef);
                wrapGroup.removeCard(cardRef);
            }

            const apocalypsePower = ApocalypsePower(currentPlayer.rawPtr, upgradeList);
            const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer.rawPtr, currentPlayer.rawPtr, apocalypsePower, 1);
            wrapPotion.addToBot(applyPowerAction);
        }

    },
    initializeData: (thisPtr: NativePointer) => {
        const wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = wrapPotion.getPotency2();
        let desc = "战斗胜利时，随机升级" + wrapPotion.potency + "张牌。(每次战斗只有第一瓶有效)"
        wrapPotion.description = desc;
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("天启药剂", desc);
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 2;
    },
};

export const ApocalypsePotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("天启药剂", "ApocalypsePotion", PotionRarity.UNCOMMON, PotionSize.SPHERE, PotionColor.SKILL, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.isThrown = false;
    return rawPotionPtr;
}