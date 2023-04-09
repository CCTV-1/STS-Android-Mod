import { AbstractCard, NewCardVFuncType, STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractMonster } from "../NativeClassWrap/AbstractMonster.js";
import { AbstractPlayer } from "../NativeClassWrap/AbstractPlayer.js";
import { AbstractRoom } from "../NativeClassWrap/AbstractRoom.js";
import { MapRoomNode } from "../NativeClassWrap/MapRoomNode.js";
import { MonsterGroup } from "../NativeClassWrap/MonsterGroup.js";
import { NativeActions } from "../NativeFuncWrap/NativeActions.js";
import { NativeCards } from "../NativeFuncWrap/NativeCards.js";
import { NativePowers } from "../NativeFuncWrap/NativePowers.js";
import { NativeSTDLib } from "../NativeFuncWrap/NativeSTDLib.js";
import { CardType, CardColor, CardRarity, CardTarget, DamageType } from "../enums.js";

const vfuncs: NewCardVFuncType = {
    canUse: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        let origRet = NativeCards.AbstractCard.canUse(thisPtr, playerPtr, monsterPtr);
        if (!origRet) {
            return Number(origRet);
        }

        const wrapCard = new AbstractCard(thisPtr);
        const wrapPlayer = new AbstractPlayer(playerPtr);

        return Number(wrapPlayer.hand.group.size >= wrapCard.magicNumber);
    },
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
        const abstractDungeon = AbstractDungeon.getInstance();
        const currentMapNode = new MapRoomNode(abstractDungeon.currMapNode);
        const currentRoom = new AbstractRoom(currentMapNode.room);
        const RoomMonsters = new MonsterGroup(currentRoom.monsters).monsters;
        const monsterNumber = RoomMonsters.size;
        const wrapCard = new AbstractCard(thisPtr);
        for (let index = 0; index < monsterNumber; index++) {
            let monsterPtr = NativeSTDLib.ArrayList.AbstractMonster.get(RoomMonsters, index);
            let wrapMonster = new AbstractMonster(monsterPtr);
            if (!wrapMonster.isDying && !wrapMonster.isDead) {
                const slowPower = NativePowers.Common.Slow.Ctor(monsterPtr, 1);
                const applyPowerAction = NativeActions.common.ApplyPower.Ctor2(monsterPtr, playerPtr, slowPower, 1);
                wrapCard.addToBot(applyPowerAction);
            }
        }
    },
    upgrade: (thisPtr: NativePointer) => {
        let wrapCard = new AbstractCard(thisPtr);
        if (!wrapCard.upgraded) {
            wrapCard.upgradeName();
            wrapCard.upgradeMagicNumber(-2);
        }
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = Ephemerate(thisPtr);
        return copyObj;
    },
};

export const Ephemerate: STSCardCtor = (thisPtr: NativePointer) => {
    let wrapCard = AbstractCard.NewCardCtor("Ephemerate", "流光烁影", "green/skill/Ephemerate", 0,
        "给与所有敌人缓慢，只能于你手牌数多于或等于 !M! 的时候打出。 NL 消耗。", CardType.SKILL, CardColor.GREEN, CardRarity.RARE, CardTarget.ALL_ENEMY, DamageType.NORMAL, vfuncs);

    wrapCard.baseMagicNumber = 10;
    wrapCard.magicNumber = 10;
    wrapCard.exhaust = true;
    return wrapCard.rawPtr;
};