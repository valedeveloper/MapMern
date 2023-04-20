import { HiLocationMarker } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import "./Login.css";
const END_POINT = "http://localhost:8000/user/login";

function Login({ closeLogin,setUserBtn }) {
  const [isError, setIsError] = useState(false);

  const getUser = async (e) => {
    e.preventDefault();
    const entries = new window.FormData(e.target);
    const username = entries.get("username");
    const password = entries.get("password");
    const isUser = { username, password };
    try {
      const res = await fetch(END_POINT, {
        method: "POST",
        body: JSON.stringify(isUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!res.ok){ 
        setIsError(true)
        throw new Error("Hay errores")
      }
      const data = await res.json();
      window.localStorage.setItem("user",data.username)
      setUserBtn(data.username)
      closeLogin()

    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login" onSubmit={(e) => getUser(e)}>
      <AiFillCloseCircle fontSize={"30px"} onClick={closeLogin} />
      <form>
        <div className="containerLogo">
          <HiLocationMarker fontSize={"30px"} />
          <h2>ValPin</h2>
        </div>
        <input placeholder="username" type="text" name="username" />
        <input placeholder="password" type="password" name="password" />
        <button>Ingresar</button>
        {isError && (
          <span className="errorSpan">
            ¡Ups!Parece que hay datos que no coinciden
          </span>
        )}
      </form>
    </div>
  );
}

export default Login;
