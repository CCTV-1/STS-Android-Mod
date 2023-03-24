import { NativeFunctionInfo, NativeFunctionInfoMap } from "./NativeFunctionInfo.js"
import { AbstractPlayer } from "./AbstractPlayer.js";
import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType, LandingSound, RelicTier } from "./enums.js";
import { STSCardCtor } from "./AbstractCard.js";

export class PatchManager {
    static readonly nullptr = new NativePointer(0);
    static readonly STSModuleBaseAddress = Module.findBaseAddress("libSpire_ANDROID.so") || PatchManager.nullptr;

    static readonly #STSLogger = new File("/sdcard/Android/data/com.humble.SlayTheSpire/files/ModScripts/ModLog.txt", "w+");
    static readonly RewriteVFuncMap = new Map<string, NativePointer>();
    static readonly #NativeFuncCache = new Map<string, NativeFunction<any, any>>();
    static readonly #GlobalVarCache = new Map<number, NativePointer>();

    static readonly STSLib = {
        ArrayList: {
            JString: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.JString.Ctor)(PatchManager.nullptr);
                },
                AddNativeStr(thisPtr: NativePointer, JStringPtr: NativePointer): boolean {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.JString.Add)(thisPtr, JStringPtr);
                },
                Add(thisPtr: NativePointer, str: string): boolean {
                    let nativeStr = PatchManager.STSLib.JString.Ctor(str);
                    return PatchManager.STSLib.ArrayList.JString.AddNativeStr(thisPtr, nativeStr);
                },
            },
            AbstractGameEffect: {
                Add(thisPtr: NativePointer, effectPtr: NativePointer): boolean {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractGameEffect.Add)(thisPtr, effectPtr);
                },
            },
            AbstractPotion: {
                Add(thisPtr: NativePointer, potionPtr: NativePointer): boolean {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractPotion.Add)(thisPtr, potionPtr);
                },
            },
            AbstractCard: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractCard.Ctor)(PatchManager.nullptr);
                },
                get(dataPtr: NativePointer, index: number): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.ArrayList.AbstractCard.get)(dataPtr, index);
                }
            },
        },
        JString: {
            /** UTF-16 string ctor*/
            Ctor(str: string): NativePointer {
                let nativeMem = Memory.allocUtf16String(str);
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor)(PatchManager.nullptr, nativeMem);
            },
            /** UTF-16 string ctor*/
            Ctor2(str: string, start: number, len: number): NativePointer {
                let nativeMem = Memory.allocUtf16String(str);
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor2)(PatchManager.nullptr, nativeMem, start, len);
            },
            /** C string ctor, don't use this*/
            Ctor3(str: string): NativePointer {
                let nativeMem = Memory.allocAnsiString(str);
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor3)(PatchManager.nullptr, nativeMem);
            },
            /** C string ctor, don't use this*/
            Ctor4(str: string, start: number, len: number): NativePointer {
                let nativeMem = Memory.allocAnsiString(str);
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.STSLib.JString.Ctor4)(PatchManager.nullptr, nativeMem, start, len);
            },
        },
    };
    static readonly Actions = {
        //AbstractGameAction* HealAction(AbstractGameAction* this, STS::AbstractCreature* target, STS::AbstractCreature* source, int amount)
        Heal: {
            Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.Heal.Ctor)(PatchManager.nullptr, target, source, amount);
            }
        },
        ApplyPower: {
            Ctor(target: NativePointer, source: NativePointer, power: NativePointer, amount: number, isFast: boolean, effect: AttackEffect): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.ApplyPower.Ctor)(PatchManager.nullptr, target, source, power, amount, Number(isFast), Number(effect));
            },
            Ctor2(target: NativePointer, source: NativePointer, power: NativePointer, amount: number): NativePointer {
                return PatchManager.Actions.ApplyPower.Ctor(target, source, power, amount, false, AttackEffect.NONE);
            },
        },
        Scry: {
            Ctor(numcards: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.Scry.Ctor)(PatchManager.nullptr, numcards);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer, numCards: number) => NativePointer): (thisPtr: NativePointer, numCards: number) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Actions.Scry.Ctor, newCtor);
            },
        },
        MakeTempCardInHand: {
            Ctor(cardPtr: NativePointer, numCards: number, isOtherCardInCenter: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.MakeTempCardInHand.Ctor2)(PatchManager.nullptr, cardPtr, numCards, Number(isOtherCardInCenter));
            }
        },
        RelicAboveCreature: {
            Ctor(creaturePtr: NativePointer, relicPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.RelicAboveCreature.Ctor)(PatchManager.nullptr, creaturePtr, relicPtr);
            }
        },
        Discard: {
            Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
                return PatchManager.Actions.Discard.Ctor2(target, source, amount, false, false);
            },
            Ctor2(target: NativePointer, source: NativePointer, amount: number, isRandom: boolean, endTurn: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.Discard.Ctor2)(PatchManager.nullptr, target, source, amount, Number(isRandom), Number(endTurn));
            },
        },
        DrawCard: {
            Ctor(source: NativePointer, cardAmount: number, endTurnDraw: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.DrawCard.Ctor)(PatchManager.nullptr, source, cardAmount, Number(endTurnDraw));
            },
            Ctor2(cardAmount: number): NativePointer {
                return PatchManager.Actions.DrawCard.Ctor(PatchManager.nullptr, cardAmount, false);
            },
        },
        Damage: {
            Ctor(target: NativePointer, dmgInfo: NativePointer, effect: AttackEffect): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.Damage.Ctor)(PatchManager.nullptr, target, dmgInfo, Number(effect));
            },
        },
        GainBlock: {
            Ctor(target: NativePointer, amount: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor)(PatchManager.nullptr, target, amount);
            },
            Ctor2(target: NativePointer, source: NativePointer, amount: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor2)(PatchManager.nullptr, target, source, amount);
            },
            Ctor3(target: NativePointer, amount: number, superFast: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor3)(PatchManager.nullptr, target, amount, Number(superFast));
            },
            Ctor4(target: NativePointer, source: NativePointer, amount: number, superFast: boolean): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.GainBlock.Ctor2)(PatchManager.nullptr, target, source, amount, Number(superFast));
            },
        },
        LoseHP: {
            Ctor(target: NativePointer, source: NativePointer, amount: number, atkEffect: AttackEffect): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Actions.LoseHP.Ctor)(PatchManager.nullptr, target, source, amount, Number(atkEffect));
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
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.AbstractCard.Ctor)(PatchManager.nullptr, nativeId, nativeName,
                    nativeimgUrl, cost, nativerawDescription, Number(type), Number(color), Number(rarity), Number(target), Number(dType));
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer, id: NativePointer, name: NativePointer, imgUrl: NativePointer, cost: number, rawDescription: NativePointer,
                type: Number, color: Number, rarity: Number, target: Number, dType: Number) => NativePointer):
                (thisPtr: NativePointer, id: NativePointer, name: NativePointer, imgUrl: NativePointer, cost: number, rawDescription: NativePointer,
                    type: Number, color: Number, rarity: Number, target: Number, dType: Number) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.AbstractCard.Ctor, newCtor);
            },
        },
        DamageInfo: {
            Ctor(damageSource: NativePointer, dmgValue: number, dmgTYpe: DamageType): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.DamageInfo.Ctor)(PatchManager.nullptr, damageSource, dmgValue, Number(dmgTYpe));
            }
        },
        Red: {
            Bash: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.Bash.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.Bash.Ctor, newCtor);
                },
            },
            Clothesline: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.Clothesline.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.Clothesline.Ctor, newCtor);
                },
            },
            DefendRed: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.DefendRed.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.DefendRed.Ctor, newCtor);
                },
            },
            Feed: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.Feed.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.Feed.Ctor, newCtor);
                },
            },
            HeavyBlade: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.HeavyBlade.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.HeavyBlade.Ctor, newCtor);
                },
            },
            PerfectedStrike: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.PerfectedStrike.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.PerfectedStrike.Ctor, newCtor);
                },
            },
            SearingBlow: {
                Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                    PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.SearingBlow.Use)(thisPtr, caster, target);
                },
                /** return origin Use */
                OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.SearingBlow.Use, newUse);
                }
            },
            StrikeRed: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.StrikeRed.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.StrikeRed.Ctor, newCtor);
                },
            },
            DemonForm: {
                Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                    PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.DemonForm.Use)(thisPtr, caster, target);
                },
                /** return origin Use */
                OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.DemonForm.Use, newUse);
                }
            },
            Thunderclap: {
                Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                    PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Red.Thunderclap.Use)(thisPtr, caster, target);
                },
                /** return origin Use */
                OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Red.Thunderclap.Use, newUse);
                }
            }
        },
        Purple: {
            Alpha: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Purple.Alpha.Ctor)(PatchManager.nullptr);
                },
                /** return origin Ctor */
                OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                    return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Cards.Purple.Alpha.Ctor, newCtor);
                }
            }
        },
        Temp: {
            Omega: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.Temp.Omega.Ctor)(PatchManager.nullptr);
                },
            }
        },
        status: {
            Burn: {
                Ctor(): NativePointer {
                    return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Cards.status.Burn.Ctor)(PatchManager.nullptr);
                }
            },
        },
    };
    static readonly CardLibrary = {
        initialize() {
            PatchManager.#GetNativeFunction(NativeFunctionInfoMap.CardLibrary.initialize)(PatchManager.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.CardLibrary.initialize, newIniter);
        },
        Add(cardPtr: NativePointer): void {
            PatchManager.#GetNativeFunction(NativeFunctionInfoMap.CardLibrary.Add)(cardPtr);
        },
        OverrideAdd(newFunc: (cardPtr: NativePointer) => void): (cardPtr: NativePointer) => void {
            return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.CardLibrary.Add, newFunc);
        }
    };
    static readonly RelicLibrary = {
        initialize() {
            PatchManager.#GetNativeFunction(NativeFunctionInfoMap.RelicLibrary.initialize)(PatchManager.nullptr);
        },
        Overrideinitialize(newIniter: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
            return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.RelicLibrary.initialize, newIniter);
        },
        Add(relicPtr: NativePointer): void {
            PatchManager.#GetNativeFunction(NativeFunctionInfoMap.RelicLibrary.Add)(relicPtr);
        },
        OverrideAdd(newFunc: (relicPtr: NativePointer) => void): (relicPtr: NativePointer) => void {
            return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.RelicLibrary.Add, newFunc);
        }
    };
    static readonly Characters = {
        AbstractPlayer: {
            loseGold(thisPtr: NativePointer, gold: number): void {
                PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Characters.AbstractPlayer.loseGold)(thisPtr, gold);
            },
            OverridloseGold(newFunc: (thisPtr: NativePointer, gold: number) => void): (thisPtr: NativePointer, gold: number) => void {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Characters.AbstractPlayer.loseGold, newFunc);
            },
            gainGold(thisPtr: NativePointer, gold: number): void {
                PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Characters.AbstractPlayer.gainGold)(thisPtr, gold);
            },
            OverridgainGold(newFunc: (thisPtr: NativePointer, gold: number) => void): (thisPtr: NativePointer, gold: number) => void {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Characters.AbstractPlayer.gainGold, newFunc);
            },
        },
        Ironclad: {
            getStartingDeck(thisPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Characters.Ironclad.getStartingDeck)(thisPtr);
            },
            OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Characters.Ironclad.getStartingDeck, newFunc);
            },
        },
        TheSilent: {
            getStartingDeck(thisPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Characters.TheSilent.getStartingDeck)(thisPtr);
            },
            OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Characters.TheSilent.getStartingDeck, newFunc);
            },
        },
        Defect: {
            getStartingDeck(thisPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Characters.Defect.getStartingDeck)(thisPtr);
            },
            OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Characters.Defect.getStartingDeck, newFunc);
            },
        },
        Watcher: {
            getStartingDeck(thisPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Characters.Watcher.getStartingDeck)(thisPtr);
            },
            OverridegetStartingDeck(newFunc: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Characters.Watcher.getStartingDeck, newFunc);
            },
        },
    };
    static readonly Powers = {
        Confusion: {
            OverrideonCardDraw(newCallback: (thisPtr: NativePointer, cardPtr: NativePointer) => void): (thisPtr: NativePointer, cardPtr: NativePointer) => void {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Powers.ConfusionPower.onCardDraw, newCallback);
            }
        },
        DemonForm: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Powers.DemonFormPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
        IntangiblePlayer: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Powers.IntangiblePlayerPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
        Echo: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Powers.EchoPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
        Deva: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Powers.DevaPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
        FreeAttack: {
            Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Powers.FreeAttackPower.Ctor)(PatchManager.nullptr, owner, strengthAmount);
            }
        },
    };
    static readonly Relics = {
        AbstractRelic: {
            Ctor(relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound): NativePointer {
                let nativeRelicId = PatchManager.STSLib.JString.Ctor(relicId);
                let nativeImgUrl = PatchManager.STSLib.JString.Ctor(imgName);
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Relics.AbstractRelic.Ctor)(PatchManager.nullptr, nativeRelicId, nativeImgUrl, Number(tier), Number(sfx));
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer, relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer):
                (relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Relics.AbstractRelic.Ctor, newCtor);
            },
        },
        BurningBlood: {
            OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Relics.BurningBlood.onVictory, newCallback);
            }
        },
        BlackBlood: {
            OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Relics.BlackBlood.onVictory, newCallback);
            }
        },
        Ginger: {
            Ctor(): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Relics.Ginger.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Relics.Ginger.Ctor, newCtor);
            }
        },
        SacredBark: {
            Ctor(): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Relics.SacredBark.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Relics.SacredBark.Ctor, newCtor);
            },
        },
        CoffeeDripper: {
            Ctor(): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor, newCtor);
            },
        },
        MarkofPain: {
            OverrideatBattleStart(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Relics.MarkofPain.atBattleStart, newCallback);
            },
        },
        RunicPyramid: {
            Ctor(): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Relics.RunicPyramid.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.#HookSTSFunction(NativeFunctionInfoMap.Relics.RunicPyramid.Ctor, newCtor);
            },
        },
    };
    static readonly Potions = {
        PotionSlot: {
            Ctor(index: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.Potions.PotionSlot.Ctor)(PatchManager.nullptr, index);
            }
        }
    };
    static readonly VFX = {
        ShowCardBrieflyEffect: {
            Ctor(cardPtr: NativePointer): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.VFX.ShowCardBrieflyEffect.Ctor)(PatchManager.nullptr, cardPtr);
            }
        },
        UpgradeShineEffect: {
            Ctor(x: number, y: number): NativePointer {
                return PatchManager.#GetNativeFunction(NativeFunctionInfoMap.VFX.UpgradeShineEffect.Ctor)(PatchManager.nullptr, x, y);
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