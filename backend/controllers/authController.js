const db = require("../config/db");
const bcrypt = require("bcryptjs");

/**
 * Registrar usuario
 */
const register = async (req, res) => {

  const {
    usuario,
    password,
    rol
  } = req.body;

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
      "INSERT INTO usuarios(usuario,password,rol) VALUES (?,?,?)",
      [
        usuario,
        hash,
        rol
      ]
    );

    res.status(201).json({
      mensaje:
        "Usuario registrado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje:
        "Error interno del servidor"
    });

  }

};

/**
 * Login
 */
const login = async (req, res) => {

  const {
    usuario,
    password
  } = req.body;

  try {

    const [resultado] =
      await db.query(
        "SELECT * FROM usuarios WHERE usuario = ?",
        [usuario]
      );

    if (resultado.length === 0) {

      return res.status(401).json({
        mensaje:
          "Error en la autenticación"
      });

    }

    const valido =
      await bcrypt.compare(
        password,
        resultado[0].password
      );

    if (!valido) {

      return res.status(401).json({
        mensaje:
          "Error en la autenticación"
      });

    }

    res.json({

      mensaje:
        "Autenticación satisfactoria",

      id:
        resultado[0].id,

      usuario:
        resultado[0].usuario,

      rol:
        resultado[0].rol

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje:
        "Error del servidor"
    });

  }

};

module.exports = {
  register,
  login
};