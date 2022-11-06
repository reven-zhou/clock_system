import React, { useEffect } from 'react'
import ManageCard from '../components/ManageCard'
import { GetLiatCard } from '../util/getLIstCard'
import useCardStore from '../store/cardSrore'
import useAuthStore from '../store/authStore'
import Router from 'next/router'

const Card = () => {
    const { userProfile } = useAuthStore();
    const { allCrad, addMyCard } = useCardStore();

    if (localStorage.getItem('token')) {
        return (
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 gap-12">
                    <ManageCard user={userProfile} />
                </div>
            </div>
        )
    } else {
        Router.replace('/auth');
    }


}

export default Card