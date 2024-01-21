import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import Tabs from './tabs/Tabs';
import ProductDetailScreen from '../screens/user/ProductDetailScreen';
import CartScreen from '../screens/user/CartScreen';
import SearchScreen from '../screens/user/SearchScreen';
import CheckoutScreen from '../screens/user/CheckoutScreen';

import OrderConfirmScreen from '../screens/user/OrderConfirmScreen';
import OrderScreen from '../screens/user/OrderScreen';
const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="tab" component={Tabs} />
        <Stack.Screen name="productdetail" component={ProductDetailScreen} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="search" component={SearchScreen} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen name="order" component={OrderScreen} />
        <Stack.Screen name="orderconfirm" component={OrderConfirmScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
