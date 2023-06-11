import { PatchHelper } from "../PatchHelper.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export class Settings extends NativeClassWrapper {
    private static instance: Settings | undefined = undefined;

    //NativePointer Settings *
    private constructor(CthisPtr: NativePointer) {
        super(CthisPtr, false);
    }

    static getInstance(): Settings {
        if (this.instance === undefined) {
            this.instance = new Settings(PatchHelper.STSGlobalVars.SettingsPtr);
        }

        return this.instance;
    }

    get isDev() {
        return this.readOffsetBool(0x0);
    }
    set isDev(value) {
        this.writeOffsetBool(0x0, value);
    }

    get isBeta() {
        return this.readOffsetBool(0x1);
    }
    set isBeta(value) {
        this.writeOffsetBool(0x1, value);
    }

    get isModded() {
        return this.readOffsetBool(0x2);
    }
    set isModded(value) {
        this.writeOffsetBool(0x2, value);
    }

    get isAlpha() {
        return this.readOffsetBool(0x3);
    }
    set isAlpha(value) {
        this.writeOffsetBool(0x3, value);
    }

    get isControllerMode() {
        return this.readOffsetBool(0x4);
    }
    set isControllerMode(value) {
        this.writeOffsetBool(0x4, value);
    }

    get isTouchScreen() {
        return this.readOffsetBool(0x5);
    }
    set isTouchScreen(value) {
        this.writeOffsetBool(0x5, value);
    }

    get isConsoleBuild() {
        return this.readOffsetBool(0x6);
    }
    set isConsoleBuild(value) {
        this.writeOffsetBool(0x6, value);
    }
    
    get isMobile() {
        return this.readOffsetBool(0x7);
    }
    set isMobile(value) {
        this.writeOffsetBool(0x7, value);
    }

    get usesProfileSaves() {
        return this.readOffsetBool(0x8);
    }

    get testFonts() {
        return this.readOffsetBool(0x9);
    }

    get isDebug() {
        return this.readOffsetBool(0xA);
    }

    get isInfo() {
        return this.readOffsetBool(0xB);
    }

    get isTestingNeow() {
        return this.readOffsetBool(0xC);
    }

    get usesTrophies() {
        return this.readOffsetBool(0xD);
    }

    get isDemo() {
        return this.readOffsetBool(0xE);
    }

    get isShowBuild() {
        return this.readOffsetBool(0xF);
    }

    get isPublisherBuild() {
        return this.readOffsetBool(0x10);
    }

    get lineBreakViaCharacter() {
        return this.readOffsetBool(0x11);
    }

    get usesOrdinal() {
        return this.readOffsetBool(0x12);
    }

    get leftAlignCards() {
        return this.readOffsetBool(0x13);
    }

    get manualLineBreak() {
        return this.readOffsetBool(0x14);
    }

    get removeAtoZSort() {
        return this.readOffsetBool(0x15);
    }

    get manualAndAutoLineBreak() {
        return this.readOffsetBool(0x16);
    }

    get isDailyRun() {
        return this.readOffsetBool(0x17);
    }

    get isFinalActAvailable() {
        return this.readOffsetBool(0x18);
    }

    get isTrial() {
        return this.readOffsetBool(0x19);
    }

    get IS_FULLSCREEN() {
        return this.readOffsetBool(0x1A);
    }

    get IS_W_FULLSCREEN() {
        return this.readOffsetBool(0x1B);
    }

    get IS_V_SYNC() {
        return this.readOffsetBool(0x1C);
    }

    get isSixteenByTen() {
        return this.readOffsetBool(0x1D);
    }

    get isFourByThree() {
        return this.readOffsetBool(0x1E);
    }

    get isLetterbox() {
        return this.readOffsetBool(0x1F);
    }

    get isTwoSixteen() {
        return this.readOffsetBool(0x20);
    }

    get seedSet() {
        return this.readOffsetBool(0x21);
    }

    get isBackgrounded() {
        return this.readOffsetBool(0x22);
    }

    get AMBIANCE_ON() {
        return this.readOffsetBool(0x23);
    }

    get SHOW_DMG_SUM() {
        return this.readOffsetBool(0x24);
    }

    get SHOW_DMG_BLOCK() {
        return this.readOffsetBool(0x25);
    }

    get FAST_HAND_CONF() {
        return this.readOffsetBool(0x26);
    }

    get FAST_MODE() {
        return this.readOffsetBool(0x27);
    }

    get CONTROLLER_ENABLED() {
        return this.readOffsetBool(0x28);
    }

    get TOUCHSCREEN_ENABLED() {
        return this.readOffsetBool(0x29);
    }

    get DISABLE_EFFECTS() {
        return this.readOffsetBool(0x2A);
    }

    get UPLOAD_DATA() {
        return this.readOffsetBool(0x2B);
    }

    get SCREEN_SHAKE() {
        return this.readOffsetBool(0x2C);
    }

    get PLAYTESTER_ART_MODE() {
        return this.readOffsetBool(0x2D);
    }

    get SHOW_CARD_HOTKEYS() {
        return this.readOffsetBool(0x2E);
    }

    get USE_LONG_PRESS() {
        return this.readOffsetBool(0x2F);
    }

    get BIG_TEXT_MODE() {
        return this.readOffsetBool(0x30);
    }

    get hideTopBar() {
        return this.readOffsetBool(0x31);
    }

    get hidePopupDetails() {
        return this.readOffsetBool(0x32);
    }

    get hideRelics() {
        return this.readOffsetBool(0x33);
    }

    get hideLowerElements() {
        return this.readOffsetBool(0x34);
    }

    get hideCards() {
        return this.readOffsetBool(0x35);
    }

    get hideEndTurn() {
        return this.readOffsetBool(0x36);
    }

    get hideCombatElements() {
        return this.readOffsetBool(0x37);
    }

    get logger() {
        return this.readOffsetPointer(0x38);
    }

    /** GameLanguage* */
    get language() {
        return this.readOffsetPointer(0x3C);
    }

    /** Prefs* */
    get soundPref() {
        return this.readOffsetPointer(0x40);
    }

    /** Prefs* */
    get dailyPref() {
        return this.readOffsetPointer(0x44);
    }

    /** Prefs* */
    get gamePref() {
        return this.readOffsetPointer(0x48);
    }

    get MAX_FPS() {
        return this.readOffsetS32(0x4C);
    }

    get M_W() {
        return this.readOffsetS32(0x50);
    }

    get M_H() {
        return this.readOffsetS32(0x54);
    }

    get SAVED_WIDTH() {
        return this.readOffsetS32(0x58);
    }

    get SAVED_HEIGHT() {
        return this.readOffsetS32(0x5C);
    }

    get WIDTH() {
        return this.readOffsetS32(0x60);
    }

    get HEIGHT() {
        return this.readOffsetS32(0x64);
    }

    get HORIZ_LETTERBOX_AMT() {
        return this.readOffsetS32(0x68);
    }

    get VERT_LETTERBOX_AMT() {
        return this.readOffsetS32(0x6C);
    }

    /** ArrayList\<DisplayOption\>* */
    get displayOptions() {
        return this.readOffsetPointer(0x70);
    }

    get displayIndex() {
        return this.readOffsetS32(0x74);
    }

    get scale() {
        return this.readOffsetFloat(0x78);
    }

    get renderScale() {
        return this.readOffsetFloat(0x80);
    }

    get xScale() {
        return this.readOffsetFloat(0x84);
    }

    get yScale() {
        return this.readOffsetFloat(0x88);
    }

    get FOUR_BY_THREE_OFFSET_Y() {
        return this.readOffsetFloat(0x8C);
    }

    get LETTERBOX_OFFSET_Y() {
        return this.readOffsetFloat(0x90);
    }

    get bgVolume() {
        return this.readOffsetFloat(0x94);
    }

    get MASTER_VOLUME_PREF() {
        return this.readOffsetJString(0x98);
    }

    get MUSIC_VOLUME_PREF() {
        return this.readOffsetJString(0x9C);
    }

    get SOUND_VOLUME_PREF() {
        return this.readOffsetJString(0xA0);
    }

    get AMBIENCE_ON_PREF() {
        return this.readOffsetJString(0xA4);
    }

    get MUTE_IF_BG_PREF() {
        return this.readOffsetJString(0xA8);
    }

    get SCREEN_SHAKE_PREF() {
        return this.readOffsetJString(0xAC);
    }

    get SUM_DMG_PREF() {
        return this.readOffsetJString(0xB0);
    }

    get BLOCKED_DMG_PREF() {
        return this.readOffsetJString(0xB4);
    }

    get HAND_CONF_PREF() {
        return this.readOffsetJString(0xB8);
    }

    get EFFECTS_PREF() {
        return this.readOffsetJString(0xBC);
    }

    get FAST_MODE_PREF() {
        return this.readOffsetJString(0xC0);
    }

    get UPLOAD_PREF() {
        return this.readOffsetJString(0xC4);
    }

    get PLAYTESTER_ART() {
        return this.readOffsetJString(0xC8);
    }

    get SHOW_CARD_HOTKEYS_PREF() {
        return this.readOffsetJString(0xCC);
    }

    get BIG_TEXT_PREF() {
        return this.readOffsetJString(0xD0);
    }

    get LONG_PRESS_PREF() {
        return this.readOffsetJString(0xD4);
    }

    get CONTROLLER_ENABLED_PREF() {
        return this.readOffsetJString(0xD8);
    }

    get TOUCHSCREEN_ENABLED_PREF() {
        return this.readOffsetJString(0xDC);
    }

    get LAST_DAILY() {
        return this.readOffsetJString(0xE0);
    }

    get XB1_RATIO() {
        return this.readOffsetFloat(0xE4);
    }

    /** GDX::Color* */
    get CREAM_COLOR() {
        return this.readOffsetPointer(0xE8);
    }

    /** GDX::Color* */
    get LIGHT_YELLOW_COLOR() {
        return this.readOffsetPointer(0xEC);
    }

    /** GDX::Color* */
    get RED_TEXT_COLOR() {
        return this.readOffsetPointer(0xF0);
    }

    /** GDX::Color* */
    get GREEN_TEXT_COLOR() {
        return this.readOffsetPointer(0xF4);
    }

    /** GDX::Color* */
    get BLUE_TEXT_COLOR() {
        return this.readOffsetPointer(0xF8);
    }

    /** GDX::Color* */
    get GOLD_COLOR() {
        return this.readOffsetPointer(0x100);
    }

    /** GDX::Color* */
    get PURPLE_COLOR() {
        return this.readOffsetPointer(0x104);
    }

    /** GDX::Color* */
    get TOP_PANEL_SHADOW_COLOR() {
        return this.readOffsetPointer(0x108);
    }

    /** GDX::Color* */
    get HALF_TRANSPARENT_WHITE_COLOR() {
        return this.readOffsetPointer(0x10C);
    }

    /** GDX::Color* */
    get QUARTER_TRANSPARENT_WHITE_COLOR() {
        return this.readOffsetPointer(0x110);
    }

    /** GDX::Color* */
    get TWO_THIRDS_TRANSPARENT_BLACK_COLOR() {
        return this.readOffsetPointer(0x114);
    }

    /** GDX::Color* */
    get HALF_TRANSPARENT_BLACK_COLOR() {
        return this.readOffsetPointer(0x118);
    }

    /** GDX::Color* */
    get QUARTER_TRANSPARENT_BLACK_COLOR() {
        return this.readOffsetPointer(0x11C);
    }

    /** GDX::Color* */
    get RED_RELIC_COLOR() {
        return this.readOffsetPointer(0x120);
    }

    /** GDX::Color* */
    get GREEN_RELIC_COLOR() {
        return this.readOffsetPointer(0x124);
    }

    /** GDX::Color* */
    get BLUE_RELIC_COLOR() {
        return this.readOffsetPointer(0x128);
    }

    /** GDX::Color* */
    get PURPLE_RELIC_COLOR() {
        return this.readOffsetPointer(0x12C);
    }

    get ACTION_DUR_XFAST() {
        return this.readOffsetFloat(0x130);
    }

    get ACTION_DUR_FASTER() {
        return this.readOffsetFloat(0x134);
    }

    get ACTION_DUR_FAST() {
        return this.readOffsetFloat(0x138);
    }

    get ACTION_DUR_MED() {
        return this.readOffsetFloat(0x13C);
    }

    get ACTION_DUR_LONG() {
        return this.readOffsetFloat(0x140);
    }

    get ACTION_DUR_XLONG() {
        return this.readOffsetFloat(0x144);
    }

    get CARD_DROP_END_Y() {
        return this.readOffsetFloat(0x148);
    }

    get SCROLL_SPEED() {
        return this.readOffsetFloat(0x14C);
    }

    get MAP_SCROLL_SPEED() {
        return this.readOffsetFloat(0x150);
    }

    get DEFAULT_SCROLL_LIMIT() {
        return this.readOffsetFloat(0x154);
    }

    get MAP_DST_Y() {
        return this.readOffsetFloat(0x158);
    }

    get CLICK_DIST_THRESHOLD() {
        return this.readOffsetFloat(0x15C);
    }

    get POTION_W() {
        return this.readOffsetFloat(0x160);
    }

    get POTION_Y() {
        return this.readOffsetFloat(0x164);
    }

    /** GDX::Color* */
    get BLACK_SCREEN_OVERLAY_COLOR() {
        return this.readOffsetPointer(0x168);
    }

    /** GDX::Color* */
    get GLOW_COLOR() {
        return this.readOffsetPointer(0x16C);
    }

    /** GDX::Color* */
    get DISCARD_COLOR() {
        return this.readOffsetPointer(0x170);
    }

    /** GDX::Color* */
    get DISCARD_GLOW_COLOR() {
        return this.readOffsetPointer(0x174);
    }

    /** GDX::Color* */
    get SHADOW_COLOR() {
        return this.readOffsetPointer(0x178);
    }

    get CARD_SNAP_THRESHOLD() {
        return this.readOffsetFloat(0x180);
    }

    get UI_SNAP_THRESHOLD() {
        return this.readOffsetFloat(0x184);
    }

    get HOVER_BUTTON_RISE_AMOUNT() {
        return this.readOffsetFloat(0x188);
    }

    get CARD_VIEW_PAD_X() {
        return this.readOffsetFloat(0x18C);
    }

    get CARD_VIEW_PAD_Y() {
        return this.readOffsetFloat(0x190);
    }

    get OPTION_Y() {
        return this.readOffsetFloat(0x194);
    }

    get EVENT_Y() {
        return this.readOffsetFloat(0x198);
    }

    get SENDTODEVS() {
        return this.readOffsetJString(0x19C);
    }

    get dailyDate() {
        return this.readOffsetS64(0x1A0);
    }
}