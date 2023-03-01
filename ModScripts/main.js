'use strict';

class NativeClassWrapper {
    #rawPtr = null;
    //NativePointer AbstractCreature *
    constructor(CthisPtr) {
        if (!(CthisPtr instanceof NativePointer)) {
            throw "need a NativePointer";
        }
        this.#rawPtr = CthisPtr;
    }

    BaseClassPtr() {
        return this.#rawPtr.readPointer();
    }

    readOffsetPointer(offset) {
        return this.#rawPtr.add(offset).readPointer();
    }
    writeOffsetPointer(offset, value) {
        return this.#rawPtr.add(offset).writePointer(value);
    }

    readOffsetU8(offset) {
        return this.#rawPtr.add(offset).readU8();
    }

    writeOffsetU8(offset, value) {
        this.#rawPtr.add(offset).writeU8(value);
    }

    readOffsetU32(offset) {
        return this.#rawPtr.add(offset).readU32();
    }

    writeOffsetU32(offset, value) {
        this.#rawPtr.add(offset).writeU32(value);
    }

    readOffsetS32(offset) {
        return this.#rawPtr.add(offset).readS32();
    }

    writeOffsetS32(offset, value) {
        this.#rawPtr.add(offset).writeS32(value);
    }

    readOffsetFloat(offset) {
        return this.#rawPtr.add(offset).readFloat();
    }

    writeOffsetFloat(offset, value) {
        this.#rawPtr.add(offset).writeFloat(value);
    }

    readOffsetUtf16String(offset) {
        return this.#rawPtr.add(offset).readUtf16String();
    }

    writeOffsetUtf16String(offset, value) {
        this.#rawPtr.add(offset).writeUtf16String(value);
    }
}

//struct ../STSHeads/STSTypes.h  AbstractCard
//only work in ARMV7a(point type size is 4*sizeof(char))

class AbstractCard extends NativeClassWrapper {
    //NativePointer AbstractCard *
    constructor(CthisPtr) {
        super(CthisPtr);
    }

    get BaseClassPtr() {
        return super.BaseClassPtr();
    }

    get type() {
        return this.readOffsetU32(0x8);
    }
    set type(value) {
        writeOffsetU32(0x8, value);
    }

    get cost() {
        return this.readOffsetS32(0xc);
    }
    set cost(value) {
        this.writeOffsetS32(0xc, value);
    }

    get costForTurn() {
        return this.readOffsetS32(0x10);
    }
    set costForTurn(value) {
        this.writeOffsetS32(0x10, value);
    }

    get price() {
        return this.readOffsetS32(0x14);
    }
    set price(value) {
        this.writeOffsetS32(0x14, value);
    }

    get chargeCost() {
        return this.readOffsetS32(0x18);
    }
    set chargeCost(value) {
        this.writeOffsetS32(0x18, value);
    }

    get isCostModified() {
        return this.readOffsetU8(0x1c);
    }
    set isCostModified(value) {
        this.writeOffsetU8(0x1c, value);
    }

    get isCostModifiedForTurn() {
        return this.readOffsetU8(0x1d);
    }
    set isCostModifiedForTurn(value) {
        this.writeOffsetU8(0x1d, value);
    }

    get retain() {
        return this.readOffsetU8(0x1e);
    }
    set retain(value) {
        this.writeOffsetU8(0x1e, value);
    }

    get selfRetain() {
        return this.readOffsetU8(0x1f);
    }
    set selfRetain(value) {
        this.writeOffsetU8(0x1f, value);
    }

    get dontTriggerOnUseCard() {
        return this.readOffsetU8(0x20);
    }
    set dontTriggerOnUseCard(value) {
        this.writeOffsetU8(0x20, value);
    }

    get rarity() {
        return this.readOffsetU32(0x24);
    }
    set rarity(value) {
        this.writeOffsetU32(0x24, value);
    }

    get color() {
        return this.readOffsetU32(0x28);
    }
    set color(value) {
        this.writeOffsetU32(0x28, value);
    }

