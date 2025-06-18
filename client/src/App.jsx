import React, { Suspense } from "react";
import UserRoute from "./Routes/UserRoute";
import { HashLoader } from "react-spinners";

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <HashLoader color="#ffc703" />
        </div>
      }
    >
      <UserRoute />
    </Suspense>
  );
}
