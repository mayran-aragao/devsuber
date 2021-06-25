import styled from 'styled-components/native';

export const Container = styled.View`
flex:1;
`;
export const IntineraryArea = styled.View`
position: absolute;
left:10px;
right: 10px;
top:60px;
background-color: #fff;
border-radius: 5px;
box-shadow: 0px 0px 4px #999;
border-color: #eee;
border-width: 1px;
`;

export const IntineraryItem = styled.TouchableHighlight`
padding:15px 20px;
border-bottom-color:#eee;
border-bottom-width: 1px;
`;

export const IntineraryLabel = styled.View`
flex-direction: row;
align-items:center;
margin-bottom: 10px;
`;

export const IntineraryPoint = styled.Image`
width:16px;
height:16px;

`;

export const IntineraryTitle = styled.Text`
margin-left: 10px;
color:#999;
`;

export const IntineraryValue = styled.Text`
color:#000;
font-size: 16px;
`;

export const IntineraryPlaceHolder = styled.Text`
color:#555;
font-size: 16px;
text-align: center;
`;

export const RequestDetails = styled.View`
flex-direction: row;
`;

export const RequestDetail = styled.View`
flex:1;
align-items: center;
`;

export const RequestTitle= styled.Text`
color:#999;
font-weight: bold;
font-size: 15px;
`;

export const RequestValue = styled.Text`
color: #000;
font-size: 17px;
`;

export const RequestButtons = styled.View`
flex-direction: row;
`;

export const RequestButton = styled.TouchableHighlight`
flex: 1;
height: 40px;
background-color: ${props=>props.color};
justify-content: center;
align-items: center;
border-radius: 5px;
margin: 10px 5px;

`;

export const RequestButtonText = styled.Text`
color:#fff;
font-size: 16px;
`;

export const CenterButtonArea = styled.View`
position: absolute;
align-self: flex-end;
top:650px;
right: 10px;
`;

export const CenterButton = styled.TouchableHighlight`

width: 55px;
height: 55px;
border-radius: 27px;
background-color:#fff;
justify-content: center;
align-items: center;
`;

export const CenterButtonText = styled.Image`
width: 35px;
height: 35px ;

`;

export const LoadingArea = styled.View`
position:absolute;
left:0;
top:0;
right:0;
bottom:0;
background-color: rgba(0,0,0,0.5);
justify-content: center;
align-items: center;
`;

export const MenuArea = styled.TouchableHighlight`
position: absolute;
width: 60px;
height: 60px;
left: 0;
top: 0;
justify-content: center;
align-items: center;
`;

export const MenuAreaImage = styled.Image`
width: 24px;
height: 24px;
`;