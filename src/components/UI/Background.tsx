import { ReactNode } from "react";

export default function Background({ children }: { children: ReactNode }) {
  return (
    <div className="bg-black w-full min-h-screen flex justify-center">
      {children}
    </div>
  );
}
