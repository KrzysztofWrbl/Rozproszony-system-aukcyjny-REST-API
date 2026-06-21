# Rozproszony System Aukcyjny REST API

Opis projektu

Rozproszony System Aukcyjny to aplikacja internetowa umożliwiająca:

* rejestrację użytkowników,
* logowanie z wykorzystaniem JWT,
* tworzenie aukcji,
* składanie ofert w aukcjach,
* przeglądanie danych aukcji.

Projekt został zrealizowany w technologii ASP.NET Core, Entity Framework Core, PostgreSQL oraz React.


Technologie

Backend:

* ASP.NET Core
* Entity Framework Core
* JWT Authentication
* BCrypt Password Hashing

Baza danych:

* PostgreSQL

Frontend:

* React
* Vite
* TypeScript


Wymagania:

Przed uruchomieniem projektu należy zainstalować:

* .NET SDK 10
* PostgreSQL 18 (lub nowszy)
* Node.js

Konfiguracja bazy danych:

Projekt domyślnie wykorzystuje połączenie:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=auctiondb;Username=postgres;Password=postgres"
}
```

Utworzenie bazy danych (Po instalacji PostgreSQL):

powershell:
createdb -U postgres auctiondb


lub

powershell:
"C:\Program Files\PostgreSQL\18\bin\createdb.exe" -U postgres auctiondb


Migracje

W katalogu projektu wykonaj:

powershell:
dotnet ef database update --project .\Rozproszony_System_Aukcyjny_REST_API\Rozproszony_System_Aukcyjny_REST_API.Server\


Migracja utworzy wszystkie wymagane tabele.

Uruchomienie backendu:

Przejdź do katalogu projektu:

powershell:
cd Rozproszony_System_Aukcyjny_REST_API


Uruchom aplikację:

powershell:
dotnet run --project .\Rozproszony_System_Aukcyjny_REST_API.Server\


Domyślnie aplikacja uruchamia się pod adresem:

http://localhost:5044


Endpointy API

test API:


GET /api/auth/test


1.Rejestracja

http POST /api/auth/register


Przykładowe body (json):

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test123!"
}


2.Logowanie:

http POST /api/auth/login


Przykładowe body (json):

{
  "email": "test@example.com",
  "password": "Test123!"
}


Odpowiedź:

{
  "token": "JWT_TOKEN"
}


3.Profil użytkownika:

Wymaga tokenu JWT.

http GET /api/auth/profile


Nagłówek:

http Authorization: Bearer JWT_TOKEN


4.Tworzenie aukcji:

Wymaga tokenu JWT.

http POST /api/auctions


5.Pobranie aukcji:

http GET /api/auctions/{id}

6.Złożenie oferty:

Wymaga tokenu JWT.

http POST /api/auctions/{id}/bidsStruktura projektu


Rozproszony_System_Aukcyjny_REST_API
│
├── Rozproszony_System_Aukcyjny_REST_API.Server
│   ├── Controllers
│   ├── Data
│   ├── DTOs
│   ├── Models
│   ├── Migrations
│   └── Program.cs
│
└── rozproszony_system_aukcyjny_rest_api.client
    ├── src
    ├── public
    └── vite.config.ts


Uwierzytelnianie:

Projekt wykorzystuje JWT (JSON Web Token).

Proces logowania:

1. Użytkownik loguje się przez `/api/auth/login`.
2. API zwraca token JWT.
3. Frontend zapisuje token.
4. Token jest przesyłany w nagłówku:

http Authorization: Bearer <token>


dla wszystkich chronionych endpointów.

Status projektu

Zaimplementowane:

* rejestracja użytkowników,
* logowanie JWT,
* profile użytkowników,
* tworzenie aukcji,
* składanie ofert,
* relacje i migracje PostgreSQL.

Projekt wymaga działającej instancji PostgreSQL oraz wykonania migracji przed pierwszym uruchomieniem.



Autorzy i zakres odpowiedzialności

Krzysztof Wróblewski

Backend i logika biznesowa

Zakres prac:

* konfiguracja aplikacji ASP.NET Core,
* konfiguracja Entity Framework Core,
* konfiguracja połączenia z PostgreSQL,
* implementacja logiki biznesowej systemu aukcyjnego,
* implementacja uwierzytelniania JWT,
* implementacja autoryzacji użytkowników,
* integracja aplikacji z bazą danych,
* konfiguracja middleware oraz usług aplikacyjnych,
* przygotowanie i integracja warstwy serwerowej.


Marcin Wyrzykowski

API

Zakres prac:

* implementacja endpointów REST API,
* obsługa żądań HTTP,
* przygotowanie kontrolerów aplikacji,
* implementacja operacji związanych z użytkownikami, aukcjami i ofertami,
* przygotowanie komunikacji pomiędzy frontendem a backendem.


Magda Zakrzewska

Baza danych

Zakres prac:

* projekt modelu danych,
* przygotowanie encji systemowych,
* projekt relacji pomiędzy tabelami,
* konfiguracja ograniczeń i integralności danych,
* przygotowanie migracji Entity Framework Core.


Katarzyna Sukiennik

Frontend

Zakres prac:

* przygotowanie interfejsu użytkownika,
* implementacja widoków aplikacji,
* konfiguracja projektu React/Vite,
* integracja frontendu z API,
* obsługa formularzy oraz komunikacji z backendem.



Weryfikacja działania projektu - Krzysztof Wróblewski:

Projekt został uruchomiony i zweryfikowany lokalnie:

- uruchomienie aplikacji ASP.NET Core,
- konfiguracja i uruchomienie PostgreSQL,
- wykonanie migracji Entity Framework Core,
- rejestracja użytkownika,
- logowanie użytkownika,
- generowanie tokenów JWT,
- autoryzacja użytkowników przy użyciu JWT,
- komunikacja z bazą danych PostgreSQL.

Przeprowadzone testy potwierdziły poprawne działanie backendu, bazy danych oraz mechanizmu uwierzytelniania JWT.


