const request = require("supertest");

jest.mock("../config/db", () => ({
    query: jest.fn()
}));

const db = require("../config/db");

const app = require("../server");

describe("CRUD Productos", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Debe obtener todos los productos", async () => {

        db.query.mockResolvedValueOnce([
            [
                {
                    id: 1,
                    nombre: "Producto 1",
                    categoria: "Limpieza"
                }
            ]
        ]);

        const res = await request(app)
            .get("/api/productos");

        expect(res.statusCode).toBe(200);

        expect(res.body.length).toBe(1);

        expect(res.body[0].nombre)
            .toBe("Producto 1");

    });

    test("Debe crear un producto", async () => {

        db.query.mockResolvedValueOnce([{}]);

        const res = await request(app)
            .post("/api/productos")
            .send({
                nombre: "Nuevo Producto",
                descripcion: "Descripción",
                precio: 10000,
                stock: 20,
                categoria_id: 1,
                mayorista_id: 1
            });

        expect(res.statusCode).toBe(201);

        expect(res.body.mensaje)
            .toBe("Producto creado correctamente");

    });

    test("Debe actualizar un producto", async () => {

        db.query.mockResolvedValueOnce([{}]);

        const res = await request(app)
            .put("/api/productos/1")
            .send({
                nombre: "Producto Editado",
                descripcion: "Nueva descripción",
                precio: 15000,
                stock: 30
            });

        expect(res.statusCode).toBe(200);

        expect(res.body.mensaje)
            .toBe("Producto actualizado");

    });

    test("Debe eliminar un producto", async () => {

        db.query.mockResolvedValueOnce([{}]);

        const res = await request(app)
            .delete("/api/productos/1");

        expect(res.statusCode).toBe(200);

        expect(res.body.mensaje)
            .toBe("Producto eliminado");

    });

    test("Debe responder error al obtener productos", async () => {

        db.query.mockRejectedValue(new Error("Error BD"));

        const res = await request(app)
            .get("/api/productos");

        expect(res.statusCode).toBe(500);

        expect(res.body.mensaje)
            .toBe("Error al obtener productos");

    });

    test("Debe responder error al crear producto", async () => {

        db.query.mockRejectedValue(new Error("Error BD"));

        const res = await request(app)
            .post("/api/productos")
            .send({
                nombre: "Producto",
                descripcion: "Descripción",
                precio: 1000,
                stock: 10,
                categoria_id: 1,
                mayorista_id: 1
            });

        expect(res.statusCode).toBe(500);

        expect(res.body.mensaje)
            .toBe("Error al crear producto");

    });

    test("Debe responder error al actualizar producto", async () => {

        db.query.mockRejectedValue(new Error("Error BD"));

        const res = await request(app)
            .put("/api/productos/1")
            .send({
                nombre: "Producto",
                descripcion: "Descripción",
                precio: 1000,
                stock: 10
            });

        expect(res.statusCode).toBe(500);

        expect(res.body.mensaje)
            .toBe("Error al actualizar producto");

    });

    test("Debe responder error al eliminar producto", async () => {

        db.query.mockRejectedValue(new Error("Error BD"));

        const res = await request(app)
            .delete("/api/productos/1");

        expect(res.statusCode).toBe(500);

        expect(res.body.mensaje)
            .toBe("Error al eliminar producto");

    });

});