# Cars Management System - Frontend

## React Frontend pro správu automobilů

**Autor:** Robin Lassak  
**Technologie:** React 19, Vite, Bootstrap 5, Axios  
**Typ:** Moderní SPA (Single Page Application) s responzivním designem

---

## Přehled

Frontendová část Cars Management System je moderní React aplikace postavená na nejnovějších technologiích. Aplikace poskytuje intuitivní uživatelské rozhraní pro správu automobilů s plnou CRUD funkcionalitou a responzivním designem optimalizovaným pro všechna zařízení.

---

## Technologie a závislosti

### Hlavní závislosti
- **React 19.0.0** - Nejnovější verze React s moderními hooks
- **Vite 6.1.0** - Rychlý build tool a development server s HMR
- **Bootstrap 5.3.3** - CSS framework pro responzivní design
- **Axios 1.8.4** - HTTP klient pro komunikaci s PHP backendem

### Development závislosti
- **ESLint 9.19.0** - Linting a kontrola kvality kódu
- **@vitejs/plugin-react 4.3.4** - Vite plugin pro React
- **TypeScript definice** - Type support pro React komponenty

---

## Struktura projektu

```
Cars_FrontendReact/
├── src/
│   ├── components/           # React komponenty
│   │   ├── carTable/        # Tabulka automobilů
│   │   │   ├── CarTable.jsx     # Hlavní komponenta tabulky
│   │   │   └── CarTable.css     # Responzivní styly tabulky
│   │   ├── FilterForm/      # Formulář pro filtrování
│   │   │   └── FilterForm.jsx   # Komponenta pro filtrování dat
│   │   └── UniForm/         # Univerzální formulář
│   │       └── UniForm.jsx      # Komponenta pro přidání/úpravu aut
│   ├── App.jsx              # Hlavní komponenta s logikou aplikace
│   ├── App.css              # Styly hlavní komponenty
│   ├── index.css            # Globální styly a Bootstrap import
│   └── main.jsx             # Vstupní bod aplikace
├── public/                  # Statické soubory
│   └── vite.svg             # Vite logo
├── dist/                    # Build výstup (generováno)
├── package.json             # NPM závislosti a skripty
├── vite.config.js           # Vite konfigurace s proxy
├── eslint.config.js         # ESLint konfigurace
└── index.html               # HTML template
```

---

## Architektura komponent

### 1. App.jsx - Hlavní komponenta

**Funkce:**
- State management pomocí React hooks (useState, useEffect)
- API komunikace s PHP backendem
- CRUD operace (Create, Read, Update, Delete)
- Filtrování a vyhledávání dat
- Error handling a validace

**Klíčové funkce:**
```javascript
- getCars()           // Načítání všech aut z API
- filterCars(ids)     // Filtrování podle ID
- insertCar(car)      // Přidání nového auta
- updateCar(car)      // Úprava existujícího auta
- deleteCar(id)       // Smazání auta
```

**State management:**
```javascript
const [cars, setCars] = useState([]);           // Všechna auta
const [carsToShow, setCarsToShow] = useState([]); // Zobrazená auta
const [newCar, setNewCar] = useState({...});    // Nové auto
const [carToChange, setCarToChange] = useState({...}); // Auto k úpravě
```

### 2. CarTable.jsx - Tabulka automobilů

**Funkce:**
- Zobrazení dat v responzivní Bootstrap tabulce
- Edit/Delete tlačítka pro každý řádek
- Responzivní design pro všechny velikosti displejů
- Vertikální layout tlačítek na malých displejích

**Vlastnosti:**
- Bootstrap `table-responsive` wrapper pro horizontální scroll
- Responzivní breakpointy pro různé velikosti obrazovek
- Skrytí sloupce "Najeto km" na mobilech
- Flexbox layout pro tlačítka

### 3. FilterForm.jsx - Formulář pro filtrování

**Funkce:**
- Multi-select filtrování podle značky
- Textové vyhledávání podle registrační značky
- Reset filtru na původní data
- Dynamické generování dostupných možností

**Vlastnosti:**
- Radio button přepínání mezi typy filtrování
- Multi-select pro výběr více značek
- Automatické načítání dostupných značek z dat
- Reset funkcionalita

### 4. UniForm.jsx - Univerzální formulář

**Funkce:**
- Univerzální komponenta pro přidání i úpravu aut
- Validace vstupních dat
- Předvyplnění dat při úpravě
- Identifikace podle ID pro různé případy použití

**Vlastnosti:**
- Podpora pro číselné i textové vstupy
- Automatické převody na správné typy
- Předvyplnění existujících dat
- Validace povinných polí

---

## Responzivní design

### Breakpointy a optimalizace

#### Desktop (1200px+)
- Plná šířka s maximálním obsahem
- Všechny sloupce tabulky viditelné
- Standardní velikosti tlačítek a textu
- Bootstrap `table-responsive` wrapper

#### Tablet (768px-1199px)
- Zmenšený font (0.85rem)
- Optimalizovaný padding (0.3rem 0.4rem)
- Menší tlačítka s `btn-sm` třídou
- Zachovaná funkcionalita všech sloupců

#### Mobile (576px-767px)
- Skrytý sloupec "Najeto km" pro úsporu místa
- Horizontální scroll pro tabulku
- Kompaktní tlačítka (0.7rem font)
- Zmenšený padding (0.25rem 0.3rem)

