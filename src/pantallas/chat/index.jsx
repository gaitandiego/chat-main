
import './styles.css'
import { ChatItem } from '../../componentes/Chat/ChatItem';
import { withFirebase } from '../../servidor';
import { ChatFormulario } from '../../componentes/Chat/ChatFormulario';
import { ChatMensajes } from '../../componentes/Chat/ChatMensajes';
import UseChat from '../../hook/UseChat';
import { UserMinus, AlignJustify } from 'react-feather';
import { useEffect, useState } from 'react';

const ChatScreen = (props) => {
    const [vh, setVh] = useState(window.innerHeight);
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        const updateVh = () => {
            setVh(window.innerHeight);
        };

        window.addEventListener('resize', updateVh);

        return () => window.removeEventListener('resize', updateVh);
    }, []);


    const { chats } = UseChat(props)
    const salir = () => props.firebase.doSignOut()

    const menuHandle = () => setMenu(!menu)

    return (
        <div className='chat' style={{ height: vh }}>
            <div className='chat-container'>
                <div className={`chat-container-chats ${!menu && 'd-none d-sm-none d-md-block'}`}>

                    <ChatItem msg={chats.length > 0 && chats[chats.length - 1].Mensaje} />
                </div>
                <div className='chat-container-mensajes'>
                    <div className='salir-cuenta  d-none d-sm-none d-md-flex'>
                        <div title="Salir" onClick={salir}>
                            <UserMinus className='btn btn-primary salir' size={40} width={50} height={30} />
                        </div>
                    </div>

                    <div className='salir-cuenta-mobile d-flex d-sm-block d-md-none'>
                        <div title='Menu' onClick={menuHandle}>
                            <AlignJustify className='btn btn-primary salir' size={40} width={50} height={30} />
                        </div>
                        <div title="Salir" onClick={salir}>
                            <UserMinus className='btn btn-primary salir' size={40} width={50} height={30} />
                        </div>
                    </div>
                    <div className='chat-container-mensajes-items'>
                        <ChatMensajes  {...props} />
                    </div>
                    <ChatFormulario {...props} />
                </div>
            </div>
        </div>
    )
}

export default withFirebase(ChatScreen) 