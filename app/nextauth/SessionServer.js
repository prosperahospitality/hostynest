'use server'
import React from 'react'
import {getServerSession} from 'next-auth'

const ServerSession = async () => {
    const session = await getServerSession();
    return(
        <div>
            <h3>
                Server Session Components
                {JSON.stringify(session)}
            </h3>
        </div>
    )
}

export default ServerSession