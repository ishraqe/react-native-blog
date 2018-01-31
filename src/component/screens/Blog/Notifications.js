import React, { Component } from 'react';
import { View, Text, FLatList, FlatList, RefreshControl, StyleSheet, Image, TouchableOpacity } from 'react-native';
import color from '../../../assets/color';
import {connect} from 'react-redux';

class Notifications extends Component {

    state = {
        refreshing :  false,
        notifications :null
    }
    componentWillReceiveProps(next) {
        console.log(next.notifications, 'from notification page');
        this.setState({
            notifications : next.notifications
        });
    }
    renderNotificationComponent = ({item, index}) => {

        console.log(item, 'noti com', index);
            
        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.imageContainerWidth}>
                            <Image
                                source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }}
                                style={styles.profileImageStyle}
                            />
                        </View>
                        <Text style={styles.textContainer}>{item.sender.index.usersInfo.fullname}liked your post</Text>
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
         
            <FlatList
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                data={this.state.notifications}
                renderItem={this.renderNotificationComponent}
            >
            </FlatList>
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
    const notifications = state.blog.notifications;
    return {
        notifications
    }
}

export default connect(mapStateToProps)(Notifications);