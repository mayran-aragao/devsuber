import React, {useState, useEffect} from 'react';
import {  CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import useDevsUberApi from '../../api/useDevsUberApi';
import { LogBox } from 'react-native';
import {
  Container,
  Header,
  UserAvatar,
  UserInfo,
  UserName,
  
} from './Style';


const Config = (props)=>{

  const api = useDevsUberApi();
  LogBox.ignoreAllLogs();
  const [name,setName] = useState(props.name);

  const changeName = () => {
    if(!name){
      alert('você precisa digitar um nome');
      setName(props.name)
      return;
    } else {
      props.setName(name);
    }
  }

    return(
      <Container >
        <Header>
          <UserAvatar source={require('../../assets/avatar.jpg')} />
          <UserInfo>
            <UserName value={name} onChangeText={(n)=>setName(n)} onSubmitEditing={changeName} returnKeyType="send"/>
          </UserInfo>
        </Header>
        
      </Container>
    );
}

const mapStateToProps = (state) => {
  return{
          token: state.userReducer.token,
          name: state.userReducer.name
  };
}
const mapDispatchToProps = (dispatch) => {
  return{
          setToken:(token)=>dispatch({type:'SET_TOKEN',payload:{token}}),
          setName:(name)=>dispatch({type:'SET_NAME',payload:{name}})
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Config);
