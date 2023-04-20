import { HiLocationMarker } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Register.css";
import { useState } from "react";

const END_POINT = "http://localhost:8000/user/register";

function Register({ closeRegister }) {
  const [option, setOption] = useState({
    error: false,
    success: false,
  });
  const [isSucess, setIsSuccess] = useState(false);

  const postUser = async (e) => {
    e.preventDefault();
    const entries = new window.FormData(e.target);
    const username = entries.get("username");
    const email = entries.get("email");
    const password = entries.get("password");
    console.log(username);
    if (!username || !email || !password)
      return setOption({ error: true, success: false });

    const newUser = { username, email, password };
    try {
      const res = await fetch(END_POINT, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        setOption({ error: true, success: false });
        throw new Error("Ya existe"); //Este es un error con la respuesta
      }
      setOption({ error: false, success: true });
    } catch (e) {
      setOption({ error: true, success: false });
      console.log(e);
    }
  };

  return (
    <div className="register" onSubmit={(e) => postUser(e)}>
      <AiFillCloseCircle fontSize={"30px"} onClick={closeRegister} />
      <form>
        <div className="containerLogo">
          <HiLocationMarker fontSize={"30px"} />
          <h2>ValPin</h2>
        </div>
        <input placeholder="username" type="text" name="username" />
        <input placeholder="email" type="email" name="email" />
        <input placeholder="password" type="password" name="password" />
        <button>Registrarse</button>
        {option.success && (
          <span className="successSpan">¡Bien!Estás registrado</span>
        )}
        {option.error && (
          <span className="errorSpan">
            ¡Ups!Hay algo que no estás haciendo bien.
          </span>
        )}
      </form>
    </div>

    //Hacer form frontend
    //Hacer sola el post, con formulario descontrolado, es decir, sin estados de react
    //Verificar que funcione
  );
}

export default Register;
