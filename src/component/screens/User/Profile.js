import React, {Component} from 'react';
import {
    View,
    Text, 
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { CustomButton } from '../../../component/common/index';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../assets/color';




class Profile extends Component {
    render () {
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <View style={{flex:2}}>
                            <Image 
                                source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} 
                                style={styles.profileImageStyle} 
                            />
                            <Text style={styles.nameStyle}>Blake Lively</Text>
                        </View>
                        <TouchableOpacity style={styles.gradientWrapper}>
                            <View style={styles.gradientWrapper} >
                                <LinearGradient
                                    colors={['#00FFFF', color.themeColor]}
                                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                    style={styles.gradientContainer}
                                >
                                    <Text style={styles.textStyle}>MAIL</Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.photoContainer}>
                        <View style={styles.textContainer}>
                            <Text>Blake Lively</Text>
                        </View>
                        <Text>Blake Lively</Text>
                    </View>
                </View>
            </View>
        );
       
    }
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff'
    },
    profileContainer:{
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor: color.greyColor
    },
    profileImageStyle :{
        height: 120,
        width: 120,
        borderRadius: 60,
        top: 20
    },
    nameStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        top:30
    },
    gradientContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        width: '50%',
        borderRadius: 20
    },
    gradientWrapper: {
        flex:1,
        width: '100%',
        alignItems: 'center'
    },
    textContainer: {
        width: '100%',
        height: '100%'
    },
    photoContainer : {
        width: '100%',
        flex: 1
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
   
});

export default Profile;