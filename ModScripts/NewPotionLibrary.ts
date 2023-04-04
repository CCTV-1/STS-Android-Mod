import { OmniscientPotion } from "./NewPotions/OmniscientPotion.js";
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
        ["OmniscientPotion", OmniscientPotion],
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