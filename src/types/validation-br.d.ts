
declare module 'validation-br' {

    export function isCNH(value: string | number): boolean
    export function isCPF(value: string | number): boolean
    export function isPIS(value: string | number): boolean
    export function isCNPJ(value: string | number): boolean
    export function isNUP17(value: string | number): boolean
    export function isPostalCode(value: string | number): boolean
    export function isRenavam(value: string | number): boolean
    export function isTituloEleitor(value: string | number): boolean
}