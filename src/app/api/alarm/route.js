import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function GET() {
    const connection = await connectToDatabase();
    try {
        const [results, fields] = await connection.query("SELECT * FROM alarm");
        await connection.end();
        return NextResponse.json({results});
    }catch (err) {
        console.log(err);
    }
}

export async function POST(req, res) {
    const connection = await connectToDatabase();
    const data = await req.json(); // 요청 본문 파싱
    const {name, mobile} = data;
    const encryptedMobile = CryptoJS.SHA256(mobile).toString();
    try {
        const [results, fields] = await connection.query(`SELECT * FROM alarm WHERE mobile = ?`, [encryptedMobile]);
        if (results.length > 0) {
            connection.end();
            return NextResponse.json({ message: "이미 신청 완료된 번호입니다." });
        } else {
            try {
                await connection.query(`INSERT INTO alarm (name, mobile) VALUES (?, ?)`, [name, encryptedMobile]);
                connection.end();
                return NextResponse.json({ message: "신청이 완료되었습니다." });
            } catch (err) {
                console.log(err);
                connection.end();
            }    
        }
    }catch(err){
        console.log(err);
        connection.end();
    }
}