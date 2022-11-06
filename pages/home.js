import React, { useEffect } from 'react'
import Content from "../components/Content"
import useAuthStore from "../store/authStore"
import useBaseInfo from "../store/baseInfoStore";
import { CrateUser } from '../util';
import { GetBaseInfo } from "../util/getBaseInfo";
import Router from 'next/router'

const Home = () => {
  const { userProfile, addmyIntegral, addUser, getAllTitle, changeStutas, addTotalTime, addProblem, addHistory } = useAuthStore();
  const { baseInfo, addBaseInfo } = useBaseInfo();

  if (localStorage.getItem('token')) {
    useEffect(() => {
      CrateUser(JSON.parse(localStorage.getItem('token')), addUser, getAllTitle, changeStutas, addTotalTime, addProblem, addHistory, addmyIntegral);
      GetBaseInfo(JSON.parse(localStorage.getItem('token')), addBaseInfo);
    }, [])

    return (
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 gap-12">
          <Content user={userProfile} baseInfo={baseInfo} />
        </div>
      </div>
    )
  }else{
    Router.replace('/auth');
  }
}

export default Home;