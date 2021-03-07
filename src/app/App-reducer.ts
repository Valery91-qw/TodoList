
const initialState: initialStateType = {
    status: 'idle',
    error: null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//Action
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// Types
type ActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = {
    status: RequestStatusType
    error: string | null
}