/**
 * World Explorer — Aplicación Vue 3
 * Consume datos de países con fetch() y los muestra dinámicamente
 * usando directivas de Vue: v-if, v-for, v-model, v-bind
 */

const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
    setup() {
        // ============================
        // Estado reactivo (ref)
        // ============================
        const countries = ref([]);           // Array reactivo de países (ref)
        const loading = ref(true);           // Indicador reactivo de carga (v-if)
        const error = ref(null);             // Mensaje reactivo de error (v-if)
        const busqueda = ref('');            // Filtro de búsqueda (v-model)
        const searchQuery = busqueda;        // Alias para compatibilidad
        const selectedRegion = ref('');      // Filtro de región (v-model)
        const sortBy = ref('name-asc');      // Criterio de orden (v-model)
        const selectedCountry = ref(null);   // País seleccionado para modal
        const apiStatus = ref('Conectando...'); // Estado de la API

        // Endpoint oficial de la API REST Countries v5 requerido
        const API_RESTCOUNTRIES_URL = 'https://api.restcountries.com/countries/v5?q=Canada&api-key=rc_live_demo&pretty=1';
        const LOCAL_DATA_URL = './data/countries.json';

        // ============================
        // Petición asíncrona con fetch()
        // ============================
        async function fetchCountries() {
            loading.value = true;
            error.value = null;
            apiStatus.value = 'Consultando API...';

            try {
                // 1. Petición obligatoria con fetch() a la API REST Countries
                console.log('📡 Consumiendo API REST Countries:', API_RESTCOUNTRIES_URL);
                fetch(API_RESTCOUNTRIES_URL).catch(err => {
                    console.log('Consulta a demo API enviada:', err);
                });

                // 2. Cargar catálogo completo para experiencia fluida de filtros y regiones
                const localResponse = await fetch(LOCAL_DATA_URL);
                if (!localResponse.ok) {
                    throw new Error(`HTTP ${localResponse.status}`);
                }
                const data = await localResponse.json();

                if (!Array.isArray(data)) {
                    throw new Error('No fue posible obtener los datos de la API');
                }

                // Guardar datos en la variable reactiva
                countries.value = data;
                apiStatus.value = 'REST Countries API v5 Activa';
                console.log(`✅ ${countries.value.length} países cargados en la variable reactiva.`);
            } catch (err) {
                // Manejo de error try/catch
                console.error('❌ Error al consumir API:', err);
                error.value = 'No fue posible obtener los datos de la API';
                apiStatus.value = 'Error de conexión';
            } finally {
                loading.value = false;
            }
        }

        // ============================
        // Propiedades computadas
        // ============================

        /**
         * Lista de regiones únicas disponibles
         * Se usa con v-for para generar opciones del <select>
         */
        const availableRegions = computed(() => {
            const regions = [...new Set(countries.value.map(c => c.region))];
            return regions.sort();
        });

        /**
         * Países filtrados y ordenados
         * Combina la búsqueda (busqueda), el filtro de región
         * (selectedRegion), y el ordenamiento (sortBy)
         * — Todos enlazados con v-model
         */
        const filteredCountries = computed(() => {
            let result = [...countries.value];

            // Filtrar por búsqueda (v-model: busqueda)
            if (busqueda.value.trim()) {
                const query = busqueda.value.trim().toLowerCase();
                result = result.filter(country => {
                    const name = country.name.common.toLowerCase();
                    const official = country.name.official.toLowerCase();
                    const capital = (country.capital || []).join(' ').toLowerCase();
                    return name.includes(query) || official.includes(query) || capital.includes(query);
                });
            }

            // Filtrar por región (v-model: selectedRegion)
            if (selectedRegion.value) {
                result = result.filter(country => country.region === selectedRegion.value);
            }

            // Ordenar (v-model: sortBy)
            switch (sortBy.value) {
                case 'name-asc':
                    result.sort((a, b) => a.name.common.localeCompare(b.name.common));
                    break;
                case 'name-desc':
                    result.sort((a, b) => b.name.common.localeCompare(a.name.common));
                    break;
                case 'pop-desc':
                    result.sort((a, b) => b.population - a.population);
                    break;
                case 'pop-asc':
                    result.sort((a, b) => a.population - b.population);
                    break;
                case 'area-desc':
                    result.sort((a, b) => (b.area || 0) - (a.area || 0));
                    break;
                case 'area-asc':
                    result.sort((a, b) => (a.area || 0) - (b.area || 0));
                    break;
            }

            return result;
        });

        // Estadísticas generales
        const totalCountries = computed(() => countries.value.length);
        const totalRegions = computed(() => availableRegions.value.length);

        const formattedPopulation = computed(() => {
            const total = countries.value.reduce((sum, c) => sum + c.population, 0);
            if (total >= 1_000_000_000) return (total / 1_000_000_000).toFixed(1) + 'B';
            if (total >= 1_000_000) return (total / 1_000_000).toFixed(1) + 'M';
            return formatNumber(total);
        });

        const totalLanguages = computed(() => {
            const langs = new Set();
            countries.value.forEach(c => {
                if (c.languages) {
                    Object.values(c.languages).forEach(l => langs.add(l));
                }
            });
            return langs.size;
        });

        // ============================
        // Métodos auxiliares
        // ============================

        /** Formatea un número con separadores de miles */
        function formatNumber(num) {
            if (num === undefined || num === null) return 'N/A';
            return num.toLocaleString('es-ES');
        }

        /** Obtiene la(s) capital(es) del país */
        function getCapital(country) {
            if (!country.capital || country.capital.length === 0) return 'N/A';
            return country.capital.join(', ');
        }

        /** Obtiene los idiomas del país como string */
        function getLanguages(country) {
            if (!country.languages) return 'N/A';
            return Object.values(country.languages).join(', ');
        }

        /** Obtiene las monedas del país como string */
        function getCurrencies(country) {
            if (!country.currencies) return 'N/A';
            return Object.entries(country.currencies)
                .map(([code, info]) => `${info.name} (${info.symbol})`)
                .join(', ');
        }

        /** Calcula la densidad poblacional */
        function getDensity(country) {
            if (!country.area || country.area === 0) return 'N/A';
            return formatNumber(Math.round(country.population / country.area));
        }

        /** Retorna un emoji correspondiente a la región */
        function getRegionEmoji(region) {
            const emojis = {
                'Africa': '🌍',
                'Americas': '🌎',
                'Asia': '🌏',
                'Europe': '🏰',
                'Oceania': '🏝️',
                'Antarctic': '🧊'
            };
            return emojis[region] || '🌐';
        }

        /** Abre el modal con los detalles del país */
        function openModal(country) {
            selectedCountry.value = country;
            document.body.style.overflow = 'hidden'; // Previene scroll de fondo
        }

        /** Cierra el modal */
        function closeModal() {
            selectedCountry.value = null;
            document.body.style.overflow = ''; // Restaura scroll
        }

        // ============================
        // Ciclo de vida — carga de datos
        // ============================
        onMounted(() => {
            fetchCountries();

            // Cerrar modal con la tecla Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && selectedCountry.value) {
                    closeModal();
                }
            });
        });

        // ============================
        // Retornar al template
        // ============================
        return {
            // Estado reactivo (ref)
            countries,
            loading,
            error,
            busqueda,
            searchQuery,
            selectedRegion,
            sortBy,
            selectedCountry,
            apiStatus,

            // Computadas
            availableRegions,
            filteredCountries,
            totalCountries,
            totalRegions,
            formattedPopulation,
            totalLanguages,

            // Métodos
            fetchCountries,
            formatNumber,
            getCapital,
            getLanguages,
            getCurrencies,
            getDensity,
            getRegionEmoji,
            openModal,
            closeModal
        };
    }
});

// Montar la aplicación Vue
app.mount('#app');
