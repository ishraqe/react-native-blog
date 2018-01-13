import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {ListView} from '../../common/List';

class Landing extends Component {
    render() {
        return (
            <View>
                <FlatList
                    data={[{
                        name: 'hello',
                        image: 'https://i.ytimg.com/vi/QX4j_zHAlw8/maxresdefault.jpg'
                    },
                        {
                            name: 'hello',
                            image: 'https://i.ytimg.com/vi/QX4j_zHAlw8/maxresdefault.jpg'
                        },
                        {
                            name: 'hello',
                            image: 'https://i.ytimg.com/vi/QX4j_zHAlw8/maxresdefault.jpg'
                        },
                        {
                            name: 'hello',
                            image: 'https://i.ytimg.com/vi/QX4j_zHAlw8/maxresdefault.jpg'
                        },
                        {
                            name: 'hello',
                            image: 'https://i.ytimg.com/vi/QX4j_zHAlw8/maxresdefault.jpg'
                        }]}
                    renderItem={({ item }) => (
                        <ListView
                            placeName={item.name}
                            placeImage={item.image}
                        />
                    )}
                    keyExtractor={(item, index) => index}
                >
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex:1,
        width: "100%"
    }
});

export default Landing;