    get isInnate() {
        return this.readOffsetU8(0x2c);
    }
    set isInnate(value) {
        this.writeOffsetU8(0x2c, value);
    }

    get isLocked() {
        return this.readOffsetU8(0x2d);
    }
    set isLocked(value) {
        this.writeOffsetU8(0x2d, value);
    }

    get showEvokeValue() {
        return this.readOffsetU8(0x2e);
    }
    set showEvokeValue(value) {
        this.writeOffsetU8(0x2e, value);
    }

    get showEvokeOrbCount() {
        return this.readOffsetS32(0x30);
    }
    set showEvokeOrbCount(value) {
        this.writeOffsetS32(0x30, value);
    }

    get isUsed() {
        return this.readOffsetU8(0x38);
    }
    set isUsed(value) {
        this.writeOffsetU8(0x38, value);
    }

    get upgraded() {
        return this.readOffsetU8(0x39);
    }
    set upgraded(value) {
        this.writeOffsetU8(0x39, value);
    }

    get timesUpgraded() {
        return this.readOffsetS32(0x3c);
    }
    set timesUpgraded(value) {
        this.writeOffsetS32(0x3c, value);
    }

    get misc() {
        return this.readOffsetS32(0x40);
    }
    set misc(value) {
        this.writeOffsetS32(0x40, value);
    }

    get energyOnUse() {
        return this.readOffsetS32(0x44);
    }
    set energyOnUse(value) {
        this.writeOffsetS32(0x44, value);
    }

    get ignoreEnergyOnUse() {
        return this.readOffsetU32(0x48);
    }
    set ignoreEnergyOnUse(value) {
        this.writeOffsetU8(0x48, value);
    }

    get isSeen() {
        return this.readOffsetU8(0x49);
    }
    set isSeen(value) {
        this.writeOffsetU8(0x49, value);
    }

    get upgradedCost() {
        return this.readOffsetU8(0x4a);
    }
    set upgradedCost(value) {
        this.writeOffsetU8(0x4a, value);
    }

    get upgradedDamage() {
        return this.readOffsetU8(0x4b);
    }
    set upgradedDamage(value) {
        this.writeOffsetU8(0x4b, value);
    }

    get upgradedBlock() {
        return this.readOffsetU8(0x4c);
    }
    set upgradedBlock(value) {
        this.writeOffsetU8(0x4c, value);
    }

    get upgradedMagicNumber() {
        return this.readOffsetU8(0x4d);
    }
    set upgradedMagicNumber(value) {
        this.writeOffsetU8(0x4d, value);
    }

    get isSelected() {
        return this.readOffsetU8(0x60);
    }
    set isSelected(value) {
        this.writeOffsetU8(0x60, value);
    }

    get exhaust() {
        return this.readOffsetU8(0x61);
    }
    set exhaust(value) {
        this.writeOffsetU8(0x61, value);
    }

    get returnToHand() {
        return this.readOffsetU8(0x62);
    }
    set returnToHand(value) {
        this.writeOffsetU8(0x62, value);
    }

    get shuffleBackIntoDrawPile() {
        return this.readOffsetU8(0x63);
    }
    set shuffleBackIntoDrawPile(value) {
        this.writeOffsetU8(0x63, value);
    }

    get isEthereal() {
        return this.readOffsetU8(0x64);
    }
    set isEthereal(value) {
        this.writeOffsetU8(0x64, value);
    }

    get baseDamage() {
        return this.readOffsetU32(0x74);
    }
    set baseDamage(value) {
        this.writeOffsetS32(0x74, value);
    }

    get baseBlock() {
        return this.readOffsetS32(0x78);
    }
    set baseBlock(value) {
        this.writeOffsetS32(0x78, value);
    }

    get baseMagicNumber() {
        return this.readOffsetS32(0x7c);
    }
    set baseMagicNumber(value) {
        this.writeOffsetS32(0x7c, value);
    }

    get baseHeal() {
        return this.readOffsetS32(0x80);
    }
    set baseHeal(value) {
        this.writeOffsetS32(0x80, value);
    }

