import React, { useEffect } from 'react'
import { GetClean } from '../util/getClean';
import useCleanStore from '../store/cleanStore';
import CleanTable from '../components/CleanTable';

const Clean = () => {
    const { cleanInfo, addCleanInfo } = useCleanStore();

    useEffect(() => {
        GetClean(JSON.parse(localStorage.getItem('token')), addCleanInfo);
    }, [])

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 gap-12">
                <CleanTable cleanInfo={cleanInfo}/>
            </div>
        </div>
    )
}

export default Clean;