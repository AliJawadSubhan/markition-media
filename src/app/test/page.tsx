import type { Metadata } from "next";
import CylinderScrollScene from "./CylinderScrollScene";

export const metadata: Metadata = {
  title: "Scroll Cylinders | Markition Media",
  description: "A scroll-reactive cylinder motion study.",
};

export default function TestPage() {
  return <CylinderScrollScene />;
}
