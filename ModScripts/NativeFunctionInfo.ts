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