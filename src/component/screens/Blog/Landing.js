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
            info: null
        }
    }
  
    componentWillMount() {
        this.props.fetch_allBlog();
        if (this.props.allPosts) {
            this.setState({
                info: this.props.allPosts
            });
        }
        console.log(this.props.allPosts, 'will mount');
    }

    componentWillReceiveProps(next) {
        this.setState({
            info: next.allPosts
        });
        console.log(next.allPosts, 'next');
    }

    async componentDidMount() {
        this.props.fetach_userInfo(this.props.user.uid);  
        this.props.fetch_allBlog(); 
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
                        // Actions.refresh({ key: 'landing_page', header: 'Timeline', hideTabBar: false, hideNavBar: false });
                    }, 0);

                } else if (this.state.triggerVariable < newVal) {
                    let that = this;
                    setTimeout(function () {
                        that.setState({
                            triggerVariable: newVal - 0.1
                        });
                        // Actions.refresh({ key: 'landing_page', title: 'Timeline', hideTabBar: true, hideNavBar: true });
                    }, 0);

                } else if (this.triggerVariable == newVal) {
                    let that = this;
                    setTimeout(function () {
                        that.setState({
                            triggerVariable: newVal - 0.1
                        });
                        // Actions.refresh({ key: 'landing_page', title: 'Timeline', hideTabBar: false, hideNavBar: false });
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
                    data={this.state.info}
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

const mapStateToProps = (state) => {
    const {user, email} = state.auth;
    const allPosts = state.blog.allBlog;
    console.log(allPosts, 'state');
    
    return {
        email,
        user,
        allPosts
    }
}

const mapDispatchTOProps = dispatch => {
    return {
        fetach_userInfo: (uid) => dispatch(fetchUserInfo(uid)),
        fetch_allBlog : () => dispatch(fetchAllBlog())
    };
};

export default connect(mapStateToProps,mapDispatchTOProps)(Landing);