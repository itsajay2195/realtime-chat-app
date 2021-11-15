import React, { useState,useEffect } from 'react'
import { ToastAndroid, Platform, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import Button from '../components/Button'
import LottieView from 'lottie-react-native'
import { FloatingLabelInput } from 'react-native-floating-label-input';
import firebase from '../../Firebase'


export default function Register({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [imageURL, setImageURL] = useState('')
 




    const register = () => {
        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                user.updateProfile({
                    displayName: name,
                    phoneNumber:'9710115165',
                    photoURL: imageURL ? imageUrl : "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
                }).catch(function (error) {
                    console.warn("first error")
                    alert(error.message)
                });
                // navigate the user back to the login page if the registration is successful
                addOrderToFirebase()
                navigation.navigate('Login')
                notifyMessage('Registration Successful')
            })
            .catch((error) => {
                console.log("second error")
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }

    const addOrderToFirebase = () => {
        const db = firebase.firestore();
        db.collection("numbers").doc(number).set({
            name:name,
            number:number,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch(function (error) {
            alert(error.message)
        })

        db.collection("users").doc(email).set({
            name:name,
            number:number,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch(function (error) {
            alert(error.message)
        })
    }




    function notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            alert(msg);
        }
    }

  

    return (
        <SafeAreaView style={styles.container}>

            <LottieView style={{ height: 100, alignSelf: 'center', marginBottom: 30 }}
                source={require("../animations/register.json")}
                autoPlay
                speed={0.5}
                loop={true} />

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(value) => setName(value)}

            />

            <TextInput
                style={styles.input}
                placeholder="email"
                autoCapitalize = 'none'
                onChangeText={(value) => setEmail(value)}
                value={email} />

            <TextInput
                style={styles.input}
                placeholder="number"
                onChangeText={(value) => setNumber(value)}
                value={number} />        

            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={true}
                value={password} />

            <TextInput
                style={styles.input}
                placeholder="re-type Password"
                onChangeText={(value) => setConfirmPassword(value)}
                secureTextEntry={true}
                value={confirmPassword} />

            <TextInput
                style={styles.input}
                placeholder="Image "
                onChangeText={(value) => setImageURL(value)}
                value={imageURL} />

            <Button name="Register" onPress={register}></Button>

            <Button name="Login" onPress={() => navigation.navigate('Login')} ></Button>



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
