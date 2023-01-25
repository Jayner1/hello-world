// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.blue}>Hello World!</Text>
//       <Text style={styles.bigRed}>How are you?</Text>
//       <Text style={styles.bigRedBold}>I'm feeling blue!</Text>
//       <View style={styles.box}></View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   blue: {
//     color: 'blue',
//     fontWeight: '600',
//   },
//   bigRed: {
//     color: 'red',
//     fontSize: 30,
//   },
//   bigRedBold: {
//     color: 'red',
//     fontSize: 30,
//     fontWeight: '600',
//   },
//   box: {
//     width: 60,
//     height: 60,
//     backgroundColor: 'blue',
//   }
// });





// import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';

// export default class HelloWorld extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.box1}></View>
//         <View style={styles.box2}></View>
//         <View style={styles.box3}></View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row'
//   },
//   box1: {
//     flex:60,
//     backgroundColor: 'blue'
//   },
//   box2: {
//     flex:60,
//     backgroundColor: 'silver'
//   },
//   box3: {
//     flex:60,
//     backgroundColor: 'gold'
//   }
// });






// import React, { Component } from 'react';
// import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';

// export default class App extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = { text: '' };
//  }

//  render() {
//    return (
//      <View style={{flex:1, justifyContent:'center'}}>
//        <TextInput
//          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//          onChangeText={(text) => this.setState({text})}
//          value={this.state.text}
//          placeholder='Type here ...'
//        />
//        <Text>You wrote: {this.state.text}</Text>
//        <Button
//   onPress={() => {
//     this.alertMyText({text: this.state.text});
//   }}
//   title="Press Me"
// />
// <ScrollView>
//   <Text style={{fontSize:110}}>This text is so big! And so long! You have to scroll!</Text>
// </ScrollView>

//      </View>
//    );
//  }
// }

import Start from './components/Start';
import Chat from './components/Chat';

// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();

export default function App() {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}