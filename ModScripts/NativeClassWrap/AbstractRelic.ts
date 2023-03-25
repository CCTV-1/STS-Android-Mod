import { LandingSound, RelicTier } from "../enums.js";
import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeSTSLib } from "../NativeFuncWrap/NativeSTSLib.js";
import { NativeRelics } from "../NativeFuncWrap/NativeRelics.js";
import { JObjectArray } from "./JObjectArray.js";
import { ArrayList } from "./ArrayList.js";
import { PowerTip } from "./PowerTip.js";

/**
 * thisPtr will is ```nullptr```.
 */
export type STSRelicCtor = (thisPtr: NativePointer) => NativePointer;

export interface NewRelicVFuncType {
    getUpdatedDescription: (thisPtr: NativePointer) => NativePointer,
    onPlayCard?: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => void,
    onEquip?: (thisPtr: NativePointer) => void,
    atBattleStart?: (thisPtr: NativePointer) => void,
    atTurnStart?: (thisPtr: NativePointer) => void,
    onPlayerEndTurn?: (thisPtr: NativePointer) => void,
    onVictory?: (thisPtr: NativePointer) => void,
    onEnterRestRoom?: (thisPtr: NativePointer) => void,
    onShuffle?: (thisPtr: NativePointer) => void,
    makeCopy: (thisPtr: NativePointer) => NativePointer,
};

export class AbstractRelic extends NativeClassWrapper {
    //NativePointer AbstractRelic *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * new Relic id => (v func name => v func)
     */
    static #rewriteVFuncMap = new Map<string, NewRelicVFuncType>();