    get baseDraw() {
        return this.readOffsetS32(0x84);
    }
    set baseDraw(value) {
        this.writeOffsetS32(0x84, value);
    }

    get baseDiscard() {
        return this.readOffsetS32(0x88);
    }
    set baseDiscard(value) {
        this.writeOffsetS32(0x88, value);
    }

    get damage() {
        return this.readOffsetS32(0x8c);
    }
    set damage(value) {
        this.writeOffsetS32(0x8c, value);
    }

    get block() {
        return this.readOffsetS32(0x90);
    }
    set block(value) {
        this.writeOffsetS32(0x90, value);
    }

    get magicNumber() {
        return this.readOffsetS32(0x94);
    }
    set magicNumber(value) {
        this.writeOffsetS32(0x94, value);
    }

    get heal() {
        return this.readOffsetS32(0x98);
    }
    set heal(value) {
        this.writeOffsetS32(0x98, value);
    }

    get draw() {
        return this.readOffsetS32(0x9c);
    }
    set draw(value) {
        this.writeOffsetS32(0x9c, value);
    }

    get discard() {
        return this.readOffsetS32(0xa0);
    }
    set discard(value) {
        this.writeOffsetS32(0xa0, value);
    }

    get isDamageModified() {
        return this.readOffsetU8(0xa4);
    }
    set isDamageModified(value) {
        this.writeOffsetU8(0xa4, value);
    }

    get isBlockModified() {
        return this.readOffsetU8(0xa5);
    }
    set isBlockModified(value) {
        this.writeOffsetU8(0xa5, value);
    }

    get isMagicNumberModified() {
        return this.readOffsetU8(0xa6);
    }
    set isMagicNumberModified(value) {
        this.writeOffsetU8(0xa6, value);
    }

    get damageType() {
        return this.readOffsetU32(0xa8);
    }
    set damageType(value) {
        this.writeOffsetU32(0xa8, value);
    }

    get damageTypeForTurn() {
        return this.readOffsetU32(0xac);
    }
    set damageTypeForTurn(value) {
        this.writeOffsetU32(0xac, value);
    }

    get target() {
        return this.readOffsetU32(0xb0);
    }
    set target(value) {
        this.writeOffsetU32(0xb0, value);
    }

    get purgeOnUse() {
        return this.readOffsetU8(0xb4);
    }
    set purgeOnUse(value) {
        this.writeOffsetU8(0xb4, value);
    }

    get exhaustOnUseOnce() {
        return this.readOffsetU8(0xb5);
    }
    set exhaustOnUseOnce(value) {
        this.writeOffsetU8(0xb5, value);
    }

    get exhaustOnFire() {
        return this.readOffsetU8(0xb6);
    }
    set exhaustOnFire(value) {
        this.writeOffsetU8(0xb6, value);
    }

    get freeToPlayOnce() {
        return this.readOffsetU8(0xb7);
    }
    set freeToPlayOnce(freeToPlayOnce) {
        this.writeOffsetU8(0xb7, value);
    }

    get isInAutoplay() {
        return this.readOffsetU8(0xb8);
    }
    set isInAutoplay(value) {
        this.writeOffsetU8(0xb8, value);
    }

    get assetUrl() {
        return this.readOffsetUtf16String(0xc8);
    }
    set assetUrl(value) {
        this.writeOffsetUtf16String(0xc8, value);
    }

    get transparency() {
        return this.readOffsetFloat(0xd0);
    }
    set transparency(value) {
        this.writeOffsetFloat(0xd0, value);
    }

    get targetTransparency() {
        return this.readOffsetFloat(0xd4);
    }
    set targetTransparency(value) {
        this.writeOffsetFloat(0xd4, value);
    }

    get targetAngle() {
        return this.readOffsetFloat(0xd8);
    }
    set targetAngle(value) {
        this.writeOffsetFloat(0xd8, value);
    }

