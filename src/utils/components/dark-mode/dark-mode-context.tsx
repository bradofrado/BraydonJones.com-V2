import { createContext, useContext, useState } from "react"

export type DarkModeContextType = [boolean, (value: boolean) => void]
export const DarkModeContext = createContext<DarkModeContextType>([false, () => undefined]);

export type DarkModeProviderProps = {
    value?: boolean
} & React.PropsWithChildren
export const DarkModeProvider = ({children, value}: DarkModeProviderProps) => {
    const [darkMode, setDarkMode] = useState(value ?? false);
    return <>
        <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
            <div className={darkMode ? 'dark' : ''}>
                {children}
            </div>
        </DarkModeContext.Provider>
    </>
}

export const useDarkMode = () => {
    return useContext(DarkModeContext);
}