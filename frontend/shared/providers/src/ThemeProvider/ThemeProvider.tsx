import { ProviderProps } from '../All Providers/ProviderProps';
import { ThemeContext } from './ThemeContext';
import { useLayoutEffect, useState } from 'react';
import { AvailableThemes } from '@frontend/providers';
import "./Themes.css"

export function ThemeProvider({children}:ProviderProps)
{

  const [theme,setTheme]=useState<AvailableThemes>(AvailableThemes.light);
  function changeTheme(theme:AvailableThemes){
    setTheme(theme);
  }

  return(
    <ThemeContext.Provider value={{theme,changeTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
