import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CardSection } from '../../common/index';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import color from '../../../assets/color';
import { connect } from 'react-redux';



class SingleBlog extends Component {
    componentWillMount() {
        console.log(this.props.post);
    }

    openMoreModalHandler = () => {
        console.log('press');
    }

    renderMoreButton = () => {
        if (this.props.user.uid == this.props.post.ownerId) {
            return (
                <TouchableOpacity
                    onPress={this.openMoreModalHandler}
                    style={{
                        marginLeft: -40,
                        marginTop: 10
                    }}>
                    <Icon
                        size={40}
                        name={'ios-more'}
                        style={styles.moreIcon}
                    />
                </TouchableOpacity>
            );
        }
    }
    
    render() {
        const { imageUrl, createdAt, blogDescription } = this.props.post.values;
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                    <View style = {styles.coverContainer}>
                        <Image source={{ uri: imageUrl}} style={styles.coverImageStyle} />
                    </View>
                    <View style= {styles.profileContainer}>
                        <View style={styles.profileInfoContainer}>
                            <View style={styles.profileNameContainer}>
                                <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />  
                            <Text style={styles.nameStyle}>Name</Text>
                            </View>
                            <Text style={styles.timeStyle} >{moment(createdAt).fromNow()}</Text>
                        </View>
                   
                       {this.renderMoreButton()}
                       </View>
                    <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{blogDescription}</Text>    
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
        height : 60,
        width : '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom : 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileInfoContainer : {
        height: '100%',
        width: '100%',
    },
    profileNameContainer: {
         width: '100%', 
         height: '100%', 
         flexDirection: 'row', 
         alignItems: 'center' 
    },
    nameStyle : {
        marginLeft: 10,
        color: '#000',
        fontSize: 18 
    },
    timeStyle : {
        fontSize: 12,
        fontWeight: '100'
    },
    profileImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 50,
        marginBottom: 10
    },
    moreIcon :{
       
    },
    descriptionContainer : {
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%'
    },
    description : {
        width: '100%',
        fontSize: 18,
        color: '#323648'
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

const mapStateToProps = state => {
    const {user} = state.auth;  
    return {
        user
    };
}

export default connect(mapStateToProps)(SingleBlog);