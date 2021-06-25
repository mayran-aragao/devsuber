import React from 'react';
import {HeaderBackButton} from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';

import Config from '../screens/Config/Index';
import Trips from '../screens/Trips/Index';

const Stack = createStackNavigator();

const App =  (props) => {
    return(
        
            <Stack.Navigator
                screenOptions={{
                    headerBackTitle:'voltar',
                    headerLeft:()=><HeaderBackButton onPress={()=>props.navigation.goBack()}/>,
                    headerBackTitleVisible:true,
                    headerTitleAlign:'center',
                    
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen name="Config" component={Config} options={{title:'Suas configurações'}}/>
                <Stack.Screen name="Trips" component={Trips} options={{title:'Suas Viagens'}}/>
            </Stack.Navigator>
        
    );
}

export default App;