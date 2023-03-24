export class NativeFunctionInfo {
    funcOffset;
    retType;
    argTypes;
    callABI;

    //argTypes => NativeCallback NativeFunction ???
    constructor(funcOffset: number, retType: NativeFunctionReturnType, argTypes: any, callABI: NativeABI = "default") {
        this.funcOffset = funcOffset
        this.retType = retType
        this.argTypes = argTypes
        this.callABI = callABI
    }
}

export const NativeFunctionInfoMap = {
    STSLib: {
        ArrayList: {
            JString: {
                /**
                 * ```c
                 * ArrayList * ArrayList<JString>::Ctor(ArrayList * thisPtr)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x1386D19, 'pointer', ['pointer']),
                /**
                 * ```c
                 * bool ArrayList<JString>::add(ArrayList * thisPtr, JString * strPtr)
                 * ```
                 */
                Add: new NativeFunctionInfo(0x1386F7D, 'bool', ['pointer', 'pointer']),
            },
            AbstractGameEffect: {
                /**
                 * ```c
                 * bool ArrayList<AbstractGameEffect>::add(ArrayList * thisPtr, STS::AbstractGameEffect * effectPtr)
                 * ```
                 */
                Add: new NativeFunctionInfo(0x16706F9, 'bool', ['pointer', 'pointer']),
            },
            AbstractCard: {
                /**
                 * ```c
                 * ArrayList * ArrayList<AbstractCard>::Ctor(ArrayList * thisPtr)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x1678CA9, 'pointer', ['pointer']),
                /**
                 * ```c
                 * STS::AbstractCard* ArrayList<AbstractCard>::UnsafeLoad(STS::AbstractCard* dataPtr, int index)
                 * ```
                 */
                get: new NativeFunctionInfo(0x167E58D, 'pointer', ['pointer', 'uint32']),
            },
            AbstractPotion: {
                /**
                 * ```c
                 * bool ArrayList<AbstractPotion>::add(ArrayList * thisPtr, STS::AbstractPotion * potionPtr)
                 * ```
                 */
                Add: new NativeFunctionInfo(0x0175224D, 'bool', ['pointer', 'pointer']),
            }
        },
        JString: {
            /**
             * ```c
             * //use UTF-16 String constructor
             * JString* JString::Ctor(JString* thisPtr, char16_t* str)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x138C77D, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * JString* JString::Ctor(JString* thisPtr, char16_t* str, int32_t start, int32_t len)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x138C899, 'pointer', ['pointer', 'pointer', 'int32', 'int32']),
            /**
             * ```c
             * //use C String constructor
             * JString* JString::Ctor(JString* thisPtr, unsigned char * str)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x138C935, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * JString* JString::Ctor(JString* thisPtr, unsigned char* str, int32_t start, int32_t len)
             * ```
             */
            Ctor4: new NativeFunctionInfo(0x138C9D5, 'pointer', ['pointer', 'pointer', 'int32', 'int32']),
        },
        BRUTE: {
            /**
             * ```c
             * void * BRUTE::GallocAU(uint32_t size);
             * ```
             */
            GallocAU: new NativeFunctionInfo(0x1380E47, 'pointer', ['uint32']),
            /**
             * ```c
             * void BRUTE::Free(void * memPtr);
             * ```
             */
            Free: new NativeFunctionInfo(0x1380E01, 'void', ['pointer']),
        },
    },
    Actions: {
        Heal: {
            /**
             * ```c
             * AbstractGameAction* HealAction(AbstractGameAction* this, STS::AbstractCreature* target, STS::AbstractCreature* source, int amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1682A11, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
        },
        ApplyPower: {
            /**
             * ```c
             * AbstractGameAction* Actions::ApplyPowerAction::Ctor(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target,
             *      STS::AbstractCreature* source, STS::AbstractPower* powerToApply, int32_t stackAmount, bool isFast, STS::AttackEffect effect)
             * 
             * ```
             * 
             * default args call: `ApplyPowerAction::Ctor(this, target, source, powerPtr, powerPtr->amount, false, AttackEffect.NONE);`
             */
            Ctor: new NativeFunctionInfo(0x1672CFD, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'int32', 'bool', 'uint32']),
        },
        Scry: {
            /**
             * ```c
             * AbstractGameAction* Actions::ScryAction(STS::AbstractGameAction* thisPtr, int32_t numCards)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16B01F9, 'pointer', ['pointer', 'int32']),
        },
        MakeTempCardInHand: {
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, bool isOtherCardInCenter)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1684519, 'pointer', ['pointer', 'pointer', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, int32_t cardAmount)
             * ```
             */
            Ctor1: new NativeFunctionInfo(0x16847B5, 'pointer', ['pointer', 'pointer', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, int32_t cardAmount, bool isOtherCardInCenter)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x16849A1, 'pointer', ['pointer', 'pointer', 'int32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::MakeTempCardInHandAction(STS::AbstractGameAction* thisPtr, STS::AbstractCard* cardPtr, bool isOtherCardInCenter, bool sameUUID)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x1684A59, 'pointer', ['pointer', 'pointer', 'bool', 'bool']),
        },
        RelicAboveCreature: {
            /**
             * ```c
             * AbstractGameAction* Actions::RelicAboveCreatureAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source, STS::AbstractRelic* relic)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1688E25, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
        Discard: {
            /**
             * ```c
             * AbstractGameAction* Actions::DiscardAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t cardAmount, bool isRandom, bool drawinEndTurn)
             * ```
             * 
             * Ctor just call ```Ctor2(thisPtr, target, source, amount, isRandom, false);```
             */
            Ctor2: new NativeFunctionInfo(0x167CBD5, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'bool', 'bool']),
        },
        DrawCard: {
            /**
             * ```c
             * AbstractGameAction* Actions::DrawCardAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* source, int32_t cardAmount, bool endTurnDraw)
             * ```
             * 
             * Ctor2 just call ```Ctor(thisPtr, source, cardAmount, false);```
             * 
             * Ctor4 just call ```Ctor(thisPtr, nullptr, cardAmount, false);```
             */
            Ctor: new NativeFunctionInfo(0x167EB71, 'pointer', ['pointer', 'pointer', 'int32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::DrawCardAction(STS::AbstractGameAction* thisPtr, int32_t cardAmount, bool clearDrawHistory)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x167EDF9, 'pointer', ['pointer', 'int32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::DrawCardAction(STS::AbstractGameAction* thisPtr, int32_t cardAmount, STS::AbstractGameAction* action, bool clearDrawHistory)
             * ```
             * 
             * Ctor5 just call ```Ctor6(thisPtr, amount, action, true);```
             */
            Ctor6: new NativeFunctionInfo(0x167F005, 'pointer', ['pointer', 'int32', 'pointer', 'bool']),
        },
        Damage: {
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, AttackEffect effect)
             * ```
             * 
             * Ctor3 just call ```Ctor(thisPtr, target, dmgInfo, AttackEffect.NONE)```
             */
            Ctor: new NativeFunctionInfo(0x167A165, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32']),
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, int stealGoldAmount)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x167A225, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, bool superFast)
             * ```
             * 
             * call ```Ctor(thisPtr, target, dmgInfo, AttackEffect.NONE)``` and ```this.skipWait = superFast;```
             */
            Ctor4: new NativeFunctionInfo(0x167A33D, 'pointer', ['pointer', 'pointer', 'pointer', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, AttackEffect effect, bool superFast)
             * ```
             * 
             * forward to ```Ctor``` and ```this.skipWait = superFast;```
             */
            Ctor5: new NativeFunctionInfo(0x167A3D1, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::DamageAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, DamageInfo* dmgInfo, AttackEffect effect, bool superFast)
             * ```
             * 
             * forward to ```Ctor5``` and ```this.muteSfx = muteSfx;```
             */
            Ctor6: new NativeFunctionInfo(0x167A465, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'bool', 'bool']),
        },
        GainBlock: {
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1681BDD, 'pointer', ['pointer', 'pointer', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x1681C85, 'pointer', ['pointer', 'pointer', 'pointer', 'int32']),
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, int32_t amount, bool superFast)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x1681D41, 'pointer', ['pointer', 'pointer', 'int32', 'bool']),
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount, bool superFast)
             * ```
             */
            Ctor4: new NativeFunctionInfo(0x1681E09, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'bool']),
        },
        LoseHP: {
            /**
             * ```c
             * AbstractGameAction* Actions::GainBlockAction(STS::AbstractGameAction* thisPtr, STS::AbstractCreature* target, STS::AbstractCreature* source, int32_t amount, AttackEffect effect)
             * ```
             * 
             * Ctor2 just call ```Ctor(target, source, amount, AttackEffect.NONE);```
             */
            Ctor: new NativeFunctionInfo(0x1682DFD, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'uint32']),
        },
    },
    Cards: {
        AbstractCard: {
            /**
             * ```c
             * STS::AbstractCard * Cards::AbstractCard::Ctor(STS::AbstractCard * this, STS::JString* id, STS::JString* name, STS::JString* imgUrl, 
             * int32_t cost, STS::JString* rawDescription, STS::CardType type, STS::CardColor color, STS::CardRarity rarity, STS::CardTarget target, STS::DamageType dType)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x16D4FB5, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'int32', 'pointer', 'uint32', 'uint32', 'uint32', 'uint32', 'uint32']),
        },
        DamageInfo: {
            /**
             * ```c
             * STS::DamageInfo* Cards::DamageInfo::Ctor(STS::DamageInfo* thisPtr, STS::AbstractCreature* damageSource, int dmgValue, DamageType type)
             * ```
             * 
             * Ctor2 just call ```Ctor(thisPtr, damageSource, dmgValue, DamageType.NORMAL);```
             */
            Ctor: new NativeFunctionInfo(0x1719A8D, 'pointer', ['pointer', 'pointer', 'int32', 'uint32']),
        },
        Red: {
            Bash: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::Red::Bash::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x173AD4D, 'pointer', ['pointer']),
            },
            Clothesline: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::Red::Clothesline::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x173DA49, 'pointer', ['pointer']),
            },
            DefendRed: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::Red::Defend_Red::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x173E7DD, 'pointer', ['pointer']),
            },
            Feed: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::Red::Feed::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x1740309, 'pointer', ['pointer']),
            },
            HeavyBlade: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::Red::HeavyBlade::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x1741E25, 'pointer', ['pointer']),
            },
            PerfectedStrike: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::Red::PerfectedStrike::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x17445DD, 'pointer', ['pointer']),
            },
            SearingBlow: {
                /**
                 * ```c
                 * void Cards::Red::SearingBlow::Use(STS::AbstractCard * this, STS::AbstractPlayer* castPlayer, STS::AbstractMonster* targetMonster)
                 * ```
                 */
                Use: new NativeFunctionInfo(0x17467A5, 'void', ['pointer', 'pointer', 'pointer']),
            },
            StrikeRed: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::Red::Strike_Red::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x1747E89, 'pointer', ['pointer']),
            },
            DemonForm: {
                /**
                 * ```c
                 * void Cards::Red::DemonForm::Use(STS::AbstractCard * this, STS::AbstractPlayer* castPlayer, STS::AbstractMonster* targetMonster)
                 * ```
                 */
                Use: new NativeFunctionInfo(0x173EC15, 'void', ['pointer', 'pointer', 'pointer']),
            },
            Thunderclap: {
                /**
                 * ```c
                 * void Cards::Red::Thunderclap::Use(STS::AbstractCard * this, STS::AbstractPlayer* castPlayer, STS::AbstractMonster* targetMonster)
                 * ```
                 */
                Use: new NativeFunctionInfo(0x17487FD, 'void', ['pointer', 'pointer', 'pointer']),
            },
        },
        Purple: {
            Alpha: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::Purple::Alpha::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x172AE45, 'pointer', ['pointer'])
            }
        },
        Temp: {
            Omega: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::Temp::Omega::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x1750CE9, 'pointer', ['pointer']),
            }
        },
        status: {
            Burn: {
                /**
                 * ```c
                 * STS::AbstractCard * Cards::status::Burn::Ctor(STS::AbstractCard * this)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x176BDCD, 'pointer', ['pointer']),
            }
        }
    },
    CardLibrary: {
        /**
         * ```c
         * void initialize(STS::CardLibrary* this)
         * ```
         */
        initialize: new NativeFunctionInfo(0x1830B15, 'void', ['pointer']),
        /**
         * ```c
         * void Add(STS::CardLibrary* this, STS::AbstractCard* cardPtr)
         * ```
         */
        Add: new NativeFunctionInfo(0x1832405, 'void', ['pointer']),
    },
    RelicLibrary: {
        /**
         * ```c
         * void initialize(STS::RelicLibrary* this)
         * ```
         */
        initialize: new NativeFunctionInfo(0x1884C71, 'void', ['pointer']),
        /**
         * ```c
         * void Add(STS::RelicLibrary* this, STS::AbstractRelic* relicPtr)
         * ```
         */
        Add: new NativeFunctionInfo(0x18854C9, 'void', ['pointer']),
    },
    Characters: {
        AbstractPlayer: {
            /**
             * ```c
             * void AbstractPlayer::loseGold(STS::AbstractPlayer * player, int gold)
             * ```
             */
            loseGold: new NativeFunctionInfo(0x1756c69, 'void', ['pointer', 'int32']),
            /**
             * ```c
             * void AbstractPlayer::gainGold(STS::AbstractPlayer * player, int gold)
             * ```
             */
            gainGold: new NativeFunctionInfo(0x1756FE5, 'void', ['pointer', 'int32']),
        },
        Ironclad: {
            /**
             * ```c
             * ArrayList* Ironclad::getStartingDeck(STS::Ironclad* thisPtr)
             * ```
             */
            getStartingDeck: new NativeFunctionInfo(0x1777921, 'pointer', ['pointer']),
        },
        TheSilent: {
            /**
             * ```c
             * ArrayList* TheSilent::getStartingDeck(STS::TheSilent* thisPtr)
             * ```
             */
            getStartingDeck: new NativeFunctionInfo(0x1778D71, 'pointer', ['pointer']),
        },
        Defect: {
            /**
             * ```c
             * ArrayList* Defect::getStartingDeck(STS::Defect* thisPtr)
             * ```
             */
            getStartingDeck: new NativeFunctionInfo(0x1776289, 'pointer', ['pointer']),
        },
        Watcher: {
            /**
             * ```c
             * ArrayList* Watcher::getStartingDeck(STS::Watcher* thisPtr)
             * ```
             */
            getStartingDeck: new NativeFunctionInfo(0x177A7DD, 'pointer', ['pointer']),
        },
    },
    Powers: {
        ConfusionPower: {
            /**
             * ```c
             * void ConfusionPower::onCardDraw(STS::AbstractPower * thisPtr, STS::AbstractCard * card)
             * ```
             */
            onCardDraw: new NativeFunctionInfo(0x195C54D, 'void', ['pointer', 'pointer'])
        },
        DemonFormPower: {
            /**
             * ```c
             * STS::AbstractPower* Powers::DemonFormPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x195EBB1, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        IntangiblePlayerPower: {
            /**
             * ```c
             * STS::AbstractPower* Powers::IntangiblePlayerPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x19693B9, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        EchoPower: {
            /**
             * ```c
             * STS::AbstractPower* Powers::EchoPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1961C21, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        DevaPower: {
            /**
             * ```c
             * STS::AbstractPower* Powers::DevaPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197CC09, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        FreeAttackPower: {
            /**
             * ```c
             * STS::AbstractPower* Powers::FreeAttackPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197E9B1, 'pointer', ['pointer', 'pointer', 'int32'])
        }
    },
    Relics: {
        AbstractRelic: {
            /**
             * ```c
             * sts::AbstractRelic* Relics::AbstractRelic::Ctor(STS::AbstractRelic * thisPtr, STS::JString* relicId, STS::JString* imgName, RelicTier tier, LandingSound sfx)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x19841AD, 'pointer', ['pointer', 'pointer', 'pointer', 'uint32', 'uint32']),
        },
        BurningBlood: {
            /**
             * ```c
             * void Relics::BurningBlood::onVictory(STS::AbstractRelic * thisPtr)
             * ```
             */
            onVictory: new NativeFunctionInfo(0x198F901, 'void', ['pointer'])
        },
        BlackBlood: {
            /**
             * ```c
             * void Relics::BlackBlood::onVictory(STS::AbstractRelic * thisPtr)
             * ```
             */
            onVictory: new NativeFunctionInfo(0x198BF31, 'void', ['pointer'])
        },
        Ginger: {
            /**
             * ```c
             * STS::AbstractRelic * Relics::Ginger::Ctor(STS::AbstractRelic *)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1998921, 'pointer', ['pointer']),
        },
        SacredBark: {
            /**
             * ```c
             * STS::AbstractRelic * Relics::SacredBark::Ctor(STS::AbstractRelic *)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x19A67A5, 'pointer', ['pointer']),
        },
        CoffeeDripper: {
            /**
             * ```c
             * STS::AbstractRelic * Relics::CoffeeDripper::Ctor(STS::AbstractRelic *)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1992629, 'pointer', ['pointer']),
        },
        MarkofPain: {
            /**
             * ```c
             * void Relics::MarkofPain::atBattleStart(STS::AbstractRelic *)
             * ```
             */
            atBattleStart: new NativeFunctionInfo(0x199C255, 'void', ['pointer']),
        },
        RunicPyramid: {
            /**
             * ```c
             * STS::AbstractRelic * Relics::RunicPyramid::Ctor(STS::AbstractRelic *)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x19A6681, 'pointer', ['pointer']),
        },
    },
    Potions: {
        PotionSlot: {
            /**
             * ```c
             *  AbstractPotion* Potions::PotionSlot::Ctor(AbstractPotion* this, int32_t slot)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1950881, 'pointer', ['pointer', 'int32']),
        },
    },
    VFX: {
        ShowCardBrieflyEffect: {
            /**
             * ```c
             * STS::AbstractGameEffect * VFX::ShowCardBrieflyEffect::Ctor(STS::AbstractGameEffect * thisPtr, STS::AbstractCard * cardPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1B5843D, 'pointer', ['pointer', 'pointer']),
        },
        UpgradeShineEffect: {
            /**
             * ```c
             * STS::AbstractGameEffect * VFX::ShowCardBrieflyEffect::Ctor(STS::AbstractGameEffect * thisPtr, float x, float y)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1BDB775, 'pointer', ['pointer', 'float', 'float']),
        },
    }
}