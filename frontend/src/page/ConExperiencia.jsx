
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./ConExperiencia.css";

const API_URL = "http://localhost:5000/api/nasa/clima";

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

// Genera un periodo de los últimos 7 días completos
function getDateRange() {
  const end = new Date();
  end.setDate(end.getDate() - 1);

  const start = new Date(end);
  start.setDate(start.getDate() - 6);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  };

  return {
    start: formatDate(start),
    end: formatDate(end)
  };
}

// Formatea fechas YYYYMMDD
function formatDate(date) {
  if (!date || date.length !== 8) return date;

  return `${date.substring(6, 8)}/${date.substring(4, 6)}/${date.substring(0, 4)}`;
}

// Calcula el promedio de los valores diarios
function calculateAverage(data) {
  if (!data) return null;

  const values = Object.values(data).filter(
    value => typeof value === "number" && value !== -999
  );

  if (values.length === 0) return null;

  const average = values.reduce((total, value) => total + value, 0) / values.length;

  return Number(average.toFixed(2));
}

// Actualiza el centro del mapa
function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [map, position]);

  return null;
}

// Formatea valores recibidos
function formatValue(value, unit = "") {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) {
    return "--";
  }

  const formatted =
    typeof value === "number"
      ? Number(value.toFixed(2))
      : value;

  return `${formatted}${unit}`;
}

// Convierte humedad del suelo de fracción a porcentaje
function formatSoilHumidity(value) {
  if (typeof value !== "number") return null;

  return value >= 0 && value <= 1
    ? Number((value * 100).toFixed(1))
    : value;
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
        <p>No hay registros de temperatura disponibles.</p>
      </div>
    );
  }

  const values = data.map(item => Number(item.valor));
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
        <strong>{min.toFixed(1)}°C – {max.toFixed(1)}°C</strong>
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
          <span key={index}>{formatDate(item.fecha)}</span>
        ))}
      </div>
    </div>
  );
}

// Obtiene el nombre de una semilla sin asumir una única columna
function getSeedName(seed) {
  return (
    seed.nombre ||
    seed.nombre_semilla ||
    seed.variedad ||
    seed.tipo_semilla ||
    seed.semilla ||
    "Semilla recomendada"
  );
}

// Muestra los rangos de una semilla cuando están disponibles
function getSeedRange(seed, minField, maxField, unit = "") {
  const min = seed[minField];
  const max = seed[maxField];

  if (min === null && max === null) return null;
  if (min === undefined && max === undefined) return null;

  const formatNumber = (value) => {
    if (value === null || value === undefined) return "No definido";
    return `${value}${unit}`;
  };

  return `${formatNumber(min)} – ${formatNumber(max)}`;
}

