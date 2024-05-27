import { useEffect } from "react";
import AppRoute from "./routes/Routes";
import axios from "axios";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, login } = useAuth();

  useEffect(() => {
    (async () => {
      const localToken = localStorage.getItem("token");

      if (localToken && !user) {
        const myProfileResponse = await axios.get('http://localhost:3000/me', {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        });

        login(myProfileResponse.data.payload);
      }
    })()
  }, [login, user]);

  return (
    <AppRoute />
  );
}
