import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { AbstractMonster } from "../NativeClassWrap/AbstractMonster.js";
import { AbstractPlayer } from "../NativeClassWrap/AbstractPlayer.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";
import { PatchHelper } from "../PatchHelper.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType, AttackEffect } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapPlayer = new AbstractPlayer(playerPtr);
        const energyManager = wrapPlayer.energy;
        energyManager.use(PatchHelper.STSGlobalVars.EnergyPaneltotalCount);
        const wrapCard = new AbstractCard(thisPtr);
        let damageCount = wrapCard.energyOnUse + wrapCard.magicNumber;

        for (let index = 0; index < damageCount; index++) {
            const dmgInfo = NativeCards.DamageInfo.Ctor(playerPtr, wrapCard.damage, DamageType.NORMAL);
            const damageAction = NativeActions.common.Damage.Ctor(monsterPtr, dmgInfo, AttackEffect.SLASH_DIAGONAL);
            wrapCard.addToBot(damageAction);
        }

        const wrapMonster = new AbstractMonster(monsterPtr);
        for (let index = 0; index < wrapCard.energyOnUse; index++) {
            wrapMonster.rollMove();
        }
        wrapMonster.createIntent();
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeMagicNumber(1);
            wrapCard.upgradeDamage(1);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = TransgressTheMind(thisPtr);
        return copyObj;
    },
};

export const TransgressTheMind: STSCardCtor = (thisPtr: NativePointer) => {
    let wrapCard = AbstractCard.NewCardCtor("TransgressTheMind", "违背心智", "red/attack/TransgressTheMind", -1,
        "改变目标的意图X次。 NL 造成 !M! + X次 !D! 点伤害。", CardType.ATTACK, CardColor.RED, CardRarity.RARE, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);

    wrapCard.baseMagicNumber = 2;
    wrapCard.magicNumber = 2;
    wrapCard.baseDamage = 1;
    return wrapCard.rawPtr;
};