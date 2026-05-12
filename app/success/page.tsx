"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import successAnimation from "../components/animations/successAnimation.json";
export default function SuccessScreen() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-[300px] text-center">
        <Lottie animationData={successAnimation} loop={false} />
        <p className="mt-4 text-lg font-semibold text-green-600">
         Payment Successful!
        </p>
        <p className="text-[16px] font-[400] text-black mt-2">
          You will be redirected to the homepage in{" "}
          <span className="font-[700]">{secondsLeft}</span>{" "}
          {secondsLeft === 1 ? "second" : "seconds"}.
        </p>
        <p className="mt-2 text-[16px] font-[600] text-black">
          Thank you for your purchase!
        </p>
      </div>
    </div>
  );
}