    get angle() {
        return this.readOffsetFloat(0xdc);
    }
    set angle(value) {
        this.writeOffsetFloat(0xdc, value);
    }

    get glowTimer() {
        return this.readOffsetFloat(0xf4);
    }
    set glowTimer(value) {
        this.writeOffsetFloat(0xf4, value);
    }

    get drawScale() {
        return this.readOffsetFloat(0x114);
    }
    set drawScale(value) {
        this.writeOffsetFloat(0x114, value);
    }

    get targetDrawScale() {
        return this.readOffsetFloat(0x118);
    }
    set targetDrawScale(value) {
        this.writeOffsetFloat(0x118, value);
    }

    get cardsToPreview() {
        return this.readoffsetPoint(0x134);
    }
    set cardsToPreview(value) {
        this.writeOffsetPointer(0x134, value);
    }

    get originalName() {
        return this.readOffsetUtf16String(0x13c);
    }
    set originalName(value) {
        this.writeOffsetUtf16String(0x13c, value);
    }

    get name() {
        return this.readOffsetUtf16String(0x140);
    }
    set name(value) {
        this.writeOffsetUtf16String(0x140, value);
    }

    get rawDescription() {
        return this.readOffsetUtf16String(0x144);
    }
    set rawDescription(value) {
        this.writeOffsetUtf16String(0x144, value);
    }

    get cardID() {
        return this.readOffsetUtf16String(0x148);
    }
    set cardID(value) {
        this.writeOffsetUtf16String(0x148, value);
    }
}

class AbstractCreature extends NativeClassWrapper {
    //NativePointer AbstractCreature *
    constructor(CthisPtr) {
        super(CthisPtr);
    }

    get BaseClassPtr() {
        return super.BaseClassPtr()
    }
}

class AbstractPlayer extends AbstractCreature {
    //NativePointer AbstractPlayer *
    constructor(CthisPtr) {
        super(CthisPtr)
    }

    get BaseClassPtr() {
        return super.BaseClassPtr()
    }
}

class AbstractGameAction extends NativeClassWrapper {
    //NativePointer AbstractGameAction *
    constructor(CthisPtr) {
        super(CthisPtr);
    }

    get duration() {
        return this.readOffsetFloat(0x8);
    }
    set duration(value) {
        return this.writeOffsetFloat(0x8, value);
    }

    get startDuration() {
        return this.readOffsetFloat(0xc);
    }
    set startDuration(value) {
        this.writeOffsetFloat(0xc, value);
    }

    get actionType() {
        return this.readOffsetU32(0x10);
    }
    set actionType(value) {
        this.writeOffsetU32(0x10, value);
    }

    get attackEffect() {
        return this.readOffsetU32(0x14);
    }
    set attackEffect(value) {
        this.writeOffsetU32(0x14, value);
    }

    get damageType() {
        return this.readOffsetU32(0x18);
    }
    set damageType(value) {
        this.writeOffsetU32(0x18, value);
    }

    get isDone() {
        return this.readOffsetU8(0x1C);
    }
    set isDone(value) {
        this.writeOffsetU8(0x1C, value);
    }

    get amount() {
        return this.readOffsetS32(0x20);
    }
    set amount(value) {
        this.writeOffsetS32(0x20, value);
    }

    get target() {
        return this.readOffsetPointer(0x20);
    }
    set target(value) {
        this.writeOffsetPointer(0x20, value);
    }

    get source() {
        return this.readOffsetPointer(0x24);
    }
    set source(value) {
        this.writeOffsetPointer(0x24, value);
    }
}

class NativeFunctionInfo {
    constructor(funcOffset, retType, argTypes, callABI) {
        this.funcOffset = funcOffset
        this.retType = retType
        this.argTypes = argTypes
        this.callABI = callABI
    }
}

