"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  // GET 요청 테스트
  const [data, setData] = useState();
  const getTest = async () => {
    try {
      const response = await fetch("/api/alarm");
      const data = await response.json();
      // console.log(data);
      return data;
    } catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setData(getTest());
  }, [])

  // POST 요청
  const [msg, setMsg] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
        const response = await fetch('/api/alarm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('API 요청 실패');
        }
        const responseData = await response.json();
        console.log('서버 응답:', responseData);
        setMsg(responseData);
    } catch (error) {
        console.error(error);
    }
};
  return (
    <main className="w-full">
      <section className="w-full max-w-5xl my-0 mx-auto p-5">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          {/* ----------이름 input---------- */}
          <input className="outline-none p-1 w-full max-w-sm border border-black" placeholder="이름을 입력해 주세요." required 
          {...register("name", {
            minLength: {value:2, message: "최소 2글자 이상 입력해주세요."}
          })} />
          {errors?.name && (
          <span className="text-red-500 text-sm">
              {errors?.name?.message}
          </span>)}
          {/* ----------휴대폰 번호 input---------- */}
          <input className="outline-none p-1 w-full max-w-sm border border-black" placeholder="휴대폰 번호를 입력해 주세요" required 
          {...register("mobile", {
            pattern: {
              value: /^\d{10,}$/,
              message: "숫자만 입력해주세요. ※하이픈(-) 제외"
            }
          })}/>
          {errors?.mobile && (
          <span className="text-red-500 text-sm">
              {errors?.mobile?.message}
          </span>)}
          {/* ----------버튼---------- */}
          <button className="w-fit p-2 bg-pink-300">신청하기</button>
          {/* 서버에서 온 메세지 출력 */}
          {msg ? (
          <span className="text-red-500 text-sm">
              {msg.message}
          </span>) : ""}
        </form>
      </section>
    </main>
  );
}