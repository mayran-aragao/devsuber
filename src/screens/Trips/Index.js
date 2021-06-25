import React, {useState, useEffect} from 'react';
import {  CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import useDevsUberApi from '../../api/useDevsUberApi';
import { LogBox } from 'react-native';
import {
  Container,
  Scroll,
  Card,
  ValueBox,
  CardText,
  CardTextInfo,
  
} from './Style';


const Config = (props)=>{

  LogBox.ignoreAllLogs();

  let teste = [...props.runs];
  
    return(
      <Container >
        <Scroll>
          {teste.map((key,index)=>(
            <Card>
            <CardText>Origem: </CardText>
            <CardTextInfo>{teste[index].origem}</CardTextInfo>

            <CardText>Destino: </CardText>
            <CardTextInfo>{teste[index].destino}</CardTextInfo>
            <ValueBox>
              <CardText>Distancia: </CardText>
              <CardTextInfo>{teste[index].distance} KM</CardTextInfo>

              <CardText>Tempo: </CardText>
              <CardTextInfo>{teste[index].time} mins</CardTextInfo>

              <CardText>Preço: </CardText>
              <CardTextInfo>R$ {teste[index].price}</CardTextInfo>
            </ValueBox>
          </Card>
          ))}
          
        </Scroll>
        
      </Container>
    );
}

const mapStateToProps = (state) => {
  return{
          runs: state.runReducer.runs,

  };
}
const mapDispatchToProps = (dispatch) => {
  return{
          
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Config);
