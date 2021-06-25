import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';


const Container = styled.SafeAreaView`
flex:1;
`;
const Header = styled.View`
padding: 20px;
border-bottom-width: 1px;
border-bottom-color: #eee;
flex-direction: row;
align-items: center;
`;

const UserAvatar = styled.Image`
width:40px;
height: 40px;
border-radius: 20px;
background-color: #ddd;
`;

const UserInfo = styled.View`
margin-left: 10px;
`;

const UserName = styled.Text`
color: #000;
font-size: 16px;
font-weight: bold;
`;

const LogoutButton = styled.TouchableHighlight`
height:25px;
justify-content: center;
`;

const LogoutButtonText = styled.Text`
color: #000;
font-size: 15px;
`;

const Item = styled.TouchableHighlight`
flex: 1;

padding: 10px;
flex-direction: row;
`;

const Imagem = styled.Image`
width: 20px;
height: 20px;
`;

const ItemText = styled.Text`
font-size: 16px;
color: ${props=>props.color};
margin-left:10px;
`;



const CustomDrawer = (props) => {

    const handleLogout = () => {
        props.setToken('');
        props.navigation.navigate('Preload')
    }

    return(
        <DrawerContentScrollView>
            <Container>
                <Header>
                    <UserAvatar source={require('../assets/avatar.jpg')} />
                    <UserInfo>
                        <UserName>{props.name}</UserName>
                        <LogoutButton underlayColor="transparent" onPress={handleLogout}>
                            <LogoutButtonText>Sair</LogoutButtonText>
                        </LogoutButton>
                    </UserInfo>
                </Header>
                
                {props.state.routes.map((route, index)=> {
                    const options = props.descriptors[route.key].options;
                    let icon = null;
                    let label = route.name;
                    const isFocused = props.state.index === index;

            

                    if(label == 'Home'){
                        if(isFocused){
                            icon = require('../assets/home-blue.png');
                        }else {
                            icon = require('../assets/home.png');
                        }
                        
                    }else if(label == 'Config'){
                        if(isFocused){
                            icon = require('../assets/config-blue.png');
                        }else {
                            icon = require('../assets/config.png');
                        }
                    } else if(label == 'Trips'){
                        if(isFocused){
                            icon = require('../assets/carro-blue.png');
                        }else {
                            icon = require('../assets/carro.png');
                        }
                    }
                   
                    if(options.drawerLabel !=undefined) {
                        label = options.drawerLabel;
                    } else if(options.title != undefined) {
                        label = options.title;
                    }

                    

                    const handlePress = () => {
                        props.navigation.navigate(route.name);
                    }

                    return(
                        <Item key={index} onPress={handlePress} underlayColor={"transparent"}>
                            <>
                            <Imagem source={icon} />
                            {!isFocused &&
                                <ItemText color={"#333"} >{label}</ItemText>
                            }
                            {isFocused &&
                                <ItemText color={"#3574bc"}>{label}</ItemText>
                            }
                            </>
                        </Item>
                    );
                })}
            </Container>
        </DrawerContentScrollView>
    );
}
const mapStateToProps = (state) => {
    return{
            name: state.userReducer.name
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return{
            setToken:(token)=>dispatch({type:'SET_TOKEN',payload:{token}}),
            setName:(name)=>dispatch({type:'SET_NAME',payload:{name}})
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(CustomDrawer);
  