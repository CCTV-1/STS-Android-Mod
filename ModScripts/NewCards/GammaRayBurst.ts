import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { AbstractPlayer } from "../NativeClassWrap/AbstractPlayer.js";
import { AbstractPower } from "../NativeClassWrap/AbstractPower.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";
import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";

export const GammaRayBurst = (thisPtr: NativePointer): NativePointer => {
    const vfuncs: NewCardVFuncType = {
        use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            let currentPlayer = new AbstractPlayer(playerPtr);
            let FocusPtr = currentPlayer.getPower("Focus");
            if (FocusPtr.isNull()) {
                return;
            }
            let wrapFocusPower = new AbstractPower(FocusPtr);
            const dmgCount = wrapFocusPower.amount;
            for (let index = 0; index < dmgCount; index++) {
                let dmgInfoObj = NativeCards.DamageInfo.Ctor(playerPtr, dmgCount, wrapCard.damageTypeForTurn);
                let dmgAction = NativeActions.common.Damage.Ctor(monsterPtr, dmgInfoObj, AttackEffect.NONE);
                wrapCard.addToBot(dmgAction);
            }
        },
        upgrade: (thisPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            if (!wrapCard.upgraded) {
                wrapCard.upgradeName();
                wrapCard.selfRetain = true;
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = GammaRayBurst(thisPtr);
            return copyObj;
        },
    };

    let wrapCard = AbstractCard.NewCardCtor("GammaRayBurst", "伽玛射线暴", "blue/attack/GammaRayBurst", 3, "造成X次X点伤害，X为你的集中数。", CardType.ATTACK,
        CardColor.BLUE, CardRarity.RARE, CardTarget.ENEMY, DamageType.NORMAL, vfuncs);

    return wrapCard.rawPtr;
}