import { NativeFunctionInfo } from "./NativeFunctionInfo.js"
import { AbstractPlayer } from "./AbstractPlayer.js";

export class PatchManager {
    static STSModuleBaseAddress = Module.findBaseAddress("libSpire_ANDROID.so") || new NativePointer(0);
    static STSLogger = new File("/sdcard/Android/data/com.humble.SlayTheSpire/files/ModScripts/ModLog.txt", "w+");
    static #NativeFuncCache = new Map<string, NativeFunction<any, any>>();
    static #GlobalVarCache = new Map<number, NativePointer>();
    static STSNativeLib = {
        //System::List * System::List<String>::Ctor(System::List * thisPtr)
        ArrayList_StringCtor: new NativeFunctionInfo(0x1386D19, 'pointer', ['pointer']),
        //bool System::List::add(System::List * thisPtr, jobject * objPtr)
        ArrayList_StringAdd: new NativeFunctionInfo(0x1386F7D, 'bool', ['pointer', 'pointer']),
        //bool System::List::add(System::List * thisPtr, STS::AbstractGameEffect * effectPtr)
        ArrayList_AbstractGameEffectAdd: new NativeFunctionInfo(0x16706F9, 'bool', ['pointer', 'pointer']),
        //System::List * System::List<AbstractCard>::Ctor(System::List * thisPtr)
        ArrayList_AbstractCardCtor: new NativeFunctionInfo(0x1678CA9, 'pointer', ['pointer']),
        //STS::AbstractCard* System::List<AbstractCard>::Ctor(System::List * thisPtr, int index)
        ArrayList_AbstractCardUnsafeLoad: new NativeFunctionInfo(0x167E58D, 'pointer', ['pointer', 'uint32']),
    };
    static CommonActions = {
        //AbstractGameAction* HealAction(AbstractGameAction* this, STS::AbstractCreature* target, STS::AbstractCreature* source, int amount)
        HealActionCtor: new NativeFunctionInfo(0x1682A11, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
    };
    static AbstractCard = {
        //void AbstractCard::addToBot(STS::AbstractCard * thisPtr, STS::AbstractGameAction * action)
        addToBot: new NativeFunctionInfo(0x16E5DB5, 'void', ['pointer', 'pointer'])
    };
    static CardGroup = {
        //STS::AbstractCard* getRandomCard(STS::CardGroup * thisPtr, int useRng)
        getRandomCardBool: new NativeFunctionInfo(0x1701DA9, 'pointer', ['pointer', 'int32'])
    }
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
        HeavyBladeCtor: new NativeFunctionInfo(0x1741E25, 'pointer', ['pointer']),
        //STS::AbstractCard * Cards::Red::PerfectedStrike::Ctor(STS::AbstractCard * this)
        PerfectedStrikeCtor: new NativeFunctionInfo(0x17445DD, 'pointer', ['pointer']),
        //void Cards::Red::SearingBlow::Use(STS::AbstractCard * this, STS::AbstractPlayer* castPlayer, STS::AbstractMonster* targetMonster)
        SearingBlowUse: new NativeFunctionInfo(0x17467A5, 'void', ['pointer', 'pointer', 'pointer']),
        //STS::AbstractCard * Cards::Red::Strike_Red::Ctor(STS::AbstractCard * this)
        StrikeRedCtor: new NativeFunctionInfo(0x1747E89, 'pointer', ['pointer']),
    };
    static TempCards = {
        //STS::AbstractCard * Cards::Temp::Omega::Ctor(STS::AbstractCard * this)
        OmegaCtor: new NativeFunctionInfo(0x1750CE9, 'pointer', ['pointer']),
    };
    static Characters = {
        AbstractPlayer: {
            //void AbstractPlayer::loseGold(STS::AbstractPlayer * player, int gold)
            loseGold: new NativeFunctionInfo(0x1756c69, 'void', ['pointer', 'int32'])
        },
        Ironclad: {
            //System::List* Ironclad::getStartingDeck(STS::Ironclad * thisPtr)
            getStartingDeck: new NativeFunctionInfo(0x1777921, 'pointer', ['pointer'])
        },
        TheSilent: {
            //System::List* TheSilent::getStartingDeck(STS::TheSilent * thisPtr)
            getStartingDeck: new NativeFunctionInfo(0x1778D71, 'pointer', ['pointer'])
        },
        Defect: {
            //System::List* Defect::getStartingDeck(STS::Defect * thisPtr)
            getStartingDeck: new NativeFunctionInfo(0x1776289, 'pointer', ['pointer'])
        },
        Watcher: {
            //System::List* Watcher::getStartingDeck(STS::Watcher * thisPtr)
            getStartingDeck: new NativeFunctionInfo(0x177A7DD, 'pointer', ['pointer'])
        },
    };
    static AbstractDungeon = {
        //System::List* AbstractDungeon::getRewardCards(STS::AbstractDungeon * thisPtr)
        getRewardCards: new NativeFunctionInfo(0x17BE7F1, 'pointer', ['pointer'])
    }
    static ConfusionPower = {
        //void ConfusionPower::onCardDraw(STS::AbstractPower * thisPtr, STS::AbstractCard * card)
        onCardDraw: new NativeFunctionInfo(0x195C54D, 'void', ['pointer', 'pointer'])
    };
    static Relics = {
        BurningBlood: {
            //void Relics::BurningBlood::onVictory(STS::AbstractRelic * thisPtr)
            onVictory: new NativeFunctionInfo(0x198F901, 'void', ['pointer'])
        },
        BlackBlood: {
            //void Relics::BlackBlood::onVictory(STS::AbstractRelic * thisPtr)
            onVictory: new NativeFunctionInfo(0x198BF31, 'void', ['pointer'])
        },
        Ginger: {
            //STS::AbstractRelic * Relics::Ginger::Ctor(STS::AbstractRelic *)
            Ctor: new NativeFunctionInfo(0x1998921, 'pointer', ['pointer']),
            //runtimetype_t* System::Internal::__CreateRuntimeType<STS::AbstractRelic *>(void)
            onRegister: new NativeFunctionInfo(0x2657E81, 'pointer', ['void']),
        }
    }

