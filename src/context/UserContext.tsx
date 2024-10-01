"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextProps {
  user: { email: string; password: string, rol_id?: number, name: string, id: string; department_id: number; } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{ email: string; password: string; name: string; id: string; department_id: number; } | null>
  >;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ email: string; password: string, name: string, id: string; department_id: number; } | null>(
    null
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
