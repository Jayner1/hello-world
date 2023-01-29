import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

AppRegistry.registerComponent('hello-world', ()  => App);

export default class Chat extends React.Component {
    constructor() {
      super();
      this.state = {
        messages: [],
        uid: 0,
        user: {
          _id: "",
          name: "",
          avatar: "",
        },
     };

    if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyA2pNjh7nP-RNWzL86x38iwpmNFiteJVCU",

        authDomain: "test-3cf65.firebaseapp.com",
      
        projectId: "test-3cf65",
      
        storageBucket: "test-3cf65.appspot.com",
      
        messagingSenderId: "920817637813",
        
        appId: "1:920817637813:web:cd57320fde3f1a6fad21fc",
      
    });
  }

  this.referenceChatMessages = firebase.firestore().collection("messages");
}

componentDidMount() {
     let name = this.props.route.params.name;
     
     this.setState({
      messages: [
        {
          _id: 2,
          text: `${name} has entered the chat`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });


     this.props.navigation.setOptions({ title: name });

     this.referenceChatMessages = firebase.firestore().collection('messages');
     this.unsubscribe = this.referenceChatMessages.onSnapshot(
       this.onCollectionUpdate
     );

     this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
       if (!user) {
         firebase.auth().signInAnonymously();
       }
       this.setState({
         uid: user.uid,
         messages: [],
         user: {
           _id: user.uid,
           name: name,
         },
       });

       this.unsubscribe = this.referenceChatMessages
         .orderBy('createdAt', 'desc')
         .onSnapshot(this.onCollectionUpdate);
     });
   }

   componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

   onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
      }
    );
  }

  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
    });
  };

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || '',
        },
      });
    });
    this.setState({
      messages,
    });
  };


//Bubble customization
   renderBubble(props) {
     return (
       <Bubble
         {...props}
         wrapperStyle={{
           right: {
             backgroundColor: '#000',
           },
           left: {
             backgroundColor: '#fff',
           },
         }}
       />
     );
   }


   render() {
     let color = this.props.route.params.color;
     return (
       <View style={[styles.container, { backgroundColor: color }]}>
         <GiftedChat
           renderBubble={this.renderBubble.bind(this)}
           messages={this.state.messages}
           onSend={(messages) => this.onSend(messages)}
           user={{
             _id: 1,
           }}
         />
         {Platform.OS === 'android' ? (
           <KeyboardAvoidingView behavior="height" />
         ) : null}
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
 });