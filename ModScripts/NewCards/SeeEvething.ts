import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { AbstractMonster } from "../NativeClassWrap/AbstractMonster.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { NativeVFX } from "../NativeFuncWrap/NativeVFX.js";
import { AbstractPlayer } from "../NativeClassWrap/AbstractPlayer.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        if (!monsterPtr.isNull()) {
            const wrapMonster = new AbstractMonster(monsterPtr);
            if (wrapMonster.getIntentBaseDmg() < 0) {
                const wrapPlayer = new AbstractPlayer(playerPtr);
                const effectList = AbstractDungeon.getInstance().effectList;
                const thoughtBubbleEffect = NativeVFX.ThoughtBubble.Ctor(wrapPlayer.dialogX, wrapPlayer.dialogY, 3.0, "这个敌人的意图不是攻击！", true);
                NativeSTDLib.ArrayList.AbstractGameEffect.Add(effectList, thoughtBubbleEffect);
                return;
            }
            const wrapCard = new AbstractCard(thisPtr);
            const intangiblePlayer = NativePowers.Common.IntangiblePlayer.Ctor(playerPtr, wrapCard.magicNumber);
            const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(playerPtr, playerPtr, intangiblePlayer, wrapCard.magicNumber);
            wrapCard.addToBot(applyPowerAction);
        }
    },
    upgrade: (thisPtr: NativePointer) => {
        const wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeMagicNumber(1);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        const copyObj = SeeEvething(thisPtr);
        return copyObj;
    },
};

export const SeeEvething = (thisPtr: NativePointer): NativePointer => {
    const wrapCard = AbstractCard.NewCardCtor("SeeEvething", "洞若观火", "green/skill/SeeEvething", 1, " 虚无 。 NL 如果一名敌人的意图是攻击，你获得 !M! 层无实体 。 NL 消耗 。", CardType.SKILL, CardColor.GREEN, CardRarity.UNCOMMON, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);

    wrapCard.baseMagicNumber = 1;
    wrapCard.magicNumber = 1;
    wrapCard.exhaust = true;
    wrapCard.isEthereal = true;
    return wrapCard.rawPtr;
}