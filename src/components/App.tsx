import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import {IBarathon, IPub} from '../types/api';
import { CustomContextProvider } from './MyContext';
import Section from './Section';
import BarathonList from "./BarathonList";
import BarathonForm from './BarathonForm';

const SContainer = styled.div`
    background-color: ${colors.darkGrey};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const App = (): JSX.Element => {
    // Déclaration d'une nouvelle variable d'état interne : pubs
    // RAPPEL: un changement d'état du composant provoque
    //         son re-rendu
    const [pubs, setPubs] = useState<IPub[]>([]);
    const [barathons, setBarathons] = useState<IBarathon[]>([]);
    const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false);
    // fonction executé au montage du composant
    // dans le DOM

    useEffect(() => {
        const init = async (): Promise<void> => {
            const locallyStoredPubs = await localStorage.getItem('pubs');
            if (locallyStoredPubs) {
                console.log('is stored in local database');
                setPubs(JSON.parse(locallyStoredPubs));
            }
            else {
                window.setTimeout(() => {
                    setIsReadyToFetch(true);
                }, 1000);
            }

            const locallyStoredBarathons = await localStorage.getItem('barathons');
            if (locallyStoredBarathons) {
                console.log('is stored in local database');
                setBarathons(JSON.parse(locallyStoredBarathons));
            }
            else {
                window.setTimeout(() => {
                    setIsReadyToFetch(true);
                }, 1000);
            }
        };

        init();

    }, []);

    useEffect(() => {
        // obligé d'utiliser une fonction passe-plat pour le code asynchrone
        if (isReadyToFetch === true) {
            const fetchPubs = async (): Promise<void> => {
                const response = await fetch('https://miw-server.herokuapp.com/pubs');
                const pubs = await response.json();
                await localStorage.setItem('pubs', JSON.stringify(pubs));
                setPubs(pubs);
            };

            const fetchBarathons = async (): Promise<void> => {
              const response = await fetch('https://miw-server.herokuapp.com/barathons');
              let barathons = await response.json();
              barathons = barathons.reverse();
              await localStorage.setItem('barathons', JSON.stringify(barathons))
              setBarathons(barathons);
            };

            fetchPubs();
            fetchBarathons();
        }
    }, [isReadyToFetch]);

    return (
        <CustomContextProvider>
            <SContainer>
                <Section>
                    <BarathonForm pubs={pubs} />
                </Section>
                <BarathonList barathons={barathons} pubs={pubs}/>
            </SContainer>
        </CustomContextProvider>
    );
};

export default App;

