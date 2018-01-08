import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RouterComponent from './Router';

class App extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <RouterComponent/>
            </View>
        );
    }
}

export default App;