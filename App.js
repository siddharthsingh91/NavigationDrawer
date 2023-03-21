import * as React from 'react';
import { Button, View, useWindowDimensions, Colors, StyleSheet, Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import HomeScreen from './navigation/screens/HomeScreen';
import ContactUs from './navigation/screens/ContactUs';
import Services from './navigation/screens/Services';
import Certifications from './navigation/screens/Certifications';
import WhatWeDo from './navigation/screens/WhatWeDo';
import Blog from './navigation/screens/Blog';
import Post from './navigation/screens/Post';

const client = new ApolloClient({
  uri : 'https://dlh.sanditsolution.com/graphql'
})

const Drawer = createDrawerNavigator();


export default function App() {

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>  
      <Drawer.Navigator initialRouteName="HomeScreen"  
       screenOptions={({ route }) => ({
        drawerStyle : drawerTheme.colors,
        drawerType: isLargeScreen ? 'permanent' : 'back',
        //drawerStyle: isLargeScreen ? null : { width: '80%' },
        overlayColor: 'transparent',

    headerShown: true,
       
    drawerLabelStyle: {
      marginLeft: -2,
      fontSize: 15,
    },
    drawerType: "slide",
    headerStyle: {
      height: 60, // Specify the height of your custom header
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      elevation: 0,
      shadowOpacity: 0,
    },

    headerTitle: () => {
      console.log(route.name);
      return (
        <View
          style={styles.headerStyleTwo}>
           <Text>{route.name}</Text> 
        </View>
      );
    },
    // HERE IS THIS MAGIC LINE OF CODE

    headerTitleAlign: "center",

    // THAT'S ALL YOU NEED IN DN6 :)

    headerRight: () => (
      <Button
        onPress={() => alert("This is a button!")}
        title="Call Now"
      />
    ),

    drawerIcon: ({ focused, color, size }) => {
      let iconName;
      let rn = route.name;

      if (rn === 'HOME') {
        iconName = focused ? 'home' : 'home-outline';
        color = focused ? '#464a4a' : '#000';

      } else if (rn === 'CONTACT US') {
        iconName = focused ? 'call' : 'call-outline';
        color = focused ? '#464a4a' : '#000';

      } else if (rn === 'SERVICES') {
        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        color = focused ? '#464a4a' : '#000';
      }
      else if (rn === 'CERTIFICATIONS') {
        iconName = focused ? 'reader' : 'reader-outline';
        color = focused ? '#464a4a' : '#000';
      }
      else if (rn === 'WHAT WE DO') {
        iconName = focused ? 'ribbon' : 'ribbon-outline';
        color = focused ? '#464a4a' : '#000';
      }
      else if (rn === 'BLOG') {
        iconName = focused ? 'newspaper' : 'newspaper-outline';
        color = focused ? '#464a4a' : '#000';
      }     
      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    }

      }) }>
        <Drawer.Screen name="HOME" component={HomeScreen} options={{ drawerLabel: 'Home', headerShown: true, headerStyle : styles.headerStyle}}/>
        <Drawer.Screen name="CONTACT US" component={ContactUs}  options={{ drawerLabel: 'Contact Us' }}/>
        <Drawer.Screen name="SERVICES" component={Services} options={{ drawerLabel: 'Services' }}/>
        <Drawer.Screen name="CERTIFICATIONS" component={Certifications}  options={{ drawerLabel: 'Certifications' }}/>
        <Drawer.Screen name="WHAT WE DO" component={WhatWeDo} options={{ drawerLabel: 'What We Do' }}/>
        <Drawer.Screen name="BLOG" component={Blog} options={{ drawerLabel: 'Blog' }}/>
      </Drawer.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle:{
    textAlign:"center", 
    },
    headerStyleTwo:{
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
    }
  }); 


  const drawerTheme = StyleSheet.create({
    colors: {
      backgroundColor:"orange", borderRadius:10,  width: '80%'
    }
}); 