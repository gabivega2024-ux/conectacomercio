// Importa la conexión a la base de datos
const db = require("../config/db");

// Importa la librería bcryptjs para cifrar y validar contraseñas
const bcrypt = require("bcryptjs");

/**
 * Función para registrar un nuevo usuario
 */
const register = async (req, res) => {

    // Obtiene los datos enviados desde el cliente
    const {
        usuario,
        password,
        rol
    } = req.body;

    // Verifica que todos los campos obligatorios estén presentes
    if (
        !usuario ||
        !password ||
        !rol
    ) {

        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });

    }

    try {

        // Consulta si el usuario ya existe en la base de datos
        db.query(

            "SELECT * FROM usuarios WHERE usuario = ?",

            [usuario],

            async (error, resultado) => {

                // Verifica errores durante la consulta
                if (error) {

                    return res.status(500).json({
                        mensaje: "Error del servidor"
                    });

                }

                // Si encuentra registros, el usuario ya existe
                if (resultado.length > 0) {

                    return res.status(400).json({
                        mensaje: "El usuario ya existe"
                    });

                }

                // Cifra la contraseña utilizando bcrypt
                const hash =
                    await bcrypt.hash(
                        password,
                        10
                    );

                // Inserta el nuevo usuario en la base de datos
                db.query(

                    "INSERT INTO usuarios(usuario,password,rol) VALUES (?,?,?)",

                    [
                        usuario,
                        hash,
                        rol
                    ],

                    (error) => {

                        // Verifica errores al insertar
                        if (error) {

                            return res.status(500).json({
                                mensaje: "Error al registrar usuario"
                            });

                        }

                        // Respuesta exitosa
                        res.status(201).json({
                            mensaje: "Usuario registrado correctamente"
                        });

                    }

                );

            }

        );

    } catch (error) {

        // Captura errores inesperados
        res.status(500).json({
            mensaje: "Error interno del servidor"
        });

    }

};

/**
 * Función para autenticar usuarios (Login)
 */
const login = (req, res) => {

    // Obtiene usuario y contraseña enviados por el cliente
    const {
        usuario,
        password
    } = req.body;

    // Busca el usuario en la base de datos
    db.query(

        "SELECT * FROM usuarios WHERE usuario = ?",

        [usuario],

        async (error, resultado) => {

            // Verifica errores durante la consulta
            if (error) {

                return res.status(500).json({
                    mensaje: "Error del servidor"
                });

            }

            // Si el usuario no existe
            if (resultado.length === 0) {

                return res.status(401).json({
                    mensaje: "Error en la autenticación"
                });

            }

            // Compara la contraseña ingresada con la almacenada
            const valido =
                await bcrypt.compare(
                    password,
                    resultado[0].password
                );

            // Si las contraseñas no coinciden
            if (!valido) {

                return res.status(401).json({
                    mensaje: "Error en la autenticación"
                });

            }

            // Retorna la información del usuario autenticado
            res.json({

                mensaje:
                    "Autenticación satisfactoria",

                usuario:
                    resultado[0].usuario,

                rol:
                    resultado[0].rol

            });

        }

    );

};

// Exporta las funciones para utilizarlas en las rutas
module.exports = {
    register,
    login
};