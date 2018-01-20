import React, { Component } from 'react';
import { View, Animated,Text, FlatList, StyleSheet, RefreshControl, ScrollView, Easing } from 'react-native';
import ListView from '../../common/List';
import { fetchAllBlog } from "../../../store/actions";
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Landing extends Component {
    

    constructor(props) {
        super(props);
        Animated.timing(
            this.state.slide, {
                toValue: { x: 0, y: -100 },
                duration: 200,
                delay: 100,
                easing: Easing.in(Easing.ease)
            }
        ).start()

        this.state = {
            refreshing: false,
            height: new Animated.Value(0),
            showNav: false,
            triggerVariable: 0,
            slide:  new Animated.Value({x:0, y:0})
        }
    }
    
    componentWillMount() {
        this.props.fetch_allBlog();
       
    }  

    isIncreasingSequence = (newVal) => {
        if (this.state.triggerVariable !== newVal) {
            if(this.state.triggerVariable > newVal ) {
                this._setAnimation(true);
                Actions.refresh({ key: 'landing_page', hideNavBar: false });
                
                this.setState({
                    triggerVariable : newVal
                });
            }else if (this.state.triggerVariable < newVal) {
                this._setAnimation(true);
                Actions.refresh({ key: 'landing_page', hideNavBar: true });                
                
                this.setState({
                    triggerVariable: newVal
                });

            }else if (this.triggerVariable == newVal) {
                this._setAnimation(false);
                Actions.refresh({ key: 'landing_page', hideNavBar: false });

                this.setState({
                    triggerVariable: newVal
                });
            }
            
        }
    }
  
    getScroll= (event) => {
        let scrollPosition = event.nativeEvent.contentOffset.y;
        this.isIncreasingSequence(scrollPosition);
        
    }
    
    _setAnimation() {
       
    } 

    _onRefresh() {
        this.setState({ refreshing: true });
        this.setState({ refreshing: false });
    }
    render() {

        const slideStyle= this.state.slide.getTranslateTransform();
        return (
            <Animated.View 
                style={slideStyle}>
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


const mapDispatchTOProps = dispatch => {
    return {
        fetch_allBlog : () => dispatch(fetchAllBlog())
    };
};

export default connect(null,mapDispatchTOProps)(Landing);