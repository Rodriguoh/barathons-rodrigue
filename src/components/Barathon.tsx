import React, {useState} from 'react';
import {IBarathon, IPub} from "../types/api";
import styled from "styled-components";
import BarathonMap from './BarathonMap';

interface IProps {
    barathon: IBarathon;
    pubs: IPub[];
}

const Barathon = ({barathon, pubs}: IProps): JSX.Element => {

    const {name, author} = barathon;

    const selectedPubs: IPub[] = barathon.checkpoints.length > 0 ? barathon.checkpoints.map(c => { return pubs.find(pub => pub._id == c);}) : [];

    return (
        <SBarathon>
            <h3>{name}</h3>
            <p>Crée par: <strong>{author}</strong></p>
            <BarathonMap selectedPubs={selectedPubs} pubs={selectedPubs}/>
            <hr/>
            <strong>Commentaires ({barathon.comments.length})</strong>
            {barathon.comments.map((comment: IBarathon) => {
                return (
                    <p>{comment}</p>
                );
            })}
        </SBarathon>
    );
}

const SBarathon = styled.div`
    background-color: black;
    color: white;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 4px;
`;

export default Barathon;