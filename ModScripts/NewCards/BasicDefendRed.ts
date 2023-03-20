import { AbstractCard } from "../AbstractCard.js";
import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { PatchManager } from "../PatchManager.js";

export const BasicDefendRed = (thisPtr: NativePointer): NativePointer => {
    const vfuncs = {
        use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            let damageAction = PatchManager.Actions.GainBlock.Ctor2(playerPtr, playerPtr, wrapCard.block);
            wrapCard.addToBot(damageAction);
            let loseHpAction = PatchManager.Actions.LoseHP.Ctor(playerPtr, playerPtr, 2, AttackEffect.NONE);
            wrapCard.addToBot(loseHpAction);
        },
        upgrade: (thisPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            if (!wrapCard.upgraded) {
                wrapCard.upgradeName();
                wrapCard.upgradeBlock(3);
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = BasicDefendRed(thisPtr);
            return copyObj;
        },
    };

    let wrapCard = AbstractCard.NewCardCtor("BasicDefend_R", "鲜血护盾", "red/skill/defend", 1, "失去2点生命，获得9点格挡。", CardType.SKILL,
        CardColor.RED, CardRarity.BASIC, CardTarget.SELF, DamageType.NORMAL, vfuncs);
    wrapCard.baseBlock = 9;

    return wrapCard.rawPtr;
};