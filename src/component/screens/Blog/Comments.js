import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import color from '../../../assets/color';
import Icon from 'react-native-vector-icons/Ionicons';


class Comment extends Component {
    render () {
        return (
            <View style={{flex:1}}>
                <ScrollView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 55}}>
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                        </View>
                        <View style={styles.commentContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameStyle}>Blake Lively</Text>
                                <Text style={styles.timeStyle}>4:29 PM</Text>
                            </View>
                            <Text style={styles.comments}>Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments ......................... fsfsfsjfjf jsfgsjfbsjfbs sjfsjfsbjfbsfjs fjsfgsfbsfjsbfs fjsgfsjfgsgfgsufs fjsgfsjfgjsfsf sjfgsjfgsjfsf sjfjsfjsgjfs jdgadaudaudadaudagduagduagdaudgaudgad ahdahdgada adahdahdahda adadadgadahd ahfdafdahdfahda ahdfahdfahdfad hadfahdfhadfahd hadfahdvhdavad</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                        </View>
                        <View style={styles.commentContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameStyle}>Blake Lively</Text>
                                <Text style={styles.timeStyle}>4:29 PM</Text>
                            </View>
                            <Text style={styles.comments}>Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments ......................... fsfsfsjfjf jsfgsjfbsjfbs sjfsjfsbjfbsfjs fjsfgsfbsfjsbfs fjsgfsjfgsgfgsufs fjsgfsjfgjsfsf sjfgsjfgsjfsf sjfjsfjsgjfs jdgadaudaudadaudagduagduagdaudgaudgad ahdahdgada adahdahdahda adadadgadahd ahfdafdahdfahda ahdfahdfahdfad hadfahdfhadfahd hadfahdvhdavad</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                        </View>
                        <View style={styles.commentContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameStyle}>Blake Lively</Text>
                                <Text style={styles.timeStyle}>4:29 PM</Text>
                            </View>
                            <Text style={styles.comments}>Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments ......................... fsfsfsjfjf jsfgsjfbsjfbs sjfsjfsbjfbsfjs fjsfgsfbsfjsbfs fjsgfsjfgsgfgsufs fjsgfsjfgjsfsf sjfgsjfgsjfsf sjfjsfjsgjfs jdgadaudaudadaudagduagduagdaudgaudgad ahdahdgada adahdahdahda adadadgadahd ahfdafdahdfahda ahdfahdfahdfad hadfahdfhadfahd hadfahdvhdavad</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                        </View>
                        <View style={styles.commentContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameStyle}>Blake Lively</Text>
                                <Text style={styles.timeStyle}>4:29 PM</Text>
                            </View>
                            <Text style={styles.comments}>Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments ......................... fsfsfsjfjf jsfgsjfbsjfbs sjfsjfsbjfbsfjs fjsfgsfbsfjsbfs fjsgfsjfgsgfgsufs fjsgfsjfgjsfsf sjfgsjfgsjfsf sjfjsfjsgjfs jdgadaudaudadaudagduagduagdaudgaudgad ahdahdgada adahdahdahda adadadgadahd ahfdafdahdfahda ahdfahdfahdfad hadfahdfhadfahd hadfahdvhdavad</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                        </View>
                        <View style={styles.commentContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameStyle}>Blake Lively</Text>
                                <Text style={styles.timeStyle}>4:29 PM</Text>
                            </View>
                            <Text style={styles.comments}>Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments .........................Comments ......................... fsfsfsjfjf jsfgsjfbsjfbs sjfsjfsbjfbsfjs fjsfgsfbsfjsbfs fjsgfsjfgsgfgsufs fjsgfsjfgjsfsf sjfgsjfgsjfsf sjfjsfjsgjfs jdgadaudaudadaudagduagduagdaudgaudgad ahdahdgada adahdahdahda adadadgadahd ahfdafdahdfahda ahdfahdfahdfad hadfahdfhadfahd hadfahdvhdavad</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                        </View>
                        <View style={styles.commentContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameStyle}>Blake Lively</Text>
                                <Text style={styles.timeStyle}>4:29 PM</Text>
                            </View>
                            <Text style={styles.comments}>Comments </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.createComment}>
                    <TextInput
                        placeholder = {'Write a comment'}
                        maxLength={200}
                        style={{ height: 40, backgroundColor: color.borderBottomColor, borderRadius: 20 }}
                        underlineColorAndroid  = 'transparent'
                    />
                    <TouchableOpacity style={{ position: 'absolute', bottom: 12, right: 15}}>
                        <Icon 
                            name={'md-send'}
                            size={30}
                            color={color.themeColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: color.borderBottomColor,
        padding: 15
    },
    imageContainer : {
        width: '20%'
    },
    profileImageStyle : {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    commentContainer : {
        width: '80%',
        marginLeft: -10
    },
    nameContainer : {
        flexDirection: 'row',
        justifyContent : 'space-between',
        marginBottom: 5
    },
    nameStyle : {
        color: color.fontColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    timeStyle : {
        color : color.greyColor,
        marginLeft: 5
    },
    comments : {
        width: '100%',
    },
    createComment: {
        position: 'absolute', borderTopWidth: 1,
        borderTopColor: color.borderBottomColor,
        bottom: 0, width: '100%',
        backgroundColor: '#fff',
        height: 55,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }

});

export default Comment;