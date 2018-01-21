import React, {Component} from 'react';
import {
    View,
    Text, 
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView
} from 'react-native';
import { CustomButton, Confirm } from '../../../component/common/index';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../assets/color';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

const equalWidth = (width / 3) ;


class Profile extends Component {

    state = {
        moviesList: [],
        showModal: false,
    }

    _renderItem({ item, index }) {
        return (
            <View style={{ height: '100%', width: '100%' }} >
                <Image source={{ uri: item.imageUrl }}  style={{height: 400, width: 400}} />
            </View>
        );
    }

    modalComponent = () => {
        return (
            <View style={{ width: '100%', flex: 1 }}>
                <View style={styles.modalTopContainer}>
                    <TouchableOpacity onPress={this.onDecline}>
                        <Text style={styles.modalText}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalText}>11/15</Text>
                    <TouchableOpacity>
                        <Text style={styles.modalText}>...</Text>     
                    </TouchableOpacity>               
                </View>
                <Carousel
                    data={this.state.moviesList}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                   
                />
                <View style={styles.ActivityContainer}>
                    <View style={styles.iconContainer}>
                        <Icon
                            size={30}
                            name={'ios-heart-outline'}
                            style={styles.iconLike}
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

            </View>
        );
       
    }

    _keyExtractor = (item, index) => item.id;


    renderRowItem = (itemData) => {
        return (
            <TouchableOpacity onPress={()=> this.setState({
                showModal : !this.state.showModal
            })} >
                <View style={{padding:2}}>
                    <Image
                        style={{ height: 120, width: equalWidth, }} 
                        source={{ uri: itemData.item.imageUrl }} 
                        resizeMode='cover' 
                    />
                </View>
                
            </TouchableOpacity>
        )
    }

    getMoviesFromApiAsync = () => {
        return fetch('http://droidtute.com/reactexample/sample_api/getMovieList.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ moviesList: responseJson.movieList });
                return responseJson.movieList;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentWillMount() {
        { this.getMoviesFromApiAsync() }
    }
    onDecline = () => {
        this.setState ({
            showModal: false
        });
    }

    render () {
        return (
            <ScrollView style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <View style={{flex:2}}>
                            <Image 
                                source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} 
                                style={styles.profileImageStyle} 
                            />
                            <Text style={styles.nameStyle}>Blake Lively</Text>
                        </View>
                        <TouchableOpacity style={styles.gradientWrapper}>
                            <View style={styles.gradientWrapper} >
                                <LinearGradient
                                    colors={['#00FFFF', color.themeColor]}
                                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                    style={styles.gradientContainer}
                                >
                                    <Text style={styles.textStyle}>MAIL</Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.photoContainer}>
                        <View style={styles.info}>
                            <Text style={{fontWeight: 'bold', fontSize: 25, color: '#000'}}>86</Text>
                            <Text>Posts</Text>
                        </View>
                        <View style={styles.photosWrapper}>
                            <FlatList
                                data={this.state.moviesList}
                                numColumns={3}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.renderRowItem}
                            />
                        </View>
                    </View>
                </View>
                <Confirm
                    visible={this.state.showModal}
                   

                >
                    {this.modalComponent() }
                </Confirm>
            </ScrollView>
        );
       
    }
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff'
    },
    profileContainer:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor: color.greyColor,
    },
    profileImageStyle :{
        height: 120,
        width: 120,
        borderRadius: 60,
        top: 20
    },
    nameStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 25,
        marginBottom:20
        
    },
    gradientContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        width: '50%',
        borderRadius: 20,
        marginBottom: 20
    },
    gradientWrapper: {
        flex:1,
        width: '100%',
        alignItems: 'center'
    },
    textContainer: {
        width: '100%',
        height: '100%'
    },
    photoContainer : {
        width: '100%',
        flex: 1,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    photosWrapper:{
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
    },
    info : {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    modalTopContainer : {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#eee',
        height: '10%',
        borderBottomWidth: 1,
        borderBottomColor: color.greyColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5

    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    modalImageContainer: {
        height: '100%',
        width: '100%',
    },
    modalProfileImageStyle : {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    ActivityContainer: {
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 10,
        marginBottom: 12,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconLike: {
        color: 'red',
        marginRight: 7
    },
    likeTextStyle: {
        color: 'red',
        fontSize: 18,
    },
    iconComment: {
        color: '#b5b8bc',
        marginRight: 7
    },
    commentTextStyle: {
        color: '#b5b8bc',
        fontSize: 18,
    }
});

export default Profile;