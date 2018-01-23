import React, { Component } from 'react';
import { View, Animated,Text, FlatList, StyleSheet, RefreshControl, ScrollView, Easing } from 'react-native';
import ListView from '../../common/List';
import { fetchAllBlog, fetchUserInfo } from "../../../store/actions";
import {connect} from 'react-redux';
import {Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class Landing extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            triggerVariable: 0,
        }
    }

    componentWillMount() {
        console.log(this.props.user.uid, 'user');
        this.props.fetach_userInfo(this.props.user.uid);
        this.props.fetch_allBlog();
        // Actions.refresh({
        //     key: 'landing_page',
        //     header: this.renderHeader()
        // });
    }  

    renderHeader = () => {
        return (
            <View>
                <Text>Header</Text>
            </View>
        );
    }

    isIncreasingSequence = (newVal) => {
        if (this.state.triggerVariable !== newVal) {
            if(this.state.triggerVariable >= 0 && newVal >0 ){
                if (this.state.triggerVariable > newVal) {

                    let that = this;
                    setTimeout(function () {
                        that.setState({
                            triggerVariable: newVal - 0.1
                        });
                        Actions.refresh({ key: 'landing_page', header: 'Timeline', hideTabBar: false, hideNavBar: false });
                    }, 0);

                } else if (this.state.triggerVariable < newVal) {
                    let that = this;
                    setTimeout(function () {
                        that.setState({
                            triggerVariable: newVal - 0.1
                        });
                        Actions.refresh({ key: 'landing_page', title: 'Timeline', hideTabBar: true, hideNavBar: true });
                    }, 0);

                } else if (this.triggerVariable == newVal) {
                    let that = this;
                    setTimeout(function () {
                        that.setState({
                            triggerVariable: newVal - 0.1
                        });
                        Actions.refresh({ key: 'landing_page', title: 'Timeline', hideTabBar: false, hideNavBar: false });
                    }, 0);


                }
            }
        }
    }
  
    getScroll= (event) => {
        let scrollPosition = event.nativeEvent.contentOffset.y;
        this.isIncreasingSequence(scrollPosition);
    }
    
    _onRefresh() {
        this.setState({ refreshing: true });
        this.setState({ refreshing: false });
    }
    render() {
      
        return (
            <Animated.View >
                <FlatList
                    onScroll={this.getScroll}
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
                    renderItem={({ item }) => (
                        <ListView
                            item={item}
                        />
                    )}
                    keyExtractor={(item, index) => index}
                >
                </FlatList>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex:1,
        width: "100%"
    }
});

const mapStateToProps = ({auth}) => {
    const {user, email} = auth;
    return {
        email,
        user
    }
}

const mapDispatchTOProps = dispatch => {
    return {
        fetach_userInfo: (uid) => dispatch(fetchUserInfo(uid)),
        fetch_allBlog : () => dispatch(fetchAllBlog())
    };
};

export default connect(mapStateToProps,mapDispatchTOProps)(Landing);