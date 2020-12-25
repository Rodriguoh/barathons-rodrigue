import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { IPub } from '../types/api';

interface IProps {
    children: JSX.Element;
}

interface ICustomContext {
    timer: number;
    getLatLngExpression: (pubs: IPub[]) => LatLngExpression[];
}

const CustomContext = createContext({} as ICustomContext);

export const CustomContextProvider = ({ children }: IProps): JSX.Element => {
    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            setTimer(timer + 1);
        }, 1000);
    }, [timer]);

    const getLatLngExpression = (pubs: IPub[]): LatLngExpression[] => {
        const polylineArray: LatLngExpression[] = pubs.map((pub: IPub) => {
            if (pub == undefined){
                return [0, 0];
            }else{
                return [pub.latlng.lat, pub.latlng.lng];
            }
        });

        return polylineArray;
    };

    const providerValues = {
        timer,
        getLatLngExpression
    };

    return <CustomContext.Provider value={providerValues}>{children}</CustomContext.Provider>;
};

export default function useTimer(): ICustomContext {
    return useContext(CustomContext);
}