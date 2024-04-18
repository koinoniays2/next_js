import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";

// DB쿼리
async function getDBconnect() {
  const connection = await connectToDatabase();
  try {
      const [results, fields] = await connection.query("SELECT * FROM alarm");
      await connection.end();
      return NextResponse.json({results});
  }catch (err) {
      console.log(err);
  }
}

// 유저 받아오기
async function getUser() {
  const response = await getDBconnect();
  const json = await response.json();
  return json;
}

// 렌더링
export default async function GetUser() {
  const user = await getUser();
  // console.log(user.results);
  return (
    <>
    <div>
      <ul>
      {
        user.results.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))
      }
      </ul>
    </div>
    </>
  )
}