#### Small Mobile (<576px)
- Vertikální layout tlačítek pod sebe
- Ultra-kompaktní zobrazení (0.75rem font)
- Minimální padding (0.2rem 0.25rem)
- Flexbox `flex-direction: column` pro tlačítka

### Implementované CSS optimalizace

```css
/* Responzivní wrapper pro horizontální scroll */
.table-responsive {
  overflow-x: auto;
}

/* Vertikální tlačítka na malých displejích */
@media (max-width: 480px) {
  .d-flex {
    flex-direction: column !important;
    gap: 0.2rem !important;
  }
}

/* Skrytí sloupce "Najeto km" na mobilech */
@media (max-width: 576px) {
  .table th:nth-child(4),
  .table td:nth-child(4) {
    display: none;
  }
}
```

---

## API komunikace

### Konfigurace URL
```javascript
// Automatické přepínání mezi development a production
const apiUrl = import.meta.env.DEV ? "/api" : "/Cars/Cars-BackendPHP";
```

### Vite proxy konfigurace
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: "/Cars/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/Cars-BackendPHP"),
      },
    },
  },
});
```

### HTTP metody
- **GET** - Načítání dat (`getAll`, `getSpec`)
- **POST** - Přidání nového auta
- **PUT** - Úprava existujícího auta
- **DELETE** - Smazání auta

### Data flow
1. **Načtení** → `getCars()` → `setCars()` + `setCarsToShow()`
2. **Filtrování** → `filterCars()` → `setCarsToShow()`
3. **Přidání** → `insertCar()` → `getCars()` (refresh)
4. **Úprava** → `updateCar()` → `getCars()` (refresh)
5. **Smazání** → `deleteCar()` → `getCars()` (refresh)

---

## Instalace a spuštění

### Požadavky
- **Node.js** (verze 16+)
- **npm** nebo **yarn**

### Instalace závislostí
```bash
cd Cars_FrontendReact
npm install
```

### Development server
```bash
npm run dev
```
Aplikace bude dostupná na `http://localhost:5173`

### Build pro produkci
```bash
npm run build
```
Vytvoří optimalizovanou verzi v `dist/` složce

### Linting
```bash
npm run lint
```

### Preview build verze
```bash
npm run preview
```

---

## Build konfigurace

### Vite konfigurace
- **Base path:** `/Cars/` (pro webhosting)
- **Asset optimization:** Automatické minifikace
- **Code splitting:** Optimalizace pro rychlé načítání
- **HMR:** Hot Module Replacement pro development

### Produkční optimalizace
- Minifikace CSS a JavaScript
- Tree shaking pro odstranění nepoužívaného kódu
- Optimalizace obrázků a assetů
- Generování source maps

---

## Funkce aplikace

### Zobrazení dat
- **Responzivní tabulka** s kompletními informacemi o autech
- **Bootstrap styling** pro moderní vzhled
- **Automatické přizpůsobení** podle velikosti obrazovky

### Filtrování a vyhledávání
- **Filtrování podle značky** - multi-select výběr
- **Filtrování podle SPZ** - přesné textové vyhledání
- **Reset filtru** - návrat k zobrazení všech aut
- **Dynamické možnosti** - automatické načítání dostupných značek

### CRUD operace
- **Přidání nového auta** - formulář s validací
- **Úprava existujícího auta** - předvyplnění a editace
- **Smazání auta** - s potvrzením
- **Okamžité zobrazení změn** - automatický refresh dat

---

## Výsledky optimalizace

### Responzivní design
- ✅ **Žádné přetékání** na malých displejích
- ✅ **Zachovaná funkcionalita** všech operací
- ✅ **Lepší UX** na mobilních zařízeních
- ✅ **Automatické přizpůsobení** podle velikosti obrazovky

### Performance
- ✅ **Rychlé načítání** díky Vite a optimalizacím
- ✅ **HMR** pro rychlý development
- ✅ **Minifikace** pro produkční build
- ✅ **Code splitting** pro optimalizaci

### Uživatelské rozhraní
- ✅ **Intuitivní design** s Bootstrap komponenty
- ✅ **Responzivní layout** pro všechna zařízení
- ✅ **Moderní vzhled** s konzistentním stylingem
- ✅ **Přístupnost** s správnou semantikou

---

## Vzdělávací hodnota

### Co se studenti naučí
1. **Moderní React** - Hooks, state management, komponenty
2. **Responzivní design** - CSS media queries, Bootstrap
3. **API komunikace** - Axios, HTTP metody, error handling
4. **Build tools** - Vite, npm skripty, optimalizace
5. **Code organization** - Strukturování komponent a stylů
6. **Development workflow** - Linting, HMR, debugging

### Praktické dovednosti
- **Frontend development** s moderními nástroji
- **Responzivní design** pro různé zařízení
- **API integrace** s backendem
- **State management** v React aplikaci
- **Build a deployment** proces

---

## Závěr

Frontendová část Cars Management System demonstruje moderní přístup k vývoji React aplikací s důrazem na responzivní design, optimalizaci a uživatelskou přívětivost. Aplikace je připravena pro produkční nasazení a slouží jako výborný příklad full-stack integrace.

**Vhodné pro:** Studenty React, frontend vývojáře, kurzy moderních webových technologií

**Doba realizace:** 4-6 hodin pro kompletní implementaci

**Autor:** Robin Lassak