// Componente principal
function ConExperiencia() {
  const [latitud, setLatitud] = useState("-17.3935");
  const [longitud, setLongitud] = useState("-66.1570");

  const [datos, setDatos] = useState(null);
  const [position, setPosition] = useState(CENTRO);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const consultarDatos = async (e) => {
    e.preventDefault();

    setError("");

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
    setDatos(null);
    setPosition([lat, lon]);

    try {
      const { start, end } = getDateRange();

      const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lon),
        start,
        end
      });

      const response = await fetch(`${API_URL}?${params.toString()}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "No se pudieron obtener los datos del terreno."
        );
      }

      setDatos(result);

    } catch (err) {
      setError(err.message || "Error al consultar el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Datos recibidos del backend
  const analisis = datos?.analisisClima || {};
  const rawData = datos?.datosCrudosNASA || {};

  const semillasRecomendadas = datos?.semillasRecomendadas || [];

  // Indicadores ambientales
  const temperaturaPromedio = analisis.temperaturaC ?? null;

  const humedadRelativa = calculateAverage(rawData.RH2M);

  const precipitacionPromedio = calculateAverage(rawData.PRECTOTCORR);

  const vientoPromedio = calculateAverage(rawData.WS2M);

  const humedadSuelo = formatSoilHumidity(
    typeof analisis.humedadSueloPromedio === "number"
      ? analisis.humedadSueloPromedio
      : null
  );

  // Datos diarios para el gráfico
  const temperaturas = rawData.T2M
    ? Object.entries(rawData.T2M)
        .filter(([fecha, valor]) => valor !== -999)
        .map(([fecha, valor]) => ({
          fecha,
          valor
        }))
    : [];

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
              Consulta información ambiental y evalúa las condiciones
              de tu terreno para orientar tus decisiones agrícolas.
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
                required
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
                required
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

          {datos && (
            <p className="location-result">
              <i className="bi bi-calendar3"></i>
              Periodo consultado: {formatDate(datos.periodo?.start)} al{" "}
              {formatDate(datos.periodo?.end)}
            </p>
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
                  title="Humedad relativa"
                  value={humedadRelativa}
                  unit="%"
                  description="Humedad del aire promedio"
                />

                <IndicatorCard
                  icon="bi-cloud-rain"
                  title="Precipitaciones"
                  value={precipitacionPromedio}
                  unit=" mm"
                  description="Promedio diario de precipitación"
                />

                <IndicatorCard
                  icon="bi-moisture"
                  title="Humedad del suelo"
                  value={humedadSuelo}
                  unit="%"
                  description="Humedad superficial del suelo"
                />

                <IndicatorCard
                  icon="bi-thermometer-half"
                  title="Temperatura promedio"
                  value={temperaturaPromedio}
                  unit="°C"
                  description="Temperatura del aire"
                />

                <IndicatorCard
                  icon="bi-wind"
                  title="Velocidad del viento"
                  value={vientoPromedio}
                  unit=" m/s"
                  description="Promedio diario del viento"
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
                  <p>
                    Información para tener en cuenta al evaluar tu terreno.
                  </p>
                </div>
              </div>

              <div className="alerts-container">
                {!datos && !loading && (
                  <div className="empty-state">
                    <i className="bi bi-shield-check"></i>
                    <p>
                      Consulta tu terreno para visualizar sus condiciones ambientales.
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="empty-state">
                    <i className="bi bi-arrow-repeat"></i>
                    <p>Analizando las condiciones ambientales...</p>
                  </div>
                )}

                {datos && (
                  <div className="empty-state">
                    <i className="bi bi-info-circle"></i>
                    <p>
                      El análisis actual proporciona datos climáticos y
                      recomendaciones de semillas, pero todavía no genera
                      alertas agrícolas automáticas.
                    </p>
                  </div>
                )}
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
                  <p>Comportamiento diario de la temperatura.</p>
                </div>
              </div>

              <TemperatureChart data={temperaturas} />
            </section>

            {/* Recomendaciones de semillas */}
            <section className="recommendation-section dashboard-panel">
              <div className="section-heading">
                <div className="heading-icon recommendation-icon">
                  <i className="bi bi-flower2"></i>
                </div>

                <div>
                  <h3>Semillas recomendadas</h3>
                  <p>
                    Alternativas compatibles con las condiciones climáticas.
                  </p>
                </div>
              </div>

              <div className="recommendation-content">
                {!datos && (
                  <div className="empty-state">
                    <i className="bi bi-lightbulb"></i>
                    <p>
                      Las recomendaciones aparecerán después de analizar tu terreno.
                    </p>
                  </div>
                )}

                {datos && semillasRecomendadas.length === 0 && (
                  <div className="empty-state">
                    <i className="bi bi-info-circle"></i>
                    <p>
                      No se encontraron semillas compatibles con las
                      condiciones climáticas consultadas.
                    </p>
                  </div>
                )}

                {datos && semillasRecomendadas.length > 0 && (
                  <div className="seeds-list">
                    {semillasRecomendadas.map((seed, index) => {
                      const temperatureRange = getSeedRange(
                        seed,
                        "temp_min_c",
                        "temp_max_c",
                        "°C"
                      );

                      const soilMin = seed.humedad_suelo_min_p;
                      const soilMax = seed.humedad_suelo_max_p;

                      const soilRange =
                        soilMin !== null && soilMin !== undefined ||
                        soilMax !== null && soilMax !== undefined
                          ? `${soilMin ?? "No definido"} – ${soilMax ?? "No definido"}`
                          : null;

                      return (
                        <article className="seed-item" key={seed.id || index}>
                          <div className="seed-icon">
                            <i className="bi bi-flower1"></i>
                          </div>

                          <div className="seed-info">
                            <h4>{getSeedName(seed)}</h4>

                            {temperatureRange && (
                              <p>
                                <strong>Temperatura:</strong>{" "}
                                {temperatureRange}
                              </p>
                            )}

                            {soilRange && (
                              <p>
                                <strong>Humedad del suelo:</strong>{" "}
                                {soilRange}
                              </p>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* MAPA */}
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
