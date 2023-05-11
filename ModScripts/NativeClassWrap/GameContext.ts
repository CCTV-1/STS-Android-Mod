import { PatchHelper } from "../PatchHelper.js";
import { GameMode, PlayerClass } from "../enums.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class GameContext extends NativeClassWrapper {
    private static instance: GameContext | undefined = undefined;

    //NativePointer GameContext *
    private constructor(CthisPtr: NativePointer) {
        super(CthisPtr, false);
    }

    static getInstance(): GameContext {
        if (this.instance === undefined) {
            this.instance = new GameContext(PatchHelper.STSGlobalVars.GameContextPtr);
        }

        return this.instance;
    }

    get isPopupOpen() {
        return this.readOffsetBool(0x0);
    }

    get startOver_Renamed() {
        return this.readOffsetBool(0x1);
    }

    get queueCredits() {
        return this.readOffsetBool(0x2);
    }

    get playCreditsBgm() {
        return this.readOffsetBool(0x3);
    }

    get MUTE_IF_BG() {
        return this.readOffsetBool(0x4);
    }

    get loadingSave() {
        return this.readOffsetBool(0x5);
    }

    get overkill() {
        return this.readOffsetBool(0x6);
    }

    get combo() {
        return this.readOffsetBool(0x7);
    }

    get cheater() {
        return this.readOffsetBool(0x8);
    }

    get stopClock() {
        return this.readOffsetBool(0x9);
    }

    get fadeIn_Renamed() {
        return this.readOffsetBool(0xA);
    }

    get displayVersion() {
        return this.readOffsetBool(0xB);
    }

    get needInitalSync() {
        return this.readOffsetBool(0xC);
    }

    get init() {
        return this.readOffsetBool(0xD);
    }

    get VERSION_NUM() {
        return this.readOffsetJString(0x10);
    }

    get TRUE_VERSION_NUM() {
        return this.readOffsetJString(0x14);
    }

    /** FitViewport* */
    get viewport() {
        return this.readOffsetPointer(0x18);
    }

    /** PolygonSpriteBatch* */
    get psb() {
        return this.readOffsetPointer(0x1C);
    }

    /** GameCursor* */
    get cursor() {
        return this.readOffsetPointer(0x20);
    }

    get popupMX() {
        return this.readOffsetS32(0x24);
    }

    get popupMY() {
        return this.readOffsetS32(0x28);
    }

    /** ScreenShake* */
    get screenShake() {
        return this.readOffsetPointer(0x2C);
    }

    /** AbstractDungeon* */
    get dungeon() {
        return this.readOffsetPointer(0x30);
    }

    /** MainMenuScreen* */
    get mainMenuScreen() {
        return this.readOffsetPointer(0x34);
    }
    
    /** SplashScreen* */
    get splashScreen() {
        return this.readOffsetPointer(0x38);
    }

    /** DungeonTransitionScreen* */    
    get dungeonTransitionScreen() {
        return this.readOffsetPointer(0x3C);
    }

    /** CancelButton* */
    get cancelButton() {
        return this.readOffsetPointer(0x40);
    }

    /** MusicMaster* */
    get music() {
        return this.readOffsetPointer(0x44);
    }

    /** SoundMaster* */
    get sound() {
        return this.readOffsetPointer(0x48);
    }

    /** GameTips* */
    get tips() {
        return this.readOffsetPointer(0x4C);
    }

    /** SingleCardViewPopup* */
    get cardPopup() {
        return this.readOffsetPointer(0x50);
    }

    /** SingleRelicViewPopup* */
    get relicPopup() {
        return this.readOffsetPointer(0x54);
    }

    get nextDungeon() {
        return this.readOffsetJString(0x58);
    }

    get mode(): GameMode {
        return this.readOffsetU32(0x5C);
    }

    get chosenCharacter(): PlayerClass {
        return this.readOffsetU32(0x60);
    }

    /** SaveFile* */
    get saveFile() {
        return this.readOffsetPointer(0x64);
    }

    /** Prefs* */
    get saveSlotPref() {
        return this.readOffsetPointer(0x68);
    }

    /** Prefs* */
    get playerPref() {
        return this.readOffsetPointer(0x6C);
    }

    /** Prefs* */
    get globalPrefs() {
        return this.readOffsetPointer(0x70);
    }

    get saveSlot() {
        return this.readOffsetS32(0x74);
    }

    get playerName() {
        return this.readOffsetJString(0x78);
    }

    get alias() {
        return this.readOffsetJString(0x7C);
    }

    /** CharacterManager* */
    get characterManager() {
        return this.readOffsetPointer(0x80);
    }

    get monstersSlain() {
        return this.readOffsetS32(0x84);
    }

    get elites1Slain() {
        return this.readOffsetS32(0x88);
    }

    get elites2Slain() {
        return this.readOffsetS32(0x8C);
    }

    get elites3Slain() {
        return this.readOffsetS32(0x90);
    }

    get elitesModdedSlain() {
        return this.readOffsetS32(0x94);
    }

    get champion() {
        return this.readOffsetS32(0x98);
    }

    get perfect() {
        return this.readOffsetS32(0x9C);
    }

    get goldGained() {
        return this.readOffsetS32(0xA0);
    }

    get cardsPurged() {
        return this.readOffsetS32(0xA4);
    }

    get potionsBought() {
        return this.readOffsetS32(0xA8);
    }

    get mysteryMachine() {
        return this.readOffsetS32(0xAC);
    }

    get playtime() {
        return this.readOffsetFloat(0xB0);
    }

    /** AbstractTrial* */
    get trial() {
        return this.readOffsetPointer(0xB4);
    }

    /** GDX::Color* */
    get screenColor() {
        return this.readOffsetPointer(0xB8);
    }

    get screenTimer() {
        return this.readOffsetFloat(0xBC);
    }

    get screenTime() {
        return this.readOffsetFloat(0xC0);
    }

    /** MetricData* */
    get metricData() {
        return this.readOffsetPointer(0xC4);
    }

    /** PublisherIntegration* */
    get publisherIntegration() {
        return this.readOffsetPointer(0xC8);
    }

    /** LocalizedStrings* */
    get languagePack() {
        return this.readOffsetPointer(0xCC);
    }

    get preferenceDir() {
        return this.readOffsetJString(0xD0);
    }

    /** Logger* */
    get logger() {
        return this.readOffsetPointer(0xD4);
    }

    get syncMessage() {
        return this.readOffsetJString(0xD8);
    }
}