class PatchManager {
    static STSModuleBaseAddress = Module.findBaseAddress("libSpire_ANDROID.so");
    static #NativeFuncCache = new Map();
    static #GlobalVarCache = new Map();
    static STSNativeLib = {
        //System::String* AllocConstString(const char * str, int len);
        //AllocConstString: new NativeFunctionInfo(0x0, 'pointer', ['pointer', 'int']),
        //System::List * System::List::add(System::List * thisPtr)
        //ArrayList_StringCtor: new NativeFunctionInfo(0x1386D19, 'pointer', ['pointer']),
        //bool System::List::add(System::List * thisPtr, jobject * objPtr)
        ArrayList_StringAdd: new NativeFunctionInfo(0x1386F7D, 'bool', ['pointer', 'pointer'])
    };
    static CommonActions = {
        //AbstractGameAction* HealAction(AbstractGameAction* this, STS::AbstractCreature* target, STS::AbstractCreature* source, int amount)
        HealActionCtor: new NativeFunctionInfo(0x1682A11, 'pointer', ['pointer', 'pointer', 'pointer', 'int']),
    };
    static AbstractCard = {
        //void AbstractCard::addToBot(STS::AbstractCard * thisPtr, STS::AbstractGameAction * action)
        addToBot: new NativeFunctionInfo(0x16E5DB5, 'void', ['pointer', 'pointer'])
    };
    static PurpleCards = {
        //STS::AbstractCard * Cards::Purple::Alpha::Ctor(STS::AbstractCard * this)
        AlphaCtor: new NativeFunctionInfo(0x172AE45, 'pointer', ['pointer']),
    };
    static RedCards = {
        //STS::AbstractCard * Cards::Red::Bash::Ctor(STS::AbstractCard * this)
        BashCtor: new NativeFunctionInfo(0x173AD4D, 'pointer', ['pointer']),
        //STS::AbstractCard * Cards::Red::Clothesline::Ctor(STS::AbstractCard * this)
        ClotheslineCtor: new NativeFunctionInfo(0x173DA49, 'pointer', ['pointer']),
        //STS::AbstractCard * Cards::Red::Defend_Red::Ctor(STS::AbstractCard * this)
        DefendRedCtor: new NativeFunctionInfo(0x173E7DD, 'pointer', ['pointer']),
        //STS::AbstractCard * Cards::Red::Feed::Ctor(STS::AbstractCard * this)
        FeedCtor: new NativeFunctionInfo(0x1740309, 'pointer', ['pointer']),
        //STS::AbstractCard * Cards::Red::HeavyBlade::Ctor(STS::AbstractCard * this)
        HeavyBladeCtor : new NativeFunctionInfo(0x1741E25, 'pointer', ['pointer']),
        //STS::AbstractCard * Cards::Red::PerfectedStrike::Ctor(STS::AbstractCard * this)
        PerfectedStrikeCtor : new NativeFunctionInfo(0x17445DD, 'pointer', ['pointer']),
        //void Cards::Red::SearingBlow::Use(STS::AbstractCard * this, STS::AbstractPlayer* castPlayer, STS::AbstractMonster* targetMonster)
        SearingBlowUse: new NativeFunctionInfo(0x17467A5, 'void', ['pointer', 'pointer', 'pointer']),
        //STS::AbstractCard * Cards::Red::Strike_Red::Ctor(STS::AbstractCard * this)
        StrikeRedCtor: new NativeFunctionInfo(0x1747E89, 'pointer', ['pointer']),
    };
    static TempCards = {
        //STS::AbstractCard * Cards::Temp::Omega::Ctor(STS::AbstractCard * this)
        OmegaCtor: new NativeFunctionInfo(0x1750CE9, 'pointer', ['pointer']),
    };
    static AbstractPlayer = {
        //void AbstractPlayer::loseGold(STS::AbstractPlayer * player, int gold)
        loseGold: new NativeFunctionInfo(0x1756c69, 'void', ['pointer', 'int'])
    };
    static Ironclad = {
        //System::List* Ironclad::getStartingDeck(STS::Ironclad * thisPtr)
        getStartingDeck: new NativeFunctionInfo(0x1777921, 'pointer', ['pointer'])
    };
    static TheSilent = {
        //System::List* TheSilent::getStartingDeck(STS::TheSilent * thisPtr)
        getStartingDeck: new NativeFunctionInfo(0x1778D71, 'pointer', ['pointer'])
    };
    static Defect = {
        //System::List* Defect::getStartingDeck(STS::Defect * thisPtr)
        getStartingDeck: new NativeFunctionInfo(0x1776289, 'pointer', ['pointer'])
    };
    static Watcher = {
        //System::List* Watcher::getStartingDeck(STS::Watcher * thisPtr)
        getStartingDeck: new NativeFunctionInfo(0x177A7DD, 'pointer', ['pointer'])
    };
    static AbstractDungeon = {
        //System::List* AbstractDungeon::getRewardCards(AbstractDungeon * thisPtr)
        getRewardCards: new NativeFunctionInfo(0x17BE7F1, 'pointer', ['pointer'])
    }
    static ConfusionPower = {
        //void ConfusionPower::onCardDraw(STS::AbstractPower * thisPtr, STS::AbstractCard * card)
        onCardDraw: new NativeFunctionInfo(0x195C54D, 'void', ['pointer', 'pointer'])
    };
    
