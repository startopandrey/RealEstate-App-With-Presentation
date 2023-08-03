import { ThemeType } from 'src/infrastructure/theme';
import 'styled-components/native'


declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {
  
  }
}