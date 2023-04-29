import { PatchHelper } from "../PatchHelper.js";
import { AbstractPlayer } from "./AbstractPlayer.js";
import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class AbstractDungeon extends NativeClassWrapper {
    private static instance: AbstractDungeon | undefined = undefined;

    //NativePointer AbstractDungeon *
    private constructor(CthisPtr: NativePointer) {
        super(CthisPtr, false);
    }

    static getInstance(): AbstractDungeon {
        if (this.instance === undefined) {
            this.instance = new AbstractDungeon(PatchHelper.STSGlobalVars.AbstractDungeonInstancePtr);
        }

        return this.instance;
    }

    get loading_post_combat() {
        return this.readOffsetBool(0x0);
    }
    set loading_post_combat(value) {
        this.writeOffsetBool(0x0, value);
    }

    get is_victory() {
        return this.readOffsetBool(0x1);
    }
    set is_victory(value) {
        this.writeOffsetBool(0x1, value);
    }

    get turnPhaseEffectActive() {
        return this.readOffsetBool(0x2);
    }
    set turnPhaseEffectActive(value) {
        this.writeOffsetBool(0x2, value);
    }

    get leftRoomAvailable() {
        return this.readOffsetBool(0x3);
    }
    set leftRoomAvailable(value) {
        this.writeOffsetBool(0x3, value);
    }

    get centerRoomAvailable() {
        return this.readOffsetBool(0x4);
    }
    set centerRoomAvailable(value) {
        this.writeOffsetBool(0x4, value);
    }

    get rightRoomAvailable() {
        return this.readOffsetBool(0x5);
    }
    set rightRoomAvailable(value) {
        this.writeOffsetBool(0x5, value);
    }

    get firstRoomChosen() {
        return this.readOffsetBool(0x6);
    }
    set firstRoomChosen(value) {
        this.writeOffsetBool(0x6, value);
    }

    get isScreenUp() {
        return this.readOffsetBool(0x7);
    }
    set isScreenUp(value) {
        this.writeOffsetBool(0x7, value);
    }

    get screenSwap() {
        return this.readOffsetBool(0x8);
    }
    set screenSwap(value) {
        this.writeOffsetBool(0x8, value);
    }

    get isDungeonBeaten() {
        return this.readOffsetBool(0x9);
    }
    set isDungeonBeaten(value) {
        this.writeOffsetBool(0x9, value);
    }

    get isFadingIn() {
        return this.readOffsetBool(0xA);
    }
    set isFadingIn(value) {
        this.writeOffsetBool(0xA, value);
    }

    get isFadingOut() {
        return this.readOffsetBool(0xB);
    }
    set isFadingOut(value) {
        this.writeOffsetBool(0xB, value);
    }

    get waitingOnFadeOut() {
        return this.readOffsetBool(0xC);
    }
    set waitingOnFadeOut(value) {
        this.writeOffsetBool(0xC, value);
    }

    get isAscensionMode() {
        return this.readOffsetBool(0xD);
    }
    set isAscensionMode(value) {
        this.writeOffsetBool(0xD, value);
    }

    get ascensionCheck() {
        return this.readOffsetBool(0xE);
    }
    set ascensionCheck(value) {
        this.writeOffsetBool(0xE, value);
    }

    get logger() {
        return this.readOffsetPointer(0x10);
    }

    get uiStrings() {
        return this.readOffsetPointer(0x14);
    }

    get TEXT() {
        return this.readOffsetPointer(0x18);
    }

    get name() {
        return new JString(this.readOffsetPointer(0x1C)).content;
    }
    set name(value) {
        this.writeOffsetJString(0x1C, JString.CreateJString(value));
    }

    get id() {
        return new JString(this.readOffsetPointer(0x20)).content;
    }
    set id(value) {
        this.writeOffsetJString(0x20, JString.CreateJString(value));
    }

    get floorNum() {
        return this.readOffsetS32(0x24);
    }
    set floorNum(value) {
        this.writeOffsetS32(0x24, value);
    }

    get actNum() {
        return this.readOffsetS32(0x28);
    }
    set actNum(value) {
        this.writeOffsetS32(0x28, value);
    }

    get player() {
        return new AbstractPlayer(this.readOffsetPointer(0x2C));
    }

    /** ArrayList\<AbstractUnlock\> */
    get unlocks() {
        return this.readOffsetPointer(0x30);
    }

    get shrineChance() {
        return this.readOffsetFloat(0x34);
    }
    set shrineChance(value) {
        this.writeOffsetFloat(0x34, value);
    }

    get cardUpgradedChance() {
        return this.readOffsetFloat(0x38);
    }
    set cardUpgradedChance(value) {
        this.writeOffsetFloat(0x38, value);
    }

    /** AbstractCard* */
    get transformedCard() {
        return this.readOffsetPointer(0x3C);
    }
    set transformedCard(value) {
        this.writeOffsetPointer(0x3C, value);
    }

    /** STS::Random* */
    get monsterRng() {
        return this.readOffsetPointer(0x40);
    }

    /** STS::Random* */
    get mapRng() {
        return this.readOffsetPointer(0x44);
    }

    /** STS::Random* */
    get eventRng() {
        return this.readOffsetPointer(0x48);
    }

    /** STS::Random* */
    get merchantRng() {
        return this.readOffsetPointer(0x4C);
    }

    /** STS::Random* */
    get cardRng() {
        return this.readOffsetPointer(0x50);
    }

    /** STS::Random* */
    get treasureRng() {
        return this.readOffsetPointer(0x54);
    }

    /** STS::Random* */
    get relicRng() {
        return this.readOffsetPointer(0x58);
    }

    /** STS::Random* */
    get potionRng() {
        return this.readOffsetPointer(0x5C);
    }

    /** STS::Random* */
    get monsterHpRng() {
        return this.readOffsetPointer(0x60);
    }

    /** STS::Random* */
    get aiRng() {
        return this.readOffsetPointer(0x64);
    }

    /** STS::Random* */
    get shuffleRng() {
        return this.readOffsetPointer(0x68);
    }

    /** STS::Random* */
    get cardRandomRng() {
        return this.readOffsetPointer(0x6C);
    }

    /** STS::Random* */
    get miscRng() {
        return this.readOffsetPointer(0x70);
    }

    /** CardGroup* */
    get srcColorlessCardPool() {
        return this.readOffsetPointer(0x74);
    }

    /** CardGroup* */
    get srcCurseCardPool() {
        return this.readOffsetPointer(0x78);
    }

    /** CardGroup* */
    get srcCommonCardPool() {
        return this.readOffsetPointer(0x7C);
    }

    /** CardGroup* */
    get srcUncommonCardPool() {
        return this.readOffsetPointer(0x80);
    }

    /** CardGroup* */
    get srcRareCardPool() {
        return this.readOffsetPointer(0x84);
    }

    /** CardGroup* */
    get colorlessCardPool() {
        return this.readOffsetPointer(0x88);
    }

    /** CardGroup* */
    get curseCardPool() {
        return this.readOffsetPointer(0x8C);
    }

    /** CardGroup* */
    get commonCardPool() {
        return this.readOffsetPointer(0x90);
    }

    /** CardGroup* */
    get uncommonCardPool() {
        return this.readOffsetPointer(0x94);
    }

    /** CardGroup* */
    get rareCardPool() {
        return this.readOffsetPointer(0x98);
    }

    /** ArrayList\<JString\> */
    get commonRelicPool() {
        return this.readOffsetPointer(0x9C);
    }

    /** ArrayList\<JString\> */
    get uncommonRelicPool() {
        return this.readOffsetPointer(0xA0);
    }

    /** ArrayList\<JString\> */
    get rareRelicPool() {
        return this.readOffsetPointer(0xA4);
    }

    /** ArrayList\<JString\> */
    get shopRelicPool() {
        return this.readOffsetPointer(0xA8);
    }

    /** ArrayList\<JString\> */
    get bossRelicPool() {
        return this.readOffsetPointer(0xAC);
    }

    get lastCombatMetricKey() {
        return this.readOffsetJString(0xB0).content;
    }

    /** ArrayList\<JString\> */
    get monsterList() {
        return this.readOffsetPointer(0xB4);
    }

    /** ArrayList\<JString\> */
    get eliteMonsterList() {
        return this.readOffsetPointer(0xB8);
    }

    /** ArrayList\<JString\> */
    get bossList() {
        return this.readOffsetPointer(0xBC);
    }

    get bossKey() {
        return this.readOffsetJString(0xC0).content;
    }

    /** ArrayList\<JString\> */
    get eventList() {
        return this.readOffsetPointer(0xC4);
    }

    /** ArrayList\<JString\> */
    get shrineList() {
        return this.readOffsetPointer(0xC8);
    }

    /** ArrayList\<JString\> */
    get specialOneTimeEventList() {
        return this.readOffsetPointer(0xCC);
    }

    get actionManager() {
        return this.readOffsetPointer(0xD0);
    }

    /** ArrayList\<AbstractGameEffect\> */
    get topLevelEffects() {
        return this.readOffsetPointer(0xD4);
    }

    /** ArrayList\<AbstractGameEffect\> */
    get topLevelEffectsQueue() {
        return this.readOffsetPointer(0xD8);
    }

    /** ArrayList\<AbstractGameEffect\> */
    get effectList() {
        return this.readOffsetPointer(0xDC);
    }

    /** ArrayList\<AbstractGameEffect\> */
    get effectsQueue() {
        return this.readOffsetPointer(0xE0);
    }

    get colorlessRareChance() {
        return this.readOffsetFloat(0xE4);
    }

    get shopRoomChance() {
        return this.readOffsetFloat(0xE8);
    }

    get restRoomChance() {
        return this.readOffsetFloat(0xEC);
    }

    get eventRoomChance() {
        return this.readOffsetFloat(0xF0);
    }

    get eliteRoomChance() {
        return this.readOffsetFloat(0xF4);
    }

    get treasureRoomChance() {
        return this.readOffsetFloat(0xF8);
    }

    get smallChestChance() {
        return this.readOffsetS32(0x100);
    }

    get mediumChestChance() {
        return this.readOffsetS32(0x104);
    }

    get commonRelicChance() {
        return this.readOffsetS32(0x108);
    }

    get uncommonRelicChance() {
        return this.readOffsetS32(0x10C);
    }

    get scene() {
        return this.readOffsetPointer(0x110);
    }

    get currMapNode() {
        return this.readOffsetPointer(0x114);
    }

    /** ArrayList\<ArrayList\<MapRoomNode\>\>* */
    get map() {
        return this.readOffsetPointer(0x118);
    }

    /** GridCardSelectScreen* */
    get gridSelectScreen() {
        return this.readOffsetPointer(0x164);
    }

    /** HandCardSelectScreen* */
    get handCardSelectScreen() {
        return this.readOffsetPointer(0x164);
    }

    get LOGGER() {
        return this.readOffsetPointer(0x1C8);
    }
}