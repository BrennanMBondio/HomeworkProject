import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) { //Added {userData}, not needed

    const [user, setUsername] = useState('');
    const [userFirst, setUsernameFirst] = useState('');
    const [userLast, setUsernameLast] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const getUserName = async () => {
        const storedUser = await AsyncStorage.getItem('userInfo')
        if (storedUser) {
            setUsername(storedUser);
        }
    };

    const getUserNameFirst = async () => {
        const storedUser = await AsyncStorage.getItem('userNameFirst')
        if (storedUser) {
            setUsernameFirst(storedUser);
        }
    };

    const getUserNameLast = async () => {
        const storedUser = await AsyncStorage.getItem('userNameLast')
        if (storedUser) {
            setUsernameLast(storedUser);
        }
    };
    useEffect(() => {
        getUserName();
        getUserNameFirst();
        getUserNameLast();
    })

    const navigateToWelcome = () => {
        navigation.navigate('Welcome', {test: true});

    //const UserInformation = () => {

    //}
}

const updateName = async() => {
    try{
        await AsyncStorage.setItem('userNameFirst', firstName);
        await AsyncStorage.setItem('userNameLast', lastName);
        await getUserNameFirst();
        await getUserNameLast();
        
    } catch (error) {
        console.log(error);
    }
}

    // MESS WITH img src
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTextTwo}>User Profile</Text>
            </View>
            <Text style={styles.textStandard}>Welcome, {userFirst} {userLast}!</Text>
            <Text style={styles.textStandard}>Email: {user}</Text>

        <View style={styles.imageContainer}>
            <Image
                source={require('./Pictures/DefaultProfilePicture.jfif')} // Adjust the path to your image
                style={styles.image}
            />
        </View>

        <TextInput
              style={styles.input}
              placeholder={userFirst}
              value={firstName}
              onChangeText={text => setFirstName(text)}
        />
        <TextInput
              style={styles.input}
              placeholder={userLast}
              value={lastName}
              onChangeText={text => setLastName(text)}
        />
        <View style={styles.footerContainer}>
            <Button title="Save" onPress={updateName}/>
        </View>

        <View style={styles.footerContainer}>
            <Button title="Go to Welcome Screen" onPress={navigateToWelcome} />
        </View>
        </SafeAreaView>
    )

};