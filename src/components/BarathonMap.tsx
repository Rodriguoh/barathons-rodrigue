import React from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { IPub } from '../types/api';
import PubThumbnail from './PubThumbnail';
import { colors } from '../styles/colors';
import useTimer from './MyContext';

const TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

interface IProps {
    pubs: IPub[];
    selectedPubs: IPub[];
    addPub?: (id: string) => void;
    removePub?: (id: string) => void;
}

const BarathonMap = ({ pubs, addPub, removePub, selectedPubs }: IProps): JSX.Element => {
    const { getLatLngExpression } = useTimer();

    console.log(pubs[0]);

    if (pubs[0] == undefined){
        return (
            <div>
                <Alert>Ce barathon bug !</Alert>
            </div>
        );
    }

    return (
        <SMapContainer>
            <MapContainer
                center={[pubs[0].latlng.lat, pubs[0].latlng.lng]}
                zoom={15}
                style={{
                    width: 400,
                    height: 300
                }}
            >
                <TileLayer
                    attribution={ATTRIBUTION}
                    url={TILE_LAYER}
                />
                {pubs.map((pub: IPub) => {

                    if (pub == undefined){
                        return ;
                    }

                    return (
                        <Marker position={[pub.latlng.lat, pub.latlng.lng]} key={pub._id}>
                            <Popup>
                                <PubThumbnail
                                    pub={pub}
                                    addPub={addPub}
                                    removePub={removePub}
                                />
                            </Popup>
                        </Marker>
                    );
                })}
                <Polyline pathOptions={{ color: colors.vibrant }} positions={getLatLngExpression(selectedPubs)} />
            </MapContainer>
        </SMapContainer>
    );
};

const SMapContainer = styled.div`
    margin: 15px 0;
`;

const Alert = styled.p`
    color: red;
`;

export default BarathonMap;