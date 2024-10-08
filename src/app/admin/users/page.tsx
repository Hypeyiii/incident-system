import LoadingTransition from "@/components/ui/LoadingTransition";
import Users from "@/components/ui/Users";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LoadingTransition />}>
      <Users />
    </Suspense>
  );
}
