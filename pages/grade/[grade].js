import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Clocktable from "../../components/Clocktable"
import useAuthStore from '../../store/authStore'
import { GetClock } from '../../util/getClock'

const Grade = () => {
  const router = useRouter();
  const { grade } = router.query;
  const { allClock, catchAllClock } = useAuthStore();

  useEffect(() => {
    GetClock(JSON.parse(localStorage.getItem('token')), grade, catchAllClock);
  }, [grade]);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 gap-12">
        <Clocktable grade={grade} allClock={allClock} />
      </div>
    </div>
  )
}
export default Grade;