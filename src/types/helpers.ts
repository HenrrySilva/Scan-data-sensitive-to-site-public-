
export type ReplaceValues<T, R extends Partial<Record<keyof T, any>>> = {
    [K in keyof T]: K extends keyof R ? R[K] : T[K]
}

export type OptionalsValues<T, V extends keyof T> = Partial<T> & Omit<T, V>