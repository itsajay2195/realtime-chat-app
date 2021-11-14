import React,{useEffect, useState} from 'react'
import { View, Text, SafeAreaView,TouchableOpacity, Image } from 'react-native'
import firebase from '../../Firebase'
import * as Contacts from 'expo-contacts';

export default function Chat({navigation}) {
    const auth = firebase.auth();
    const db = firebase.firestore();
    const [contacts, setContacts] = useState([])
    const [allUsers, setAlllUsers] = useState()
    var arr = ['12345','5556106679']
    

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers],
            });

    
            if (data.length > 0) {
                const output = data.map(v =>{
                var ok = v.name
                   if(v.phoneNumbers.length >1){
                        let op= v.phoneNumbers.map(v =>(
                            
                        
                                v.digits
                            

                        ) )
                    return {name:ok, number:op}
                    
                   }
                   return {
                    name:ok,
                    number:[v.phoneNumbers[0].digits]
                }
                } )
                setContacts(output)
                
           
            }
          }
        })();
      }, []);

    useEffect(() => {  
        (async () => {
            const events =  db.collection('numbers')
            let docs = events.get().then((querySnapshot) => {
                const tempDoc = querySnapshot.docs.map((doc) => {
                  return doc.id
                })
             
                setAlllUsers (tempDoc)
              })
        }
        )();
          
    }, []);

    

  
    
    return (
        <View >
            <HeaderTab navigation={navigation} auth = {auth} />
            {/* <Text>{contacts[1].lastName}</Text> */}

            {contacts.map((contact,index) => (
            <View key={index}>
                <Text >{allUsers.includes(contact.number.toString())? contact.name : 'invite'} </Text> 
            </View>
            ))}
            <Text>chat screen</Text>
        </View>
    )
}


const HeaderTab = ({navigation, auth}) => {
    return (
        <View style={{ backgroundColor:'rgb(211,211,211)',justifyContent:'center', height:'35%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop:25 }}>
                <View>
                    <Image style={{width:40,height:40, borderRadius:20, marginLeft:5}} source={{uri: auth?.currentUser?.photoURL,}}></Image>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontWeight:'700'}}>Header</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => {
                        console.warn('logout')
                        auth.signOut().then(() => {
                            // Sign-out successful.
                            navigation.navigate("Login");
                        }).catch((error) => {
                            // An error happened.
                        });
                    }}>
                        <Image style={{ width: 30, height: 30 }} source={require("../assets/logout.png")} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
}
