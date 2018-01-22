import React, { Component } from 'react';
import { View, Text, FLatList, FlatList, RefreshControl, StyleSheet, Image, TouchableOpacity } from 'react-native';
import color from '../../../assets/color';


class Notifications extends Component {

    state = {
        refreshing :  false,
    }

    renderNotificationComponent = ({item, index}) => {
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
                        <Text style={styles.textContainer}>Blake Lively like your post</Text>
                        <View style={styles.imageContainerWidth}>
                            <Image
                                source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }}

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
                data={[
                    {
                        name: 'hello',
                        image: 'https://www.themeatman.co.uk/pub/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/t/o/tomahawk.jpg'
                    },
                    {
                        name: 'hello',
                        image: 'http://cdn.cnn.com/cnnnext/dam/assets/140106125416-01-paleo-diet-0106-horizontal-large-gallery.jpg'
                    },
                    {
                        name: 'hello',
                        image: 'https://assets.bonappetit.com/photos/5942f532adb3b53bd37a7c60/16:9/w_1200,c_limit/steak-with-tangy-sauce-and-watercress-salad.jpg'
                    },
                    {
                        name: 'hello',
                        image: 'https://www.bostonsausage.co.uk/wp-content/uploads/2013/11/Rump-Steak-Meal-Deal.jpg'
                    },
                    {
                        name: 'hello',
                        image: 'https://realfood.tesco.com/media/images/steak-polenta1995-LH-21bde053-a232-4c4d-ac9f-b0fd69aa3232-0-1400x919.jpg'
                    }]}
                renderItem={this.renderNotificationComponent}
                keyExtractor={(item, index) => index}
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
        marginLeft: -5
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

export default Notifications;