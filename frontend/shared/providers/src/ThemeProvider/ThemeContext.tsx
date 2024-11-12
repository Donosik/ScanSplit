import { createContext } from 'react';
import { AvailableThemes } from './AvailableThemes';

export interface ThemeContextProps {
  theme:AvailableThemes,
  changeTheme: (newTheme: AvailableThemes) => void,
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: AvailableThemes.light,
  changeTheme: function (newTheme: AvailableThemes): void {
  },
});
