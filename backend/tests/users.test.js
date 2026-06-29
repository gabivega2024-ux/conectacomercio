const request = require("supertest");
const bcrypt = require("bcryptjs");

jest.mock("../config/db", () => ({
    query: jest.fn()
}));

const db = require("../config/db");

jest.mock("bcryptjs");

const app = require("../server");

describe("CRUD Usuarios", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Debe obtener la lista de usuarios", async () => {

        db.query.mockResolvedValueOnce([
            [
                {
                    id: 1,
                    usuario: "admin",
                    rol: "Administrador"
                }
            ]
        ]);

        const res = await request(app)
            .get("/api/users");

        expect(res.statusCode).toBe(200);

        expect(res.body.length).toBe(1);

        expect(res.body[0].usuario)
            .toBe("admin");

    });

    test("Debe crear un usuario", async () => {

        db.query
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([{}]);

        bcrypt.hash.mockResolvedValue("hash");

        const res = await request(app)
            .post("/api/users")
            .send({
                usuario: "nuevo",
                password: "123456",
                rol: "Administrador"
            });

        expect(res.statusCode).toBe(201);

        expect(res.body.mensaje)
            .toBe("Usuario creado correctamente");

    });

    test("Debe impedir crear un usuario repetido", async () => {

        db.query.mockResolvedValueOnce([
            [{ id: 1 }]
        ]);

        const res = await request(app)
            .post("/api/users")
            .send({
                usuario: "admin",
                password: "123456",
                rol: "Administrador"
            });

        expect(res.statusCode).toBe(400);

        expect(res.body.mensaje)
            .toBe("El usuario ya existe");

    });

    test("Debe actualizar un usuario correctamente", async () => {

    db.query
        .mockResolvedValueOnce([[]]) // No existe otro usuario con ese nombre
        .mockResolvedValueOnce([{}]); // UPDATE correcto

    const res = await request(app)
        .put("/api/users/1")
        .send({
            usuario: "angel",
            rol: "Administrador"
        });

    expect(res.statusCode).toBe(200);

    expect(res.body.mensaje)
        .toBe("Usuario actualizado correctamente");

});

test("Debe impedir actualizar un usuario con nombre repetido", async () => {

    db.query.mockResolvedValueOnce([
        [{ id: 2 }]
    ]);

    const res = await request(app)
        .put("/api/users/1")
        .send({
            usuario: "admin",
            rol: "Administrador"
        });

    expect(res.statusCode).toBe(400);

    expect(res.body.mensaje)
        .toBe("Ya existe un usuario con ese nombre");

});

test("Debe eliminar un usuario", async () => {

    db.query.mockResolvedValueOnce([{}]);

    const res = await request(app)
        .delete("/api/users/1");

    expect(res.statusCode).toBe(200);

    expect(res.body.mensaje)
        .toBe("Usuario eliminado correctamente");

});

test("Debe responder error al obtener usuarios", async () => {

    db.query.mockRejectedValue(new Error("Error BD"));

    const res = await request(app)
        .get("/api/users");

    expect(res.statusCode).toBe(500);

    expect(res.body.mensaje)
        .toBe("Error al obtener usuarios");

});

test("Debe responder error al crear usuario", async () => {

    db.query.mockRejectedValue(new Error("Error BD"));

    const res = await request(app)
        .post("/api/users")
        .send({
            usuario: "nuevo",
            password: "123",
            rol: "Administrador"
        });

    expect(res.statusCode).toBe(500);

    expect(res.body.mensaje)
        .toBe("Error al crear usuario");

});

test("Debe responder error al actualizar usuario", async () => {

    db.query.mockRejectedValue(new Error("Error BD"));

    const res = await request(app)
        .put("/api/users/1")
        .send({
            usuario: "nuevo",
            rol: "Administrador"
        });

    expect(res.statusCode).toBe(500);

    expect(res.body.mensaje)
        .toBe("Error al actualizar usuario");

});

test("Debe responder error al eliminar usuario", async () => {

    db.query.mockRejectedValue(new Error("Error BD"));

    const res = await request(app)
        .delete("/api/users/1");

    expect(res.statusCode).toBe(500);

    expect(res.body.mensaje)
        .toBe("Error al eliminar usuario");

});

});
