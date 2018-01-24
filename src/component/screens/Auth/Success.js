import React, {Component} from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import {CustomButton} from '../../common';
import {connect} from 'react-redux';
import { fetchUserInfo } from '../../../store/actions';
import { Actions } from 'react-native-router-flux';

class SuccessScreen extends Component {




    render () {
        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <View style={styles.backgroundContainer}>
                        <Image style={styles.image} source={require('../../../assets/bg.png')}>
                        </Image>
                    </View>
                    <View style={styles.messageContainer}>
                        <Text style={styles.congoStyle}>Congratulations</Text>
                        <Text style={{marginBottom: 40}}>Thank you for signing up with us</Text>
                        <CustomButton
                            onPress = {() => Actions.lightbox()}
                        >
                            Next
                        </CustomButton>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <View style={styles.whiteWrpper}>
                        <Image
                            style={styles.whiteImage}
                            source={require('../../../assets/white.png')}
                        />
                        <Image
                            style={styles.successIcon}
                            source={require('../../../assets/successIcon.png')}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1.3,
        backgroundColor: '#fff'
    },
    mainContainer : {
        flex:1,
        position: 'relative'
    },
    messageContainer : {
        flex: 2,
        position: 'relative',
        backgroundColor: '#fff',
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    congoStyle: {
        fontFamily: 'DancingScript-Bold',
        fontSize: 30,
        marginBottom:4,
        color: '#3ac665'
    },

    backgroundContainer : {
       flex:1
    },
    image : {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center'
    },
    iconContainer : {
        position: 'absolute',
        top: 90,
        left: 100,
        elevation:2
    },
    whiteWrpper : {
        shadowColor: '#202020',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        elevation: 5,
    },
    whiteImage : {
        height: 200,
        width: 200,
        
    },
    successIcon : {
        position: 'absolute',
        height: 180,
        width: 180,
        top: 11,
        left: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        fetach_userInfo: () => dispatch(fetchUserInfo())
    };
}

export default SuccessScreen;