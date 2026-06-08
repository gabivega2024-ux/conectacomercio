// Importa la conexión a la base de datos
const db = require("../config/db");

// Importa la librería bcryptjs para cifrar contraseñas
const bcrypt = require("bcryptjs");

/**
 * Obtener usuarios
 */
const getUsers = (req, res) => {

    // Consulta todos los usuarios registrados
    db.query(

        `SELECT
            id,
            usuario,
            rol,
            fecha_registro
         FROM usuarios`,

        (error, rows) => {

            // Verifica si ocurrió un error en la consulta
            if (error) {

                return res.status(500).json({
                    mensaje: "Error al obtener usuarios"
                });

            }

            // Retorna la lista de usuarios
            res.json(rows);

        }

    );

};

/**
 * Crear usuario
 */
const createUser = async (req, res) => {

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

        // Verifica si el usuario ya existe
        db.query(

            "SELECT * FROM usuarios WHERE usuario = ?",

            [usuario],

            async (error, resultado) => {

                // Maneja errores de consulta
                if (error) {

                    return res.status(500).json({
                        mensaje: "Error del servidor"
                    });

                }

                // Valida que el usuario no exista previamente
                if (resultado.length > 0) {

                    return res.status(400).json({
                        mensaje: "El usuario ya existe"
                    });

                }

                // Cifra la contraseña antes de almacenarla
                const hash =
                    await bcrypt.hash(
                        password,
                        10
                    );

                // Inserta el nuevo usuario en la base de datos
                db.query(

                    `INSERT INTO usuarios
                    (
                        usuario,
                        password,
                        rol
                    )
                    VALUES
                    (
                        ?,
                        ?,
                        ?
                    )`,

                    [
                        usuario,
                        hash,
                        rol
                    ],

                    (error) => {

                        // Verifica errores durante la inserción
                        if (error) {

                            return res.status(500).json({
                                mensaje: "Error al crear usuario"
                            });

                        }

                        // Respuesta de éxito
                        res.status(201).json({
                            mensaje: "Usuario creado correctamente"
                        });

                    }

                );

            }

        );

    } catch (error) {

        // Captura errores inesperados
        res.status(500).json({
            mensaje: "Error interno"
        });

    }

};

/**
 * Actualizar usuario
 */
const updateUser = (req, res) => {

    // Obtiene el identificador del usuario desde la URL
    const { id } = req.params;

    // Obtiene los nuevos datos enviados por el cliente
    const {
        usuario,
        rol
    } = req.body;

    // Verifica que no exista otro usuario con el mismo nombre
    db.query(

        "SELECT * FROM usuarios WHERE usuario = ? AND id <> ?",

        [usuario, id],

        (error, resultado) => {

            // Maneja errores de consulta
            if (error) {

                return res.status(500).json({
                    mensaje: "Error del servidor"
                });

            }

            // Valida que el nombre de usuario no esté repetido
            if (resultado.length > 0) {

                return res.status(400).json({
                    mensaje: "Ya existe un usuario con ese nombre"
                });

            }

            // Actualiza la información del usuario
            db.query(

                `UPDATE usuarios
                 SET usuario = ?,
                     rol = ?
                 WHERE id = ?`,

                [
                    usuario,
                    rol,
                    id
                ],

                (error) => {

                    // Verifica errores durante la actualización
                    if (error) {

                        return res.status(500).json({
                            mensaje: "Error al actualizar usuario"
                        });

                    }

                    // Respuesta exitosa
                    res.json({
                        mensaje: "Usuario actualizado correctamente"
                    });

                }

            );

        }

    );

};

/**
 * Eliminar usuario
 */
const deleteUser = (req, res) => {

    // Obtiene el identificador del usuario desde la URL
    const { id } = req.params;

    // Ejecuta la eliminación del usuario
    db.query(

        "DELETE FROM usuarios WHERE id = ?",

        [id],

        (error) => {

            // Verifica errores durante la eliminación
            if (error) {

                return res.status(500).json({
                    mensaje: "Error al eliminar usuario"
                });

            }

            // Confirma la eliminación exitosa
            res.json({
                mensaje: "Usuario eliminado correctamente"
            });

        }

    );

};

// Exporta las funciones para ser utilizadas en las rutas
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};