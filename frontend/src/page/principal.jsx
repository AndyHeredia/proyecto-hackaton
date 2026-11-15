import React from "react";
import "./principal.css";
import { useNavigate } from "react-router-dom";


function Principal({ onSelect }) {
  const navigate = useNavigate();
  const handleSelect = (experience) => {
    if (onSelect) {
      onSelect(experience);
    } else {
      console.log("Experiencia seleccionada:", experience);
    }
  };

  return (
    <main className="principal">

      {/* Fondo animado */}
      <div className="background">
        <div className="sky-glow"></div>

        {/* Nubes */}
        <div className="cloud cloud-one"></div>
        <div className="cloud cloud-two"></div>

        {/* Líneas de datos */}
        <svg className="data-lines" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M-100 500 Q300 200 650 480 T1500 250" />
          <path d="M-100 650 Q350 350 750 650 T1500 450" />
          <path d="M200 0 Q500 300 900 100 T1500 300" />
        </svg>

        {/* Partículas */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              "--x": `${(i * 37 + 7) % 100}%`,
              "--y": `${(i * 53 + 11) % 85}%`,
              "--delay": `${(i % 6) * -1.5}s`,
              "--duration": `${5 + (i % 5)}s`,
            }}
          />
        ))}

        {/* Hojas flotantes */}
        <span className="floating-leaf leaf-one">✦</span>
        <span className="floating-leaf leaf-two">✦</span>
        <span className="floating-leaf leaf-three">✦</span>

        {/* Paisaje */}
        <svg
          className="landscape"
          viewBox="0 0 1440 500"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="mountains" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#55b9d9" />
              <stop offset="100%" stopColor="#236b9b" />
            </linearGradient>

            <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#79d66d" />
              <stop offset="100%" stopColor="#087b54" />
            </linearGradient>

            <linearGradient id="frontField" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b0e979" />
              <stop offset="100%" stopColor="#16865a" />
            </linearGradient>
          </defs>

          {/* Montañas */}
          <path
            d="M0 260 L150 170 L230 220 L390 100 L520 235
            L690 130 L830 235 L1000 105 L1160 230 L1320 130
            L1440 210 L1440 500 L0 500 Z"
            fill="url(#mountains)"
            opacity=".85"
          />

          {/* Montañas lejanas */}
          <path
            d="M0 310 L180 220 L320 290 L500 180 L670 300
            L850 200 L1050 300 L1250 190 L1440 280
            L1440 500 L0 500 Z"
            fill="#3d9eb2"
            opacity=".7"
          />

          {/* Campo de fondo */}
          <path
            d="M0 350 Q350 280 650 360 T1440 330
            L1440 500 L0 500 Z"
            fill="url(#field)"
          />

          {/* Campo delantero */}
          <path
            d="M0 410 Q250 320 550 390 Q900 450 1440 320
            L1440 500 L0 500 Z"
            fill="url(#frontField)"
          />

          {/* Surcos del cultivo */}
          <g
            fill="none"
            stroke="#d0f69b"
            strokeWidth="3"
            opacity=".35"
          >
            <path d="M-100 470 Q300 350 650 450 T1500 350" />
            <path d="M-100 510 Q300 390 650 490 T1500 390" />
            <path d="M-100 550 Q300 430 650 530 T1500 430" />
          </g>
        </svg>
      </div>

      {/* Contenido */}
      <section className="welcome-content">

        <header className="brand">
          <div className="brand-icon">
            <svg viewBox="0 0 80 80" fill="none">
              <path
                d="M40 65 C20 50 15 32 18 20 C35 23 43 35 40 65Z"
                fill="#39a96b"
              />
              <path
                d="M40 65 C42 35 54 18 70 15 C72 38 58 55 40 65Z"
                fill="#8bd66b"
              />
              <path
                d="M40 65 L40 27"
                stroke="#087b62"
                strokeWidth="3"
              />
              <path
                d="M10 69 Q40 58 70 69"
                stroke="#087b62"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="brand-name">AgroData</span>
        </header>

        <div className="welcome-options">

          {/* Opción experiencia */}
          <button
            className="experience-card experienced"
            onClick={() => navigate("/con-experiencia")}
          >
            <div className="card-icon">
              <svg viewBox="0 0 100 100" fill="none">
                <path
                  d="M15 78 Q50 60 85 78"
                  stroke="#1688a8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M50 72 V30"
                  stroke="#1688a8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M50 50 Q20 50 20 20 Q48 20 50 50Z"
                  fill="#40b5c8"
                />
                <path
                  d="M50 42 Q52 12 82 15 Q82 43 50 42Z"
                  fill="#218f9e"
                />
                <rect x="65" y="60" width="8" height="20" rx="2" fill="#1688a8" />
                <rect x="78" y="45" width="8" height="35" rx="2" fill="#1688a8" />
              </svg>
            </div>

            <h2>Tengo<br />Experiencia</h2>
            <p>
              Conozco la agricultura y quiero
              optimizar mis cultivos.
            </p>

            <span className="card-arrow">→</span>
          </button>

          {/* Opción principiante */}
          <button
            className="experience-card beginner"
            onClick={() => navigate("/sin-experiencia")}
          >
            <div className="card-icon">
              <svg viewBox="0 0 100 100" fill="none">
                <path
                  d="M15 78 Q50 60 85 78"
                  stroke="#239d72"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M50 70 V38"
                  stroke="#239d72"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M50 52 Q22 52 22 26 Q48 25 50 52Z"
                  fill="#65c98a"
                />
                <path
                  d="M50 45 Q54 17 79 20 Q80 45 50 45Z"
                  fill="#299e6e"
                />
                <circle cx="79" cy="22" r="16" fill="#d0f2dd" />
                <text
                  x="79"
                  y="29"
                  textAnchor="middle"
                  fontSize="23"
                  fontWeight="bold"
                  fill="#17865e"
                >
                  ?
                </text>
              </svg>
            </div>

            <h2>No Tengo<br />Experiencia</h2>
            <p>
              Quiero aprender y recibir
              recomendaciones.
            </p>

            <span className="card-arrow">→</span>
          </button>

        </div>

        <div className="principal-footer">
          <span>🌱</span>
          <p>El futuro de tus cultivos comienza aquí</p>
          <span>🌿</span>
        </div>

      </section>
    </main>
  );
}

export default Principal;
