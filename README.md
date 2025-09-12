# Cars Management System
## Školní cvičení - Propojení React Frontend s PHP Backend

**Autor:** Robin Lassak  
**Typ:** Celodenní školní cvičení  
**Zaměření:** Propojení frontend (React) a backend (PHP) technologií

---

## Popis projektu

Tento projekt představuje komplexní webovou aplikaci pro správu automobilů, která demonstruje propojení moderního React frontendu s PHP backendem. Aplikace byla vypracována jako praktické školní cvičení pro pochopení komunikace mezi různými technologiemi v full-stack vývoji.

### Cíle cvičení
- Osvojení si komunikace mezi React frontendem a PHP backendem
- Praktické použití REST API
- Práce s databází MySQL pomocí PDO
- Implementace CRUD operací
- Responzivní design s Bootstrap
- Správa stavu v React aplikaci

---

## Architektura aplikace

### Frontend (React)
- **Technologie:** React 19, Vite, Axios, Bootstrap 5
- **Lokace:** `Cars_FrontendReact/`
- **Funkce:** Uživatelské rozhraní, správa stavu, komunikace s API

### Backend (PHP)
- **Technologie:** PHP 7.4+, PDO MySQL
- **Lokace:** `Cars-BackendPHP/`
- **Funkce:** REST API, databázové operace, CORS handling

### Databáze
- **Technologie:** MySQL
- **Tabulka:** `DatabazeAut`
- **Funkce:** Uložení dat o automobilech

---

## Struktura projektu

```
Cars/
├── .gitignore                 # Git ignore soubor
├── README.md                  # Dokumentace
├── Cars_FrontendReact/        # React frontend
│   ├── src/
│   │   ├── components/        # React komponenty
│   │   │   ├── carTable/      # Tabulka automobilů
│   │   │   ├── FilterForm/    # Formulář pro filtrování
│   │   │   └── UniForm/       # Univerzální formulář
│   │   ├── App.jsx           # Hlavní komponenta
│   │   ├── App.css           # Styly aplikace
│   │   ├── index.css         # Globální styly
│   │   └── main.jsx          # Vstupní bod
│   ├── package.json          # NPM závislosti
│   └── vite.config.js        # Vite konfigurace
└── Cars-BackendPHP/          # PHP backend
    ├── index.php             # Hlavní API endpoint
    ├── dbConnect.php         # Databázové připojení
    └── login.php             # Přihlašovací údaje
```

---

## Instalace a spuštění

### Požadavky
- **Node.js** (verze 16+)
- **PHP** (verze 7.4+)
- **MySQL** databáze
- **Web server** (Apache/Nginx) nebo PHP built-in server

### 1. Příprava databáze

Vytvořte MySQL databázi a tabulku:

```sql
CREATE DATABASE cars_management;
USE cars_management;

CREATE TABLE DatabazeAut (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    reg VARCHAR(20) NOT NULL,
    km INT NOT NULL,
    year INT NOT NULL
);

-- Vložení testovacích dat
INSERT INTO DatabazeAut (brand, model, reg, km, year) VALUES
('Škoda', 'Scala', '2AP0809', 159212, 2017),
('Honda', 'Civic', '9T64589', 101515, 2005),
('Škoda', 'Fabia', '6MA8915', 230555, 2012),
('Seat', 'Ibiza', '8TR9634', 159453, 2008),
('Volkswagen', 'Caddy', '2T65138', 210582, 2010);
```

### 2. Konfigurace backendu

Upravte přihlašovací údaje v `Cars-BackendPHP/login.php`:

```php
return [
    'server' => 'localhost',
    'dbname' => 'cars_management',
    'user' => 'your_username',
    'pass' => 'your_password'
];
```

### 3. Spuštění backendu

```bash
cd Cars-BackendPHP
php -S localhost:8000
```

Backend bude dostupný na `http://localhost:8000`

### 4. Spuštění frontendu

```bash
cd Cars_FrontendReact
npm install
npm run dev
```

Frontend bude dostupný na `http://localhost:5173`

---

## Funkce aplikace

### Zobrazení dat
- **Tabulka automobilů** s kompletními informacemi
- **Responzivní design** pro všechny velikosti obrazovek
- **Bootstrap styling** pro moderní vzhled

### Filtrování
- **Filtrování podle značky** - výběr z dostupných značek
- **Filtrování podle registrační značky** - přesné vyhledání
- **Reset filtru** - návrat k zobrazení všech aut

