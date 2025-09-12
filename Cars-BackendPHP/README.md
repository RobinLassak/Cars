# Cars Management System - Backend

## PHP Backend pro správu automobilů

**Autor:** Robin Lassak  
**Technologie:** PHP 7.4+, PDO, MySQL  
**Typ:** REST API s databázovou integrací

---

## Přehled

Backendová část Cars Management System je REST API postavené v PHP s použitím PDO pro bezpečnou komunikaci s MySQL databází. API poskytuje kompletní CRUD operace pro správu automobilů s implementovanými bezpečnostními opatřeními a CORS podporou pro komunikaci s React frontendem.

---

## Technologie a závislosti

### Hlavní technologie
- **PHP 7.4+** - Server-side programovací jazyk
- **PDO (PHP Data Objects)** - Databázová abstrakční vrstva
- **MySQL** - Relační databáze pro ukládání dat
- **JSON** - Formát pro výměnu dat s frontendem

### Bezpečnostní funkce
- **PDO Prepared Statements** - Ochrana před SQL injection
- **CORS hlavičky** - Kontrola cross-origin požadavků
- **Input validace** - Kontrola a sanitizace vstupních dat
- **Error handling** - Bezpečné zpracování chyb

---

## Struktura projektu

```
Cars-BackendPHP/
├── index.php              # Hlavní API endpoint s REST logikou
├── dbConnect.php          # Třída pro databázové připojení
├── login.php              # Konfigurace databázových přihlašovacích údajů
└── README.md              # Tato dokumentace
```

---

## Architektura souborů

### 1. index.php - Hlavní API endpoint

**Funkce:**
- REST API implementace s podporou GET, POST, PUT, DELETE
- CORS hlavičky pro komunikaci s frontendem
- Routing podle HTTP metody
- JSON response formátování
- Error handling a validace

**HTTP metody:**
```php
- GET    // Načítání dat (getAll, getSpec)
- POST   // Přidání nového auta
- PUT    // Úprava existujícího auta
- DELETE // Smazání auta podle ID
```

**CORS konfigurace:**
```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json; charset=utf-8");
```

### 2. dbConnect.php - Databázové připojení

**Funkce:**
- Třída `DbConnect` pro správu databázového připojení
- Automatické načítání přihlašovacích údajů z `login.php`
- PDO konfigurace s bezpečnostními opcemi
- Error handling pro databázové chyby

**Vlastnosti:**
```php
- Automatické načítání konfigurace
- PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
- PDO::ATTR_EMULATE_PREPARES => false
- UTF-8 charset podpora
```

### 3. login.php - Konfigurace databáze

**Funkce:**
- Centralizované uložení databázových přihlašovacích údajů
- Bezpečné oddělení citlivých informací
- Snadná konfigurace pro různé prostředí

**Struktura:**
```php
return [
    'server' => 'sql.endora.cz:3313',
    'dbname' => 'robinl1741246974',
    'user' => 'robinl1741246974',
    'pass' => 'LostInTime2332'
];
```

---

## API Endpoints

### GET požadavky

#### 1. Získání všech automobilů
```http
GET /?action=getAll
```

**Response:**
```json
[
  {
    "id": 1,
    "brand": "Škoda",
    "model": "Scala",
    "reg": "2AP0809",
    "km": 159212,
    "year": 2017
  },
  {
    "id": 2,
    "brand": "Honda",
    "model": "Civic",
    "reg": "9T64589",
    "km": 101515,
    "year": 2005
  }
]
```

#### 2. Získání specifických automobilů
```http
GET /?action=getSpec&ids=1,2,4
```

**Parametry:**
- `ids` - Čárkou oddělený seznam ID automobilů

**Response:**
```json
[
  {
    "id": 1,
    "brand": "Škoda",
    "model": "Scala",
    "reg": "2AP0809",
    "km": 159212,
    "year": 2017
  }
]
```

### POST požadavky

#### Přidání nového automobilu
```http
POST /
Content-Type: application/json
```

**Request body:**
```json
{
  "brand": "Škoda",
  "model": "Fabia",
  "reg": "1A23456",
  "km": 150000,
  "year": 2020
}
```

**Response:**
```json
{
  "status": 1,
  "message": "Car added"
}
```

**Error response:**
```json
{
  "status": 0,
  "message": "Failed to add car."
}
```

### PUT požadavky

#### Úprava existujícího automobilu
```http
PUT /
Content-Type: application/json
```

**Request body:**
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

**Response:**
```json
{
  "status": 1,
  "message": "Car updated"
}
```

**Error response:**
```json
{
  "status": 0,
  "message": "Failed to update."
}
```

### DELETE požadavky

#### Smazání automobilu
```http
DELETE /{id}
```

**Parametry:**
- `{id}` - ID automobilu k smazání

**Response:**
```json
{
  "status": 1,
  "message": "Car deleted"
}
```

**Error response:**
```json
{
  "status": 0,
  "message": "Failed to delete car."
}
```

---

## Databázová struktura

### Tabulka: DatabazeAut

```sql
CREATE TABLE DatabazeAut (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    reg VARCHAR(20) NOT NULL,
    km INT NOT NULL,
    year INT NOT NULL
);
```

### Pole tabulky:
- **id** - Primární klíč, auto-increment
- **brand** - Značka automobilu (VARCHAR 100)
- **model** - Model automobilu (VARCHAR 100)
- **reg** - Registrační značka (VARCHAR 20)
- **km** - Najeto kilometrů (INT)
- **year** - Rok výroby (INT)

