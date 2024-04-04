'use client'
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  

  return (
    <section>
      <h1>메인페이지</h1>
      <Link href="/register"><button className="bg-blue-300 p-1" type="button" value="회원가입">회원가입</button></Link>&nbsp;
      <Link href="/list/1"><button type="button" className="bg-blue-300 p-1">리스트</button></Link>
    </section>
  );
}
