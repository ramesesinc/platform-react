import React, { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

// this is the data (entity)
const StateContext = createContext();
const StateDispatchContext = createContext();

// build a provider
const StateProvider = ({ reducer, initialState, children }) => {
    const [state, dispatch] = useImmerReducer(reducer, initialState);
    return (
        <StateContext.Provider value={state}>
            <StateDispatchContext.Provider value={dispatch}>
            {children}
            </StateDispatchContext.Provider>
        </StateContext.Provider>
    );
}

const useStateValue = () => {
    const context = useContext(StateContext)
    if (context === undefined) {
      throw new Error('useStateValue must be used within a StateProvider')
    }
    return context
  }

const useStateDispatch = () => {
    const context = useContext(StateDispatchContext)
    if (context === undefined) {
        throw new Error('useStateDispatch must be used within a StateProvider')
    }
    return context
}

const useData = () => {
    return [useStateValue(), useStateDispatch()];
}

export {
    StateProvider,
    useData,
}
