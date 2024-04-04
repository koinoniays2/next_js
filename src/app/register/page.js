'use client'
import { useForm } from "react-hook-form";
export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/userRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('요청 실패');
            }
            const responseData = await response.json();
            console.log('서버 응답:', responseData);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
        <form className="w-full max-w-xl" onSubmit={handleSubmit(onSubmit)}>
            {/* 아이디 */}
            <div className="w-full">
                <input className="w-full" type="text" {...register("id", {
                    required: "아이디를 입력해 주세요.",
                    minLength: {value:4, message: "최소 4글자 이상 입력해주세요."}
                })} placeholder="아이디"/>
                {errors?.id && (
                <span className="text-red-500 text-sm">
                    {errors?.id?.message}
                </span>)}
            </div>
            {/* 이메일 */}
            <div className="w-full">
                <input className="w-full" type="text" placeholder="이메일"
                {...register("email", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                        value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "이메일 형식으로 입력해 주세요." }
                })}/>
                {errors?.email && (
                <span className="text-red-600 text-sm">
                    {errors?.email?.message}
                </span>
                )}
            </div>
            <div className="text-start">
                <button type="submit" value="회원가입">회원가입</button>
            </div>
        </form>
        </>
    )
}