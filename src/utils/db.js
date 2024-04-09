import mysql from "mysql2/promise";
export async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "1234",
        database: "market"
    });
    return connection;
}