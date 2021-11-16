import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import firebase from '../../Firebase'
import Header from '../components/Header'
import { GiftedChat } from 'react-native-gifted-chat'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen({ navigation, ...props }) {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const { contactName, userDetails } = props.route.params
  const [input, setInput] = useState('');


  const sendMessage = () => {
    db.collection('users').doc(userDetails.email).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      messages: input,
      displayName: userDetails.displayName,
      email: userDetails.email,
      photoURL: userDetails.photoURL
    })

  }

  return (
    <View style={{flex:1}}>
      <Header back={true} image={true} navigation={navigation} auth={auth} name={contactName} uri={"https://www.trackergps.com/canvas/images/icons/avatar.jpg"} />
      <KeyboardAvoidingView behavior="padding" enabled style={{flex:1}}>
        <>
          <ScrollView style={{flex:1,}}>
            <Text>hi</Text>
            <Text>hi</Text>
            <Text>hi</Text>
            <Text>hi</Text>
          </ScrollView>

          <View style={styles.footer}>
            <TextInput value={input} style={styles.textInput} onChangeText={(text) => setInput(text)} placeholder="signal message"></TextInput>
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons style={{ bottom: 5 }} name="send" size={20} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
      
     
    </View>




  )
}
  

const styles = StyleSheet.create({
  container: {flex:1,backgroundColor:'red'},
  footer: {flexDirection:'row',width:'100%',alignItems:'center',padding:15,bottom:'5%'},
  textInput: {flex:1,height:40,marginRight:10,borderColor:"#ECECEC",borderWidth:1,padding:10,borderRadius:30,color:'grey'},
})