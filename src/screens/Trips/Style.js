import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
flex:1;
`;
export const Scroll = styled.ScrollView`
width: 100%;
padding-left: 10px;
padding-right: 10px;
background-color: #fff;

`;
export const Card = styled.View`
width: 100%;

justify-content:space-between;
background-color:#eee;
border-radius: 1px;
border: 1px solid #eee;
margin-top: 10px;
`;
export const ValueBox = styled.View`
flex-direction: row;
justify-content: space-between;
`;
export const CardText = styled.Text`
font-size: 15px;
font-weight: bold;
color: #3574cb;
`;
export const CardTextInfo = styled.Text`
color: #3574cb;
`;