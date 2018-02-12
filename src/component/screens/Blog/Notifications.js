import React, { Component } from 'react';
import { View, Text, FLatList, FlatList, RefreshControl, StyleSheet, Image, TouchableOpacity } from 'react-native';
import color from '../../../assets/color';
import {connect} from 'react-redux';
import {  fetchUserInfo, fetchAllUserNotification } from "../../../store/actions";
import {Actions} from 'react-native-router-flux';


class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            notifications: null
        }
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    };

    forceUpdateHandler() {
        this.forceUpdate();
    };

    componentWillReceiveProps(next) {
        setTimeout(() => {
            this.setState({
                notifications : next.notifications
            });
        }, 500); 
    }
   async componentDidMount () {
        const uid = this.props.user.uid;
        if (uid) {
            await  this.props.fetch_notification(uid);
        } 
    }

    renderNotificationComponent = ({item, index}) => {
            return (
                <TouchableOpacity
                    onPress={() => Actions.single_blog({ post: item.blog.item })}
                >
                    <View style={styles.container}>
                        <View style={styles.infoContainer}>
                            <View style={styles.imageContainerWidth}>
                                <Image
                                    source={{ uri: item.a[index].usersInfo.profileImage }}
                                    style={styles.profileImageStyle}
                                />
                            </View>
                            <Text style={styles.textContainer}>
                                {item.a[index].usersInfo.fullname} liked your post</Text>
                            <View style={styles.imageContainerWidth}>
                                <Image
                                    source={{ uri: item.blog.item.values.imageUrl }}

                                    style={[styles.profileImageStyle, styles.radius]}
                                />
                            </View>
                        </View>
                        <Text style={styles.timeStampStyle}>5 minutes ago</Text>
                    </View>
                </TouchableOpacity>
            );
    }
    _onRefresh() {
        this.setState({ refreshing: true });
        this.setState({ refreshing: false });
    }
    render() {
      
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}}>
                <Text style={{
                    fontFamily: 'DancingScript-Bold',
                    fontSize: 40,
                    marginBottom: 4,
                    color: '#3ac665'}}>Under development !!</Text>
            </View>
            // <FlatList
            //     scrollEventThrottle={16}
            //     refreshControl={
            //         <RefreshControl
            //             refreshing={this.state.refreshing}
            //             onRefresh={this._onRefresh.bind(this)}
            //         />
            //     }
            //     data={this.state.notifications}
            //     renderItem={this.renderNotificationComponent}
            //     keyExtractor={(item, index) => index}
            // >
            // </FlatList>
        );
    }
}

const styles= StyleSheet.create({
    container : {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: color.borderBottomColor,
        height: 120,
        justifyContent: 'center'
    },
    infoContainer : {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        
    },
    profileImageStyle: {
        height: 60,
        width: 60,
        borderRadius :30,
        marginLeft: 10
    },
    radius : {
        borderRadius: 5,
        marginLeft: -5,
        width: 40,
        height: 40,
    },
    imageContainerWidth: {
        width: '20%'
    },
    textContainer : {
       width: '60%',
       color: color.greyColor,
       fontSize: 17,
       fontWeight: '400',
       marginLeft: 10 
    },
    timeStampStyle : {
        color: color.greyColor,
        fontSize: 14,
        marginLeft: '22%'
    }
});


const mapStateToProps = (state) => {
    const { user, email } = state.auth;
    const notifications = state.blog.notifications;
    return {
        email,
        user, 
        notifications
    }
}

const mapDispatchTOProps = dispatch => {
    return {
        fetach_userInfo: (uid) => dispatch(fetchUserInfo(uid)),
        fetch_notification: (ownerId) => dispatch(fetchAllUserNotification({ ownerId }))
    };
};

export default connect(mapStateToProps, mapDispatchTOProps)(Notifications);