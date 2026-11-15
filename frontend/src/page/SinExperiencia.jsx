import React from 'react';
import './SinExperiencia.css';

export default function SinExperiencia() {
  return (
    <div className="agro-dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-logo">
            <span>🌱</span>
          </div>
          <div>
            <h1>Panel de Selección Guiada</h1>
            <span>Modo Principiante • Adapting Farms with NASA Data</span>
          </div>
        </div>

        <div className="header-tag">
          <span>🧭</span>
          <span>Guía Paso a Paso para Nuevos Agricultores</span>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="dashboard-title">
          <div>
            <span className="section-eyebrow">INICIACIÓN AGRÍCOLA EN COCHABAMBA</span>
            <h2>Primeros Pasos para Evaluar tu Terreno</h2>
            <p>Una interfaz simplificada y amigable diseñada para orientarte en la selección y análisis básico de tu primera parcela sin complicaciones técnicas.</p>
          </div>
        </div>

        <section className="location-section">
          <div className="section-heading">
            <div className="heading-icon">
              <span>📍</span>
            </div>
            <div>
              <h3>Ubicación Sugerida / Zona Inicial</h3>
              <p>Comienza seleccionando una zona periurbana recomendada para aprendizaje inicial.</p>
            </div>
          </div>

          <div className="coordinates-form">
            <div className="coordinate-field">
              <label>Zona / Distrito</label>
              <input type="text" defaultValue="Zona Sur - Itocta (Distrito 9)" readOnly />
            </div>
            <div className="coordinate-field">
              <label>Nivel de Dificultad</label>
              <input type="text" defaultValue="Principiante (Bajo Riesgo)" readOnly />
            </div>
            <button className="analyze-button">
              <span>✨ Cargar Guía de Zona</span>
            </button>
          </div>
        </section>

        <div className="dashboard-grid">
          <div className="dashboard-left">
            <section className="indicators-section">
              <div className="section-heading compact-heading">
                <div className="heading-icon recommendation-icon">
                  <span>🗺️</span>
                </div>
                <div>
                  <h3>Capas y Elementos Visuales Básicos</h3>
                  <p>Activa o desactiva ayudas visuales sencillas sobre el mapa.</p>
                </div>
              </div>

              <div className="layers-container">
                <label className="layer-item">
                  <input type="checkbox" defaultChecked className="custom-checkbox" />
                  <div>
                    <strong>Suelo Periurbano (GAMC)</strong>
                    <p>Muestra zonas seguras y protegidas para cultivar.</p>
                  </div>
                </label>

                <label className="layer-item">
                  <input type="checkbox" defaultChecked className="custom-checkbox" />
                  <div>
                    <strong>Límites de Distritos</strong>
                    <p>Identifica fácilmente a qué sector pertenece tu terreno.</p>
                  </div>
                </label>

                <label className="layer-item">
                  <input type="checkbox" defaultChecked className="custom-checkbox" />
                  <div>
                    <strong>Red de Riego y Canales</strong>
                    <p>Ubica las fuentes de agua más cercanas para tus plantas.</p>
                  </div>
                </label>
              </div>
            </section>

            <section className="alerts-section">
              <div className="section-heading compact-heading">
                <div className="heading-icon alert-heading-icon">
                  <span>💡</span>
                </div>
                <div>
                  <h3>Consejos Útiles para Empezar</h3>
                  <p>Recomendaciones prácticas para tu primera experiencia en el campo.</p>
                </div>
              </div>

              <div className="alerts-container">
                <div className="alert-item medio">
                  <i>🌱</i>
                  <div>
                    <span className="alert-level">Consejo Clave</span>
                    <strong>Empieza en pequeño</strong>
                    <p>Dedica una porción pequeña de terreno para familiarizarte con el riego y el cuidado diario antes de expandirte.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="dashboard-right">
            <div className="dashboard-panel recommendation-section">
              <div className="section-heading compact-heading">
                <div className="heading-icon recommendation-icon">
                  <span>🥕</span>
                </div>
                <div>
                  <h3>Cultivos Recomendados para Ti</h3>
                  <p>Especies de ciclo corto y alta resistencia ideales para principiantes.</p>
                </div>
              </div>

              <div className="recommendation-content">
                <h4>Haba, Arveja o Hortalizas de Hoja</h4>
                <p>Estas opciones se adaptan muy bien al clima de Cochabamba y perdonan pequeños errores de riego mientras aprendes el oficio.</p>
                
                <div className="recommendation-reason">
                  <strong>Por qué te conviene:</strong>
                  <p>Requieren herramientas sencillas, tienen menor tiempo de espera hasta la cosecha y un mantenimiento muy intuitivo.</p>
                </div>
              </div>
            </div>

            <div className="map-section">
              <div id="map" className="agro-map"></div>
            </div>
          </div>
        </div>

        <footer className="dashboard-footer">
          <i>🌱</i>
          <p>Panel de Selección Guiada • Tu primer paso en el mundo de la agricultura con datos accesibles.</p>
        </footer>
      </div>
    </div>
  );
}