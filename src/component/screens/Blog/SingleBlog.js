import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { CardSection } from '../../common/index';
import Icon from 'react-native-vector-icons/Ionicons';



class SingleBlog extends Component {
    render() {
        return (
            <ScrollView>
              
                    <View style = {styles.coverContainer}>
                        <Image source={{ uri: this.props.post.image}} style={styles.coverImageStyle} />
                    </View>
                    <View style= {styles.profileContainer}>
                        <Text style={styles.timeStyle} >5 minutes ago </Text>
                    <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                    </View>
                    <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                        I have got a good cat. Her name is matilda. She is quite young for a cat. She is between 12 years old ...
                        I have got a good cat. Her name is matilda. She is quite young for a cat. She is between 12 years old ...
                        I have got a good cat. Her name is matilda. She is quite young for a cat. She is between 12 years old ...
                        I have got a good cat. Her name is matilda. She is quite young for a cat. She is between 12 years old ...
                        I have got a good cat. Her name is matilda. She is quite young for a cat. She is between 12 years old ...
                    </Text>    
                    </View>
                    <View style={styles.ActivityContainer}>
                        <View style={styles.iconContainer}>
                            <Icon
                                size={30}
                                name={'ios-heart-outline'}
                                style= {styles.iconLike}
                            />
                        <Text style={styles.likeTextStyle} >18</Text> 
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon
                                size={30}
                                name={'ios-text-outline'}
                                style={styles.iconComment}
                            />
                        <Text style={styles.commentTextStyle} >26</Text>
                        </View>
                    </View>    
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        margin :2
    },
    coverContainer : {
        width: '100%',
        height: 250,
    },
    coverImageStyle : {
        height: '100%',
        width: null,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    profileContainer : {
        flexDirection : 'row',
        height : 60,
        width : '100%',
        justifyContent : 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom : 10,
        alignItems : 'center'
    },
    timeStyle : {
        fontSize: 12,
        fontWeight: '100'
    },
    profileImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    descriptionContainer : {
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
    },
    description : {
        width: '100%',
        fontSize: 18
    },
    ActivityContainer : {
        height: 50,
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 10,
        marginTop: 10,
        marginBottom : 10,
        borderTopColor:'#ddd',
        borderTopWidth :1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    },
    iconContainer : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    iconLike : {
        color : 'red',
        marginRight :7
    },
    likeTextStyle : {
        color: 'red',
        fontSize: 18,
    },
    iconComment : {
        color: '#b5b8bc',
        marginRight: 7
    },
    commentTextStyle : {
        color: '#b5b8bc',
        fontSize: 18,
    }



});

export default SingleBlog;