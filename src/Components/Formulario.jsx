import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    //Schema
    const nuevoclienteSchema = Yup.object().shape({

        nombre: Yup.string()
            .min(3, 'EL Nombre es muy Corto')
            .max(20, 'EL Nombre es muy Largo')
            .required('El Nombre del Cliente es Obligatorio'),

        empresa: Yup.string()
            .required('El Nombre de la Empresa es Obligatorio'),

        email: Yup.string()
            .email('No es un e-mail valido')
            .required('El Email es obligatorio'),

        telefono: Yup.number()
            .positive('Numero no valido ')
            .integer('Numero no valido ')
            .typeError('El numero no es valido'),

    })

    const handleSubmit = async (valores) => {
        try {
            let respuesta
            if (cliente.id) {
                //Editando un registro
                const url = `http://localhost:4000/clientes/${cliente.id}`

                 respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })


            } else {
                //Nuevo registro
                const url = 'http://localhost:4000/clientes'

                 respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                
            }
                await respuesta.json()
                navigate('/clientes')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className=' mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto bg-slate-50'>
                <h1 className='  text-blue-900 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? '',
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)

                        resetForm()
                    }}

                    validationSchema={nuevoclienteSchema}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form
                                className=' mt-10'
                            >
                                <div className=' mb-4'>
                                    <label
                                        className='text-blue-900 '
                                        htmlFor='nombre'
                                    >Nombre</label>
                                    <Field
                                        id="nombre"
                                        type="text"
                                        className='mt-2 block w-full p-3 bg-blue-50 rounded-md'
                                        placeholder="Nombre del Cliente"
                                        name="nombre"
                                    />

                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}

                                </div>

                                <div className=' mb-4'>
                                    <label
                                        className='text-blue-900 '
                                        htmlFor='empresa'
                                    >Empresa</label>
                                    <Field
                                        id="empresa"
                                        type="text"
                                        className='mt-2 block w-full p-3 bg-blue-50 rounded-md'
                                        placeholder="Empresa del Cliente"
                                        name="empresa"
                                    />

                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}
                                </div>

                                <div className=' mb-4'>
                                    <label
                                        className=' text-blue-900 '
                                        htmlFor='email'
                                    >Email</label>
                                    <Field
                                        id="email"
                                        type="email"
                                        className='mt-2 block w-full p-3 bg-blue-50 rounded-md'
                                        placeholder="Email del Cliente"
                                        name="email"
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}
                                </div>

                                <div className=' mb-4'>
                                    <label
                                        className=' text-blue-900 '
                                        htmlFor='telefono'
                                    >Telefono</label>
                                    <Field
                                        id="telefono"
                                        type="tel"
                                        className='mt-2 block w-full p-3 bg-blue-50 rounded-md'
                                        placeholder="Telefono del Cliente"
                                        name="telefono"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}
                                </div>

                                <div className=' mb-4'>
                                    <label
                                        className=' text-blue-900'
                                        htmlFor='notas'
                                    >Notas:</label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        type="text"
                                        className='mt-2 block w-full p-3 bg-blue-50 rounded-md h-20'
                                        placeholder="Notas del Cliente"
                                        name="notas"
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className=' mt-5 w-full bg-blue-900 p-3 text-white uppercase font-bold text-lg rounded-3xl hover:bg-blue-500 hover:text-white'
                                />

                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario