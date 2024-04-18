"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [msg, setMsg] = useState("");
  // POST 요청
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/alarm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }
      const responseData = await response.json();
      // console.log("서버 응답:", responseData);
      setMsg(responseData);
      responseData.message === "신청이 완료되었습니다." && reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="w-full">
      <section className="w-full max-w-5xl my-0 mx-auto p-5">
        <form className="flex flex-col gap-4 bg-black w-full max-w-96 p-5 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          {/* --------------------이름 input-------------------- */}
          <input
            className="outline-none p-2 w-full rounded-lg"
            placeholder="이름을 입력해 주세요."
            {...register("name", {
              required: "이름을 입력해 주세요.",
              minLength: { value: 2, message: "최소 2글자 이상 입력해주세요." },
            })}
          />
          {/* 에러메세지 */}
          {errors?.name && (
            <span className="text-red-500 text-sm">
              {errors?.name?.message}
            </span>
          )}
          {/* --------------------휴대폰 번호 input-------------------- */}
          <input
            className="outline-none p-2 w-full rounded-lg"
            placeholder="휴대폰 번호를 입력해 주세요"
            {...register("mobile", {
              required: "휴대폰 번호를 입력해 주세요.",
              pattern: {
                value: /^\d{10,}$/,
                message: "숫자만 입력해주세요. ※하이픈(-) 제외",
              },
            })}
          />
          {/* 에러메세지 */}
          {errors?.mobile && (
            <span className="text-red-500 text-sm">
              {errors?.mobile?.message}
            </span>
          )}
          {/*  --------------------체크박스 input-------------------- */}
          <label className="text-white text-center py-4">
            <input
              type="checkbox"
              {...register("checkbox", { required: true })}
            />
            &nbsp; 알림톡 전송을 위해 이름과 연락처를 수집하고 있으며, 이외 용도로는 사용하지 않습니다. 동의하십니까?
          </label>
          {/* 에러메세지 */}
          {errors?.checkbox && (
            <span className="text-red-500 text-sm">
              개인정보 수집에 동의해 주세요.
            </span>
          )}
          {/* --------------------버튼-------------------- */}
          <button className="w-full p-2 bg-yellow-300 rounded-lg">신청하기</button>
          {/* 서버 에러메세지 */}
          {msg ? (
            <span className="text-red-500 text-sm">{msg.message}</span>
          ) : (
            ""
          )}
        </form>
      </section>
    </main>
  );
}
