const app = require('../src/app');
const session = require('supertest');
const request = session(app);
const character = {
    id: 1000,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
       name: 'Earth (C-137)',
       url: 'https://rickandmortyapi.com/api/location/1',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
 }

describe("Test de Rutas", () => {
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200'",async () => {
            await request.get('/rickandmorty/character/1').expect(200);
        })
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await request.get('/rickandmorty/character/1');
            expect(response.body).toHaveProperty("id", "name", "species", "gender", "status", "origin", "image");
        })
        it('Si hay un error responde con status: 500', async() => {
            await request.get('/rickandmorty/character/0').expect(500);
            await request.get('/rickandmorty/character/900').expect(500);
        })
    })
    describe("GET /rickandmorty/login", () => {
        it("Si los datos son correctos el access debe ser true", async () => {
            const response = await request.get('/rickandmorty/login?email=Lucas.soldierty@gmail.com&password=Soldier98');
            const access = {access: true};
            expect(response.body).toEqual(access);
        })
        it("Si los datos son incorrectos el access debe ser false", async () => {
            const response = await request.get('/rickandmorty/login?email=Lucas.soldiety@gmail.com&password=Soldie98');
            const access = {access: false};
            expect(response.body).toEqual(access);
        })
    })
    describe("POST /rickandmorty/fav", () => {
        it("Debe devolver un array con el personaje fav", async() => {
            const response = await request.post("/rickandmorty/fav").send(character);
            expect(response.body).toContainEqual(character)
        })
        it("Debe agregar personajes al array de favs sin eliminar los existentes", async() => {
            character.id = 1002;
            character.name = "Lucas"
            const response = await request.post("/rickandmorty/fav").send(character);
            expect(response.body.length).toEqual(2)
        })
    })
    describe("DELETE /rickandmorty/fav/:id", () => {
        it("Si el id enviado no existe en el array deberia retornar el array existente sin modificarlo", async()=> {
            const response = await request.delete("/rickandmorty/fav/2");
            expect(response.body.length).toEqual(2)
        })
        it("Si el id enviado existe en el array deberia retornar el array sin el id enviado", async()=> {
            const response = await request.delete("/rickandmorty/fav/1000");
            expect(response.body.length).toEqual(1)
        })
    })
})