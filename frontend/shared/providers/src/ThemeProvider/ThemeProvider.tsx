import { ProviderProps } from '../All Providers/ProviderProps';
import { ThemeContext } from './ThemeContext';
import { useLayoutEffect, useState } from 'react';
import { AvailableThemes } from '@frontend/providers';
import "./Themes.module.css"

export function ThemeProvider({children}:ProviderProps)
{

  const [theme,setTheme]=useState<AvailableThemes>(AvailableThemes.light);
  function changeTheme(theme:AvailableThemes){
    setTheme(theme);
    deleteAllTheme()
    document.documentElement.classList.add(theme.toString());
  }

  useLayoutEffect(() => {
    changeTheme(theme)
  }, []);

  function deleteAllTheme()
  {
    Object.entries(AvailableThemes).forEach(([key,value])=>{
      document.documentElement.classList.remove(value);
    })
  }

  return(
    <ThemeContext.Provider value={{theme,changeTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
