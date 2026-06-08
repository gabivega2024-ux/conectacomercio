const db = require("../config/db");
const bcrypt = require("bcryptjs");

/**
 * Obtener usuarios
 */
const getUsers = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT
        id,
        usuario,
        rol,
        fecha_registro
      FROM usuarios
    `);

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener usuarios"
    });

  }

};

/**
 * Crear usuario
 */
const createUser = async (req, res) => {

  try {

    const {
      usuario,
      password,
      rol
    } = req.body;

    const [existe] =
      await db.query(
        "SELECT * FROM usuarios WHERE usuario = ?",
        [usuario]
      );

    if (existe.length > 0) {

      return res.status(400).json({
        mensaje: "El usuario ya existe"
      });

    }

    const hash =
      await bcrypt.hash(
        password,
        10
      );

    await db.query(
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
      ]
    );

    res.status(201).json({
      mensaje:
        "Usuario creado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al crear usuario"
    });

  }

};

/**
 * Actualizar usuario
 */
const updateUser = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      usuario,
      rol
    } = req.body;

    const [existe] =
      await db.query(
        "SELECT * FROM usuarios WHERE usuario = ? AND id <> ?",
        [usuario, id]
      );

    if (existe.length > 0) {

      return res.status(400).json({
        mensaje:
          "Ya existe un usuario con ese nombre"
      });

    }

    await db.query(
      `UPDATE usuarios
       SET usuario = ?,
           rol = ?
       WHERE id = ?`,
      [
        usuario,
        rol,
        id
      ]
    );

    res.json({
      mensaje:
        "Usuario actualizado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje:
        "Error al actualizar usuario"
    });

  }

};

/**
 * Eliminar usuario
 */
const deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );

    res.json({
      mensaje:
        "Usuario eliminado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje:
        "Error al eliminar usuario"
    });

  }

};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};