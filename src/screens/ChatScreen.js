import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import firebase from '../../Firebase'
import Header from '../components/Header'
import { GiftedChat } from 'react-native-gifted-chat'

export default function ChatScreen({ navigation, ...props }) {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const { contactName,userDetails } = props.route.params
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  

  const sendMessage =()=>{
    db.collection('users').doc(userDetails.email).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      messages: input,
      displayName: userDetails.displayName,
      email: userDetails.email,
      photoURL:userDetails.photoURL
    })

  }
 
  return (
    <View style={{ flex: 1 }} >
      {console.warn(userDetails)}
      <Header back={true} image={true} navigation={navigation} auth={auth} name={contactName} uri={"https://www.trackergps.com/canvas/images/icons/avatar.jpg"} />
      <Text>{userDetails.email}</Text>
      <View style={{flex:1,backgroundColor:'white'}}>
        <GiftedChat
          messages={input}
          onInputTextChanged={(text) => setInput(text)}
          showAvatarForEveryMessage={true}
          onSend={()=>sendMessage()}
          user={{
            _id: auth?.currentUser?.email,
            name: auth?.currentUser?.displayName,
            avatar: auth?.currentUser?.photoURL
          }}
        />
      </View>
    </View>




  )
}
