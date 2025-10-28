import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import authService from "../services/authService";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      authService.verifyAccount(token)
        .then(res => {
          alert(res.data.message || "✅ Cuenta verificada correctamente");
          window.location.href = "/login"; // Redirige al login
        })
        .catch(err => {
          const msg = err.response?.data?.message || "❌ Error al verificar la cuenta";
          alert(msg);
        });
    }
  }, [token]);

  return <h2>Verificando tu cuenta...</h2>;
};

export default Verify;
