import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function useSimpleAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("name")) {
      navigate("/name");
    }
  }, [navigate]);
}
