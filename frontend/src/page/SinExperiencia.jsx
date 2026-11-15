import React from 'react';
import './SinExperiencia.css';

export default function SinExperiencia() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 antialiased selection:bg-[#0B3D91] selection:text-white">
      
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#0B3D91] flex items-center justify-center text-white shadow-sm shrink-0">
                <span className="text-lg font-bold text-[#EAFE53]">NASA</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-[#0B3D91] border border-blue-200">
                    Modo Guía • Sin Experiencia Previa
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    API GAMC Cochabamba v1.1.1
                  </span>
                </div>
                <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight mt-1 leading-snug">
                  Adapting Farms with NASA Data — <span className="text-[#0B3D91]">Panel de Selección Guiada</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <div>
                <span className="text-slate-400 block leading-none font-medium">Ubicación Activa:</span>
                <span className="font-bold text-slate-800">Zona Sur - Itocta (Distrito 9, Cochabamba)</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

          <section className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0B3D91] inline-block"></span>
                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800">
                  Mapa Interactivo (Selección del Lugar)
                </h2>
              </div>
              <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Haz clic en el mapa para evaluar una parcela
              </span>
            </div>

            <div className="relative w-full h-[330px] sm:h-[370px] rounded-xl overflow-hidden border border-slate-300 bg-slate-100">
              <div id="map"></div>
            </div>
          </section>

          <section className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600 inline-block"></span>
                  <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800">
                    Capas Geoespaciales y Parámetros
                  </h2>
                </div>
              </div>

              <div className="space-y-3.5">
                <label className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 transition cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="custom-checkbox mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Suelo Periurbano (GAMC)</span>
                    <p className="text-xs text-slate-500 mt-0.5">Evalúa la presión urbana sobre zonas cultivables.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 transition cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="custom-checkbox mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Límite de Distritos</span>
                    <p className="text-xs text-slate-500 mt-0.5">División administrativa para gestión de riego local.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 transition cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="custom-checkbox mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Red de Drenaje e Influencia</span>
                    <p className="text-xs text-slate-500 mt-0.5">Cercanía a torrenteras y canales de escorrentía.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 transition cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="custom-checkbox mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Datos Satelitales NASA SMAP</span>
                    <p className="text-xs text-slate-500 mt-0.5">Humedad del suelo y balance hídrico en tiempo real.</p>
                  </div>
                </label>
              </div>
            </div>
          </section>

          <section className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block"></span>
                  <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800">
                    Alertas Agrometeorológicas
                  </h2>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Riesgo Hídrico Moderado
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
                <strong className="block font-bold mb-1">⚠️ Atención para nuevos agricultores:</strong>
                Se detecta menor retención de humedad en esta subcuenca según los registros de NASA POWER. Se aconseja iniciar con cultivos de riego controlado.
              </div>
            </div>
          </section>

          <section className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600 inline-block"></span>
                  <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800">
                    Recomendación de Cultivo
                  </h2>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Guía Simplificada IA
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm leading-relaxed">
                <strong className="block font-bold mb-1">🌱 Sugerencia recomendada:</strong>
                Para comenzar sin experiencia previa en esta zona, se recomiendan cultivos resistentes y de ciclo corto como <strong>haba</strong> o <strong>arveja</strong>, que requieren menor complejidad técnica de riego.
              </div>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}
