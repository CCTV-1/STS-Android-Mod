import { AbstractCard } from "./NativeClassWrap/AbstractCard.js";
import { AbstractDungeon } from "./NativeClassWrap/AbstractDungeon.js";
import { AbstractPlayer } from "./NativeClassWrap/AbstractPlayer.js";
import { AbstractRoom } from "./NativeClassWrap/AbstractRoom.js";
import { MapRoomNode } from "./NativeClassWrap/MapRoomNode.js";
import { MonsterGroup } from "./NativeClassWrap/MonsterGroup.js";
import { Settings } from "./NativeClassWrap/Settings.js";
import { NativeSTDLib } from "./NativeFuncWrap/NativeSTDLib.js";
import { NativeVFX } from "./NativeFuncWrap/NativeVFX.js";

export class ModUtility {
    static FakeRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static Shuffle<T>(arr: Array<T>) {
        for (let i = 1; i < arr.length; i++) {
            const random = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[random]] = [arr[random], arr[i]];
        }
    }

    static UpgradeRandomCard(currentPlayer: AbstractPlayer, upgradeCount: number = 1) {
        if (upgradeCount <= 0) {
            return;
        }

        let masterDeckGroup = currentPlayer.masterDeck.group;
        let deckSize = masterDeckGroup.size;
        let canUpgradeCards = new Array<NativePointer>();
        for (let i = 0; i < deckSize; i++) {
            let randCard = NativeSTDLib.ArrayList.AbstractCard.get(masterDeckGroup, i);
            let wrapCard = new AbstractCard(randCard);
            if (wrapCard.canUpgrade()) {
                canUpgradeCards.push(randCard);
            }
        }

        if (canUpgradeCards.length === 0) {
            return;
        }

        //player can't use save/load change the result,so we don't need use game rng.
        ModUtility.Shuffle(canUpgradeCards);
        ModUtility.upgradeCards(canUpgradeCards, upgradeCount);
    };

    static upgradeCards(canUpgradeCards: Array<NativePointer>, upgradeNumber: number = 0) {
        const topLevelEffects = AbstractDungeon.getInstance().topLevelEffects;
        const gameSettings = Settings.getInstance();
        const width = gameSettings.WIDTH;
        const height = gameSettings.HEIGHT;

        if (canUpgradeCards.length == 0) {
            return ;
        }
        if ((canUpgradeCards.length < upgradeNumber) || (upgradeNumber <= 0)) {
            upgradeNumber = canUpgradeCards.length;
        }

        for (let i = 0; i < upgradeNumber; i++) {
            let upgradeCard = canUpgradeCards[i];
            let wrapCard = new AbstractCard(upgradeCard);
            wrapCard.upgrade();
            let statCopyCard = wrapCard.makeStatEquivalentCopy();
            //prevent add too much animation
            if (i <= 9) {
                let x = Math.random() * width;
                let y = height * 0.5;
                let cardBrieflyEffectObj = NativeVFX.ShowCardBrieflyEffect.Ctor2(statCopyCard, x, y);
                NativeSTDLib.ArrayList.AbstractGameEffect.Add(topLevelEffects, cardBrieflyEffectObj);
            }
        }

        let upgradeShineEffectObj = NativeVFX.UpgradeShineEffect.Ctor(width * 0.5, height * 0.5);
        NativeSTDLib.ArrayList.AbstractGameEffect.Add(topLevelEffects, upgradeShineEffectObj);
    }

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