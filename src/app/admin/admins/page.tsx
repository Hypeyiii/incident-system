import Admins from "@/components/ui/Admins";
import LoadingTransition from "@/components/ui/LoadingTransition";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LoadingTransition />}>
      <Admins />
    </Suspense>
  );
}
