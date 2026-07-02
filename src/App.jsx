import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/appRoutes.jsx";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#2563eb",
              secondary: "#fff",
            },
          },
        }}
      />
      <AppRoutes />
    </>
  );
}

export default App;