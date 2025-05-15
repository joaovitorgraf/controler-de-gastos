import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import AccountScreen from './screens/AccountScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EditExpenseScreen from './screens/EditExpenseScreen';

const Stack = createNativeStackNavigator();

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0d0d0d',  // fundo geral escuro
    card: '#1c1c1e',        // fundo dos headers
    text: '#ffffff',        // texto claro para contraste
    primary: '#7b2cbf',     // roxo padrão do app (botões, ícones)
    border: '#1c1c1e',      // bordas do header, sutil
  },
};

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <NavigationContainer theme={customDarkTheme}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: customDarkTheme.colors.card },
            headerTintColor: customDarkTheme.colors.text,
            headerTitleStyle: { fontWeight: '600' },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Criar Conta' }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ title: 'Recuperar Senha' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Gastos' }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{ title: 'Novo Gasto' }}
          />
          <Stack.Screen
            name="Account"
            component={AccountScreen}
            options={{ title: 'Minha Conta' }}
          />
          <Stack.Screen
            name="EditExpense"
            component={EditExpenseScreen}
            options={{ title: 'Editar Gasto' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
