import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';


class Search extends Component {

    renderSearchResult = ({ item, index }) => {
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBarContainer}>

                </View>
                <View>
                    <FlatList
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
                        renderItem={this.renderSearchResult}
                        keyExtractor={(item, index) => index}
                    >
                    </FlatList>
                
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {

    },
    searchBarContainer : {},
    infoContainer : {},
    imageContainerWidth :{},
    profileImageStyle :{},
    timeStampStyle :{}

});

export default Search;