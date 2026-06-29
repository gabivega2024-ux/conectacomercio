const request = require("supertest");

jest.mock("../config/db", () => ({
    query: jest.fn()
}));

const db = require("../config/db");

const app = require("../server");

describe("Crear Pedido", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Debe crear un pedido correctamente", async () => {

        db.query
            // Validación del producto
            .mockResolvedValueOnce([[
                {
                    id: 1,
                    nombre: "Producto 1",
                    precio: 10000,
                    stock: 10
                }
            ]])

            // INSERT pedido
            .mockResolvedValueOnce([
                {
                    insertId: 5
                }
            ])

            // Consulta nuevamente el producto
            .mockResolvedValueOnce([[
                {
                    id: 1,
                    nombre: "Producto 1",
                    precio: 10000,
                    stock: 10
                }
            ]])

            // INSERT detalle
            .mockResolvedValueOnce([{}])

            // UPDATE stock
            .mockResolvedValueOnce([{}]);

        const res = await request(app)
            .post("/api/pedidos")
            .send({
                tendero_id: 1,
                productos: [
                    {
                        producto_id: 1,
                        cantidad: 2
                    }
                ]
            });

        expect(res.statusCode).toBe(201);

        expect(res.body.mensaje)
            .toBe("Pedido registrado correctamente");

    });

    test("Debe responder 404 cuando el producto no existe", async () => {

        db.query.mockResolvedValueOnce([[]]);

        const res = await request(app)
            .post("/api/pedidos")
            .send({
                tendero_id: 1,
                productos: [
                    {
                        producto_id: 99,
                        cantidad: 1
                    }
                ]
            });

        expect(res.statusCode).toBe(404);

        expect(res.body.mensaje)
            .toBe("Producto no encontrado");

    });

    test("Debe responder 400 cuando no hay stock", async () => {

        db.query.mockResolvedValueOnce([[
            {
                id: 1,
                nombre: "Producto 1",
                precio: 1000,
                stock: 1
            }
        ]]);

        const res = await request(app)
            .post("/api/pedidos")
            .send({
                tendero_id: 1,
                productos: [
                    {
                        producto_id: 1,
                        cantidad: 5
                    }
                ]
            });

        expect(res.statusCode).toBe(400);

        expect(res.body.mensaje)
            .toBe("Stock insuficiente para Producto 1");

    });

    test("Debe responder error del servidor", async () => {

        db.query.mockRejectedValue(new Error("Error BD"));

        const res = await request(app)
            .post("/api/pedidos")
            .send({
                tendero_id: 1,
                productos: [
                    {
                        producto_id: 1,
                        cantidad: 1
                    }
                ]
            });

        expect(res.statusCode).toBe(500);

        expect(res.body.mensaje)
            .toBe("Error al crear pedido");

    });

});