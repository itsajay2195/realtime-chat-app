import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation, auth,name,back,image,uri }) {
    return (
    <View style={{ backgroundColor: 'rgb(211,211,211)', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '15%' }}>
            {back ? 
             <TouchableOpacity onPress={()=> navigation.navigate('Chat')}>
                    <Ionicons style={{bottom:5}} name="arrow-back-sharp" size={32} color="black" />
            </TouchableOpacity>
            :<View></View>}
           
            <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
                {image &&  <Image style={{bottom:2,right:5, width: 30, height: 30, borderRadius: 20, marginLeft: 5 }} source={{ uri: uri}}></Image>}
                <Text style={{ fontWeight: '700' }}>{name}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', height: 30 }}>
                <TouchableOpacity onPress={() => {
                    console.warn('logout')
                    auth.signOut().then(() => {
                        // Sign-out successful.
                        navigation.navigate("Login");
                    }).catch((error) => {
                        // An error happened.
                    });
                }}>
                    <Image style={{ width: 25, bottom: 5, right: 5, height: 25 }} source={require("../assets/logout.png")} />
                </TouchableOpacity>
            </View>
        </View>

    </View>
    )}
