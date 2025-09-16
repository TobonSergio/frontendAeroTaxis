import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import authService from "../services/authService"; // ✅ usamos el service

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      authService.verifyAccount(token)
        .then((res) => {
          alert(res.data.message); // 🔥 usamos el mensaje del backend
          window.location.href = "/login";
        })
        .catch((err) => {
          const msg = err.response?.data?.message || "❌ Error al verificar la cuenta";
          alert(msg);
        });
    }
  }, [token]);

  return <h2>Verificando tu cuenta...</h2>;
};

export default Verify;
