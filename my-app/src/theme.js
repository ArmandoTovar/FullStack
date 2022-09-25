import { Platform } from "react-native";

const theme = {
    colors:{
        textPrimary:'#24292e',
        textSecondary:'#586069',
        textThird:'#fff',
        primary:'#0366d6',
        mainBackground:'#fff',
        invalid:'#d73a4a'
    },
    fontSizes:{
        body:14,
        subheading:16,
    },
    fonts:{
        main: Platform.OS ==='android' ? 'Roboto':'Arial',
    },
    fontWeights:{
        normal:'400',
        bold:'700',
    }

}
export default theme;