import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { AuthUserContext } from '../../Session';
import './styles.css'

export const ChatFormulario = (props) => {

    const { authUser } = useContext(AuthUserContext)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const onSubmit = async data => {
        try {
            const newKey = props.firebase.mensajes().doc()
            const datosItem = {
                idUsuario: authUser.Id,
                NombreUsuario: authUser.Nombre,
                ImageUsuario: authUser.Image,
                Mensaje: data.mensaje,
                FechaRegistro: new Date(),
                Id: newKey.id
            }
            newKey.set(datosItem)
            reset()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='chat-mensajes'>
            <Form onSubmit={handleSubmit(onSubmit)} className='chat-mensajes-container'>
                <Form.Control
                    name='mensaje'
                    type='text'
                    placeholder='Ingrese su texto'
                    {...register('mensaje', { required: true })}
                    className={errors.mensaje && 'is-invalid'}
                />

                <Button type='submit'>Enviar</Button>

            </Form>

        </div>
    )
}
