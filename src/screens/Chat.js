import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import firebase from '../../Firebase'
import * as Contacts from 'expo-contacts';
import Header from '../components/Header';
// import { LogBox } from 'react-native';

// LogBox.ignoreLogs(['Setting a timer']);

export default function Chat({navigation,...props}) {
  
    const auth = firebase.auth();
    const db = firebase.firestore();
    const [contacts, setContacts] = useState([])
    const [allUsers, setAlllUsers] = useState([])
    const {email}= props.route.params.userDetails
 

    useEffect(() => {
        (async () => {
            console.warn('b4')
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                console.warn(data)
                if (data.length > 0) {
                    const output = data.map(v => {
                        var ok = v.name
                        if (v.phoneNumbers.length > 1) {
                            let op = v.phoneNumbers.map(v => (


                                v.digits


                            ))
                            return { name: ok, number: op }

                        }
                        return {
                            name: ok,
                            number: [v.phoneNumbers[0].digits]
                        }
                    })
                    setContacts(output)
                    
                        
                   
                   


                } ;
            }
        })();
    }, []);
   

    useEffect(() => {
        (async () => {
            const events = db.collection('numbers')
            let docs = events.get().then((querySnapshot) => {
                const tempDoc = querySnapshot.docs.map((doc) => {
                    return doc.id
                })

                setAlllUsers(tempDoc)
            })
        }
        )();

    }, []);





    return (
        <View style={{flex:1}} >
                {console.warn('hi',props.route.params)}
                <Header navigation={navigation} auth={auth} name={"Chats"} />
                {contacts.map((contact, index) => (
                <View >
                    {contact.number.length > 1 ? contact.number.map(num => (allUsers.includes(num.toString()) && <IndividualChat key={index} navigation={navigation} name={contact.name} userDetails ={props.route.params.userDetails} />)) : null}
                    {allUsers.includes(contact.number.toString()) ? <IndividualChat name={contact.name} /> : <IndividualChat  key={index} navigation={navigation} name={contact.name} invite={true} />}
                </View>
            ))}
          
           
        </View>
    )
}



const IndividualChat = ({ navigation, name, invite,userDetails }) => {
    return (
        <TouchableOpacity style={{paddingBottom:10}} onPress={()=>!invite ?navigation.navigate('ChatScreen',{contactName:name,userDetails:userDetails}) :null}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 25 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 5 }} source={{ uri: "https://www.trackergps.com/canvas/images/icons/avatar.jpg" }}></Image>
                    </View>
                    <View style={{margin:10}}>
                        <Text style={{ fontWeight: '700' }}>{name}</Text>
                    </View>
                </View>
                {invite ? 
                <View style={{  borderWidth:0.5,borderRadius:5 ,justifyContent: 'center', alignItems:'center' }}>
                    <TouchableOpacity><Text>invite</Text></TouchableOpacity>
                </View>
                :
                <View style={{alignItems:'flex-end' }}>
                        <Text>TimeStamp</Text>
                </View>
                }
               

            </View>
        </TouchableOpacity>
    )
}
