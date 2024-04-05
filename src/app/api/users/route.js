import mysql from 'mysql2/promise'
import { NextResponse } from "next/server";
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
export async function GET() {
    try {
        const connection = await mysql.createConnection({
            host: serverRuntimeConfig.DB_URL,
            user: serverRuntimeConfig.DB_USER,
            password: serverRuntimeConfig.DB_PASSWORD,
            database: serverRuntimeConfig.DATABASE,
            port: serverRuntimeConfig.PORT
        });

        const rows = await connection.query("SELECT * FROM users");
        await connection.end();
        // console.log(rows);
        return NextResponse.json({ rows });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.error({ message: "Error fetching data", status: 500 });
    }
}