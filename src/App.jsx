import AppRoute from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
}
