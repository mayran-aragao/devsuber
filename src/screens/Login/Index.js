import React, {useState} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import {  CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import useDevsUberApi from '../../useDevsUberApi';
import {
  Container,
  Header,
  HeaderTitle,
  Menu,
  MenuItem,
  MenuItemText,
  Input,
  ActionButton,
  ActionButtonText,
  LoadingArea,
  Scroll
} from './Style';




const Login = (props)=>{

  const api = useDevsUberApi();

  const [activeMenu, setActiveMenu] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if(email && password){
      setLoading(true);
      const res = await api.signin(email,password);
      setLoading(false);
      if(res.error){
        alert(res.error);
      } else {
          props.setToken(res.token);
          props.navigation.dispatch(CommonActions.reset({
            index:0,
            routes:[
                {name:'HomeDrawer'}
            ]
        }));
      }
    }
  }

  const handleSignUp = async () => {
    if(name && email && password && confirmation){
      if(password == confirmation){
        setLoading(true);
        const res = await api.signup(name,email, password);
        setLoading(false);
        if(res.error){
          alert(res.error);
        } else {
            props.setToken(res.token);
            props.navigation.dispatch(CommonActions.reset({
              index:0,
              routes:[
                  {name:'HomeDrawer'}
              ]
          }));
        }

      }else{
        alert('As senhas não batem!');
      }
    }
  }
  
    return(
      <Container >
        <Scroll>
          <StatusBar backgroundColor="#3574cb" barStyle="light-content"/>
          <Header>
            <HeaderTitle>Let's Ride</HeaderTitle>
          </Header>

          <Menu>
            <MenuItem active={activeMenu == 'signin'} underlayColor="transparent" onPress={()=>setActiveMenu('signin')}>
              <MenuItemText>Login</MenuItemText>
            </MenuItem>
            <MenuItem active={activeMenu == 'signup'} underlayColor="transparent" onPress={()=>setActiveMenu('signup')}>
              <MenuItemText>Cadastrar</MenuItemText>
            </MenuItem>
          </Menu>

          {activeMenu == "signup" && 
            <Input editable={!loading} value={name} onChangeText={t=>setName(t)} placeholder="Nome" placeholderTextColor="#999" />
          }
          
          <Input editable={!loading} value={email} onChangeText={t=>setEmail(t)} placeholder="E-mail"  autoCapitalize="none" placeholderTextColor="#999"/>

          <Input editable={!loading} value={password} onChangeText={t=>setPassword(t)} placeholder="Senha" placeholderTextColor="#999" secureTextEntry={true}/>

          {activeMenu == "signup" && 
          <Input editable={!loading} value={confirmation} onChangeText={t=>setConfirmation(t)} placeholder="Confirmação de senha" placeholderTextColor="#999" secureTextEntry={true}/>
          } 

          {activeMenu == "signin" && 
          <ActionButton disabled={loading} onPress={handleSignIn} underlayColor="#4552ff">
            <ActionButtonText>Logar</ActionButtonText>
          </ActionButton>
          } 
          {activeMenu == "signup" && 
          <ActionButton disabled={loading} onPress={handleSignUp} underlayColor="#4552ff">
            <ActionButtonText>Cadastrar</ActionButtonText>
          </ActionButton>
          }
        </Scroll>
        {loading &&
          <LoadingArea>
            <ActivityIndicator size="large" color="#fff"/>
          </LoadingArea> 
        }
      </Container>
    );
}

const mapStateToProps = (state) => {
  return{
          token: state.userReducer.token
  };
}
const mapDispatchToProps = (dispatch) => {
  return{
          setToken:(token)=>dispatch({type:'SET_TOKEN',payload:{token}})
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
