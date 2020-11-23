import React from 'react';
import {styles} from '../component/Styles';
import { Text, View, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Table, Row, Rows } from 'react-native-table-component';

export default class Cart extends React.Component{

    constructor(){
        super()
        this.state={
            requestedItemsofPants:[],
            requestedItemsofShirt:[],
            requestedItemsofWatch:[],
            requestedItemsofTie:[],
            requestedItemsofSport:[],
            requestedItemsofFormal:[],
            userID:firebase.auth().currentUser.email,
                tableHead: ['Items', 'Quantity', 'Rate', 'Price'],
                tableData: [
                  ['Shirt', '0', '0', '0'],
                  ['Pant', '0', '0', '0'],
                  ['Watch', '0', '0', '0'],
                  ['Tie', '0', '0', '0'],
                  ['Sport Shoes','0','0','0'],
                  ['Formal Shoes','0','0','0']
                ]
        }
    }

    getrequesteditemPant = () => {
        db.collection('Cart').doc(this.state.userID).collection('Pant').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofPants:requestedItems
            })
        })
    }

    getrequesteditemShirt = () => {
        db.collection('Cart').doc(this.state.userID).collection('Shirts').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofShirt:requestedItems
            })
        })
    }

    getrequesteditemWatch = () => {
        db.collection('Cart').doc(this.state.userID).collection('Watch').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofWatch:requestedItems
            })
        })
    }

    getrequesteditemTie = () => {
        db.collection('Cart').doc(this.state.userID).collection('Tie').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofTie:requestedItems
            })
        })
    }

    getrequesteditemSport = () => {
        db.collection('Cart').doc(this.state.userID).collection('Sport').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofSport:requestedItems
            })
        })
    }

    getrequesteditemFormal = () => {
        db.collection('Cart').doc(this.state.userID).collection('Formal').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofFormal:requestedItems
            })
        })
    }

    componentDidMount(){
        this.getrequesteditemPant()
        this.getrequesteditemFormal()
        this.getrequesteditemShirt()
        this.getrequesteditemSport()
        this.getrequesteditemTie()
        this.getrequesteditemWatch()
    }

    render(){
        return(
            <View style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',width:390}}>
                    <Row data={this.state.tableHead} style={{width:365}} textStyle={{textAlign:'center'}} />
                    <Rows data={this.state.tableData} style={{width:365}} textStyle={{textAlign:'center'}} />
                </Table>
            </View>
        )
    }
}