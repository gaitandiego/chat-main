import React, { useContext, useEffect, useRef } from 'react'
import UseChat from '../../../hook/UseChat';
import { AuthUserContext } from '../../Session';
import { ChatItem } from '../ChatItem';
import { ChatItemMsgResponse } from '../ChatItem/ChatItemMsgResponse';
import './styles.css'

export const ChatMensajes = (props) => {
    const { chats } = UseChat(props)
    const { authUser } = useContext(AuthUserContext)

    const dummy = useRef(null);

    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: "smooth" });
    }, [chats]);


    return (
        <div className='mensajes'>
            {chats && chats.map((item, index) => authUser.Id === item.idUsuario ?
                <ChatItemMsgResponse key={index} nombre={item.NombreUsuario} msg={item.Mensaje} />
                :
                <ChatItem key={index} nombre={item.NombreUsuario} msg={item.Mensaje} img={item.ImageUsuario} />
            )}
            <div ref={dummy} />
        </div>
    )
}
