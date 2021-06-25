import React,{useState,useEffect} from 'react';
import {Modal} from 'react-native';
import {MapsAPI} from '../config';
import Geocoder from 'react-native-geocoding';
import styled from 'styled-components/native';


const ModalArea = styled.View`
flex:1;
background-color: #fff;
`;

const ModalHeader = styled.View`
flex-direction: row;
padding: 20px;
align-items: center;
`;

const ModalClose = styled.TouchableHighlight`
height: 40px;
width: 40px;
border-radius: 20px;
background-color:#ccc;
align-items: center;
justify-content: center;
`;
const ModalCloseText = styled.Text`
color: #111;
font-size: 15px;
font-weight: bold;
`;

const ModalInput = styled.TextInput`
margin-left: 20px;
height: 40px;
border: 1px solid #ccc;
flex:1;
border-radius: 5px;
padding: 10px;
`;

const ModalResults = styled.View``;

const ModalResult = styled.TouchableHighlight`
padding: 15px;
`;

const ModalResultText = styled.Text`
font-size: 16px;
color: #000;
`;

const ModalSetLocationArea = styled.View`

`;

const ModalSetLocation = styled.TouchableHighlight`
padding: 15px;
flex-direction: row;
`;

const ModalSetLocationText = styled.Text`
padding-left: 10px;
color: #3574CB;
font-size: 16px;
`; 

const ModalSetLocationImage = styled.Image`
width:18px;
height: 18px;
`;

let timer;

export default (props)=> {

    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        Geocoder.init(MapsAPI,{language:'pt-br'});
    },[]);
    
    useEffect(()=>{
        if(searchText){

            if(timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                const geo = await Geocoder.from(`${searchText}, Teresina,Pi`);
                if(geo.results.length > 0) {
                    let tmpResults = [];
                    for(let i in geo.results) {
                        
                        tmpResults.push({
                            address:geo.results[i].formatted_address,
                            latitude:geo.results[i].geometry.location.lat,
                            longitude:geo.results[i].geometry.location.lng
                        });
                    }
                    setResults(tmpResults);
            
                    
                } else {
                    setResults([]);
                
                }
            }, 300);
            
        } 
    },[searchText]);

    const closeModal= () => {
        props.visibleAction(false);
        setSearchText([]);
        setResults([]);
    }
    
    const handleResultClick = (item) => {
        props.clickAction(props.field, item);
        props.visibleAction(false);
        setSearchText([]);
        setResults([]);
        
    }

    const handleCurrentLocation = () => {
        props.myLocationAction();
        props.visibleAction(false);
        setSearchText([]);
        setResults([]);
    }

    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
        >
            <ModalArea>
                <ModalHeader>
                    <ModalClose onPress={closeModal} underlayColor="#999">
                        <ModalCloseText>X</ModalCloseText>
                    </ModalClose>
                    <ModalInput
                        value={searchText}
                        onChangeText={t=>setSearchText(t)}
                        placeholder={props.title}
                        autoFocus={true}
                    />
                </ModalHeader>
                <ModalSetLocationArea>
                    <ModalSetLocation onPress={handleCurrentLocation} underlayColor="transparent">
                        <>
                        <ModalSetLocationImage source={require('../assets/location.png')}/>
                        <ModalSetLocationText>Sua localização atual</ModalSetLocationText>
                        </>
                    </ModalSetLocation>
                </ModalSetLocationArea>
                <ModalResults>
                    {results.map((i,k)=>(
                        <ModalResult key={k} onPress={()=>handleResultClick(i)} underlayColor="#eee">
                            <ModalResultText>{i.address}</ModalResultText>
                        </ModalResult>
                    ))}
                </ModalResults>
            </ModalArea>
        </Modal>
    );
}