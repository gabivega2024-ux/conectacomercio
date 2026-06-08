const db = require("../config/db");

/**
 * Obtener productos
 */
const obtenerProductos = async (req, res) => {

  try {

    const [productos] = await db.query(`
      SELECT
        p.*,
        c.nombre AS categoria
      FROM productos p
      LEFT JOIN categorias c
      ON p.categoria_id = c.id
    `);

    res.json(productos);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener productos"
    });

  }

};

/**
 * Crear producto
 */
const crearProducto = async (req, res) => {

  try {

    const {
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      mayorista_id
    } = req.body;

    await db.query(
      `INSERT INTO productos
      (
        nombre,
        descripcion,
        precio,
        stock,
        categoria_id,
        mayorista_id
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        descripcion,
        precio,
        stock,
        categoria_id,
        mayorista_id
      ]
    );

    res.status(201).json({
      mensaje: "Producto creado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al crear producto"
    });

  }

};

/**
 * Actualizar producto
 */
const actualizarProducto = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      nombre,
      descripcion,
      precio,
      stock
    } = req.body;

    await db.query(
      `UPDATE productos
       SET nombre=?,
           descripcion=?,
           precio=?,
           stock=?
       WHERE id=?`,
      [
        nombre,
        descripcion,
        precio,
        stock,
        id
      ]
    );

    res.json({
      mensaje: "Producto actualizado"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al actualizar producto"
    });

  }

};

/**
 * Eliminar producto
 */
const eliminarProducto = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM productos WHERE id=?",
      [id]
    );

    res.json({
      mensaje: "Producto eliminado"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar producto"
    });

  }

};

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};