    static STSGlobalVars = {
        //AbstractDungeon::getRewardCards origin Instruction 017BE846 05 25 MOVS R5, #3
        get numCardsInstPtr()
        {
            return PatchManager.GetOffsetPtr(0x17BE846);
        },
        get SearingBlowStr()
        {
            return PatchManager.GetOffsetPtr(0x3493DC4).readPointer();
        },
        get StrikeRedStr()
        {
            return PatchManager.GetOffsetPtr(0x3494654).readPointer();
        },
    };

    static GetOffsetPtr(offset)
    {
        if (!PatchManager.#GlobalVarCache.has(offset))
        {
            PatchManager.#GlobalVarCache.set(offset, PatchManager.STSModuleBaseAddress.add(offset));
        }
        return PatchManager.#GlobalVarCache.get(offset);
    }

    static CreateNativeFunction(origFuncInfo) {
        if (!PatchManager.#NativeFuncCache.has(origFuncInfo.funcOffset))
        {
            PatchManager.#NativeFuncCache.set(origFuncInfo.funcOffset, new NativeFunction(PatchManager.STSModuleBaseAddress.add(origFuncInfo.funcOffset), origFuncInfo.retType, origFuncInfo.argTypes));
        }
        return PatchManager.#NativeFuncCache.get(origFuncInfo.funcOffset);
    }

    static HookSTSFunction(origFuncInfo, fakeFunc) {
        let origFunc = PatchManager.CreateNativeFunction(origFuncInfo)
        let fakeCallback = new NativeCallback(fakeFunc, origFuncInfo.retType, origFuncInfo.argTypes);
        Interceptor.replace(origFunc, fakeCallback);
        return origFunc;
    }
}

function STSLogV(message) {
    Java.perform(function () {
        let STSLogger = Java.use("android.util.Log");
        STSLogger.v("STS Mod", message);
    });
}

function fakeRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PatchRedCards() {
    let origStrikeRedCtorFunc = PatchManager.HookSTSFunction(PatchManager.RedCards.StrikeRedCtor, (thisPtr) => {
        let ret = origStrikeRedCtorFunc(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseDamage++;
        return ret;
    });
    let origDefendRedCtorFunc = PatchManager.HookSTSFunction(PatchManager.RedCards.DefendRedCtor, (thisPtr) => {
        let ret = origDefendRedCtorFunc(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseBlock++;
        return ret;
    });
    let origFeedCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.FeedCtor, (thisPtr) => {
        let ret = origFeedCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.magicNumber = ++newCard.baseMagicNumber;
        return ret;
    });
    let origBashCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.BashCtor, (thisPtr) => {
        let ret = origBashCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseDamage = 12;
        return ret;
    });
    let origSearingBlowUse = PatchManager.HookSTSFunction(PatchManager.RedCards.SearingBlowUse, (thisPtr, playerPtr, monsterPtr) => {
        origSearingBlowUse(thisPtr, playerPtr, monsterPtr);
        let baseCard = new AbstractCard(thisPtr);
        let cardLevel = baseCard.timesUpgraded;
        let HealActionCtor = PatchManager.CreateNativeFunction(PatchManager.CommonActions.HealActionCtor)
        let newHealAction = HealActionCtor(new NativePointer(0), playerPtr, playerPtr, cardLevel)
        let addToBotFunc = PatchManager.CreateNativeFunction(PatchManager.AbstractCard.addToBot);
        addToBotFunc(thisPtr, newHealAction);
    });
    let origHeavyBladeCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.HeavyBladeCtor, (thisPtr) => {
        let ret = origHeavyBladeCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseMagicNumber += 3;
        newCard.magicNumber += 3;
        return ret;
    });
    let origClotheslineCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.ClotheslineCtor, (thisPtr) => {
        let ret = origClotheslineCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.cost = 1;
        newCard.costForTurn = 1;
        newCard.baseDamage = 6;
        return ret;
    });
    let origPerfectedStrikeCtor = PatchManager.HookSTSFunction(PatchManager.RedCards.PerfectedStrikeCtor, (thisPtr) => {
        let ret = origPerfectedStrikeCtor(thisPtr);
        let newCard = new AbstractCard(ret);
        newCard.baseMagicNumber += 2;
        newCard.magicNumber += 2;
        return ret;
    });
}

