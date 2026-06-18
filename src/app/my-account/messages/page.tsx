import React from 'react'
import Messages from '@/app/components/myaccount/Messages'
import MessageList from '@/app/components/myaccount/MessageList'

const page = () => {
    return (
        <div>
            <MessageList />
            <Messages />
        </div>
    )
}

export default page