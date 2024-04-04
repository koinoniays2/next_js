'use client'
import Link from "next/link";

export default function Layout(props) {
    return (
        <>
        <div className="flex flex-col items-center">
            <h1 className="text-center text-xl font-semibold">회원가입</h1>
            <Link href="/"><button type="button" className="bg-blue-300 p-1">메인페이지 바로가기</button></Link>
        </div>
        <div className="w-full text-center flex flex-col items-center justify-start">
            {props.children}
        </div>
        </>
    );
}
