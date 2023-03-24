import { NativeFunctionInfo } from "./NativeFunctionInfo.js"
import { AbstractPlayer } from "./AbstractPlayer.js";
import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType, LandingSound, RelicTier } from "./enums.js";
import { STSCardCtor } from "./AbstractCard.js";

export class PatchManager {
    static readonly nullptr = new NativePointer(0);
    static readonly STSModuleBaseAddress = Module.findBaseAddress("libSpire_ANDROID.so") || PatchManager.nullptr;

    static readonly #STSLogger = new File("/sdcard/Android/data/com.humble.SlayTheSpire/files/ModScripts/ModLog.txt", "w+");
    static readonly #NativeFunctionInfoMap = {
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
    static readonly RewriteVFuncMap = new Map<string, NativePointer>();
    static readonly #NativeFuncCache = new Map<string, NativeFunction<any, any>>();
    static readonly #GlobalVarCache = new Map<number, NativePointer>();

    static readonly STSLib = {
        ArrayList: {
            JString: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.ArrayList.JString.Ctor)(PatchManager.nullptr);
                },
                AddNativeStr(thisPtr: NativePointer, JStringPtr: NativePointer): boolean {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.ArrayList.JString.Add)(thisPtr, JStringPtr);
                },
                Add(thisPtr: NativePointer, str: string): boolean {
                    let nativeStr = PatchManager.STSLib.JString.Ctor(str);
                    return PatchManager.STSLib.ArrayList.JString.AddNativeStr(thisPtr, nativeStr);
                },
            },
            AbstractGameEffect: {
                Add(thisPtr: NativePointer, effectPtr: NativePointer): boolean {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.ArrayList.AbstractGameEffect.Add)(thisPtr, effectPtr);
                },
            },
            AbstractPotion: {
                Add(thisPtr: NativePointer, potionPtr: NativePointer): boolean {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.ArrayList.AbstractPotion.Add)(thisPtr, potionPtr);
                },
            },
            AbstractCard: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.ArrayList.AbstractCard.Ctor)(PatchManager.nullptr);
                },
                get(dataPtr: NativePointer, index: number): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.ArrayList.AbstractCard.get)(dataPtr, index);
                }
            },
        },
        JString: {
            /** UTF-16 string ctor*/
            Ctor(str: string): NativePointer {
                let nativeMem = Memory.allocUtf16String(str);
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.JString.Ctor)(PatchManager.nullptr, nativeMem);
            },
            /** UTF-16 string ctor*/
            Ctor2(str: string, start: number, len: number): NativePointer {
                let nativeMem = Memory.allocUtf16String(str);
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.JString.Ctor2)(PatchManager.nullptr, nativeMem, start, len);
            },
            /** C string ctor, don't use this*/
            Ctor3(str: string): NativePointer {
                let nativeMem = Memory.allocAnsiString(str);
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.JString.Ctor3)(PatchManager.nullptr, nativeMem);
            },
            /** C string ctor, don't use this*/
            Ctor4(str: string, start: number, len: number): NativePointer {
                let nativeMem = Memory.allocAnsiString(str);
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.JString.Ctor4)(PatchManager.nullptr, nativeMem, start, len);
            },
        },
    };
    static readonly Actions = {
        //AbstractGameAction* HealAction(AbstractGameAction* this, STS::AbstractCreature* target, STS::AbstractCreature* source, int amount)
        Heal: {
            Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.Heal.Ctor)(PatchManager.nullptr, target, source, amount);
            }
        },
        ApplyPower: {
            Ctor(target: NativePointer, source: NativePointer, power: NativePointer, amount: number, isFast: boolean, effect: AttackEffect): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.ApplyPower.Ctor)(PatchManager.nullptr, target, source, power, amount, Number(isFast), Number(effect));
            },
            Ctor2(target: NativePointer, source: NativePointer, power: NativePointer, amount: number): NativePointer {
                return PatchManager.Actions.ApplyPower.Ctor(target, source, power, amount, false, AttackEffect.NONE);
            },
        },
        Scry: {
            Ctor(numcards: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.Scry.Ctor)(PatchManager.nullptr, numcards);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer, numCards: number) => NativePointer): (thisPtr: NativePointer, numCards: number) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Actions.Scry.Ctor, newCtor);
            },
        },
        MakeTempCardInHand: {
            Ctor(cardPtr: NativePointer, numCards: number, isOtherCardInCenter: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.MakeTempCardInHand.Ctor2)(PatchManager.nullptr, cardPtr, numCards, Number(isOtherCardInCenter));
            }
        },
        RelicAboveCreature: {
            Ctor(creaturePtr: NativePointer, relicPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.RelicAboveCreature.Ctor)(PatchManager.nullptr, creaturePtr, relicPtr);
            }
        },
        Discard: {
            Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
                return PatchManager.Actions.Discard.Ctor2(target, source, amount, false, false);
            },
            Ctor2(target: NativePointer, source: NativePointer, amount: number, isRandom: boolean, endTurn: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.Discard.Ctor2)(PatchManager.nullptr, target, source, amount, Number(isRandom), Number(endTurn));
            },
        },
        DrawCard: {
            Ctor(source: NativePointer, cardAmount: number, endTurnDraw: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.DrawCard.Ctor)(PatchManager.nullptr, source, cardAmount, Number(endTurnDraw));
            },
            Ctor2(cardAmount: number): NativePointer {
                return PatchManager.Actions.DrawCard.Ctor(PatchManager.nullptr, cardAmount, false);
            },
        },
        Damage: {
            Ctor(target: NativePointer, dmgInfo: NativePointer, effect: AttackEffect): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.Damage.Ctor)(PatchManager.nullptr, target, dmgInfo, Number(effect));
            },
        },
        GainBlock: {
            Ctor(target: NativePointer, amount: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.GainBlock.Ctor)(PatchManager.nullptr, target, amount);
            },
            Ctor2(target: NativePointer, source: NativePointer, amount: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.GainBlock.Ctor2)(PatchManager.nullptr, target, source, amount);
            },
            Ctor3(target: NativePointer, amount: number, superFast: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.GainBlock.Ctor3)(PatchManager.nullptr, target, amount, Number(superFast));
            },
            Ctor4(target: NativePointer, source: NativePointer, amount: number, superFast: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.GainBlock.Ctor2)(PatchManager.nullptr, target, source, amount, Number(superFast));
            },
        },
        LoseHP: {
            Ctor(target: NativePointer, source: NativePointer, amount: number, atkEffect: AttackEffect): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Actions.LoseHP.Ctor)(PatchManager.nullptr, target, source, amount, Number(atkEffect));
            },
        },
    };
    static readonly Cards = {
        AbstractCard: {
            Ctor(id: string, name: string, imgUrl: string, cost: number, rawDescription: string,
                type: CardType, color: CardColor, rarity: CardRarity, target: CardTarget, dType: DamageType): NativePointer {
                let nativeId = PatchManager.STSLib.JString.Ctor(id);
                let nativeName = PatchManager.STSLib.JString.Ctor(name);
                let nativeimgUrl = PatchManager.STSLib.JString.Ctor(imgUrl);
                let nativerawDescription = PatchManager.STSLib.JString.Ctor(rawDescription);
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.AbstractCard.Ctor)(PatchManager.nullptr, nativeId, nativeName,
                    nativeimgUrl, cost, nativerawDescription, Number(type), Number(color), Number(rarity), Number(target), Number(dType));
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer, id: NativePointer, name: NativePointer, imgUrl: NativePointer, cost: number, rawDescription: NativePointer,
                type: Number, color: Number, rarity: Number, target: Number, dType: Number) => NativePointer):
                (thisPtr: NativePointer, id: NativePointer, name: NativePointer, imgUrl: NativePointer, cost: number, rawDescription: NativePointer,
                    type: Number, color: Number, rarity: Number, target: Number, dType: Number) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.AbstractCard.Ctor, newCtor);
            },
        },
        DamageInfo: {
            Ctor(damageSource: NativePointer, dmgValue: number, dmgTYpe: DamageType): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.DamageInfo.Ctor)(PatchManager.nullptr, damageSource, dmgValue, Number(dmgTYpe));
            }
        },
        Red: {
            Bash: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Bash.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Bash.Ctor, newCtor);
                },
            },
            Clothesline: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Clothesline.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Clothesline.Ctor, newCtor);
                },
            },
            DefendRed: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.DefendRed.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.DefendRed.Ctor, newCtor);
                },
            },
            Feed: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Feed.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Feed.Ctor, newCtor);
                },
            },
            HeavyBlade: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.HeavyBlade.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.HeavyBlade.Ctor, newCtor);
                },
            },
            PerfectedStrike: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.PerfectedStrike.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.PerfectedStrike.Ctor, newCtor);
                },
            },
            SearingBlow: {
                Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                    PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.SearingBlow.Use)(thisPtr, caster, target);
                },
                /** return origin Use */
                OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.SearingBlow.Use, newUse);
                }
            },
            StrikeRed: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.StrikeRed.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.StrikeRed.Ctor, newCtor);
                },
            },
            DemonForm: {
                Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                    PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.DemonForm.Use)(thisPtr, caster, target);
                },
                /** return origin Use */
                OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.DemonForm.Use, newUse);
                }
            },
            Thunderclap: {
                Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                    PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Thunderclap.Use)(thisPtr, caster, target);
                },
                /** return origin Use */
                OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Thunderclap.Use, newUse);
                }
            }
        },
        Purple: {
            Alpha: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Purple.Alpha.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Purple.Alpha.Ctor, newCtor);
                }
            }
        },
        Temp: {
            Omega: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Temp.Omega.Ctor)(PatchManager.nullptr);
                },
            }
        },
        status: {
            Burn: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.status.Burn.Ctor)(PatchManager.nullptr);
                }
            },
        },
    };
    static readonly CardLibrary = {
        initialize() {
            PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.CardLibrary.initialize)(PatchManager.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.CardLibrary.initialize, newIniter);
        },
        Add(cardPtr: NativePointer): void {
            PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.CardLibrary.Add)(cardPtr);
        },
        OverrideAdd(newFunc: (cardPtr: NativePointer) => void): (cardPtr: NativePointer) => void {
            return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.CardLibrary.Add, newFunc);
        }
    };
    static readonly RelicLibrary = {
        initialize() {
            PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.RelicLibrary.initialize)(PatchManager.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.RelicLibrary.initialize, newIniter);
        },
        Add(relicPtr: NativePointer): void {
            PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.RelicLibrary.Add)(relicPtr);
        },
        OverrideAdd(newFunc: (relicPtr: NativePointer) => void): (relicPtr: NativePointer) => void {
            return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.RelicLibrary.Add, newFunc);
        }
    };
    static readonly Characters = {
        AbstractPlayer: {
            loseGold(thisPtr: NativePointer, gold: number): void {
                PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Characters.AbstractPlayer.loseGold)(thisPtr, gold);
            },
            OverridloseGold(newFunc: (thisPtr: NativePointer, gold: number) => void): (thisPtr: NativePointer, gold: number) => void {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Characters.AbstractPlayer.loseGold, newFunc);
            },
            gainGold(thisPtr: NativePointer, gold: number): void {
                PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Characters.AbstractPlayer.gainGold)(thisPtr, gold);
            },
            OverridgainGold(newFunc: (thisPtr: NativePointer, gold: number) => void): (thisPtr: NativePointer, gold: number) => void {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Characters.AbstractPlayer.gainGold, newFunc);
            },
        },
        Ironclad: {
            getStartingDeck(thisPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Characters.Ironclad.getStartingDeck)(thisPtr);
            },
            OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Characters.Ironclad.getStartingDeck, newFunc);
            },
        },
        TheSilent: {
            getStartingDeck(thisPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Characters.TheSilent.getStartingDeck)(thisPtr);
            },
            OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Characters.TheSilent.getStartingDeck, newFunc);
            },
        },
        Defect: {
            getStartingDeck(thisPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Characters.Defect.getStartingDeck)(thisPtr);
            },
            OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Characters.Defect.getStartingDeck, newFunc);
            },
        },
        Watcher: {
            getStartingDeck(thisPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Characters.Watcher.getStartingDeck)(thisPtr);
            },
            OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Characters.Watcher.getStartingDeck, newFunc);
            },
        },
    };
    static readonly Powers = {
        Confusion: {
            OverrideonCardDraw(newCallback: (thisPtr: NativePointer, cardPtr: NativePointer) => void): (thisPtr: NativePointer, cardPtr: NativePointer) => void {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Powers.ConfusionPower.onCardDraw, newCallback);
            }
        },
        DemonForm: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Powers.DemonFormPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
        IntangiblePlayer: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Powers.IntangiblePlayerPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
        Echo: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Powers.EchoPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
        Deva: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Powers.DevaPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
        FreeAttack: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Powers.FreeAttackPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
    };
    static readonly Relics = {
        AbstractRelic: {
            Ctor(relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound): NativePointer {
                let nativeRelicId = PatchManager.STSLib.JString.Ctor(relicId);
                let nativeImgUrl = PatchManager.STSLib.JString.Ctor(imgName);
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Relics.AbstractRelic.Ctor)(PatchManager.nullptr, nativeRelicId, nativeImgUrl, Number(tier), Number(sfx));
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer, relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer):
                (relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Relics.AbstractRelic.Ctor, newCtor);
            },
        },
        BurningBlood: {
            OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Relics.BurningBlood.onVictory, newCallback);
            }
        },
        BlackBlood: {
            OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Relics.BlackBlood.onVictory, newCallback);
            }
        },
        Ginger: {
            Ctor(): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Relics.Ginger.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Relics.Ginger.Ctor, newCtor);
            }
        },
        SacredBark: {
            Ctor(): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Relics.SacredBark.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Relics.SacredBark.Ctor, newCtor);
            },
        },
        CoffeeDripper: {
            Ctor(): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor, newCtor);
            },
        },
        MarkofPain: {
            OverrideatBattleStart(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Relics.MarkofPain.atBattleStart, newCallback);
            },
        },
        RunicPyramid: {
            Ctor(): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Relics.RunicPyramid.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Relics.RunicPyramid.Ctor, newCtor);
            },
        },
    };
    static readonly Potions = {
        PotionSlot: {
            Ctor(index: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Potions.PotionSlot.Ctor)(PatchManager.nullptr, index);
            }
        }
    };
    static readonly VFX = {
        ShowCardBrieflyEffect: {
            Ctor(cardPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.VFX.ShowCardBrieflyEffect.Ctor)(PatchManager.nullptr, cardPtr);
            }
        },
        UpgradeShineEffect: {
            Ctor(x: number, y: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.VFX.UpgradeShineEffect.Ctor)(PatchManager.nullptr, x, y);
            }
        }
    };

    static readonly InstructionPtr = {
        /**
         * AbstractDungeon::getRewardCards
         * 
         * origin Instruction: ```0x17BE846 05 25 MOVS R5, #3```
         */
        get rewardCardNumber() {
            return PatchManager.#GetOffsetPtr(0x17BE846);
        },
        /**
         *  VelvetChoker::onPlayCard
         * 
         * origin Instruction: ```019AD89E 05 28 CMP R0, #5```
         */
        get VelvetChokerPlayCounter() {
            return PatchManager.#GetOffsetPtr(0x19AD89E);
        },
        /**
         *  VelvetChoker::onPlayCard
         * 
         * origin Instruction: ```019AD8E2 06 28 CMP R0, #6```
         */
        get VelvetChokerCanPlayCheck() {
            return PatchManager.#GetOffsetPtr(0x19AD8E2);
        },
        /**
         *  VelvetChoker::onPlayCard
         * 
         * origin Instruction: ```019AD904 06 21 MOVS R1, #6```
         */
        get VelvetChokerCanPlayStateValue() {
            return PatchManager.#GetOffsetPtr(0x19AD904);
        }
    };

    static readonly STSGlobalVars = {
        get STSSetting_WIDTH() {
            return PatchManager.#GetOffsetPtr(0x34987C0).readS32();
        },
        get STSSetting_HEIGHT() {
            return PatchManager.#GetOffsetPtr(0x34987C4).readS32();
        },
        get AbstractDungeon_player() {
            return new AbstractPlayer(PatchManager.#GetOffsetPtr(0x3498EDC).readPointer());
        },
        get AbstractDungeon_topLevelEffects() {
            return PatchManager.#GetOffsetPtr(0x3498F84).readPointer();
        },
    };

    static readonly fakeCodeGen = {
        V_PPP_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, void* arg2, void* arg3) { return ; }";
        },
        V_P_Func(funcName: string) {
            return "void " + funcName + "(void * arg1) { return ; }";
        },
        P_P_Func(funcName: string) {
            return "void* " + funcName + "(void * arg1) { return (void *)0; }";
        },
        /**if int != int32_t, this func not work. */
        I32_PI32_Func(funcName: string) {
            return "int " + funcName + "(void * arg1, int arg2) { return 0; }";
        }
    };

    static #GetOffsetPtr(offset: number): NativePointer {
        if (!PatchManager.#GlobalVarCache.has(offset)) {
            PatchManager.#GlobalVarCache.set(offset, PatchManager.STSModuleBaseAddress.add(offset));
        }
        return PatchManager.#GlobalVarCache.get(offset) || PatchManager.nullptr;
    }

    static #GetNativeFunction(origFuncInfo: NativeFunctionInfo): NativeFunction<any, any> {
        let funcAddressPtr = PatchManager.STSModuleBaseAddress.add(origFuncInfo.funcOffset);
        let funcAddress = funcAddressPtr.toString();
        let nativeFunc = PatchManager.#NativeFuncCache.get(funcAddress);
        if (nativeFunc === undefined) {
            nativeFunc = new NativeFunction(funcAddressPtr, origFuncInfo.retType, origFuncInfo.argTypes);
            PatchManager.#NativeFuncCache.set(funcAddress, nativeFunc);
        }

        return nativeFunc;
    }

    static GetNativeVFunction(funcPtr: NativePointer, returnType: NativeFunctionReturnType, argTypes: NativeFunctionArgumentType[]): NativeFunction<any, any> {
        let funcAddress = funcPtr.toString();
        let vFunc = PatchManager.#NativeFuncCache.get(funcAddress);
        if (vFunc === undefined) {
            vFunc = new NativeFunction(funcPtr, returnType, argTypes);
            PatchManager.#NativeFuncCache.set(funcAddress, vFunc);
        }
        return vFunc;
    }

    static #HookSTSFunction(origFuncInfo: NativeFunctionInfo, fakeFunc: (...args: any) => any): NativeFunction<any, any> {
        let origFunc = PatchManager.#GetNativeFunction(origFuncInfo)
        let fakeCallback = new NativeCallback(fakeFunc, origFuncInfo.retType, origFuncInfo.argTypes);
        Interceptor.replace(origFunc, fakeCallback);
        return origFunc;
    }

    static LogV(message: string) {
        let nowDate = new Date();
        let timeStr = nowDate.getHours() + "." + nowDate.getMinutes() + "." + nowDate.getSeconds() + "." + nowDate.getMilliseconds();
        PatchManager.#STSLogger.write(timeStr + " : " + message + "\n");
        PatchManager.#STSLogger.flush();
    }
}