function PatchPurpleCards() {
    let origAlphaCtor = PatchManager.HookSTSFunction(PatchManager.PurpleCards.AlphaCtor, (thisPtr) => {
        let ret = origAlphaCtor(thisPtr);
        let OmegaCtor = PatchManager.CreateNativeFunction(PatchManager.TempCards.OmegaCtor);
        let newCard = new AbstractCard(ret);
        let fakePreview = OmegaCtor(new NativePointer(0));
        newCard.cardsToPreview = fakePreview;
        return ret;
    });
}

function Patchcharacters() {
    let origIroncladGetStartingDeck = PatchManager.HookSTSFunction(PatchManager.Ironclad.getStartingDeck, (thisPtr) => {
        let origDeck = origIroncladGetStartingDeck(thisPtr);
        let addStrFunc = PatchManager.CreateNativeFunction(PatchManager.STSNativeLib.ArrayList_StringAdd);
        //"Searing Blow"
        addStrFunc(origDeck, PatchManager.STSGlobalVars.StrikeRedStr);
        addStrFunc(origDeck, PatchManager.STSGlobalVars.SearingBlowStr);
        return origDeck;
    });

    //let origLoseGoldFunc = PatchManager.HookSTSFunction(PatchManager.AbstractPlayer.loseGold, (thisPtr, gold) => { origLoseGoldFunc(thisPtr, Math.ceil(gold * 0.6)); });

    Memory.patchCode(PatchManager.STSGlobalVars.numCardsInstPtr, 64, function(code) {
        let numCardsModifyer = new ThumbWriter(code);
        //modify to 017BE846 04 25 MOVS R5, #5  ;set numCards = 4
        numCardsModifyer.putBytes([0x4, 0x25]);
        numCardsModifyer.flush();
    });
}

function PatchPowers() {
    //let origOnCardDrawFunc = 
    PatchManager.HookSTSFunction(PatchManager.ConfusionPower.onCardDraw, (thisPtr, cardPtr) => {
        //    origOnCardDrawFunc(thisPtr, cardPtr)
        let baseCard = new AbstractCard(cardPtr);
        if (baseCard.cost >= 0) {
            let newCost = fakeRandom(0, baseCard.cost);
            if (baseCard.cost != newCost) {
                baseCard.cost = newCost;
                baseCard.costForTurn = baseCard.cost;
                baseCard.isCostModified = true;
            }
            baseCard.freeToPlayOnce = false;
        }
    });
}

function main() {
    PatchRedCards();
    Patchcharacters();
    PatchPurpleCards();
    PatchPowers();
}

main();