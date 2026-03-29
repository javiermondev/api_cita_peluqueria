import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null); // <-- rol del usuario
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);

        // Aquí recuperamos el rol del usuario desde tu tabla "profiles"
        supabase
          .from("profiles")
          .select("rol") // <-- columna donde tengas roles tipo "admin"/"cliente"
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setRol(data?.rol));
      }
      setLoading(false);
    });

    // Suscribirse a cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        supabase
          .from("profiles")
          .select("rol")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setRol(data?.rol));
      } else {
        setUser(null);
        setRol(null);
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, rol, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}