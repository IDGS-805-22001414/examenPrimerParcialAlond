import { useState } from "react";
import "./App.css";


const signos = [
  { nombre: "Aries", inicio: "03-21", fin: "04-19", img: "https://i.pinimg.com/736x/06/48/9f/06489f149ef882dfba2eb37b746adf5a.jpg", desc: "Energético, valiente y aventurero." },
  { nombre: "Tauro", inicio: "04-20", fin: "05-20", img: "https://i.pinimg.com/1200x/da/bb/5a/dabb5a4bc437b928707517a9d42ed92c.jpg", desc: "Paciente, práctico y confiable." },
  { nombre: "Géminis", inicio: "05-21", fin: "06-20", img: "https://i.pinimg.com/736x/29/74/5d/29745dd8aba0c6b25d1d99e7764755f1.jpg", desc: "Versátil, comunicativo y curioso." },
  { nombre: "Cáncer", inicio: "06-21", fin: "07-22", img: "https://i.pinimg.com/736x/fc/4f/9f/fc4f9fc89509cb808ed072ac6c2ee88a.jpg", desc: "Emocional, protector y empático." },
  { nombre: "Leo", inicio: "07-23", fin: "08-22", img: "https://i.pinimg.com/736x/cf/89/ff/cf89ff9794f283d4362ffb2ce88e5fac.jpg", desc: "Carismático, creativo y líder nato." },
  { nombre: "Virgo", inicio: "08-23", fin: "09-22", img: "https://i.pinimg.com/736x/95/3e/d9/953ed9b631be325905893d6b1317de3d.jpg", desc: "Analítico, organizado y leal." },
  { nombre: "Libra", inicio: "09-23", fin: "10-22", img: "https://i.pinimg.com/736x/73/43/84/734384dfeceeb4a22c5130fd0a402183.jpg", desc: "Equilibrado, diplomático y sociable." },
  { nombre: "Escorpio", inicio: "10-23", fin: "11-21", img: "https://i.pinimg.com/1200x/d0/30/a6/d030a6fd834615bd3fef1cc6d467a54e.jpg", desc: "Apasionado, intenso y determinado." },
  { nombre: "Sagitario", inicio: "11-22", fin: "12-21", img: "https://i.pinimg.com/736x/90/fc/88/90fc8875b38796d65f0cf6a1120ccdd3.jpg", desc: "Optimista, aventurero y filosófico." },
  { nombre: "Capricornio", inicio: "12-22", fin: "01-19", img: "https://i.pinimg.com/736x/a7/f7/16/a7f716e2b7731de8522c5695802aa04c.jpg", desc: "Disciplinado, responsable y ambicioso." },
  { nombre: "Acuario", inicio: "01-20", fin: "02-18", img: "https://i.pinimg.com/736x/f5/8d/c8/f58dc826b577f0a767ced6649a5e7f39.jpg", desc: "Independiente, innovador y humanitario." },
  { nombre: "Piscis", inicio: "02-19", fin: "03-20", img: "https://i.pinimg.com/736x/d9/25/41/d925414393433aaadf7a8cbdbdeef7dc.jpg", desc: "Soñador, empático y artístico." }
];

function App() {
  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("");
  const [signo, setSigno] = useState(null);
  const [edad, setEdad] = useState(null);

  const calcularEdad = (fechaNac) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const obtenerSigno = () => {
    if (!fecha) return;

    const [, month, day] = fecha.split("-");
    const mmdd = `${month}-${day}`;
    let encontrado = null;

    for (let s of signos) {
      if (s.inicio <= mmdd && mmdd <= s.fin) {
        encontrado = s;
        break;
      }
     
      if (s.nombre === "Capricornio" && (mmdd >= "12-22" || mmdd <= "01-19")) {
        encontrado = s;
        break;
      }
    }

    setEdad(calcularEdad(fecha));
    setSigno(encontrado);
  };

  return (
    <div className="App">
      <h1> Descubre tu Signo Zodiacal</h1>

      <input
        type="text"
        placeholder="Escribe tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <br />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <br />

      <button onClick={obtenerSigno}>Ver Signo</button>

      {signo && (
        <div className="resultado">
          <h2>
            Hola {nombre || "amig@"}, tienes {edad} años y eres {signo.nombre} ✨
          </h2>
          <img
            src={signo.img}
            alt={signo.nombre}
            width="200"
            style={{ borderRadius: "10px" }}
          />
          <p>{signo.desc}</p>
        </div>
      )}
    </div>
  );
}

export default App;
