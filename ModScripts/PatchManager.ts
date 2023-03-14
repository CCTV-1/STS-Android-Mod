import { NativeFunctionInfo } from "./NativeFunctionInfo.js"
import { AbstractPlayer } from "./AbstractPlayer.js";
import { AttackEffect } from "./enums.js";

export class PatchManager {
    static nullptr = new NativePointer(0);
    static STSModuleBaseAddress = Module.findBaseAddress("libSpire_ANDROID.so") || PatchManager.nullptr;

    static #STSLogger = new File("/sdcard/Android/data/com.humble.SlayTheSpire/files/ModScripts/ModLog.txt", "w+");
    static #NativeFunctionInfoMap = {
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
            }
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
        },
        Cards: {
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
        },
        Characters: {
            AbstractPlayer: {
                /**
                 * ```c
                 * void AbstractPlayer::loseGold(STS::AbstractPlayer * player, int gold)
                 * ```
                 */
                loseGold: new NativeFunctionInfo(0x1756c69, 'void', ['pointer', 'int32'])
            },
            Ironclad: {
                /**
                 * ```c
                 * ArrayList* Ironclad::getStartingDeck(STS::Ironclad* thisPtr)
                 * ```
                 */
                getStartingDeck: new NativeFunctionInfo(0x1777921, 'pointer', ['pointer'])
            },
            TheSilent: {
                /**
                 * ```c
                 * ArrayList* TheSilent::getStartingDeck(STS::TheSilent* thisPtr)
                 * ```
                 */
                getStartingDeck: new NativeFunctionInfo(0x1778D71, 'pointer', ['pointer'])
            },
            Defect: {
                /**
                 * ```c
                 * ArrayList* Defect::getStartingDeck(STS::Defect* thisPtr)
                 * ```
                 */
                getStartingDeck: new NativeFunctionInfo(0x1776289, 'pointer', ['pointer'])
            },
            Watcher: {
                /**
                 * ```c
                 * ArrayList* Watcher::getStartingDeck(STS::Watcher* thisPtr)
                 * ```
                 */
                getStartingDeck: new NativeFunctionInfo(0x177A7DD, 'pointer', ['pointer'])
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
    static #NativeFuncCache = new Map<string, NativeFunction<any, any>>();
    static #GlobalVarCache = new Map<number, NativePointer>();

    static STSLib = {
        ArrayList: {
            JString: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.ArrayList.JString.Ctor)(PatchManager.nullptr);
                },
                Add(thisPtr: NativePointer, JStringPtr: NativePointer): boolean {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.STSLib.ArrayList.JString.Add)(thisPtr, JStringPtr);
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
    static Actions = {
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
    };
    static Cards = {
        Red: {
            Bash: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Bash.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Bash.Ctor, newCtor);
                },
            },
            Clothesline: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Clothesline.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Clothesline.Ctor, newCtor);
                },
            },
            DefendRed: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.DefendRed.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.DefendRed.Ctor, newCtor);
                },
            },
            Feed: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Feed.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.Feed.Ctor, newCtor);
                },
            },
            HeavyBlade: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.HeavyBlade.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                    return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.HeavyBlade.Ctor, newCtor);
                },
            },
            PerfectedStrike: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Cards.Red.PerfectedStrike.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
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
                OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
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
                OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
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
    };
    static Characters = {
        AbstractPlayer: {
            loseGold(thisPtr: NativePointer, gold: number): void {
                PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Characters.AbstractPlayer.loseGold)(thisPtr, gold);
            },
            OverridloseGold(newFunc: (thisPtr: NativePointer, gold: number) => void): (thisPtr: NativePointer, gold: number) => void {
                return PatchManager.#HookSTSFunction(PatchManager.#NativeFunctionInfoMap.Characters.AbstractPlayer.loseGold, newFunc);
            }
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
    static Powers = {
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
    }
    static Relics = {
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
        }
    }
    static Potions = {
        PotionSlot: {
            Ctor(index: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.Potions.PotionSlot.Ctor)(PatchManager.nullptr, index);
            }
        }
    };
    static VFX = {
        ShowCardBrieflyEffect: {
            Ctor(cardPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.VFX.ShowCardBrieflyEffect.Ctor)(PatchManager.nullptr, cardPtr);
            }
        },
        //STS::AbstractGameEffect * VFX::ShowCardBrieflyEffect::Ctor(STS::AbstractGameEffect * thisPtr, float x, float y)
        UpgradeShineEffect: {
            Ctor(x: number, y: number): NativePointer {
                return PatchManager.#GetNativeFunction(PatchManager.#NativeFunctionInfoMap.VFX.ShowCardBrieflyEffect.Ctor)(PatchManager.nullptr, x, y);
            }
        }
    }

    static StringLiteral = {
        //red card names
        get DefendRed() {
            return PatchManager.#GetOffsetPtr(0x3490118).readPointer();
        },
        get InfernalBlade() {
            return PatchManager.#GetOffsetPtr(0x3491FF0).readPointer();
        },
        get SearingBlow() {
            return PatchManager.#GetOffsetPtr(0x3493DC4).readPointer();
        },
        get StrikeRed() {
            return PatchManager.#GetOffsetPtr(0x3494654).readPointer();
        },
        get TrueGrit() {
            return PatchManager.#GetOffsetPtr(0x3494DFC).readPointer();
        },

        //green card names
        get DefendGreen() {
            return PatchManager.#GetOffsetPtr(0x3490110).readPointer();
        },
        get Distraction() {
            return PatchManager.#GetOffsetPtr(0x349025C).readPointer();
        },
        get Neutralize() {
            return PatchManager.#GetOffsetPtr(0x3492D38).readPointer();
        },
        get StrikeGreen() {
            return PatchManager.#GetOffsetPtr(0x349464C).readPointer();
        },

        //blue card names
        get DefendBlue() {
            return PatchManager.#GetOffsetPtr(0x349010C).readPointer();
        },
        get Dualcast() {
            return PatchManager.#GetOffsetPtr(0x3490350).readPointer();
        },
        get StrikeBlue() {
            return PatchManager.#GetOffsetPtr(0x3494648).readPointer();
        },
        get WhiteNoise() {
            return PatchManager.#GetOffsetPtr(0x3495718).readPointer();
        },

        //Purple card names
        get DefendPurple() {
            return PatchManager.#GetOffsetPtr(0x3490114).readPointer();
        },
        get Eruption() {
            return PatchManager.#GetOffsetPtr(0x3490680).readPointer();
        },
        get ForeignInfluence() {
            return PatchManager.#GetOffsetPtr(0x3490A98).readPointer();
        },
        get StrikePurple() {
            return PatchManager.#GetOffsetPtr(0x3494650).readPointer();
        },
        get Vigilance() {
            return PatchManager.#GetOffsetPtr(0x34951CC).readPointer();
        },

        //colorless card names
        get Discovery() {
            return PatchManager.#GetOffsetPtr(0x3490238).readPointer();
        },
    };

    static InstructionPtr = {
        /**
         * AbstractDungeon::getRewardCards
         * 
         * origin Instruction: ```0x17BE846 05 25 MOVS R5, #3```
         */
        get rewardCardNumber() {
            return PatchManager.#GetOffsetPtr(0x17BE846);
        },
    }

    static STSGlobalVars = {
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

    static fakeCodeGen = {
        V_PPP_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, void* arg2, void* arg3) { return ; }";
        },
        V_P_Func(funcName: string) {
            return "void " + funcName + "(void * arg1) { return ; }";
        },
    }

    static #GetOffsetPtr(offset: number) {
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

    static GetNativeVFunction(funcPtr: NativePointer, returnType: NativeFunctionReturnType, argTypes: NativeFunctionArgumentType[]) {
        let funcAddress = funcPtr.toString();
        let vFunc = PatchManager.#NativeFuncCache.get(funcAddress);
        if (vFunc === undefined) {
            vFunc = new NativeFunction(funcPtr, returnType, argTypes);
            PatchManager.#NativeFuncCache.set(funcAddress, vFunc);
        }
        return vFunc;
    }

    static #HookSTSFunction(origFuncInfo: NativeFunctionInfo, fakeFunc: (...args: any) => any) {
        let origFunc = PatchManager.#GetNativeFunction(origFuncInfo)
        let fakeCallback = new NativeCallback(fakeFunc, origFuncInfo.retType, origFuncInfo.argTypes);
        Interceptor.replace(origFunc, fakeCallback);
        return origFunc;
    }

    static LogV(message: string) {
        let nowDate = new Date();
        let timeStr = nowDate.getHours() + "." + nowDate.getMinutes() + "." + nowDate.getSeconds();
        PatchManager.#STSLogger.write(timeStr + " : " + message + "\n");
        PatchManager.#STSLogger.flush();
    }
}