    static VFX = {
        //STS::AbstractGameEffect * VFX::ShowCardBrieflyEffect::Ctor(STS::AbstractGameEffect * thisPtr, STS::AbstractCard * cardPtr)
        ShowCardBrieflyEffectCtor: new NativeFunctionInfo(0x1B5843D, 'pointer', ['pointer', 'pointer']),
        //STS::AbstractGameEffect * VFX::ShowCardBrieflyEffect::Ctor(STS::AbstractGameEffect * thisPtr, float x, float y)
        UpgradeShineEffectCtor: new NativeFunctionInfo(0x1BDB775, 'pointer', ['pointer', 'float', 'float']),
    }

    static StringLiteral = {
        //red card names
        get DefendRed() {
            return PatchManager.GetOffsetPtr(0x3490118).readPointer();
        },
        get InfernalBlade() {
            return PatchManager.GetOffsetPtr(0x3491FF0).readPointer();
        },
        get SearingBlow() {
            return PatchManager.GetOffsetPtr(0x3493DC4).readPointer();
        },
        get StrikeRed() {
            return PatchManager.GetOffsetPtr(0x3494654).readPointer();
        },
        get TrueGrit() {
            return PatchManager.GetOffsetPtr(0x3494DFC).readPointer();
        },

        //green card names
        get DefendGreen() {
            return PatchManager.GetOffsetPtr(0x3490110).readPointer();
        },
        get Distraction() {
            return PatchManager.GetOffsetPtr(0x349025C).readPointer();
        },
        get Neutralize() {
            return PatchManager.GetOffsetPtr(0x3492D38).readPointer();
        },
        get StrikeGreen() {
            return PatchManager.GetOffsetPtr(0x349464C).readPointer();
        },

        //blue card names
        get DefendBlue() {
            return PatchManager.GetOffsetPtr(0x349010C).readPointer();
        },
        get Dualcast() {
            return PatchManager.GetOffsetPtr(0x3490350).readPointer();
        },
        get StrikeBlue() {
            return PatchManager.GetOffsetPtr(0x3494648).readPointer();
        },
        get WhiteNoise() {
            return PatchManager.GetOffsetPtr(0x3495718).readPointer();
        },

        //Purple card names
        get DefendPurple() {
            return PatchManager.GetOffsetPtr(0x3490114).readPointer();
        },
        get Eruption() {
            return PatchManager.GetOffsetPtr(0x3490680).readPointer();
        },
        get ForeignInfluence() {
            return PatchManager.GetOffsetPtr(0x3490A98).readPointer();
        },
        get StrikePurple() {
            return PatchManager.GetOffsetPtr(0x3494650).readPointer();
        },
        get Vigilance() {
            return PatchManager.GetOffsetPtr(0x34951CC).readPointer();
        },

        //colorless card names
        get Discovery() {
            return PatchManager.GetOffsetPtr(0x3490238).readPointer();
        },
    };

