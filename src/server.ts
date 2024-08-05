import fastify from "fastify";
import corse from "@fastify/cors";

const server = fastify ({logger: true});
server.register(corse,{
    origin:"*",
})

const teams = [
    { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
    { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
    { id: 4, name: "Ferrari", base: "Maranello, Italy" },
    { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom" },
    { id: 6, name: "Alpine", base: "Enstone, United Kingdom" },
    { id: 7, name: "AlphaTauri", base: "Faenza, Italy" },
    { id: 8, name: "Williams", base: "Grove, United Kingdom" },
    { id: 9, name: "Alfa Romeo", base: "Hinwil, Switzerland" },
    { id: 10, name: "Haas", base: "Kannapolis, United States" }
];


const drivers = [
    { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
    { id: 2, name: "Sergio Perez", team: "Red Bull Racing" },
    { id: 3, name: "Lewis Hamilton", team: "Mercedes" },
    { id: 4, name: "George Russell", team: "Mercedes" },
    { id: 5, name: "Charles Leclerc", team: "Ferrari" },
    { id: 6, name: "Carlos Sainz", team: "Ferrari" },
    { id: 7, name: "Lando Norris", team: "McLaren" },
    { id: 8, name: "Oscar Piastri", team: "McLaren" },
    { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
    { id: 10, name: "Lance Stroll", team: "Aston Martin" },
    { id: 11, name: "Esteban Ocon", team: "Alpine" },
    { id: 12, name: "Pierre Gasly", team: "Alpine" },
    { id: 13, name: "Yuki Tsunoda", team: "AlphaTauri" },
    { id: 14, name: "Daniel Ricciardo", team: "AlphaTauri" },
    { id: 15, name: "Alex Albon", team: "Williams" },
    { id: 16, name: "Logan Sargeant", team: "Williams" },
    { id: 17, name: "Valtteri Bottas", team: "Alfa Romeo" },
    { id: 18, name: "Guanyu Zhou", team: "Alfa Romeo" },
    { id: 19, name: "Kevin Magnussen", team: "Haas" },
    { id: 20, name: "Nico Hulkenberg", team: "Haas" }
];


server.get("/teams", async(request, response)=> {
    response.type("application/json").code(200);
    return {teams};
})

server.get("/drivers", async(request, response)=> {
    response.type("application/json").code(200);
    return {drivers}
})


interface DriverParams {
    id: string
}
server.get <{Params: DriverParams}>("/drivers/:id", async (reques, response) => {
    const id = parseInt(reques.params.id)
    const driver = drivers.find( d  => d.id === id);
    if(!driver) {
        response.type("application/json").code(404);
        return {message: "Driver Not Found"}
    } else {
        response.type("application/json").code(200);
        return {driver}
   }
})


server.listen({port: 3333}, ()=> {
    console.log("server init")
})