import { ThemeContext, ThemeContextProps } from './ThemeContext';
import { useContext } from 'react';

export function useTheme() {
  const context:ThemeContextProps=useContext(ThemeContext)
  if(context===undefined)
  {
    console.log("Theme context doesn't exist")
  }
  return context
}
