import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Shimmer from 'react-native-shimmer';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../assets/color';
import { Card } from '../../common/Card';
import { CardSection } from '../../common/CardSection';
class Search extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Shimmer>
                    <Card>
                        <CardSection>
                            <View style={styles.coverContainerStyle}>
                                <LinearGradient
                                    colors={['#00FFFF', color.themeColor]}
                                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                    style={styles.coverImageStyle}
                                > 
                                </LinearGradient>
                            </View>
                            <View style={styles.titleContainerStyle}>
                                <LinearGradient
                                    colors={['#00FFFF', color.themeColor]}
                                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                    style={styles.titleStyle}
                                >
                                </LinearGradient>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.profileContainer}>
                                    <View style={styles.profileImageContainer}>
                                        <LinearGradient
                                            colors={['#00FFFF', color.themeColor]}
                                            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                            style={styles.profileImageStyle}
                                        >
                                        </LinearGradient>
                                    </View>
                                    <View style={styles.nameContainerStyle}>
                                        <LinearGradient
                                            colors={['#00FFFF', color.themeColor]}
                                            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                            style={styles.nameStyle}
                                        >
                                        </LinearGradient>
                                    </View>
                                </View>
                                <View style={styles.timeContainer}>
                                    <LinearGradient
                                        colors={['#00FFFF', color.themeColor]}
                                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                        style={styles.timeStyle}
                                    >
                                    </LinearGradient>
                                </View>
                            </View>
                        </CardSection>
                    </Card>
                </Shimmer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    coverContainerStyle: {
        width: '100%',
        height: 200
    },
    coverImageStyle: {
        height: '100%',
        width: '100%'
    },
    titleContainerStyle: {
        width: '100%',
        height: 80,
        marginTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10
    },
    titleStyle: {
        height: '100%',
        width: '100%',
    },
    infoContainer: {
        width: '100%',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileContainer: {
        width: '70%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImageContainer: {
        width: '30%',
        height: '100%'
    },
    profileImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    nameContainerStyle: {
        width: '60%',
        height: '100%',
        marginTop: 10,
        marginLeft: -15
    },
    nameStyle: {
        height: 20,
        marginTop: 5

    },
    timeContainer: {
        width: '35%',
        height: '100%',
        marginTop: 10,
        marginLeft: -15
    },
    timeStyle: {
        marginTop: 15,
        height: 10,
    }


});

export default Search;