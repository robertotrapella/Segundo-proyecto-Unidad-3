# 🌍 Explorador de Países — Vue 3 & REST Countries API

Aplicación web desarrollada con **Vue 3 (Composition API)** que consume datos desde la API oficial de **REST Countries** y muestra información de forma interactiva y dinámica aplicando las directivas fundamentales de Vue (`v-if`, `v-for`, `v-model`, `v-bind`), peticiones asíncronas con `fetch()`, manejo de ciclo de vida con `onMounted()` y reactividad con `ref()`.

---

## 🔗 Enlaces de Entrega

- 🔗 **Repositorio GitHub (Código fuente):**  
  [https://github.com/robertotrapella/Segundo-proyecto-Unidad-3](https://github.com/robertotrapella/Segundo-proyecto-Unidad-3)

- 🌐 **Sitio Web Publicado (GitHub Pages):**  
  [https://robertotrapella.github.io/Segundo-proyecto-Unidad-3/](https://robertotrapella.github.io/Segundo-proyecto-Unidad-3/)

---

## ✅ Cumplimiento de Requisitos del Proyecto

| # | Requisito / Especificación | Estado | Implementación en Código |
|---|---|:---:|---|
| 1️⃣ | **Repositorio en GitHub** con código fuente y commits | ✅ Cumplido | Repositorio personal con historial de commits y estructura organizada (`index.html`, `app.js`, `styles.css`, `data/`). |
| 2️⃣ | **Publicación en GitHub Pages** | ✅ Cumplido | Desplegado y funcionando en `https://robertotrapella.github.io/Segundo-proyecto-Unidad-3/`. |
| 3️⃣ | **Consumo de API REST Countries** con `fetch()` en `onMounted()` | ✅ Cumplido | Se consume `https://api.restcountries.com/countries/v5?q=Canada&api-key=rc_live_demo&pretty=1` con `fetch()` dentro de `onMounted()`. |
| 3️⃣ | **Almacenamiento reactivo con `ref()`** | ✅ Cumplido | Datos y estados guardados con `ref([])`, `loading = ref(true)`, `error = ref(null)`, `busqueda = ref('')`. |
| 4️⃣ | **Uso de `v-for`** | ✅ Cumplido | Itera la lista filtrada de países mostrando Bandera, Nombre, Capital, Región y Población (`v-for="(country, index) in filteredCountries"`). |
| 4️⃣ | **Uso de `v-if`** | ✅ Cumplido | Indicador de carga (`v-if="loading"`), mensaje de error (`v-if="error"`), y estado vacío (`v-if="filteredCountries.length === 0"`). |
| 4️⃣ | **Uso de `v-model`** | ✅ Cumplido | Búsqueda bidireccional por nombre (`<input v-model="busqueda">`) y filtro por región (`<select v-model="selectedRegion">`). |
| 5️⃣ | **Interfaz mínima requerida** | ✅ Cumplido | Título "Explorador de Países", buscador con `v-model`, tarjetas con datos requeridos, indicador "Cargando países...". |
| 6️⃣ | **Manejo de errores `try / catch`** | ✅ Cumplido | Captura excepciones de red y muestra `"No fue posible obtener los datos de la API"`. |
| 7️⃣ | **Documento PDF de Evidencias** | ✅ Cumplido | Generado con capturas de interfaz, capturas de código fuente y explicaciones técnicas detalladas. |

---

## 🛠️ Tecnologías y Arquitectura

- **Framework:** Vue 3 (Composition API `setup()`, `ref()`, `computed()`, `onMounted()`)
- **Peticiones HTTP:** Fetch API nativa de JavaScript ES6+
- **Estilos:** Vanilla CSS moderno con diseño glassmorphism, responsive grid, paleta de colores HSL y animaciones suaves
- **Despliegue:** GitHub Pages (rama `main`, directorio `/`)

---

## 📂 Estructura del Proyecto

```
Segundo-proyecto-Unidad-3/
├── index.html            # Template Vue con directivas (v-if, v-for, v-model, v-bind)
├── app.js                # Lógica reactiva Vue 3, consumo de API con fetch(), computed properties
├── styles.css            # Estilos CSS modernos, tema oscuro y diseño responsivo
├── data/
│   └── countries.json    # Catálogo complementario de datos con formato REST Countries
└── README.md             # Documentación completa y enlaces de entrega
```

---

## 💻 Fragmentos Clave de Código

### 1. Consumo de API con `fetch()` y ciclo de vida `onMounted()`
```javascript
const { createApp, ref, computed, onMounted } = Vue;

const API_RESTCOUNTRIES_URL = 'https://api.restcountries.com/countries/v5?q=Canada&api-key=rc_live_demo&pretty=1';

async function fetchCountries() {
    loading.value = true;
    error.value = null;
    try {
        const apiResponse = await fetch(API_RESTCOUNTRIES_URL);
        // ... procesamiento y guardado reactivo
        countries.value = data;
    } catch (err) {
        error.value = 'No fue posible obtener los datos de la API';
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchCountries();
});
```

### 2. Directivas en `index.html`
```html
<!-- v-model: Enlace bidireccional -->
<input type="text" v-model="busqueda" placeholder="🔍 Buscar país por nombre...">

<!-- v-if: Indicador de carga -->
<div v-if="loading" class="loading-container">
    <div class="loading-spinner"></div>
    <p class="loading-text">Cargando países...</p>
</div>

<!-- v-if: Mensaje de error -->
<div v-if="error" class="error-container">
    <p class="error-message">{{ error }}</p>
</div>

<!-- v-for y v-bind: Renderizado dinámico de tarjetas -->
<article v-for="(country, index) in filteredCountries" :key="country.cca2" class="country-card">
    <img :src="country.flags.png" :alt="'Bandera de ' + country.name.common">
    <h2>{{ country.name.common }}</h2>
    <p>Capital: {{ getCapital(country) }}</p>
    <p>Región: {{ country.region }}</p>
    <p>Población: {{ formatNumber(country.population) }}</p>
</article>
```

---

## 👥 Equipo / Integrantes

- **Roberto Trapella**
- **José Jafeth González López**
- **Humberto Fonseca Morales**

- **Materia:** Programación Web / Desarrollo de Aplicaciones Front-End  
- **Unidad:** Unidad 3 — Frameworks Front-End Reactivos (Vue 3)  
- **Fecha:** Octubre 2026
