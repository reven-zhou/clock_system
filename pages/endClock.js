import React, { useState, useEffect } from 'react'
import { GetAllGradesClock } from '../util/manageClock';
import useAllGradesClockStore from '../store/clockStore';
import EndClock from '../components/EndClock';

const CapitainEndClock = () => {
    const { allGradesClock, addAllGradesClock } = useAllGradesClockStore();

    useEffect(() => {
        GetAllGradesClock(JSON.parse(localStorage.getItem('token')), addAllGradesClock);
    }, []);

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 gap-12">
                <EndClock allGradesClock={allGradesClock} />
            </div>
        </div>
    )
}

export default CapitainEndClock;