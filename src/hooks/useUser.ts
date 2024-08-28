import { useState, useEffect } from "react";
import { jwtVerify } from "jose";
import { TUserToken } from "@/lib/types";

export const useUser = () => {
  const [user, setUser] = useState<TUserToken | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (tokenCookie) {
        try {
          const { payload } = await jwtVerify(
            tokenCookie,
            new TextEncoder().encode("secret-json-web-token")
          );
          setUser(payload as unknown as TUserToken);
        } catch (err) {
          console.error("JWT verification error:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    verifyToken();
  }, []);

  return { user };
};
