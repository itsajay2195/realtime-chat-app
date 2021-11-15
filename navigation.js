import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Chat from './src/screens/Chat';
import ChatScreen from './src/screens/ChatScreen';




const Stack = createStackNavigator();



export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />
                <Stack.Screen name="ChatScreen" component={ChatScreen}  options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
