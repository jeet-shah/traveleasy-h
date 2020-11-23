import React from 'react';
import { Text, View,Image,TouchableOpacity, } from 'react-native';
import MyHeader from '../component/MyHeader';
import {styles} from '../component/Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import db from '../config';
import firebase from 'firebase';

export default class FormalCatalogue extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:this.props.navigation.getParam("details4")['name'],
            image:this.props.navigation.getParam("details4")['avatar_url'],
            subtitle:this.props.navigation.getParam('details4')['subtitle'],
            count:0,
            size:'42',
            userID:firebase.auth().currentUser.email,
        }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 300,
              padding: 50,
              marginLeft: 25,
              marginRight: 25,
              marginTop:50
              }}>
            <Image style={{width:150,height:150}} source={{uri:item.image}} />
            <Text> {item.name} </Text>
          </View>

        )
    }

    render(){
        return(
            <View style={styles.container}>
              <View style={{marginTop:180,width:370}}>
                <MyHeader title={this.state.name} navigation={this.props.navigation} />
                </View>
                <View style={{height:300}}>
                </View>
              <Text style={{marginTop:20,fontWeight:'bold'}}> {this.state.subtitle} </Text>
            <View style={{flexDirection:'row',marginTop:20,marginBottom:425}}>
                <DropDownPicker
                    items={[
                        {label: '42', value: '42',selected:true},
                        {label: '44', value: '44'},
                        {label: '46', value: '46'}
                    ]}
                    containerStyle={{height: 40}}
                    onChangeItem={item => this.setState({size:item.label})}
                    placeholder="Size"
                    style={{width:80}}
                    dropDownStyle={{width:100}}
                />
                <TouchableOpacity onPress={()=>{
                    if(this.state.count === 0){
                        this.setState({count:0})
                    }else{
                        this.setState({count:this.state.count-1})
                    }
                }} style={{backgroundColor:'white',width:40,marginLeft:20}}>
                    <Text style={{fontSize:20}}>-</Text>
                </TouchableOpacity>
                <Text style={{fontSize:20}}> {this.state.count} </Text>
                <TouchableOpacity onPress={()=>{this.setState({count:this.state.count+1})}} style={{backgroundColor:'white'}}>
                    <Text style={{fontSize:20,width:40}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:20,backgroundColor:'white',marginLeft:10}} onPress={()=>{
                    db.collection('Cart').doc(this.state.userID).collection('Formal').add({
                        "FormalName":this.state.name,
                        "FormalQuantity":this.state.count,
                        "FormalSize":this.state.size,
                        "userID":this.state.userID
                    })
                }}>
                <Text> Add To Cart </Text>
            </TouchableOpacity>
            </View>
            </View>
        )
    }
}