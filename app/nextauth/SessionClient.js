'use client'
import { useSession, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const SessionClient = () => {

    const {data: session, status} = useSession();
    const [sessionValue, setSessionValue] = useState({});

    useEffect(() => {
    
      const getSessionInfo = async () => {
        const session = await getSession();
        setSessionValue(session);
      };
      getSessionInfo();
    }, [])
    

    return (
        <div>
            <h3>
                Client Componenet for next auth session
            </h3>
            {JSON.stringify(session)}
            {JSON.stringify(sessionValue)}
        </div>
    )
}

export default SessionClient