    static InstructionPtr = {
        /**
         * AbstractDungeon::getRewardCards
         * 
         * origin Instruction: ```0x17BE846 05 25 MOVS R5, #3```
         */
        get rewardCardNumber() {
            return PatchManager.GetOffsetPtr(0x17BE846);
        },
    }

    static STSGlobalVars = {
        get STSSetting_WIDTH() {
            return PatchManager.GetOffsetPtr(0x34987C0).readS32();
        },
        get STSSetting_HEIGHT() {
            return PatchManager.GetOffsetPtr(0x34987C4).readS32();
        },
        get AbstractDungeon_player() {
            return new AbstractPlayer(PatchManager.GetOffsetPtr(0x3498EDC).readPointer());
        },
        get AbstractDungeon_topLevelEffects() {
            return PatchManager.GetOffsetPtr(0x3498F84).readPointer();
        },
    };

    static GetOffsetPtr(offset: number) {
        if (!PatchManager.#GlobalVarCache.has(offset)) {
            PatchManager.#GlobalVarCache.set(offset, PatchManager.STSModuleBaseAddress.add(offset));
        }
        return PatchManager.#GlobalVarCache.get(offset) || new NativePointer(0);
    }

    static GetNativeFunction(origFuncInfo: NativeFunctionInfo): NativeFunction<any, any> {
        let funcAddressPtr = PatchManager.STSModuleBaseAddress.add(origFuncInfo.funcOffset);
        let funcAddress = funcAddressPtr.toString();
        let nativeFunc = PatchManager.#NativeFuncCache.get(funcAddress);
        if (nativeFunc === undefined) {
            nativeFunc = new NativeFunction(funcAddressPtr, origFuncInfo.retType, origFuncInfo.argTypes);
            PatchManager.#NativeFuncCache.set(funcAddress, nativeFunc);
        }

        return nativeFunc;
    }

    static GetNativeVFunction(funcPtr: NativePointer, returnType: NativeFunctionReturnType, argTypes: NativeFunctionArgumentType[]) {
        let funcAddress = funcPtr.toString();
        let vFunc = PatchManager.#NativeFuncCache.get(funcAddress);
        if (vFunc === undefined) {
            vFunc = new NativeFunction(funcPtr, returnType, argTypes);
            PatchManager.#NativeFuncCache.set(funcAddress, vFunc);
        }
        return vFunc;
    }

    static HookSTSFunction(origFuncInfo: NativeFunctionInfo, fakeFunc: (...args: any) => any) {
        let origFunc = PatchManager.GetNativeFunction(origFuncInfo)
        let fakeCallback = new NativeCallback(fakeFunc, origFuncInfo.retType, origFuncInfo.argTypes);
        Interceptor.replace(origFunc, fakeCallback);
        return origFunc;
    }

    static LogV(message: string) {
        let nowDate = new Date();
        let timeStr = nowDate.getHours() + "." + nowDate.getMinutes() + "." + nowDate.getSeconds();
        PatchManager.STSLogger.write(timeStr + " : " + message + "\n");
        PatchManager.STSLogger.flush();
    }
}