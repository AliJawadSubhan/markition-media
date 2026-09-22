import type { Metadata } from "next";
import HaloLottieDemo from "./HaloLottieDemo";

export const metadata: Metadata = {
  title: "Halo Lottie Test | Markition Media",
  description: "A direct Bodymovin/Lottie test using Halo Lab's JSON animation.",
};

export default function Test3Page() {
  return <HaloLottieDemo />;
}
