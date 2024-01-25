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
import OrderDetailScreen from '../screens/user/OrderDetailScreen';
import DashboardScreen from '../screens/admin/DashboardScreen';
import AddProductScreen from '../screens/admin/AddProductScreen';
 import ViewProductScreen from '../screens/admin/ViewProductScreen';
import ViewCategoryScreen from '../screens/admin/ViewCategoryScreen';
import ViewUsersScreen from '../screens/admin/ViewUsersScreen';
import ViewOrdersScreen from '../screens/admin/ViewOrdersScreen';
import ViewOrderDetailScreen from '../screens/admin/ViewOrderDetailScreen';
import AddCategoryScreen from '../screens/admin/AddCategoryScreen';
import ImportProductScreen from '../screens/admin/ImportProduct';
import ViewStoreProductScreen from '../screens/admin/ViewStoreProductScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
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
        <Stack.Screen name="orderdetail" component={OrderDetailScreen} />
        <Stack.Screen name="forgotpassword" component={ForgotPassword} />

        <Stack.Screen name="dashboard" component={DashboardScreen} />
         <Stack.Screen name="addproduct" component={AddProductScreen} />
        <Stack.Screen name="viewproduct" component={ViewProductScreen} />
        <Stack.Screen name="viewcategories" component={ViewCategoryScreen} />
        <Stack.Screen name="viewusers" component={ViewUsersScreen} /> 
        <Stack.Screen name="vieworder" component={ViewOrdersScreen} />
        <Stack.Screen name="vieworderdetails" component={ViewOrderDetailScreen} />
        <Stack.Screen name="addcategories" component={AddCategoryScreen} />
        <Stack.Screen name="importproduct" component={ImportProductScreen} />
        <Stack.Screen name="viewstoreproduct" component={ViewStoreProductScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
