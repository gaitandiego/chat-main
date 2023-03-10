import React from 'react'
import './styles.css'

export const ChatItemMsgResponse = ({ nombre, msg = 'No existe Mensajes' }) => {
    return (
        <div className='chat-item-response' >
            <div className='chat-item-response-text'>
                <h3>{nombre}</h3>
                <p>{msg}</p>
            </div>

        </div>
    )
}
