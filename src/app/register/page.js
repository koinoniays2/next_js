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
            {/* 이름 */}
            <div className="w-full">
                <input className="w-full" type="text" 
                {...register("username", {
                    required: "이름을 입력해 주세요.",
                    minLength: {value:2, message: "최소 2글자 이상 입력해주세요."}
                })} placeholder="이름"/>
                {errors?.username && (
                <span className="text-red-500 text-sm">
                    {errors?.username?.message}
                </span>)}
            </div>
            {/* 폰번호 */}
            <div className="w-full">
                <input className="w-full" type="text" placeholder="휴대폰번호"
                {...register("mobile", {
                    required: "휴대폰번호를 입력해주세요.",
                    pattern: {
                        value: /^01([0|1|6|7|8|9]?)-\d{3,4}-\d{4}$/,
                        message: "휴대폰번호 형식으로 입력해 주세요." }
                })}/>
                {errors?.mobile && (
                <span className="text-red-600 text-sm">
                    {errors?.mobile?.message}
                </span>
                )}
            </div>
            <div className="text-start">
                <button type="submit" value="서비스 신청">서비스 신청</button>
            </div>
        </form>
        </>
    )
}