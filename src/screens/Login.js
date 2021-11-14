import React, { useState } from 'react'
import { View, Text, TextInput, SafeAreaView, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import Button from '../components/Button'
import firebase from '../../Firebase'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setMobileNumber] = useState('')

    // const signIn = () => {
    //     auth.signInWithEmailAndPassword(email, password)
    //     .catch((error) => {
    //     var errorMessage = error.message;
    //     alert(errorMessage)
    //     });
    // }
    const signIn = () => {
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                //navigate the user  to the chat screen 
                console.warn(user)
                navigation.navigate('Chat')
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }

    const addNumberToFirebase = ()=>{
        db.collection("users").add({
            number:number

        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <LottieView style={{ height: 100, alignSelf: 'center', marginBottom: 30 }}
                source={require("../animations/chats.json")}
                autoPlay
                speed={0.5}
                loop={true} />

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize = 'none'
                onChangeText={(value) => setEmail(value.toLowerCase())}
                value={email} />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true} 
                onChangeText={(value) => setPassword(value)}
                value={password} />
            <Button name="Login" onPress={signIn}></Button>

            <Text
                style={{ marginVertical: 20, textDecorationLine: 'underline', color: 'blue' }}
                onPress={() => navigation.navigate('Register')}>
                New to the app? Click here to regiser
            </Text>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    input: {
        height: 40,
        width: '90%',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 5,
        marginVertical: 10,
        padding: 10
    }
})
