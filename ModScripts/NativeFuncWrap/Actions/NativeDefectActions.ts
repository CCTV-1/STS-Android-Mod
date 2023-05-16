import { ChannelAction } from "./defect/ChannelAction.js";
import { EvokeAllOrbsAction } from "./defect/EvokeAllOrbsAction.js";
import { EvokeOrbAction } from "./defect/EvokeOrbAction.js";
import { RemoveAllOrbsAction } from "./defect/RemoveAllOrbsAction.js";

export const NativeDefectActions = {
    Channel: ChannelAction,
    EvokeAllOrbs: EvokeAllOrbsAction,
    EvokeOrb: EvokeOrbAction,
    RemoveAllOrbs: RemoveAllOrbsAction,
};