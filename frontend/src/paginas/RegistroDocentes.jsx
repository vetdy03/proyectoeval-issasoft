import { useState } from 'react';
import '../estilos/RegistroDocentes.css';
import { backend as rutas } from "../rutas";

function RegistroDocentes() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [codsis, setCodsis] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contrasena, setContrasena] = useState('');
    
    

    const [errores, setErrores] = useState({
        nombre: '',
        apellido: '',
        contrasena: '',
        codsis: '',
        correo: '',
        telefono: '',
    });

    const [confirmacion, setConfirmacion] = useState('');  // Nuevo estado para el mensaje de confirmación
    const [mostrarContrasena, setMostrarContrasena] = useState(false);//mostra contra

    const validarNombre = (valor) => {
        setNombre(valor);
        if (valor.length > 32) {
            setErrores({ ...errores, nombre: 'El nombre no debe exceder 32 caracteres.' });
        } else {
            setErrores({ ...errores, nombre: '' });
        }
    };

    const validarApellido = (valor) => {
        setApellido(valor);
        if (valor.length > 100) {
            setErrores({ ...errores, apellido: 'El apellido no puede exceder 100 caracteres.' });
        } else {
            setErrores({ ...errores, apellido: '' });
        }
    };


    const validarContrasena = () => {
        if (!/^(?=.*[A-Z])(?=.*\d).{6,32}$/.test(contrasena)) {
            setErrores({ ...errores, contrasena: 'La contraseña debe contener una mayúsculas, números y no exceder los 32 caracteres.' });
        } else {
            setErrores({ ...errores, contrasena: '' });
        }
    };

    const validarCodsis = () => {
        if (!/^\d{9}$/.test(codsis)) {
            setErrores({ ...errores, codsis: 'El código SIS debe contener exactanente 9 números.' });
        } else {
            setErrores({ ...errores, codsis: '' });
        }
    };

    const validarCorreo = () => {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
            setErrores({ ...errores, correo: 'El correo electrónico no es válido.' });
        } else {
            setErrores({ ...errores, correo: '' });
        }
    };

    const validarTelefono = () => {
        if (!/^\d*$/.test(telefono)) {
            setErrores({ ...errores, telefono: 'El teléfono solo debe contener números.' });
        } else {
            setErrores({ ...errores, telefono: '' });
        }
    };






    const registrarDocente = async (e) => {
        e.preventDefault();  // Prevenir el comportamiento por defecto del botón
    
        // Validar campos antes de enviar
        if (
            !errores.nombre && !errores.apellido && !errores.contrasena
            && !errores.correo && !errores.codsis && !errores.telefono
        ) {
            // Crear el objeto con los datos del docente
            const docenteData = {
                nombre,
                apellido,
                codigo_sis: codsis,
                correo,
                telefono,
                contrasena,
            };
    
            try {
                // Llamada a la API
                const response = await fetch(rutas.REGISTRO_DOCENTE, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(docenteData),
                });
    
                const data = await response.json();  // Convertir la respuesta a JSON
    
                if (response.ok) {
                    setConfirmacion(data.contenido);  // Mensaje de éxito
                    // Limpiar los campos después del registro
                    setNombre('');
                    setApellido('');
                    setCodsis('');
                    setCorreo('');
                    setTelefono('');
                    setContrasena('');
                    setErrores({});  // Limpiar los errores
                } else if (response.status === 422) {
                    // Manejo de errores de validación del servidor
                    if (data.contenido.codigo_sis) {
                        setErrores((prev) => ({
                            ...prev,
                            codsis: 'El código SIS ya está registrado.',
                        }));
                    }
    
                    if (data.contenido.correo) {
                        setErrores((prev) => ({
                            ...prev,
                            correo: 'El correo electrónico ya está registrado.',
                        }));
                    }
    
                    setConfirmacion('Por favor, corrige los errores.');
                } else {
                    // Mostrar detalles del error devuelto por el servidor
                    setConfirmacion(`Error: ${response.statusText}`);
                    console.error('Error en la respuesta:', data);
                }
            } catch (error) {
                // Mostrar el mensaje completo del error en la consola y en la interfaz
                console.error('Error en la solicitud:', error);
                setConfirmacion(`Error de solicitud: ${error.message}`);
            }
        } else {
            setConfirmacion('Por favor, corrige los errores antes de enviar.');
        }
    };
    





        


    return (
        <div className="container w-75">
            <div className="row mb-2">
         </div>
            <div className="banda-titulo">
            <h2 className="text-center text-white">REGISTRO DE DOCENTES</h2>
         </div>

    

            <form>
                <div className="row mb-2">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                    <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type=""
                                name="Nombre"
                                id="nombredocente"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => validarNombre(e.target.value)}
                            />
                            {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
                        </div>

                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="text"
                                name="Apellido"
                                id="apellidodocente"
                                placeholder="Apellido"
                                value={apellido}
                                onChange={(e) => validarApellido(e.target.value)}
                            />
                            {errores.apellido && <small className="text-danger">{errores.apellido}</small>}
                        </div>
                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="number"
                                name="Codsis"
                                id="codsisdocente"
                                placeholder="Código SIS"
                                value={codsis}
                                onChange={(e) => setCodsis(e.target.value)}
                                onBlur={validarCodsis}
                            />
                            {errores.codsis && <small className="text-danger">{errores.codsis}</small>}
                        </div>
                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="text"
                                name="Correo"
                                id="correo"
                                placeholder="Correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                onBlur={validarCorreo}
                            />
                            {errores.correo && <small className="text-danger">{errores.correo}</small>}
                        </div>

                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="number"
                                name="Telefono"
                                id="telefono"
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                onBlur={validarTelefono}
                            />
                            {errores.telefono && <small className="text-danger">{errores.telefono}</small>}
                        </div>
                        <div className="form-group mb-1">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type={mostrarContrasena ? "text" : "password"}  // Cambia entre texto y contraseña
                                    name="Contrasena"
                                    id="contrasenadocente"
                                    placeholder="Contraseña"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    onBlur={validarContrasena}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                >
                                    {mostrarContrasena ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                            {errores.contrasena && <small className="text-danger">{errores.contrasena}</small>}
                        </div>

                        
                    </div>
                    <div className="col-md-3"></div>
                </div>

                <div className="row justify-content-center">
    <button 
        className="btn btn-eva-secondary col-sm-3" 
        onClick={registrarDocente} 
        style={{ fontWeight: 'bold' }}
    >
        REGISTRAR
    </button>
</div>

                {/* Mostrar mensaje de confirmación si existe */}
                {confirmacion && (
                    <div className="row justify-content-center mt-3">
                        <div className="col-sm-6">
                            <div className="alert alert-success text-center">
                                {confirmacion}
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default RegistroDocentes;
