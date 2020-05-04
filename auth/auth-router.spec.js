const rq = require("supertest");
const crypto = require('crypto');
var id = crypto.randomBytes(5).toString('hex');
const server = require("../api/server.js");

describe("server", () => {
    it("should be in the testing environment", () => {
        expect(process.env.DB_ENV).toBe("testing");
    });
    describe("register", () => {
        it("should give the right status code when registering", async () => {
            const res = await rq(server)
                .post("/api/auth/register")
                .send({ username: id, password: "testing123" });
            expect(res.status).toBe(201);
        });
        it("should give the right status code when register fails", async () => {
            const res = await rq(server)
                .post("/api/auth/register")
                .send({ username: id, password: null });
            expect(res.status).toBe(500);
        });
    });
    describe("login", () => {
        it("should give the right status code when logging in", async () => {
            const res = await rq(server).post("/api/auth/login").send({
                username: "oatmeal",
                password: "test123",
            });
            expect(res.status).toBe(200);
        });
        it("should give the right status code when failing to log in", async () => {
            const res = await rq(server).post("/api/auth/login").send({
                username: "oatmeal",
                password: "test12",
            });
            expect(res.status).toBe(401);
        });
    });
});