### Přidání nového auta
- **Formulář** pro zadání všech údajů
- **Validace** vstupních dat
- **Okamžité zobrazení** v tabulce po přidání

### Úprava existujícího auta
- **Výběr auta** kliknutím na Edit tlačítko
- **Předvyplnění formuláře** existujícími daty
- **Aktualizace** v databázi a tabulce

### Smazání auta
- **Potvrzení** před smazáním
- **Okamžité odstranění** z databáze a tabulky

---

## API Endpoints

### GET požadavky
- `GET /?action=getAll` - Získání všech automobilů
- `GET /?action=getSpec&ids=1,2,3` - Získání specifických aut podle ID

### POST požadavky
- `POST /` - Přidání nového automobilu
  ```json
  {
    "brand": "Škoda",
    "model": "Fabia",
    "reg": "1A23456",
    "km": 150000,
    "year": 2020
  }
  ```

### PUT požadavky
- `PUT /` - Úprava existujícího automobilu
  ```json
  {
    "id": 1,
    "brand": "Škoda",
    "model": "Fabia",
    "reg": "1A23456",
    "km": 160000,
    "year": 2020
  }
  ```

### DELETE požadavky
- `DELETE /{id}` - Smazání automobilu podle ID

---

## Technické detaily

### Frontend technologie
- **React 19** - Moderní UI knihovna
- **Vite** - Rychlý build tool
- **Axios** - HTTP klient pro API komunikaci
- **Bootstrap 5** - CSS framework pro responzivní design

### Backend technologie
- **PHP 7.4+** - Server-side programovací jazyk
- **PDO** - Databázová abstrakční vrstva
- **MySQL** - Relační databáze
- **CORS** - Cross-Origin Resource Sharing

### Komunikace frontend-backend
- **REST API** - Reprezentativní stav přenosu
- **JSON** - Formát výměny dat
- **HTTP metody** - GET, POST, PUT, DELETE
- **Vite proxy** - Propojení vývojových serverů

---

## Responzivní design

### Breakpointy
- **Desktop (1200px+)**: Plná šířka s maximálním obsahem
- **Tablet (768px-1199px)**: Dvoukolumnový layout
- **Mobile (576px-767px)**: Jednokolumnový layout
- **Small Mobile (<576px)**: Kompaktní zobrazení

### Optimalizace pro mobily
- **Menší písmo** na malých obrazovkách
- **Kompaktní tlačítka** s Bootstrap `btn-sm`
- **Flexbox layout** pro tlačítka v tabulce
- **Responzivní padding** a margin

---

## Bezpečnost

### Backend bezpečnost
- **PDO prepared statements** - Ochrana před SQL injection
- **CORS hlavičky** - Kontrola cross-origin požadavků
- **Validace vstupů** - Kontrola dat před zpracováním
- **Oddělené přihlašovací údaje** - Bezpečné uložení v `login.php`

### Frontend bezpečnost
- **Input validace** - Kontrola uživatelských vstupů
- **Error handling** - Zpracování chybových stavů
- **Type checking** - Kontrola typů dat

---

## Vzdělávací hodnota

### Co se studenti naučí
1. **Komunikace mezi technologiemi** - Jak propojit React s PHP
2. **REST API design** - Návrh a implementace API endpointů
3. **Databázové operace** - CRUD operace s MySQL
4. **Responzivní design** - Adaptivní uživatelské rozhraní
5. **State management** - Správa stavu v React aplikaci
6. **Error handling** - Zpracování chyb a výjimek
7. **Version control** - Práce s Git a .gitignore

### Praktické dovednosti
- **Full-stack vývoj** - Kompletní aplikace od databáze po UI
- **API integrace** - Propojení frontendu s backendem
- **Debugging** - Hledání a opravování chyb
- **Code organization** - Strukturování kódu a komponent
- **Documentation** - Psaní dokumentace projektu

---

## Závěr

Tento projekt demonstruje kompletní full-stack aplikaci s moderními technologiemi. Slouží jako praktické cvičení pro pochopení komunikace mezi frontendem a backendem, implementaci CRUD operací a vytvoření responzivní webové aplikace.

**Vhodné pro:** Studenty programování, začátečníky ve full-stack vývoji, kurzy webových technologií

**Doba realizace:** Celodenní cvičení (6-8 hodin)

**Autor:** Robin Lassak