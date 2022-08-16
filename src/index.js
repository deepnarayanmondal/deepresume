import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux/reducers/rootReducer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'
import thunk from 'redux-thunk'
// import { initializeApp } from "firebase/app";
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBI7eAUj-L559Zr7_9tXKObpuaNf8G7_wo",
  authDomain: "resume-88705.firebaseapp.com",
  projectId: "resume-88705",
  storageBucket: "resume-88705.appspot.com",
  messagingSenderId: "166947288736",
  appId: "1:166947288736:web:abc9dd941b8937e6893bc5"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebase)));



ReactDOM.render(
  <BrowserRouter>
    <Provider store={reduxStore}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


