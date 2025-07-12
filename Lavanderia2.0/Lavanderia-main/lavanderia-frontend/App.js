import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateClient from './client_module/CreateClientView'; 
import CreateUser from './CreateUserView';
import Login from './Login';
import UpdateClient from './client_module/UpdateClientView';
import Home from './client_module/Home';
import DeleteClient from './client_module/Delete_Client_View';
import SearchClient from './client_module/Search_Client';
import CreateOrder from './order_module/CreateOrder';

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="CrearCliente" component={CreateClient} options={{ headerShown: false }}/>
        <Stack.Screen name="CrearUsuario" component={CreateUser} options={{ headerShown: false }}/>
        <Stack.Screen name="ActualizarCliente" component={UpdateClient} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="EliminarCliente" component={DeleteClient} options={{ headerShown: false }}/>
        <Stack.Screen name="BuscarCliente" component={SearchClient} options={{ headerShown: false }}/>
        <Stack.Screen name="CrearOrden" component={CreateOrder} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <MyStack />;
}
