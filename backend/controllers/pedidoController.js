const db = require("../config/db");

const crearPedido = async (req, res) => {

    try {

        const {
            tendero_id,
            productos
        } = req.body;

        let total = 0;

        for (const item of productos) {

            const [rows] =
            await db.query(
                "SELECT * FROM productos WHERE id=?",
                [item.producto_id]
            );

            if (rows.length === 0) {

                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });

            }

            const producto =
            rows[0];

            if (
                item.cantidad >
                producto.stock
            ) {

                return res.status(400).json({
                    mensaje:
                    `Stock insuficiente para ${producto.nombre}`
                });

            }

            total +=
            producto.precio *
            item.cantidad;

        }

        const [pedido] =
        await db.query(

            `
            INSERT INTO pedidos
            (
                tendero_id,
                total
            )
            VALUES
            (
                ?,
                ?
            )
            `,

            [
                tendero_id,
                total
            ]

        );

        const pedidoId =
        pedido.insertId;

        for (const item of productos) {

            const [rows] =
            await db.query(
                "SELECT * FROM productos WHERE id=?",
                [item.producto_id]
            );

            const producto =
            rows[0];

            await db.query(

                `
                INSERT INTO pedido_detalle
                (
                    pedido_id,
                    producto_id,
                    cantidad,
                    precio
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?
                )
                `,

                [
                    pedidoId,
                    item.producto_id,
                    item.cantidad,
                    producto.precio
                ]

            );

            await db.query(

                `
                UPDATE productos
                SET stock =
                stock - ?
                WHERE id = ?
                `,

                [
                    item.cantidad,
                    item.producto_id
                ]

            );

        }

        res.status(201).json({
            mensaje:
            "Pedido registrado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje:
            "Error al crear pedido"
        });

    }

};

module.exports = {
    crearPedido
};