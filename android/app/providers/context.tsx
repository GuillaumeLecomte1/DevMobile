import React,{ ReactNode,useState, createContext} from "react";

export const CounterContext = createContext(0);

const CounterProvider = ({ children } : {children: ReactNode}) => {
    const [counter, setCounter] = useState(0);

    return (
        <CounterContext.Provider value={counter}>
            {children}
        </CounterContext.Provider>
    );
}

export default CounterProvider;