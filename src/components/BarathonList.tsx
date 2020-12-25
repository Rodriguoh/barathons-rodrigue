import React from 'react';
import {IBarathon, IPub} from '../types/api';
import styled from "styled-components";
import Barathon from "./Barathon";
import {colors} from "../styles/colors";

interface IProps {
    pubs: IPub[];
    barathons: IBarathon[];
}

const BarathonList = ({barathons, pubs}: IProps): JSX.Element => {

    return (
        <SBarathonList>
            <Description>
                <Title>Liste des barathons</Title>
                <Info>(1) Seul les barathons avec des checkpoints sont affichés</Info>
                <Info>(2) La carte est centré sur le premier bar du barathon</Info>
            </Description>
            {barathons.map((barathon: IBarathon) => {
                if (barathon.checkpoints.length > 0 && barathon.checkpoints[0] != "" && barathon.checkpoints[0] != undefined){
                    return (
                        <Barathon barathon={barathon} pubs={pubs} key={barathon._id}/>
                    );
                }
            })}
        </SBarathonList>
    );
};

const SBarathonList = styled.div`
    width: 500px;
    max-height: 795px;
    height: 765px;
    overflow: auto;
    background-color: ${colors.grey};
    border-radius: 4px;
    padding: 15px;
`;

const Title = styled.h1`
    margin-bottom: 0;
`;

const Info = styled.p`
    margin-top: 4px;
    margin-bottom: 4px;
`;

const Description = styled.div`
    margin-bottom: 15px;
`;

export default BarathonList;