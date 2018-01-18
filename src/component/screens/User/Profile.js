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
                        <Image 
                            source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} 
                            style={styles.profileImageStyle} 
                        />
                        <Text style={styles.nameStyle}>Blake Lively</Text>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#00FFFF', color.themeColor]}
                                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                style={styles.gradientContainer}
                            >
                                <Text>MAIL</Text>
                            </LinearGradient>
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
        borderBottomWidth:1
    },
    profileImageStyle :{
        height: 120,
        width: 120,
        borderRadius: 60,
        top:-40
    },
    nameStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        top: -20
    },
    textContainer: {
        width: '100%',
        height: '10%'
    },
    photoContainer : {
        width: '100%',
        flex: 1
    },
    gradientContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
});

export default Profile;