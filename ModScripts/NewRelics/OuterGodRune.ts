import { AbstractCard } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { Settings } from "../NativeClassWrap/Settings.js";
import { NativeAbstractDungeon } from "../NativeFuncWrap/NativeAbstractDungeon.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeVFX } from "../NativeFuncWrap/NativeVFX.js";
import { CardRarity, LandingSound, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    onEquip: (thisPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.counter = 0;
    },
    onObtainCard: (thisPtr, cardPtr) => {
        const wrapCard = new AbstractCard(cardPtr);
        switch (wrapCard.rarity) {
            case CardRarity.CURSE: {
                return;
            }
            default: {
                const abstractDungeonInstance = AbstractDungeon.getInstance();
                const settingInstance = Settings.getInstance();
                const currentPlayer = abstractDungeonInstance.player;
                const wrapRelic = new AbstractRelic(thisPtr);
                if (wrapCard.rarity === CardRarity.RARE) {
                    wrapRelic.counter++;
                }
                const randCardPtr = currentPlayer.masterDeck.getRandomCard(abstractDungeonInstance.miscRng);
                const purgeCardEffect = NativeVFX.PurgeCardEffect.Ctor2(randCardPtr, settingInstance.WIDTH / 2.0, settingInstance.HEIGHT / 2.0);
                NativeSTDLib.ArrayList.AbstractGameEffect.Add(abstractDungeonInstance.topLevelEffects, purgeCardEffect);
                currentPlayer.masterDeck.removeCard(randCardPtr);
                NativeAbstractDungeon.transformCard3(randCardPtr, false, abstractDungeonInstance.miscRng);
                currentPlayer.masterDeck.addToTop(abstractDungeonInstance.transformedCard);
                wrapRelic.flash();
                return;
            }
        }
    },
    atBattleStart: (thisPtr) => {
        const wrapRelic = new AbstractRelic(thisPtr);
        if (wrapRelic.counter <= 0) {
            return;
        }
        const currentPlayer = AbstractDungeon.getInstance().player.rawPtr;
        const strengthPower = NativePowers.Common.Strength.Ctor(currentPlayer, wrapRelic.counter);
        let applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer, currentPlayer, strengthPower, wrapRelic.counter);
        wrapRelic.addToBot(applyPowerAction);
        const dexterityPower = NativePowers.Common.Dexterity.Ctor(currentPlayer, wrapRelic.counter);
        applyPowerAction = NativeActions.common.ApplyPower.Ctor2(currentPlayer, currentPlayer, dexterityPower, wrapRelic.counter);
        wrapRelic.addToBot(applyPowerAction);
        wrapRelic.flash();
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = OuterGodRune(thisPtr);
        return copyObj;
    },
};

export const OuterGodRune = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("OuterGodRune", "古神符文", "每当你获得非诅咒牌，将你牌组中的随机一张牌变为其他牌。 NL 若这张牌是稀有牌，额外在无用符文上放置一个指示物。 NL 战斗开始时你获得等同于指示物数量的力量与敏捷。", "古神的祝福几乎完全复写了曾经拥有无限力量的先古符文。", "OuterGodRune.png", RelicTier.UNCOMMON, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
