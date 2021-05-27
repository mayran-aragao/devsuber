import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import Login from '../screens/Login/Index';
import HomeDrawer from './HomeDrawer';

const Stack = createStackNavigator();

const App =  () => {
    return(
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Preload"
                screenOptions={{
                    headerShown:false
                }}            
            >
                <Stack.Screen name="Preload" component={Preload}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="HomeDrawer" component={HomeDrawer}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;