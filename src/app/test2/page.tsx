import type { Metadata } from "next";
import LottieCylinderDemo from "./LottieCylinderDemo";

export const metadata: Metadata = {
  title: "Lottie Cylinder Test | Markition Media",
  description: "A Bodymovin/Lottie scroll-scrubbed cylinder animation test.",
};

export default function Test2Page() {
  return <LottieCylinderDemo />;
}
