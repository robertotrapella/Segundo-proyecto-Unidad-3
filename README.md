# 🌍 World Explorer — Países del Mundo

Aplicación web interactiva desarrollada con **Vue 3** que consume datos de países y muestra información de forma dinámica.

## 🚀 Características

- **Peticiones asíncronas** con `fetch()` para cargar datos de países
- **Directivas de Vue 3**: `v-if`, `v-for`, `v-model`, `v-bind`
- Búsqueda en tiempo real por nombre o capital
- Filtro por región (América, Europa, Asia, África, Oceanía)
- Ordenamiento por nombre, población o área
- Modal con información detallada de cada país
- Diseño responsive con tema oscuro premium
- Estadísticas generales (total países, regiones, población, idiomas)

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| Vue 3 (CDN) | Framework reactivo (Composition API) |
| JavaScript ES6+ | Lógica de la aplicación |
| CSS3 | Estilos con variables CSS, animaciones, glassmorphism |
| Fetch API | Peticiones asíncronas para cargar datos |
| FlagCDN | Imágenes de banderas |

## 📂 Estructura del Proyecto

```
├── index.html          # Página principal con template Vue
├── app.js              # Lógica Vue 3 (Composition API)
├── styles.css          # Estilos CSS con diseño premium
├── data/
│   └── countries.json  # Datos de países (formato REST Countries)
└── README.md           # Documentación
```

## 📋 Directivas Vue Utilizadas

### `v-model` — Enlace de datos bidireccional
```html
<input v-model="searchQuery" placeholder="Buscar país...">
<select v-model="selectedRegion">...</select>
<select v-model="sortBy">...</select>
```

### `v-for` — Iteración de listas
```html
<article v-for="(country, index) in filteredCountries" :key="country.cca2">
    ...
</article>
```

### `v-if` — Renderizado condicional
```html
<div v-if="loading">Cargando...</div>
<div v-if="error">Error: {{ error }}</div>
<div v-if="selectedCountry">Modal de detalle</div>
```

### `v-bind` (`:`) — Enlace de atributos
```html
<img :src="country.flags.png" :alt="'Bandera de ' + country.name.common">
<div :class="'region-' + country.region.toLowerCase()"></div>
```

## 🔄 Petición Asíncrona con `fetch()`

```javascript
async function fetchCountries() {
    const response = await fetch('./data/countries.json');
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    countries.value = data;
}
```

## 🌐 Despliegue en GitHub Pages

1. Crear un repositorio en GitHub
2. Subir los archivos del proyecto:
   ```bash
   git init
   git add .
   git commit -m "feat: World Explorer con Vue 3"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```
3. Ir a **Settings → Pages** en el repositorio
4. Seleccionar **Source: Deploy from a branch**
5. Seleccionar **Branch: main** y carpeta **/ (root)**
6. Guardar y esperar el despliegue

## 📸 Vista Previa

La aplicación muestra:
- Header con estadísticas globales
- Barra de búsqueda y filtros interactivos
- Grid de tarjetas de países con banderas
- Modal de detalle al hacer clic en un país

## 👤 Autor

Proyecto desarrollado como práctica de Vue 3 con consumo de APIs REST.

## 📄 Licencia

MIT
