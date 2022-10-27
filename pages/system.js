import React, { useEffect, useState } from 'react'
import { GetSystem } from '../util/getSystem';
import useSystemStore from '../store/systemStore';
import SystemConf from '../components/SystemConf';

const System = () => {
    const { allSystem, addSystem } = useSystemStore();

    useEffect(() => {
        GetSystem(JSON.parse(localStorage.getItem('token')), addSystem);
    },[]);


    return (
        <div className="container mx-auto px-10 mb-8 h-screen">
            <div className="grid grid-cols-1 gap-12">
                <SystemConf allSystem={allSystem}/>
            </div>
        </div>
    )
}

export default System;