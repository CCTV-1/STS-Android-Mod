import { AbstractCard } from "./NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "./NativeClassWrap/AbstractDungeon.js";
import { AbstractPlayer } from "./NativeClassWrap/AbstractPlayer.js";
import { AbstractRoom } from "./NativeClassWrap/AbstractRoom.js";
import { MapRoomNode } from "./NativeClassWrap/MapRoomNode.js";
import { MonsterGroup } from "./NativeClassWrap/MonsterGroup.js";
import { NativeSTDLib } from "./NativeFuncWrap/NativeSTDLib.js";
import { NativeVFX } from "./NativeFuncWrap/NativeVFX.js";
import { PatchHelper } from "./PatchHelper.js";

export class ModUtility {
    static FakeRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static UpgradeRandomCard(currentPlayer: AbstractPlayer) {
        let masterDeckGroup = currentPlayer.masterDeck.group;
        let deckSize = masterDeckGroup.size;
        let canUpgradeCards = new Array<AbstractCard>();
        for (let i = 0; i < deckSize - 1; i++) {
            let randCard = NativeSTDLib.ArrayList.AbstractCard.get(masterDeckGroup, i);
            let wrapCard = new AbstractCard(randCard);
            if (wrapCard.canUpgrade()) {
                canUpgradeCards.push(wrapCard);
            }
        }
        if (canUpgradeCards.length > 0) {
            let index = ModUtility.FakeRandom(0, canUpgradeCards.length - 1);
            let upgradeCard = canUpgradeCards[index];
            upgradeCard.upgrade();
            let topLevelEffects = AbstractDungeon.getInstance().topLevelEffects;
            let statCopyCard = upgradeCard.makeStatEquivalentCopy();
            let cardBrieflyEffectObj = NativeVFX.ShowCardBrieflyEffect.Ctor(statCopyCard);
            let upgradeShineEffectObj = NativeVFX.UpgradeShineEffect.Ctor(PatchHelper.STSGlobalVars.STSSetting_WIDTH * 0.5, PatchHelper.STSGlobalVars.STSSetting_HEIGHT * 0.5);
            NativeSTDLib.ArrayList.AbstractGameEffect.Add(topLevelEffects, cardBrieflyEffectObj);
            NativeSTDLib.ArrayList.AbstractGameEffect.Add(topLevelEffects, upgradeShineEffectObj);
        }
    };

    static foreachCurrentRoomMonster(applyFunc: (monsterPtr: NativePointer) => void) {
        const abstractDungeon = AbstractDungeon.getInstance();
        const currentMapNode = new MapRoomNode(abstractDungeon.currMapNode);
        const currentRoom = new AbstractRoom(currentMapNode.room);
        const RoomMonsters = new MonsterGroup(currentRoom.monsters).monsters;
        const monsterNumber = RoomMonsters.size;
        for (let index = 0; index < monsterNumber; index++) {
            const monsterPtr = NativeSTDLib.ArrayList.AbstractMonster.get(RoomMonsters, index);
            applyFunc(monsterPtr);
        }
    }
}