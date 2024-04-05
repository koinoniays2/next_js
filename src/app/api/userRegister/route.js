import mysql from 'mysql2/promise'
import { NextResponse } from "next/server";
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
export async function POST(req, res) {
    try {
        // 클라이언트에서 요청으로부터 사용자 정보를 가져옴
        const data = await req.json(); // 요청 본문 파싱
        const {username, mobile} = data;
        // console.log(username, mobile);
        // 데이터베이스 연결
        const connection = await mysql.createConnection({
            host: serverRuntimeConfig.DB_URL,
            user: serverRuntimeConfig.DB_USER,
            password: serverRuntimeConfig.DB_PASSWORD,
            database: serverRuntimeConfig.DATABASE,
            port: serverRuntimeConfig.PORT
        });

        // 사용자 정보를 데이터베이스에 삽입
        await connection.query("INSERT INTO users (username, mobile) VALUES (?, ?)", [username, mobile]);
        // 데이터베이스 연결 종료
        await connection.end();

        // 성공적으로 삽입된 데이터를 클라이언트로 반환
        return NextResponse.json({ message: "성공" });
    } catch (error) {
        console.error("Error inserting data:", error);
        // 에러가 발생했을 경우 에러 응답을 클라이언트로 반환
        return NextResponse.error({ message: "실패", status: 500 });
    }
}