import React,{useState,useEffect} from 'react';
import {Alert, Modal} from 'react-native';
import styled from 'styled-components/native';
import { AirbnbRating } from 'react-native-ratings';
import useDevsUberApi from '../api/useDevsUberApi';


const ModalArea = styled.View`
flex:1;
background-color: #fff;
align-items: center;
justify-content: center;
`;
const DriverHeadText = styled.Text`
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
`;
const DriverAvatar  =styled.Image`
width: 120px;
height: 120px;
border-radius: 60px;
`;

const DriverName  =styled.Text`
font-size: 22px;
font-weight: bold;
margin:20px;
color: #000;
`;

const DriverStars  =styled.Text`
color:#999;
font-size: 19px;
`;

const DriverCarBox = styled.View`
width: 100%;
align-items: center;
border-top-width: 1px;
border-top-color: #999;
border-bottom-width: 1px;
border-bottom-color: #999;
padding: 20px;
margin: 20px;
`;
const DriverCar = styled.Text`
font-size: 17px;
color: #000;
`;
const DriverColor = styled.Text`
font-size: 15px;
color:#999;
`;
const DriverPlate = styled.Text`
font-size: 20px;
color: #000;
`;
const TripButton = styled.TouchableHighlight`
width:80%;
height: 50px;
background-color: #3574cb;
justify-content: center;
align-items: center;
border-radius: 5px;
`;

const TripButtonText = styled.Text`
color: #fff;
font-size: 17px;
`;

const RatingText = styled.Text`
font-size: 22px;
color: #000;
font-weight: bold;
`;

export default (props)=> {

    const api = useDevsUberApi();

    const [showStars, setShowStars] = useState(false);

    const handleRating = () => {
        setShowStars(true);
    }
    const handleRatingFinish = async (rating) => {
        await api.setRating(rating);

        props.visibleAction(false);
        setShowStars(false);
        alert("Obrigado pela viagem");
    }

    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
        >
            <ModalArea>
                <DriverHeadText>Seu motorista é:</DriverHeadText>
                <DriverAvatar source={props.driver.avatar}/>
                <DriverName>{props.driver.name}</DriverName>
                <DriverStars>{props.driver.stars} Estrelas</DriverStars>
                {!showStars &&
                    <>
                        <DriverCarBox>
                            <DriverCar>{props.driver.carName}</DriverCar>
                            <DriverColor>{props.driver.carColor}</DriverColor>
                            <DriverPlate>{props.driver.carPlate}</DriverPlate>
                        </DriverCarBox>
                        <TripButton onPress={handleRating} underlayColor="transparent">
                            <TripButtonText>Encerrar corrida</TripButtonText>
                        </TripButton>
                    </>
                }
                {showStars &&
                    <>
                        <RatingText>Avalie seu motorista</RatingText>
                        <AirbnbRating
                            count={5}
                            reviews={['Terrível','Ruim','Boa','Muito Boa','Excelente']}
                            defaultRating={3}
                            onFinishRating={handleRatingFinish}
                        />
                    </>
                }
                
            </ModalArea>
        </Modal>
    );
}