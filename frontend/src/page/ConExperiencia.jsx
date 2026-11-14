
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./ConExperiencia.css";
import datosAgricolas from "../data/datosAgricolas.json";


// Cambia esta URL cuando tengas definida la ruta definitiva del backend.
const API_URL = "http://localhost:5000/api/agricultura/analisis";

// Coordenadas iniciales: Cochabamba
const CENTRO = [-17.3935, -66.1570];

// Icono del marcador
const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Actualiza el centro del mapa
function MapUpdater({ position }) {
  const map = useMap();

  if (position) {
    map.setView(position, 13);
  }

  return null;
}

// Formatea valores recibidos
function formatValue(value, unit = "") {
  if (value === null || value === undefined || value === "") {
    return "--";
  }

  return `${value}${unit}`;
}

// Tarjeta de indicadores
function IndicatorCard({ icon, title, value, unit, description }) {
  return (
    <article className="indicator-card">
      <div className="indicator-icon">
        <i className={`bi ${icon}`}></i>
      </div>

      <div className="indicator-info">
        <span>{title}</span>
        <strong>{formatValue(value, unit)}</strong>
        <small>{description || "Información ambiental"}</small>
      </div>
    </article>
  );
}

// Gráfico de temperaturas mediante SVG
function TemperatureChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <i className="bi bi-thermometer-half"></i>
        <p>Ingresa las coordenadas para consultar el registro de temperaturas.</p>
      </div>
    );
  }

  const values = data.map(item => Number(item.temperatura));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x = 35 + (index * 430) / Math.max(values.length - 1, 1);
    const y = 155 - ((value - min) / range) * 110;

    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="temperature-chart">
      <div className="chart-summary">
        <span>Temperatura registrada</span>
        <strong>{min}°C – {max}°C</strong>
      </div>

      <svg viewBox="0 0 500 190" preserveAspectRatio="none">
        {[35, 85, 135, 175].map(y => (
          <line
            key={y}
            x1="30"
            y1={y}
            x2="470"
            y2={y}
            stroke="#dce9ed"
            strokeDasharray="5 5"
          />
        ))}

        <polyline
          points={points}
          fill="none"
          stroke="#269FC0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.split(" ").map((point, index) => {
          const [x, y] = point.split(",");

          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#218caa"
            />
          );
        })}
      </svg>

      <div className="chart-labels">
        {data.map((item, index) => (
          <span key={index}>{item.fecha}</span>
        ))}
      </div>
    </div>
  );
}

