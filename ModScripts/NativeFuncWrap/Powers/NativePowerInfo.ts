import { NativeFunctionInfo } from "../NativeFunctionInfo.js";

export const NativePowerInfo = {
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
             * void ConfusionPower::onCardDraw(STS::AbstractPower * thisPtr, STS::AbstractCard * card)
             * ```
             */
            onCardDraw: new NativeFunctionInfo(0x195C54D, 'void', ['pointer', 'pointer'])
        },
        IntangiblePlayer: {
            /**
             * ```c
             * STS::AbstractPower* Powers::IntangiblePlayerPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x19693B9, 'pointer', ['pointer', 'pointer', 'int32'])
        },
    },
    defect: {
        Echo: {
            /**
             * ```c
             * STS::AbstractPower* Powers::EchoPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1961C21, 'pointer', ['pointer', 'pointer', 'int32'])
        },
    },
    ironclad: {
        DemonForm: {
            /**
             * ```c
             * STS::AbstractPower* Powers::DemonFormPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x195EBB1, 'pointer', ['pointer', 'pointer', 'int32'])
        },
    },
    watcher: {
        Deva: {
            /**
             * ```c
             * STS::AbstractPower* Powers::DevaPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t strengthAmount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197CC09, 'pointer', ['pointer', 'pointer', 'int32'])
        },
        FreeAttack: {
            /**
             * ```c
             * STS::AbstractPower* Powers::FreeAttackPower(STS::AbstractPower* thisPtr, STS::AbstractCreature* owner, int32_t amount)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x197E9B1, 'pointer', ['pointer', 'pointer', 'int32'])
        },
    },
};