import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";
import crypto from 'crypto';

// 암호화를 위한 키
const encryptionKey = crypto.createHash('sha256').update("mySecretKey123").digest('hex').substring(0, 32);
const fixedIV = Buffer.from('0123456789abcdef0123456789abcdef', 'hex');

// 암호화 함수
function encryptPhoneNumber(phoneNumber) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), fixedIV);
    let encrypted = cipher.update(phoneNumber, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
// 복호화 함수
function decryptPhoneNumber(encryptedPhoneNumber) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), fixedIV);
    let decrypted = decipher.update(encryptedPhoneNumber, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export async function POST(req, res) {
    const connection = await connectToDatabase();
    const data = await req.json(); // 요청 본문 파싱
    const {name, mobile} = data;
    try {
        const encryptedMobile = encryptPhoneNumber(mobile); // 암호화
        // console.log(decryptPhoneNumber(encryptedMobile)); // 복호화
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