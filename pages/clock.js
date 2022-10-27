import React, { useState, useEffect } from 'react'
import { GetAllGradesClock } from '../util/manageClock';
import useAllGradesClockStore from '../store/clockStore';
import ManageAllGradesClock from '../components/ManageAllGradesClock';

const ManageClock = () => {
    const { allGradesClock, addAllGradesClock } = useAllGradesClockStore();

    useEffect(() => {
        GetAllGradesClock(JSON.parse(localStorage.getItem('token')), addAllGradesClock);
    }, []);

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 gap-12">
                <ManageAllGradesClock allGradesClock={allGradesClock} />
            </div>
        </div>
    )
}

export default ManageClock;