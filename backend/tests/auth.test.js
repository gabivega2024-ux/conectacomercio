const request = require("supertest");
const bcrypt = require("bcryptjs");

// Mock de la base de datos
jest.mock("../config/db", () => ({
    query: jest.fn()
}));

const db = require("../config/db");

// Mock de bcrypt
jest.mock("bcryptjs");

const app = require("../server");

describe("Pruebas de autenticación", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Debe registrar un usuario correctamente", async () => {

        db.query
            .mockResolvedValueOnce([[]]) // Usuario no existe
            .mockResolvedValueOnce([{}]); // Insert correcto

        bcrypt.hash.mockResolvedValue("passwordEncriptado");

        const respuesta = await request(app)
            .post("/api/register")
            .send({
                usuario: "angel",
                password: "123456",
                rol: "admin"
            });

        expect(respuesta.statusCode).toBe(201);

        expect(respuesta.body.mensaje)
            .toBe("Usuario registrado correctamente");

    });

    test("Debe impedir registrar un usuario repetido", async () => {

        db.query.mockResolvedValueOnce([
            [{ id: 1, usuario: "angel" }]
        ]);

        const respuesta = await request(app)
            .post("/api/register")
            .send({
                usuario: "angel",
                password: "123456",
                rol: "admin"
            });

        expect(respuesta.statusCode).toBe(400);

        expect(respuesta.body.mensaje)
            .toBe("El usuario ya existe");

    });

    test("Debe validar campos obligatorios", async () => {

        const respuesta = await request(app)
            .post("/api/register")
            .send({});

        expect(respuesta.statusCode).toBe(400);

        expect(respuesta.body.mensaje)
            .toBe("Todos los campos son obligatorios");

    });

    test("Debe iniciar sesión correctamente", async () => {

    db.query.mockResolvedValueOnce([
        [{
            id: 1,
            usuario: "angel",
            password: "hash123",
            rol: "admin"
        }]
    ]);

    bcrypt.compare.mockResolvedValue(true);

    const respuesta = await request(app)
        .post("/api/login")
        .send({
            usuario: "angel",
            password: "123456"
        });

    expect(respuesta.statusCode).toBe(200);

    expect(respuesta.body).toEqual({
        mensaje: "Autenticación satisfactoria",
        id: 1,
        usuario: "angel",
        rol: "admin"
    });

});

test("Debe rechazar un usuario inexistente", async () => {

    db.query.mockResolvedValueOnce([[]]);

    const respuesta = await request(app)
        .post("/api/login")
        .send({
            usuario: "noexiste",
            password: "123456"
        });

    expect(respuesta.statusCode).toBe(401);

    expect(respuesta.body.mensaje)
        .toBe("Error en la autenticación");

});

test("Debe rechazar contraseña incorrecta", async () => {

    db.query.mockResolvedValueOnce([
        [{
            id: 1,
            usuario: "angel",
            password: "hash123",
            rol: "admin"
        }]
    ]);

    bcrypt.compare.mockResolvedValue(false);

    const respuesta = await request(app)
        .post("/api/login")
        .send({
            usuario: "angel",
            password: "mala"
        });

    expect(respuesta.statusCode).toBe(401);

    expect(respuesta.body.mensaje)
        .toBe("Error en la autenticación");

});

test("Debe responder 500 si ocurre un error del servidor en login", async () => {

    db.query.mockRejectedValue(new Error("Error BD"));

    const respuesta = await request(app)
        .post("/api/login")
        .send({
            usuario: "angel",
            password: "123456"
        });

    expect(respuesta.statusCode).toBe(500);

    expect(respuesta.body.mensaje)
        .toBe("Error del servidor");

});

});