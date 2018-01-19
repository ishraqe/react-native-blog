import React, {Component} from 'react';
import { View, Text, StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';


import RouterComponent from './Router';
import reducers from './store/reducers';
import color from './assets/color';

class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: "AIzaSyArewexTwIOYZBXnLwt-YAUbiaztDrRyaA",
            authDomain: "blog-react-native.firebaseapp.com",
            databaseURL: "https://blog-react-native.firebaseio.com",
            projectId: "blog-react-native",
            storageBucket: "blog-react-native.appspot.com",
            messagingSenderId: "511570097836"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

        return (
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor={color.themeColor}
                    barStyle='light-content'
                />
                <Provider store={store}>
                    <View style={{flex:1}}>
                        <RouterComponent />
                    </View>
                </Provider>
            </View>
        );
    }
}

export default App;