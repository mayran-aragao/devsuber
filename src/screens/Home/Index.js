import React, {useRef, useState,useEffect} from 'react';
import {ActivityIndicator, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import {MapsAPI} from '../../config';
import useDevsUberApi from '../../api/useDevsUberApi';
import AddressModal from '../../components/AddressModal';
import DriverModal from '../../components/DriverModal';
import { LogBox } from 'react-native';
import {
    Container,
    MenuArea,
    MenuAreaImage,
    IntineraryArea,
    IntineraryItem,
    IntineraryLabel,
    IntineraryTitle,
    IntineraryPoint,
    IntineraryValue,
    IntineraryPlaceHolder,
    RequestDetails,
    RequestDetail,
    RequestTitle,
    RequestValue,
    RequestButtons,
    RequestButton,
    RequestButtonText,
    CenterButtonArea,
    CenterButton,
    CenterButtonText,
    LoadingArea
    
} from './Style';


const Home = (props) => {
    LogBox.ignoreAllLogs();
    const map = useRef();
    const api = useDevsUberApi();
    const [ mapLoc, setMapLoc] = useState({
        center:{
            latitude:-5.193136,
            longitude:-42.768116  
        },
        zoom:16,
        pitch:0,
        altitude:0,
        heading:0
    });
    const [fromLoc, setFromLoc] = useState({});
    const [toLoc, setToLoc] = useState({});
    const [showDirections, setShowDirections]= useState(false);
    const [requestDistance , setRequestDistance] = useState(0);
    const [requestTime , setRequestTime] = useState(0);
    const [requestPrice , setRequestPrice] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalField, setModalField] = useState('');
    const [loading, setLoading] = useState(false);
    const [driverInfo, setDriverInfo] = useState({});
    const [driverModalVisible, setDriverModalVisible] = useState(false);



    useEffect(()=>{
        Geocoder.init(MapsAPI,{language:'pt-br'});
        getMyCurrentPosition();
    },[]);
    
    useEffect(() => {
        if(fromLoc.center) {
            setMapLoc(fromLoc);
        }
    }, [fromLoc])
    
    useEffect(()=>{
        if(fromLoc.center && toLoc.center) {
            setShowDirections(true);
        }
    },[toLoc]);

    const getMyCurrentPosition = () => {
        Geolocation.getCurrentPosition( async (info)=>{

            const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);

            if(geo.results.length >0) {
                const loc={
                    name:geo.results[0].formatted_address,
                    center:{
                        latitude:info.coords.latitude,
                        longitude:info.coords.longitude
                    },
                    zoom:16,
                    pitch:0,
                    altitude:0,
                    heading:0
                };
                setMapLoc(loc);
                setFromLoc(loc);
                
            
            }

        }, (error)=>{
            
        },{ enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 } );
    }

    const handleFromClick = ()=> {
        setModalVisible(true);
        setModalField('from');
        setModalTitle('Escolha uma origem')
    }

    const handleToClick = async () => {
        setModalVisible(true);
        setModalField('to');
        setModalTitle('Escolha uma destino')
    }

    const handleDirectionsReady = async (r) => {
        setRequestDistance(r.distance);
        setRequestTime(r.duration);

        const priceReq = await api.getRequestPrice(r.distance);
        if(!priceReq.error){
            setRequestPrice(priceReq.price);
        }

        map.current.fitToCoordinates(r.coordinates, {
            edgePadding:{
                top:1100,
                left:50,
                right:50,
                bottom:0,
            }
        });
    }

    const handleRequestGo = async () => {
        setLoading(true);
        
        const driver = await api.findDriver({
            fromlat:fromLoc.center.latitude,
            fromlng:fromLoc.center.longitude,
            tolat:toLoc.center.latitude,
            tolng:toLoc.center.longitude
        });
        setLoading(false);
        if(!driver.error) {
            setDriverInfo(driver.driver);
            const run = {
                origem:fromLoc.name,
                destino:toLoc.name,
                distance:requestDistance.toFixed(1),
                price:requestPrice.toFixed(2),
                time:requestTime.toFixed(0),
            };
    
            
            props.setRun(run);
            
            
            setDriverModalVisible(true);
            handleRequestCancel();
        } else {
            alert(driver.error);
        }   
}

    const handleRequestCancel = () => {
        setToLoc({});
        setShowDirections(false);
        setRequestDistance(0);
        setRequestPrice(0);
        setRequestTime(0);
        
        setMapLoc(fromLoc);
    }

    const handleMapChange = async () => {
        const cam = await map.current.getCamera();
        cam.altitude = 0;
        setMapLoc(cam);
    }

    const handleModalClick = (field, address) => {
        const loc={
            name:address.address,
            center:{
                latitude:address.latitude,
                longitude:address.longitude
            },
            zoom:16,
            pitch:0,
            altitude:0,
            heading:0
        };

        switch(field) {
            case 'from':
                setFromLoc(loc);
                break;
            case 'to':
                setToLoc(loc);
                break;
        }
    }
    const handleCenter = () => {
        if(fromLoc.center) {
            setMapLoc(fromLoc);
         }
        
    }

    const handleMenu = () => {
        props.navigation.openDrawer();
    }

    return(
        <Container>
            <StatusBar barStyle="dark-content"/>
            <DriverModal
                driver={driverInfo}
                visible={driverModalVisible}
                visibleAction={setDriverModalVisible}
            
            />
            <AddressModal
                title={modalTitle}
                visible={modalVisible}
                visibleAction={setModalVisible}
                field={modalField}
                clickAction={handleModalClick}
                myLocationAction={getMyCurrentPosition}
            
            />
            <MapView
                ref={map}
                style={{flex:1}}
                provider="google"
                camera={mapLoc}
                onRegionChangeComplete={handleMapChange}
            >
                {fromLoc.center &&
                    <MapView.Marker pinColor = "#000" coordinate={fromLoc.center}/>
                }

                {toLoc.center &&
                    <MapView.Marker pinColor = "#000" coordinate={toLoc.center}/>
                }

                {showDirections &&
                    <MapViewDirections
                        origin={fromLoc.center}
                        destination={toLoc.center}
                        strokeWidth={5}
                        strokeColor="blue"
                        apikey={MapsAPI}
                        onReady={handleDirectionsReady}
                    />
                }


            </MapView>

            <MenuArea underlayColor="transparent" onPress={handleMenu}>
                <MenuAreaImage source={require('../../assets/menu1.png')}/>
            </MenuArea>

            <IntineraryArea>
                <IntineraryItem onPress={handleFromClick} underlayColor="#EEE" >
                    <>
                        <IntineraryLabel>
                            <IntineraryPoint source={require('../../assets/home.png')}   />
                            <IntineraryTitle>Origem</IntineraryTitle>
                        </IntineraryLabel>
                        {fromLoc.name &&
                            <IntineraryValue>{fromLoc.name}</IntineraryValue>
                        }
                        {!fromLoc.name &&
                            <IntineraryPlaceHolder>Escolha um local de origem</IntineraryPlaceHolder> 
                        }
                        
                    </>
                </IntineraryItem>
                <IntineraryItem onPress={handleToClick} underlayColor="#EEE">
                    <>
                        <IntineraryLabel>
                            <IntineraryPoint source={require('../../assets/carro.png')}  />
                            <IntineraryTitle>Destino</IntineraryTitle>
                        </IntineraryLabel>
                        {toLoc.name &&
                            <IntineraryValue>{toLoc.name}</IntineraryValue>
                        }
                        {!toLoc.name &&
                            <IntineraryPlaceHolder>Escolha um local de destino</IntineraryPlaceHolder> 
                        }
                    </>
                </IntineraryItem>
                {fromLoc.center && toLoc.center &&
                    <IntineraryItem>
                        <>
                            <RequestDetails>
                                <RequestDetail>
                                    <RequestTitle>Distancia</RequestTitle>
                                    <RequestValue>{requestDistance > 0?`${requestDistance.toFixed(1)}km`:'--'}</RequestValue>
                                </RequestDetail>
                                <RequestDetail>
                                    <RequestTitle>Tempo</RequestTitle>
                                    <RequestValue>{requestTime > 0?`${requestTime.toFixed(0)}mins`:'--'}</RequestValue>
                                </RequestDetail>
                                <RequestDetail>
                                    <RequestTitle>Valor</RequestTitle>
                                    <RequestValue>{requestPrice > 0?`R$ ${requestPrice.toFixed(2)}`:'--'}</RequestValue>
                                </RequestDetail>
                            </RequestDetails>
                            <RequestButtons>
                                <RequestButton color="#3574CB" onPress={handleRequestGo} underlayColor="#336699">
                                    <RequestButtonText>Solicitar motorista</RequestButtonText>
                                </RequestButton>
                                <RequestButton color="#B22222" onPress={handleRequestCancel} underlayColor="#990000">
                                    <RequestButtonText>Cancelar</RequestButtonText>
                                </RequestButton>
                            </RequestButtons>
                        </>
                    </IntineraryItem>
                }
            </IntineraryArea>
            <CenterButtonArea>
                <CenterButton onPress={handleCenter} underlayColor="none">
                    <CenterButtonText source={require('../../assets/center3.png')}/>
                </CenterButton>
            </CenterButtonArea>
            {loading &&
                <LoadingArea>
                    <ActivityIndicator size="large" color="#fff" />
                </LoadingArea>
            }
            
            
            
        </Container>
    );
}

const mapStateToProps = (state) => {
    return{
            runs: state.runReducer.runs
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return{
            setRun:(run)=>dispatch({type:'SET_RUN',payload:{run}}),
           
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);