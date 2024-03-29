import { AbstractCard, NewCardVFuncType } from "../NativeClassWrap/AbstractCard.js";
import { AbstractPlayer } from "../NativeClassWrap/AbstractPlayer.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { PatchHelper } from "../PatchHelper.js";
import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let wrapPlayer = new AbstractPlayer(playerPtr);
        const energyManager = wrapPlayer.energy;
        energyManager.use(PatchHelper.STSGlobalVars.EnergyPaneltotalCount);
        let wrapCard = new AbstractCard(thisPtr);
        let fouceNumber = wrapCard.energyOnUse - wrapCard.magicNumber;
        if (fouceNumber <= 0) {
            return;
        }
        let foucePower = NativePowers.Defect.Focus.Ctor(playerPtr, fouceNumber);
        let applyPowerAction = NativeActions.common.ApplyPower.Ctor2(playerPtr, playerPtr, foucePower, fouceNumber);
        wrapCard.addToBot(applyPowerAction);
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeMagicNumber(-1);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = GaugeTheory(thisPtr);
        return copyObj;
    },
};

export const GaugeTheory = (thisPtr: NativePointer): NativePointer => {
    let wrapCard = AbstractCard.NewCardCtor("GaugeTheory", "规范场论", "blue/power/GaugeTheory", -1, "获得X - !M! 点集中。", CardType.POWER,
        CardColor.BLUE, CardRarity.RARE, CardTarget.NONE, DamageType.NORMAL, vfuncs);
    wrapCard.baseMagicNumber = 1;
    wrapCard.magicNumber = 1;

    return wrapCard.rawPtr;
}