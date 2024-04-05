'use client'
import { getUserList } from "@/datas/getData";
import Link from "next/link";
import { useEffect, useState } from "react";
// [num] : list/패스 뒤에 오는 세그먼트 값
export default function List(props) { // 1. props를 준다
    const [data, setData] = useState(null);
    useEffect(() => {
        const getData = async () => {
            const result = await getUserList();
            console.log(result);
            setData(result);
        };
        getData();
    }, []);
    return (
        <>
        <h1>리스트</h1>
        {/* {props.params.num} */}
        {/* 2. params의 id에 해당하는 값을 가져올 수 있다. */}
        {/* <button type="button" className="bg-red-300 p-1" onClick={fetchDataFromAPI}>Fetch Data from API</button><br /><br /> */}
        {data?.rows[0]?.map((item, index) => (
            <ul key={index}>
                <li>{item.username}</li>
                <li>{item.mobile}</li>
            </ul>
        ))}

        <Link href="/"><button type="button" className="bg-blue-300 p-1">메인페이지 바로가기</button></Link>
        </>
    )
}