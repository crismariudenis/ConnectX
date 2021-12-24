import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import {AuthProvider} from './components/AuthContext'
import App from './App';
import App1_0 from './App1_0';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App1_0);
// ReactDOM.render(
//   <AuthProvider>
//     <App />
//   </AuthProvider>,
//   document.getElementById("root")
// );