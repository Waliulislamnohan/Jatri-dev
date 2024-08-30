"use client";

import { createContext, useState } from "react";

export const UserLocationContext = createContext({
  location: { lat: null, lon: null },
  setLocation: () => {},
});

export const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: null, lon: null });

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};
