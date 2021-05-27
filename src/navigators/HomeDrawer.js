import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home/Index';

const Drawer = createDrawerNavigator();

export default ()=>(
    <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Home}/>
    </Drawer.Navigator>

);