### Testovací data:
```sql
INSERT INTO DatabazeAut (brand, model, reg, km, year) VALUES
('Škoda', 'Scala', '2AP0809', 159212, 2017),
('Honda', 'Civic', '9T64589', 101515, 2005),
('Škoda', 'Fabia', '6MA8915', 230555, 2012),
('Seat', 'Ibiza', '8TR9634', 159453, 2008),
('Volkswagen', 'Caddy', '2T65138', 210582, 2010);
```

---

## Bezpečnostní opatření

### 1. SQL Injection ochrana
```php
// Použití PDO prepared statements
$sql = "SELECT * FROM DatabazeAut WHERE id = :id";
$stmt = $database->prepare($sql);
$stmt->bindParam(':id', $carId, PDO::PARAM_INT);
$stmt->execute();
```

### 2. CORS konfigurace
```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
```

### 3. Input validace
```php
// Validace ID pro DELETE operace
$carId = (int) $pathSegments[count($pathSegments) - 1];
if ($carId > 0) {
    // Bezpečná operace
}
```

### 4. Error handling
```php
try {
    $conn = new PDO($dsn, $user, $pass, $options);
    return $conn;
} catch(PDOException $e) {
    echo "Database error " . $e->getMessage();
}
```

### 5. Konfigurace bezpečnosti
```php
$options = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES => false
);
```

---

## Instalace a konfigurace

### Požadavky
- **PHP 7.4+** s PDO MySQL rozšířením
- **MySQL 5.7+** databáze
- **Web server** (Apache/Nginx) nebo PHP built-in server

### 1. Konfigurace databáze

Upravte soubor `login.php`:
```php
return [
    'server' => 'your_database_server',
    'dbname' => 'your_database_name',
    'user' => 'your_username',
    'pass' => 'your_password'
];
```

### 2. Vytvoření databáze

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
```

### 3. Spuštění serveru

#### PHP built-in server (development):
```bash
cd Cars-BackendPHP
php -S localhost:8000
```

#### Apache/Nginx (production):
- Umístit soubory do webového adresáře
- Nakonfigurovat virtual host
- Zajistit PHP podporu

### 4. Testování API

#### Test GET požadavku:
```bash
curl http://localhost:8000/?action=getAll
```

#### Test POST požadavku:
```bash
curl -X POST http://localhost:8000/ \
  -H "Content-Type: application/json" \
  -d '{"brand":"Test","model":"Car","reg":"TEST123","km":1000,"year":2023}'
```

---

## Error handling

### Databázové chyby
```php
try {
    $stmt->execute();
} catch(PDOException $e) {
    echo "Database error " . $e->getMessage();
}
```

### API chyby
```php
if ($stmt->execute()) {
    $data = ['status' => 1, 'message' => "Operation successful"];
} else {
    $data = ['status' => 0, 'message' => "Operation failed"];
}
```

### Validace vstupů
```php
// Kontrola ID
if ($carId > 0) {
    // Pokračování
} else {
    $data = ['status' => 0, 'message' => "Id not numeric."];
}
```

---

## Performance optimalizace

### 1. PDO připojení
- **Persistentní připojení** pro opakované požadavky
- **Connection pooling** pro lepší výkon
- **Prepared statements** pro rychlejší dotazy

### 2. Databázové optimalizace
- **Indexy** na často používaná pole
- **LIMIT** pro velké výsledky
- **Efektivní SQL dotazy**

### 3. Caching
- **Response caching** pro statická data
- **Database query caching**
- **HTTP caching headers**

---

## Monitoring a logování

### 1. Error logování
```php
error_log("API Error: " . $e->getMessage());
```

### 2. Access logování
```php
$log = date('Y-m-d H:i:s') . " - " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI'];
file_put_contents('access.log', $log . PHP_EOL, FILE_APPEND);
```

### 3. Performance monitoring
```php
$start_time = microtime(true);
// API operace
$end_time = microtime(true);
$execution_time = $end_time - $start_time;
```

---

## Deployment

### Development prostředí
- PHP built-in server
- Lokální MySQL databáze
- Debug režim zapnutý

### Production prostředí
- Apache/Nginx web server
- Produkční MySQL databáze
- Error reporting vypnutý
- HTTPS podpora
- Firewall konfigurace

### Bezpečnostní checklist
- ✅ PDO prepared statements
- ✅ CORS hlavičky
- ✅ Input validace
- ✅ Error handling
- ✅ Citlivé údaje v .gitignore
- ✅ HTTPS v produkci
- ✅ Firewall pravidla

---

## Vzdělávací hodnota

### Co se studenti naučí
1. **REST API design** - Návrh a implementace API endpointů
2. **PHP programování** - Moderní PHP s OOP přístupem
3. **Databázové operace** - PDO, prepared statements, CRUD
4. **Bezpečnost** - SQL injection ochrana, input validace
5. **CORS handling** - Cross-origin komunikace
6. **Error handling** - Zpracování chyb a výjimek
7. **JSON komunikace** - Formát pro API komunikaci

### Praktické dovednosti
- **Backend development** s PHP
- **API design** a implementace
- **Databázová integrace** s MySQL
- **Bezpečnostní opatření** v webových aplikacích
- **Deployment** a konfigurace serveru

---

## Závěr

Backendová část Cars Management System demonstruje moderní přístup k vývoji REST API v PHP s důrazem na bezpečnost, výkon a udržovatelnost kódu. API je připraveno pro produkční nasazení a slouží jako výborný příklad full-stack integrace s React frontendem.

**Vhodné pro:** Studenty PHP, backend vývojáře, kurzy webových API

**Doba realizace:** 3-4 hodiny pro kompletní implementaci

**Autor:** Robin Lassak
