import { Image } from 'react-bootstrap';
import './styles.css'

export const ChatItem = ({ nombre = 'Chat de prueba', msg, img = 'https://cdn-icons-png.flaticon.com/512/219/219983.png' }) => {
  return (
    <div className={`chat-item ${nombre == 'Chat de prueba' && 'item-pointer'}`} >
      <Image src={img} className='chat-item-image' />
      <div className='chat-item-text'>
        <h3>{nombre}</h3>
        {msg ? <p>{msg}</p> : <p>No existe mensajes</p>}
      </div>
    </div>
  )
}
