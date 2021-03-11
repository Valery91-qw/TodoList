import {authReducer, setIsLoggedIn} from "./auth-reducer";

let startState: {
    isLoggedIn: boolean
}

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('the value will change to true', () => {

    const action = setIsLoggedIn({value: true})

    const endState = authReducer(startState, action)

    expect(endState).toBeTruthy()
})