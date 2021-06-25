import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
flex:1;
`;
export const Header = styled.View`
align-items: center;
padding-top: 10px;
`;

export const UserAvatar = styled.Image`
width:120px;
height: 120px;
border-radius: 60px;
background-color: #ddd;
`;

export const UserInfo = styled.View`
width: 100%;
height: 100px;
align-items: center;
border-bottom-width: 1px;
border-bottom-color: #666;
`;

export const UserName = styled.TextInput`
color: #000;
font-size: 16px;
border-bottom-width: 1px;
border-bottom-color: #000;
font-weight: bold;
`;