
import { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { uid } from 'uid/single';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '../../constantes/routes';
import { AvatarGenerator } from 'random-avatar-generator';

const generator = new AvatarGenerator();

const Formulario = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [correo, setCorreo] = useState(`${uid(25)}@gmail.com`)
    const [contrasena, setContrasena] = useState(uid(25))
    const [image, setImage] = useState(generator.generateRandomAvatar());

    const onSubmit = async data => {
        try {
            const usuarioCreado = await props.firebase.doCreateUserWithEmailAndPassword(correo, contrasena)
            const newKey = props.firebase.usuarios().doc(usuarioCreado.user.uid)
            const datosItem = {
                Image: image,
                Nombre: data.nombre,
                Correo: correo,
                Id: newKey.id
            }
            newKey.set(datosItem)
            await props.firebase.doSignInWithEmailAndPassword(correo, contrasena)
            navigate(ROUTES.HOME);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)} className='login-container-formulario'>
            <Row className='mb-3'>
                <Form.Group as={Col} md='12' controlId='nombre'>
                    <Form.Control
                        name='nombre'
                        type='text'
                        placeholder='Ingrese su nombre'
                        {...register('nombre', { required: true })}
                        className={errors.nombre && 'is-invalid'}
                    />
                </Form.Group>
            </Row>
            <Button type='submit'>Ingresar</Button>
        </Form>
    )
}

export default Formulario;
