
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import HTML from "react-native-render-html";
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Post from './Post';

const Stack = createNativeStackNavigator();

const Blog = ({navigation}) => {
    return (
      <Query query={gql`
      query NewQuery {
        posts {
          nodes {
            title
            slug
            id
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `}>
     {({loading, error, data })=> {
      if(loading){
        return(
          <View>
            <Text style={styles.loadText}>Loading...</Text>
          </View>
        )
      }

      return (
     <ScrollView style={{ backgroundColor: 'white', marginHorizontal: 10 }}>  
      <View style={styles.container}>
      {data.posts.nodes.map((post, key) =>{ 
        return(
          <View key={key}>
          <Text style={styles.textColor}>{post.title}</Text>
          <HTML source={{html: post.sourceUrl}}/>            
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonView} onPress={() =>{
              navigation.navigate('Post')
            }}>
              <Text>Learn More</Text>
            </TouchableOpacity>
          </View>
         </View>
         )
      })}
      </View>
      </ScrollView>
      )
     }}
    </Query>
    );
  };


  export default function Root() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Blog" component={Blog} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Navigator>
    );
  }

const stylesHtml = StyleSheet.create({
    a: {
      fontWeight: '300',
      color: '#FF3366', // make links coloured pink
    },
  });
   
  const styles = StyleSheet.create({
    loadText:{
      textAlign:'center',
      },
   container: {
   backgroundColor:'#fff',
   padding:20,
    },
    textColor:{
      color:"000",
      fontSize: 14,
      textTransform : 'uppercase',
      fontWeight : 'bold', 
      padding:10,
    },
    buttonView:{
          marginLeft:50,
          marginRight:50,
          borderWidth:2,
          borderRadius:20,
          borderColor:'#F31801',
          overflow:"hidden",
          marginBottom:10,
     }
    }); 