    static readonly #NewRelicVFuncProxys: NewRelicVFuncType = {
        getUpdatedDescription: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let relicVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (relicVFuncMap !== undefined) {
                const getUpdatedDescriptionFunc = relicVFuncMap.getUpdatedDescription;
                if (getUpdatedDescriptionFunc !== undefined) {
                    return getUpdatedDescriptionFunc(thisPtr);
                }
            }
            return NativeSTSLib.JString.Ctor("");
        },
        makeCopy: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (cardVFuncMap !== undefined) {
                const makeCopyFunc = cardVFuncMap.makeCopy;
                if (makeCopyFunc !== undefined) {
                    let copyObj = makeCopyFunc(thisPtr);
                    return copyObj;
                }
            }
            return PatchHelper.nullptr;
        },

        onPlayCard: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (cardVFuncMap !== undefined) {
                const onPlayCardFunc = cardVFuncMap.onPlayCard;
                if (onPlayCardFunc !== undefined) {
                    onPlayCardFunc(thisPtr, cardPtr, monsterPtr);
                }
            }
        },
        onEquip: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (cardVFuncMap !== undefined) {
                const onEquipFunc = cardVFuncMap.onEquip;
                if (onEquipFunc !== undefined) {
                    onEquipFunc(thisPtr);
                }
            }
        },
        atBattleStart: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (cardVFuncMap !== undefined) {
                const atBattleStartFunc = cardVFuncMap.atBattleStart;
                if (atBattleStartFunc !== undefined) {
                    atBattleStartFunc(thisPtr);
                }
            }
        },
        atTurnStart: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (cardVFuncMap !== undefined) {
                const atTurnStartFuc = cardVFuncMap.atTurnStart;
                if (atTurnStartFuc !== undefined) {
                    atTurnStartFuc(thisPtr);
                }
            }
        },
        onPlayerEndTurn: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (cardVFuncMap !== undefined) {
                const onPlayerEndTurnFuc = cardVFuncMap.onPlayerEndTurn;
                if (onPlayerEndTurnFuc !== undefined) {
                    onPlayerEndTurnFuc(thisPtr);
                }
            }
        },
        onVictory: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (cardVFuncMap !== undefined) {
                const onVictoryFuc = cardVFuncMap.onVictory;
                if (onVictoryFuc !== undefined) {
                    onVictoryFuc(thisPtr);
                }
            }
        },
        onEnterRestRoom: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (cardVFuncMap !== undefined) {
                const onEnterRestRoomFuc = cardVFuncMap.onEnterRestRoom;
                if (onEnterRestRoomFuc !== undefined) {
                    onEnterRestRoomFuc(thisPtr);
                }
            }
        },
        onShuffle: (thisPtr: NativePointer) => {
            let wrapRelic = new AbstractRelic(thisPtr);
            let cardVFuncMap = AbstractRelic.#rewriteVFuncMap.get(wrapRelic.relicId);
            if (cardVFuncMap !== undefined) {
                const onShuffleFuc = cardVFuncMap.onShuffle;
                if (onShuffleFuc !== undefined) {
                    onShuffleFuc(thisPtr);
                }
            }
        },
    };

    static readonly #vfunctionMap = {
        /**
         * ```c
         * STS::JString* getUpdatedDescription(STS::AbstractRelic* thisPtr)
         * ```
         */
        getUpdatedDescription: new NativeFunctionInfo(0x88, 'pointer', ['pointer']),
        //void AbstractRelic::onPlayCard(STS::AbstractRelic* this, STS::AbstractCard* cardPtr, STS::AbstractMonster * monsterPtr)
        onPlayCard: new NativeFunctionInfo(0xA8, 'void', ['pointer', 'pointer', 'pointer']),
        //void AbstractRelic::onPreviewObtainCard(STS::AbstractRelic* this, STS::AbstractCard* cardPtr)
        onPreviewObtainCard: new NativeFunctionInfo(0xB0, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onObtainCard(STS::AbstractRelic* this, STS::AbstractCard* cardPtr)
        onObtainCard: new NativeFunctionInfo(0xB8, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onGainGold(STS::AbstractRelic* this)
        onGainGold: new NativeFunctionInfo(0xC0, 'void', ['pointer']),
        //void AbstractRelic::onGainGold(STS::AbstractRelic* this)
        onLoseGold: new NativeFunctionInfo(0xC8, 'void', ['pointer']),
        //void AbstractRelic::onSpendGold(STS::AbstractRelic* this)
        onSpendGold: new NativeFunctionInfo(0xD0, 'void', ['pointer']),
        //void AbstractRelic::onEquip(STS::AbstractRelic* this)
        onEquip: new NativeFunctionInfo(0xD8, 'void', ['pointer']),
        //void AbstractRelic::onUnequip(STS::AbstractRelic* this)
        onUnequip: new NativeFunctionInfo(0xE0, 'void', ['pointer']),
        //void AbstractRelic::atPreBattle(STS::AbstractRelic* this)
        atPreBattle: new NativeFunctionInfo(0xE8, 'void', ['pointer']),
        //void AbstractRelic::atBattleStart(STS::AbstractRelic* this)
        atBattleStart: new NativeFunctionInfo(0xF0, 'void', ['pointer']),
        //void AbstractRelic::onSpawnMonster(STS::AbstractRelic* this, STS::AbstractMonster * monsterPtr)
        onSpawnMonster: new NativeFunctionInfo(0xF8, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::atBattleStartPreDraw(STS::AbstractRelic* this)
        atBattleStartPreDraw: new NativeFunctionInfo(0x100, 'void', ['pointer']),
        //void AbstractRelic::atTurnStart(STS::AbstractRelic* this)
        atTurnStart: new NativeFunctionInfo(0x108, 'void', ['pointer']),
        //void AbstractRelic::atTurnStartPostDraw(STS::AbstractRelic* this)
        atTurnStartPostDraw: new NativeFunctionInfo(0x110, 'void', ['pointer']),
        //void AbstractRelic::onPlayerEndTurn(STS::AbstractRelic* this)
        onPlayerEndTurn: new NativeFunctionInfo(0x118, 'void', ['pointer']),
        //void AbstractRelic::onBloodied(STS::AbstractRelic* this)
        onBloodied: new NativeFunctionInfo(0x120, 'void', ['pointer']),
        //void AbstractRelic::onNotBloodied(STS::AbstractRelic* this)
        onNotBloodied: new NativeFunctionInfo(0x128, 'void', ['pointer']),
        //void AbstractRelic::onManualDiscard(STS::AbstractRelic* this)
        onManualDiscard: new NativeFunctionInfo(0x130, 'void', ['pointer']),
        //void AbstractRelic::onManualDiscard(STS::AbstractRelic* this, STS::AbstractCard targetCard, STS::AbstractGameAction useCardAction)
        onUseCard: new NativeFunctionInfo(0x138, 'void', ['pointer', 'pointer', 'pointer']),
        //void AbstractRelic::onVictory(STS::AbstractRelic* this)
        onVictory: new NativeFunctionInfo(0x140, 'void', ['pointer']),
        //void AbstractRelic::onMonsterDeath(STS::AbstractRelic* this, STS::AbstractMonster * monsterPtr)
        onMonsterDeath: new NativeFunctionInfo(0x148, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onBlockBroken(STS::AbstractRelic* this, STS::AbstractCreature * monsterPtr)
        onBlockBroken: new NativeFunctionInfo(0x150, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onPlayerGainedBlock(STS::AbstractRelic* this, float blockAmount)
        //onPlayerGainedBlockFloat: new NativeFunctionInfo(0x158, 'void', ['pointer', 'float']),
        //void AbstractRelic::onPlayerGainedBlock(STS::AbstractRelic* this, int32_t blockAmount)
        onPlayerGainedBlock: new NativeFunctionInfo(0x160, 'void', ['pointer', 'int32']),
        //void AbstractRelic::onPlayerHeal(STS::AbstractRelic* this, int32_t healAmount)
        onPlayerHeal: new NativeFunctionInfo(0x168, 'void', ['pointer', 'int32']),
        //void AbstractRelic::onEnergyRecharge(STS::AbstractRelic* this)
        onEnergyRecharge: new NativeFunctionInfo(0x178, 'void', ['pointer']),
        //void AbstractRelic::onRest(STS::AbstractRelic* this)
        onRest: new NativeFunctionInfo(0x190, 'void', ['pointer']),
        //void AbstractRelic::onEnterRestRoom(STS::AbstractRelic* this)
        onEnterRestRoom: new NativeFunctionInfo(0x1A0, 'void', ['pointer']),
        //void AbstractRelic::onRefreshHand(STS::AbstractRelic* this)
        onRefreshHand: new NativeFunctionInfo(0x1A8, 'void', ['pointer']),
        //void AbstractRelic::onShuffle(STS::AbstractRelic* this)
        onShuffle: new NativeFunctionInfo(0x1B0, 'void', ['pointer']),
        //void AbstractRelic::onSmith(STS::AbstractRelic* this)
        onSmith: new NativeFunctionInfo(0x1B8, 'void', ['pointer']),
        //void AbstractRelic::onAttack(STS::AbstractRelic* this, STS::DamageInfo* info, int32_t damageAmount, STS::AbstractCreature* target)
        onAttack: new NativeFunctionInfo(0x1C0, 'void', ['pointer', 'pointer', 'int32', 'pointer']),
        //void AbstractRelic::onEnterRoom(STS::AbstractRelic* this, STS::AbstractRoom* room)
        onEnterRoom: new NativeFunctionInfo(0x200, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onCardDraw(STS::AbstractRelic* this, STS::AbstractCard* drawnCard)
        onCardDraw: new NativeFunctionInfo(0x210, 'void', ['pointer', 'pointer']),
        //void AbstractRelic::onDrawOrDiscard(STS::AbstractRelic* this)
        onDrawOrDiscard: new NativeFunctionInfo(0x228, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractRelic::flash(STS::AbstractRelic* this)
         * ```
         */
        flash: new NativeFunctionInfo(0x2B8, 'void', ['pointer']),
        //bool AbstractRelic::canPlay(STS::AbstractRelic* this, STS::AbstractCard* card)
        canPlay: new NativeFunctionInfo(0x2D0, 'bool', ['pointer', 'pointer']),
        /**
         * ```c
         * STS::AbstractRelic* AbstractRelic::canPlay(STS::AbstractRelic* this)
         * ```
         */
        makeCopy: new NativeFunctionInfo(0x2E8, 'pointer', ['pointer']),
        //void AbstractRelic::onUsePotion(STS::AbstractRelic* this)
        onUsePotion: new NativeFunctionInfo(0x308, 'void', ['pointer']),
        //void AbstractRelic::onLoseHp(STS::AbstractRelic* this, int damageAmount)
        onLoseHp: new NativeFunctionInfo(0x318, 'void', ['pointer', 'int32']),
        /**
         * ```c
         *  void AbstractRelic::addToTop(STS::AbstractRelic* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToBot: new NativeFunctionInfo(0x328, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractRelic::addToTop(STS::AbstractRelic* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0x330, 'void', ['pointer', 'pointer']),
    };

    static readonly #vFuncNamePrefix = "AbstractRelic_";

    static NewRelicCtor(relicId: string, relicName: string, description: string, flavorText: string, imgName: string, tier: RelicTier, sfx: LandingSound, newVFuncs: NewRelicVFuncType): NativePointer {
        let origRelicPtr = NativeRelics.AbstractRelic.Ctor("Black Blood", imgName, tier, sfx);

        let wrapRelic = new AbstractRelic(origRelicPtr);
        if (!AbstractRelic.#rewriteVFuncMap.has(relicId)) {
            AbstractRelic.#rewriteVFuncMap.set(relicId, newVFuncs);
        }

        wrapRelic.relicId = relicId;
        wrapRelic.name = relicName;
        wrapRelic.description = description;
        wrapRelic.flavorText = flavorText;

        let wrapTips = new ArrayList(wrapRelic.tips);
        let wrapTip = new PowerTip(NativeSTSLib.PowerTip.get(wrapTips, 0));
        wrapTip.header = relicName;
        wrapTip.body = description;

        if (!AbstractRelic.#rewriteVFuncMap.has("AbstractRelicProxy")) {
            let funcName = "AbstractRelic_BasicNewRelic_getUpdatedDescription";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), AbstractRelic.#vfunctionMap.getUpdatedDescription, AbstractRelic.#NewRelicVFuncProxys.getUpdatedDescription);
            funcName = "AbstractRelic_BasicNewRelic_makeCopy";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), AbstractRelic.#vfunctionMap.makeCopy, AbstractRelic.#NewRelicVFuncProxys.makeCopy);
            funcName = "AbstractRelic_BasicNewRelic_onPlayCard";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), AbstractRelic.#vfunctionMap.onPlayCard, AbstractRelic.#NewRelicVFuncProxys.onPlayCard);
            funcName = "AbstractRelic_BasicNewRelic_onEquip";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onEquip, AbstractRelic.#NewRelicVFuncProxys.onEquip);
            funcName = "AbstractRelic_BasicNewRelic_atBattleStart";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.atBattleStart, AbstractRelic.#NewRelicVFuncProxys.atBattleStart);
            funcName = "AbstractRelic_BasicNewRelic_atTurnStart";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.atTurnStart, AbstractRelic.#NewRelicVFuncProxys.atTurnStart);
            funcName = "AbstractRelic_BasicNewRelic_onPlayerEndTurn";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onPlayerEndTurn, AbstractRelic.#NewRelicVFuncProxys.onPlayerEndTurn);
            funcName = "AbstractRelic_BasicNewRelic_onVictory";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onVictory, AbstractRelic.#NewRelicVFuncProxys.onVictory);
            funcName = "AbstractRelic_BasicNewRelic_onEnterRestRoom";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onEnterRestRoom, AbstractRelic.#NewRelicVFuncProxys.onEnterRestRoom);
            funcName = "AbstractRelic_BasicNewRelic_onShuffle";
            wrapRelic.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onShuffle, AbstractRelic.#NewRelicVFuncProxys.onShuffle);
            AbstractRelic.#rewriteVFuncMap.set("AbstractRelicProxy", AbstractRelic.#NewRelicVFuncProxys);
        }

        return origRelicPtr;
    }

    getUpdatedDescription(): JString {
        return new JString(this.getVirtualFunction(AbstractRelic.#vfunctionMap.getUpdatedDescription)(this.rawPtr));
    }
    OverridegetUpdatedDescription(newVFunc: (thisPtr: NativePointer) => NativePointer) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_getUpdatedDescription").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.P_P_Func(funcName), AbstractRelic.#vfunctionMap.getUpdatedDescription, newVFunc);
    }

    OverrideonPlayCard(newVFunc: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onPlayCard").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_PPP_Func(funcName), AbstractRelic.#vfunctionMap.onPlayCard, newVFunc);
    }

    OverrideonEquip(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onEquip").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onEquip, newVFunc);
    }

    OverrideatBattleStart(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_atBattleStart").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.atBattleStart, newVFunc);
    }

    OverrideatTurnStart(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_atTurnStart").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.atTurnStart, newVFunc);
    }

    OverrideonPlayerEndTurn(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onPlayerEndTurn").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onPlayerEndTurn, newVFunc);
    }

    OverrideonVictory(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onVictory").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onVictory, newVFunc);
    }

    OverrideonEnterRestRoom(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onEnterRestRoom").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onEnterRestRoom, newVFunc);
    }

    OverrideonShuffle(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractRelic.#vFuncNamePrefix + this.relicId + "_onShuffle").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchHelper.fakeCodeGen.V_P_Func(funcName), AbstractRelic.#vfunctionMap.onShuffle, newVFunc);
    }

    flash(): void {
        this.getVirtualFunction(AbstractRelic.#vfunctionMap.flash)(this.rawPtr);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractRelic.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractRelic.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    get name() {
        return this.readOffsetJString(0x8).content;
    }
    set name(value) {
        this.writeOffsetJString(0x8, JString.CreateJString(value));
    }

    get relicId() {
        return this.readOffsetJString(0xC).content;
    }
    set relicId(value) {
        this.writeOffsetJString(0xC, JString.CreateJString(value));
    }

    /**
     * the Object type is JString
     */
    get DESCRIPTIONS() {
        return new JObjectArray(this.readOffsetPointer(0x14));
    }

    get energyBased() {
        return this.readOffsetBool(0x18);
    }
    set energyBased(value) {
        this.writeOffsetBool(0x18, value);
    }

    get usedUp() {
        return this.readOffsetBool(0x19);
    }
    set usedUp(value) {
        this.writeOffsetBool(0x19, value);
    }

    get grayscale() {
        return this.readOffsetBool(0x1A);
    }
    set grayscale(value) {
        this.writeOffsetBool(0x1A, value);
    }

    get description() {
        return this.readOffsetJString(0x1C).content;
    }
    set description(value) {
        this.writeOffsetJString(0x1C, JString.CreateJString(value));
    }

    get flavorText() {
        return this.readOffsetJString(0x20).content;
    }
    set flavorText(value) {
        this.writeOffsetJString(0x20, JString.CreateJString(value));
    }

    get cost() {
        return this.readOffsetS32(0x24);
    }
    set cost(value) {
        this.writeOffsetS32(0x24, value);
    }

    get counter() {
        return this.readOffsetS32(0x28);
    }
    set counter(value) {
        this.writeOffsetS32(0x28, value);
    }

    get tier(): RelicTier {
        return this.readOffsetU32(0x2C);
    }
    set tier(value) {
        this.writeOffsetU32(0x2C, value);
    }

    /**
     * the element type is ArrayList\<PowerTip\>
     */
    get tips() {
        return this.readOffsetPointer(0x30);
    }
    set tips(tipsPtr: NativePointer) {
        this.writeOffsetPointer(0x30, tipsPtr);
    }
}