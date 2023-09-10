import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/firebase/reducer/reducer.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});



export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
    const { types, payload } = action;

    switch (types) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Invalid types used: ${types} from User Reducer`)
    }

}

const INITIAL_STATE = {
    currentUser: null,
}

export const UserProvider = ({ children }) => {
    
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            // console.log(user);
            if (user) createUserDocumentFromAuth(user);

            setCurrentUser(user);
        });
        return unsubscribe;
    }, [])

    return (<UserContext.Provider value={value} >{children}</UserContext.Provider>);
}