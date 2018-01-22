import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import color from '../../../assets/color';


class Settings extends Component {
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff',}}>
               <View style={styles.profileImageContainer}>
                    <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                    <Text style={styles.headerText}>INFO</Text>
               </View>
               <View style={styles.profileInfoContainer}>
                    <TouchableOpacity>
                        <View style={styles.profileInfoWrapper}>
                            <Text style={styles.label}>Fullname</Text>
                            <Text style={styles.input}>Blake Lively</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[styles.profileInfoWrapper, { borderBottomColor: '#fff'}]}>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.input}>sbstarboy007@gmail.com</Text>
                        </View>
                    </TouchableOpacity>
               </View>
                <View style={{
                    height: 100, width: '100%',   borderBottomWidth: 1,
                    borderBottomColor: color.greyColor}}>
                    <Text style={[styles.headerText, {top: 1}]}>CHANGE PASSWORD</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles= StyleSheet.create({
    profileImageContainer : {
        height: 250,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,        
        borderBottomColor: color.borderBottomColor
    },
    profileImageStyle: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    headerText :{
        fontSize: 19, 
        color: 'red',
        fontWeight: '500',
        position: 'absolute',
        bottom: 10, 
        left: 10,
        marginTop: 10
    },
    profileInfoContainer : {
        height: 160,
        width: '100%',
    },
    profileInfoWrapper : {
        height: 80,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: color.borderBottomColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    label : {
        fontSize: 19,
        color: color.greyColor,
        fontWeight: '300',
    },
    input: {
        fontSize: 19,
        color: '#000',
        fontWeight: '500',
    }
}); 

export default Settings;