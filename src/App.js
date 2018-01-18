import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';


import RouterComponent from './Router';
import reducers from './store/reducers';

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
            <Provider store={store}>
                <View style={{flex:1}}>
                    <RouterComponent />
                </View>
            </Provider>
        );
    }
}

export default App;