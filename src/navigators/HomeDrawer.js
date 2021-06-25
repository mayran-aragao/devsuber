import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';

import Home from '../screens/Home/Index';
import ConfigStack from './ConfigStack';
import TripStack from './TripStack';


const Drawer = createDrawerNavigator();

export default ()=>(
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen name='Home' component={Home} options={{ drawerLabel: 'Principal' }}/>
        <Drawer.Screen name='Config' component={ConfigStack} options={{ drawerLabel: 'Configurações' }}/>
        <Drawer.Screen name='Trips' component={TripStack} options={{ drawerLabel: 'Suas Viagens' }}/>
    </Drawer.Navigator>

);