// Componente principal
function ConExperiencia() {
  const [datos, setDatos] = useState(datosAgricolas);

  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  //const [datos, setDatos] = useState(null);
  const [position, setPosition] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const consultarDatos = async (e) => {
    e.preventDefault();

    setError("");
    setDatos(null);

    const lat = Number(latitud);
    const lon = Number(longitud);

    if (
      latitud.trim() === "" ||
      longitud.trim() === "" ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      lat < -90 || lat > 90 ||
      lon < -180 || lon > 180
    ) {
      setError("Ingresa coordenadas válidas.");
      return;
    }

    setLoading(true);
    setPosition([lat, lon]);

    try {
      const response = await fetch(
        `${API_URL}?latitud=${lat}&longitud=${lon}`
      );

      if (!response.ok) {
        throw new Error("No se pudieron obtener los datos del terreno.");
      }

      const result = await response.json();
      setDatos(result);

    } catch (err) {
      setError(err.message || "Error al consultar el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const metricas = datos?.indicadores || {};
  const alertas = datos?.alertas || [];
  const temperaturas = datos?.temperaturas || [];
  const recomendacion = datos?.recomendacion || null;

  return (
    <main className="agro-dashboard">

      {/* Encabezado */}
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-logo">
            <i className="bi bi-flower1"></i>
          </div>

          <div>
            <h1>AgroData</h1>
            <span>Panel agrícola</span>
          </div>
        </div>

        <div className="header-tag">
          <i className="bi bi-leaf"></i>
          Agricultura inteligente
        </div>
      </header>

      <div className="dashboard-container">

        <div className="dashboard-title">
          <div>
            <span className="section-eyebrow">
              ANÁLISIS DE TU TERRENO
            </span>

            <h2>Conoce las condiciones de tu cultivo</h2>

            <p>
              Consulta información ambiental y evalúa los posibles
              riesgos para tu producción.
            </p>
          </div>
        </div>

        {/* Formulario de coordenadas */}
        <section className="location-section">
          <div className="section-heading">
            <div className="heading-icon">
              <i className="bi bi-geo-alt"></i>
            </div>

            <div>
              <h3>Ubicación del terreno</h3>
              <p>Ingresa las coordenadas geográficas de tu parcela.</p>
            </div>
          </div>

          <form onSubmit={consultarDatos} className="coordinates-form">
            <div className="coordinate-field">
              <label htmlFor="latitude">Latitud</label>

              <input
                id="latitude"
                type="number"
                step="any"
                placeholder="Ej. -17.3935"
                value={latitud}
                onChange={(e) => setLatitud(e.target.value)}
              />
            </div>

            <div className="coordinate-field">
              <label htmlFor="longitude">Longitud</label>

              <input
                id="longitude"
                type="number"
                step="any"
                placeholder="Ej. -66.1570"
                value={longitud}
                onChange={(e) => setLongitud(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="analyze-button"
              disabled={loading}
            >
              <i className="bi bi-search"></i>
              {loading ? "Analizando..." : "Analizar terreno"}
            </button>
          </form>

          {error && (
            <div className="error-message">
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </div>
          )}
        </section>

        <div className="dashboard-grid">

          {/* COLUMNA IZQUIERDA */}
          <div className="dashboard-left">

            {/* Indicadores */}
            <section className="indicators-section">
              <div className="section-heading compact-heading">
                <h3>Condiciones ambientales</h3>
              </div>

              <div className="indicators-grid">

                <IndicatorCard
                  icon="bi-droplet-half"
                  title="Humedad"
                  value={metricas.humedad}
                  unit="%"
                  description="Humedad ambiental"
                />

                <IndicatorCard
                  icon="bi-cloud-rain"
                  title="Precipitaciones"
                  value={metricas.precipitaciones}
                  unit=" mm"
                  description="Precipitación registrada"
                />

                <IndicatorCard
                  icon="bi-moisture"
                  title="Humedad del suelo"
                  value={metricas.humedadSuelo}
                  unit="%"
                  description="Contenido de agua"
                />

                <IndicatorCard
                  icon="bi-thermometer-half"
                  title="Estrés térmico"
                  value={metricas.estresTermico}
                  unit=""
                  description="Nivel de estrés"
                />

              </div>
            </section>

            {/* Alertas */}
            <section className="alerts-section">
              <div className="section-heading">
                <div className="heading-icon alert-heading-icon">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>

                <div>
                  <h3>Alertas agrícolas</h3>
                  <p>Condiciones que podrían poner en riesgo tus cultivos.</p>
                </div>
              </div>

              <div className="alerts-container">

                {!datos && !loading && (
                  <div className="empty-state">
                    <i className="bi bi-shield-check"></i>
                    <p>Las alertas aparecerán después de analizar tu terreno.</p>
                  </div>
                )}

                {loading && (
                  <div className="empty-state">
                    <i className="bi bi-arrow-repeat"></i>
                    <p>Analizando posibles riesgos...</p>
                  </div>
                )}

                {datos && alertas.length === 0 && (
                  <div className="empty-state success-state">
                    <i className="bi bi-check-circle"></i>
                    <p>No se reportaron alertas para los datos consultados.</p>
                  </div>
                )}

                {alertas.map((alerta, index) => (
                  <article
                    key={index}
                    className={`alert-item ${String(alerta.nivel || "").toLowerCase()}`}
                  >
                    <i className="bi bi-exclamation-circle"></i>

                    <div>
                      <strong>{alerta.titulo}</strong>
                      <p>{alerta.descripcion}</p>
                    </div>

                    {alerta.nivel && (
                      <span className="alert-level">
                        {alerta.nivel}
                      </span>
                    )}
                  </article>
                ))}

              </div>
            </section>

          </div>

          {/* COLUMNA DERECHA */}
          <div className="dashboard-right">

            {/* Temperaturas */}
            <section className="temperature-section dashboard-panel">
              <div className="section-heading">
                <div className="heading-icon temperature-icon">
                  <i className="bi bi-thermometer-sun"></i>
                </div>

                <div>
                  <h3>Registro de temperaturas</h3>
                  <p>Comportamiento de la temperatura en el tiempo.</p>
                </div>
              </div>

              <TemperatureChart data={temperaturas} />
            </section>

            {/* Recomendación */}
            <section className="recommendation-section dashboard-panel">
              <div className="section-heading">
                <div className="heading-icon recommendation-icon">
                  <i className="bi bi-flower2"></i>
                </div>

                <div>
                  <h3>Recomendación de cultivo</h3>
                  <p>Alternativas según las condiciones del terreno.</p>
                </div>
              </div>

              <div className="recommendation-content">
                {!recomendacion ? (
                  <div className="empty-state">
                    <i className="bi bi-lightbulb"></i>
                    <p>Las recomendaciones aparecerán después del análisis.</p>
                  </div>
                ) : (
                  <>
                    <h4>{recomendacion.cultivo}</h4>
                    <p>{recomendacion.descripcion}</p>

                    {recomendacion.motivo && (
                      <div className="recommendation-reason">
                        <strong>¿Por qué?</strong>
                        <p>{recomendacion.motivo}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            {/* MAPA: sin título adicional */}
            <section className="map-section">
              <MapContainer
                center={position || CENTRO}
                zoom={position ? 13 : 11}
                scrollWheelZoom={true}
                className="agro-map"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {position && (
                  <>
                    <Marker
                      position={position}
                      icon={markerIcon}
                    />
                    <MapUpdater position={position} />
                  </>
                )}
              </MapContainer>
            </section>

          </div>
        </div>

        {/* Mensaje final */}
        <footer className="dashboard-footer">
          <i className="bi bi-shield-check"></i>

          <p>
            Esta herramienta está diseñada para respaldar,
            no para reemplazar la experiencia humana.
          </p>
        </footer>

      </div>
    </main>
  );
}

export default ConExperiencia;
