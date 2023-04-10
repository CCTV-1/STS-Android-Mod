import { NativeFunctionInfo } from "../NativeFunctionInfo.js";

export const NativePowerInfo = {
    Abstract: {
        /**
         * ```c
         * STS::AbstractPower* Powers::AbstractPower::Ctor(STS::AbstractPower* thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x1955B3D, 'pointer', ['pointer']),
    },
    common: {
        Artifact: {
            /**
             * ```c
             * STS::AbstractPower* Powers::ArtifactPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1957FA1, 'pointer', ['pointer', 'pointer', 'int32']),
        },
        Confusion: {
            /**
             * ```c
             * STS::AbstractPower* Powers::Confusion(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x195C3B5, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * void ConfusionPower::onCardDraw(STS::AbstractPower * thisPtr, STS::AbstractCard * card)
             * ```
             */
            onCardDraw: new NativeFunctionInfo(0x195C54D, 'void', ['pointer', 'pointer']),
        },
        Dexterity: {
            /**
             * ```c
             * STS::AbstractPower* Powers::DexterityPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x195EFB5, 'pointer', ['pointer', 'pointer', 'int32']),
        },
        IntangiblePlayer: {
            /**
             * ```c
             * STS::AbstractPower* Powers::IntangiblePlayerPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x19693B9, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Slow: {
            /**
             * ```c
             * STS::AbstractPower* Powers::SlowPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1975995, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Strength: {
            /**
             * ```c
             * STS::AbstractPower* Powers::StrengthPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1977711, 'pointer', ['pointer', 'pointer', 'int32'])
        },
    },
    defect: {
        Echo: {
            /**
             * ```c
             * STS::AbstractPower* Powers::EchoPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1961C21, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Focus: {
            /**
             * ```c
             * STS::AbstractPower* Powers::FocusPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x19669C5, 'pointer', ['pointer', 'pointer', 'int32'])
        },
    },
    ironclad: {
        DemonForm: {
            /**
             * ```c
             * STS::AbstractPower* Powers::DemonFormPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x195EBB1, 'pointer', ['pointer', 'pointer', 'int32'])
        },
    },
    watcher: {
        BattleHymn: {
            /**
             * ```c
             * STS::AbstractPower* Powers::BattleHymnPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197C2BD, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        BlockReturn: {
            /**
             * ```c
             * STS::AbstractPower* Powers::BlockReturnPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197C749, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Deva: {
            /**
             * ```c
             * STS::AbstractPower* Powers::DevaPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197CC09, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Devotion: {
            /**
             * ```c
             * STS::AbstractPower* Powers::DevotionPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197D42D, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        EndTurnDeath: {
            /**
             * ```c
             * STS::AbstractPower* Powers::EndTurnDeathPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197D8CD, 'pointer', ['pointer', 'pointer'])
        },
        EnergyDown: {
            /**
             * ```c
             * STS::AbstractPower* Powers::EnergyDownPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount, bool isFasting)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197DC79, 'pointer', ['pointer', 'pointer', 'int32', 'bool'])
        },
        Establishment: {
            /**
             * ```c
             * STS::AbstractPower* Powers::EstablishmentPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197E14D, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Foresight: {
            /**
             * ```c
             * STS::AbstractPower* Powers::ForesightPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t scryAmt)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197E529, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        FreeAttack: {
            /**
             * ```c
             * STS::AbstractPower* Powers::FreeAttackPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197E9B1, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        LikeWater: {
            /**
             * ```c
             * STS::AbstractPower* Powers::LikeWater(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197EE45, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Mantra: {
            /**
             * ```c
             * STS::AbstractPower* Powers::Mantra(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197F399, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Mark: {
            /**
             * ```c
             * STS::AbstractPower* Powers::Mark(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197F8BD, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        MasterReality: {
            /**
             * ```c
             * STS::AbstractPower* Powers::MasterRealityPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197FD01, 'pointer', ['pointer', 'pointer'])
        },
        MentalFortress: {
            /**
             * ```c
             * STS::AbstractPower* Powers::MentalFortress(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197FFBD, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Nirvana: {
            /**
             * ```c
             * STS::AbstractPower* Powers::MentalFortress(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1980429, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Omega: {
            /**
             * ```c
             * STS::AbstractPower* Powers::Omega(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1980805, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Rushdown: {
            /**
             * ```c
             * STS::AbstractPower* Powers::Rushdown(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1980DF5, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Study: {
            /**
             * ```c
             * STS::AbstractPower* Powers::Rushdown(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x19812BD, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        Vigor: {
            /**
             * ```c
             * STS::AbstractPower* Powers::Vigor(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x19816C9, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        WaveOfTheHand: {
            /**
             * ```c
             * STS::AbstractPower* Powers::WaveOfTheHand(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1981B0D, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        WrathNextTurn: {
            /**
             * ```c
             * STS::AbstractPower* Powers::WrathNextTurn(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1982061, 'pointer', ['pointer', 'pointer'])
        },
    },
};