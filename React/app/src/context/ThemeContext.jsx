import React, { createContext, useState, useContext } from "react";

export const ThemeContext = createContext(null)

export function ThemeProvider ({children}){
        const [theme, setTheme] = useState('light')
        const toggleTheme = () =>{
            setTheme(perv => perv === 'light'? 'dark':'light')
        }
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
            {/* App */}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    const context = useContext(ThemeContext)
    if(!context){
        throw new Error('usetheme NA')
    }
    return context
}