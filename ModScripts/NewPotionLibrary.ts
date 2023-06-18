import { ApocalypsePotion } from "./NewPotions/ApocalypsePotion.js";
import { BlightsPotion } from "./NewPotions/BlightsPotion.js";
import { ElixirOfImmortality } from "./NewPotions/ElixirOfImmortality.js";
import { EndlessCyclePotion } from "./NewPotions/EndlessCyclePotion.js";
import { IllusionPotion } from "./NewPotions/IllusionPotion.js";
import { MadnessPotion } from "./NewPotions/MadnessPotion.js";
import { MutationPotion } from "./NewPotions/MutationPotion.js";
import { OmniscientPotion } from "./NewPotions/OmniscientPotion.js";
import { ResetPotion } from "./NewPotions/ResetPotion.js";
import { SuperPolymerizationPotion } from "./NewPotions/SuperPolymerizationPotion.js";
import { SwapLifePotion } from "./NewPotions/SwapLifePotion.js";
import { TransformPotion } from "./NewPotions/TransformPotion.js";
import { PlayerClass } from "./enums.js";

/**
    The following id ready used by game:

    `Ambrosia`,`BottledMiracle`,`EssenceOfDarkness`,`Block Potion`,`Dexterity Potion`,`Energy Potion`,
    `Explosive Potion`,`Fire Potion`,`Strength Potion`,`Swift Potion`,`Poison Potion`,`Weak Potion`,
    `FearPotion`,`SkillPotion`,`PowerPotion`,`AttackPotion`,`ColorlessPotion`,`SteroidPotion`,`SpeedPotion`,
    `BlessingOfTheForge`,`PotionOfCapacity`,`CunningPotion`,`DistilledChaos`,`Ancient Potion`,`Regen Potion`,
    `GhostInAJar`,`FocusPotion`,`LiquidBronze`,`LiquidMemories`,`GamblersBrew`,`EssenceOfSteel`,`BloodPotion`,
    `StancePotion`,`DuplicationPotion`,`ElixirPotion`,`CultistPotion`,`Fruit Juice`,`SneckoOil`,`FairyPotion`,
    `SmokeBomb`,`EntropicBrew`,`HeartOfIron`,`Potion Slot`
*/
export class NewPotionLibrary {
    static PotionList = new Map<string, Function>([
        ["ApocalypsePotion", ApocalypsePotion],
        ["BlightsPotion", BlightsPotion],
        ["ElixirOfImmortality", ElixirOfImmortality],
        ["EndlessCyclePotion", EndlessCyclePotion],
        ["IllusionPotion", IllusionPotion],
        ["MadnessPotion", MadnessPotion],
        ["MutationPotion", MutationPotion],
        ["OmniscientPotion", OmniscientPotion],
        ["ResetPotion", ResetPotion],
        ["SuperPolymerizationPotion", SuperPolymerizationPotion],
        ["SwapLifePotion", SwapLifePotion],
        ["TransformPotion", TransformPotion],
    ]);

    static playerPotions(playerClass: PlayerClass): Array<string> {
        let playerPotions = new Array<string>();
        switch (playerClass) {
            case PlayerClass.DEFECT: {
                //playerPotions.push("");
                break;
            }
            case PlayerClass.THE_SILENT: {
                break;
            }
            case PlayerClass.DEFECT: {
                break;
            }
            case PlayerClass.WATCHER: {
                break;
            }
            default: {
                break;
            }
        }

        return playerPotions;
    }
}