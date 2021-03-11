import {appReducer, initialStateType, setAppError, setAppInitialized, setAppStatus} from "./App-reducer";


let startState: initialStateType

beforeEach(() => {
    startState = {
        isInitialized: false,
        status: 'idle',
        error: null
    }
})
test('property initial should be changed to true', () => {

    const action = setAppInitialized({ value: true})

    const endState = appReducer(startState, action)

    expect(endState.isInitialized).toBeTruthy()
})
test('The value of the "status" property will change to "loading"', () => {

    const action = setAppStatus({ status: 'loading'})

    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading')
})
test('the error property will contain the string "ERROR"', () => {

    const action = setAppError({ error: 'ERROR'})

    const endState = appReducer(startState, action)

    expect(endState.error).toBe('ERROR')
})