import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractPotion, NewPotionVFuncType } from "../NativeClassWrap/AbstractPotion.js";
import { Settings } from "../NativeClassWrap/Settings.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeHelpers } from "../NativeFuncWrap/NativeHelpers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeVFX } from "../NativeFuncWrap/NativeVFX.js";
import { PotionColor, PotionRarity, PotionSize } from "../enums.js";

const vfunc: NewPotionVFuncType = {
    canUse: (thisPtr) => {
        return Number(true);
    },
    use: (thisPtr: NativePointer, targetCreature: NativePointer) => {
        const abstractDungeonInstance = AbstractDungeon.getInstance();
        const settingInstance = Settings.getInstance();
        const currentPlayer = abstractDungeonInstance.player;

        const randCardPtr = currentPlayer.masterDeck.getRandomCard(abstractDungeonInstance.miscRng);
        const purgeCardEffect = NativeVFX.PurgeCardEffect.Ctor2(randCardPtr, settingInstance.WIDTH / 2.0, settingInstance.HEIGHT / 2.0);
        NativeSTDLib.ArrayList.AbstractGameEffect.Add(abstractDungeonInstance.topLevelEffects, purgeCardEffect);
        currentPlayer.masterDeck.removeCard(randCardPtr);
        NativeAbstractDungeon.transformCard3(randCardPtr, false, abstractDungeonInstance.miscRng);
        const SNOEffect = NativeVFX.ShowCardAndObtainEffect.Ctor(abstractDungeonInstance.transformedCard, settingInstance.WIDTH / 2.0, settingInstance.HEIGHT / 3.0);
        NativeSTDLib.ArrayList.AbstractGameEffect.Add(abstractDungeonInstance.topLevelEffects, SNOEffect);
    },
    initializeData: (thisPtr: NativePointer) => {
        let wrapPotion = new AbstractPotion(thisPtr);
        wrapPotion.potency = 0;
        wrapPotion.description = "将套牌中的随机一张牌进行变化。"
        let potionTips = wrapPotion.tips;
        NativeSTDLib.ArrayList.PowerTip.clear(potionTips);
        let newTip = NativeHelpers.PowerTip.Ctor("变化药剂", "将套牌中的随机一张牌进行变化。");
        NativeSTDLib.ArrayList.PowerTip.add(potionTips, newTip);
    },
    getPotency: (thisPtr: NativePointer, ascensionLevel: number) => {
        return 0;
    },
};

export const TransformPotion = (): NativePointer => {
    let rawPotionPtr = AbstractPotion.NewPotionCtor("变化药剂", "TransformPotion", PotionRarity.RARE, PotionSize.GHOST, PotionColor.ANCIENT, vfunc);

    const wrapPotion = new AbstractPotion(rawPotionPtr);
    wrapPotion.isThrown = false;
    return rawPotionPtr;
}