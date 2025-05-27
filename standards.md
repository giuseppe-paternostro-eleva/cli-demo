# Front-End Standards

Questo documento definisce lo standard tecnico e organizzativo da seguire per i progetti front-end di Eleva.
L’obiettivo è garantire **consistenza, qualità, scalabilità** e **facilità di manutenzione** nel tempo.

---

## Stack Tecnologico

| Area              | Scelta Tecnologica                |
| ----------------- | --------------------------------- |
| Package Manager   | Yarn                              |
| Framework         | React (Vite) / Next.js            |
| Styling           | Tailwind CSS                      |
| CSS Scope         | `module.scss` (per override/mix)  |
| Linguaggio        | TypeScript                        |
| Routing           | React Router / File-based (Next)  |
| State Management  | Redux Toolkit / Context API       |
| Forms             | React Hook Form + Zod             |
| HTTP Client       | Axios                             |
| Auth              | AWS Amplify                       |
| Traduzioni (i18n) | i18next / next-i18next            |
| Alias Import      | Sì (`@components`, `@hooks`, ...) |
| Testing           | Non previsto (per ora)            |

---

## Struttura delle Cartelle

Struttura base da mantenere, con piccole varianti in base al framework:

```
src/
├── assets/            # Immagini, icone, font
├── components/        # Componenti riutilizzabili
│   ├── NomeComponente/
│   │   ├── NomeComponente.tsx
│   │   ├── NomeComponente.module.scss
│   │   └── NomeComponente.types.ts
├── hooks/             # Custom React Hooks
├── utils/             # Funzioni di utilità generali
├── pages o routes/    # da valutare sia per react che per next
├── store/             # Redux slices
├── auth/              # Gestione autenticazione (Amplify)
├── meta/              # Gestione dei metatag (solo next e opzionale)
├── constants/         # Dove inserire costanti come colori, dati dell'applicativo ecc
├── interface/         # Dove inserire i type e le interface riutilizzabili nel progetto
├── mock/              # Opzionale
├── service/           # nel caso in cui bisogna impostare chiamate extra
├── config/            # Configurazioni globali (env, axios, i18n, etc)
└── App.tsx / layout.tsx
```

---

## Convenzioni Generali

### Nomenclatura (pascalCase,camelCase,kebakCase ecc)

* per nomi di componenti (`UserCard.tsx`)
*  per nomi di variabili e funzioni
*  per nomi di file `.scss` o asset
* `use` prefix per hook (`useForm`, `useFetchData`)

### Componenti

* Un componente → una cartella (`ComponentName/`)
* Ogni componente deve avere:

  * `.tsx`: il componente React
  * `.module.scss o .scss`: stile scoped 
  * `.d.ts`: i tipi per le props

### Import Path

Usiamo alias configurati:

```ts
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
```

Alias supportati:

* `@components`
* `@hooks`
* `@utils`
* `@store`
* `@auth`

---
### State Management

- Redux Toolkit è la soluzione consigliata per applicazioni con stato globale complesso.
- Tutta la logica asincrona (API call, side effects) deve essere gestita tramite **Redux Thunk**.
- I thunk sono definiti separatamente nei rispettivi slice o nella cartella `store/thunks`.
- I componenti UI non devono effettuare chiamate dirette a servizi, ma solo **dispatchare thunk**.

---
### Stato Globale e API

Utilizziamo Redux Toolkit con Redux Thunk per gestire lo stato e le chiamate asincrone.

- Tutte le API vengono chiamate all'interno di thunk (non nei componenti).
- La UI interagisce con lo stato globale tramite `dispatch()` e `useSelector()`.
- Ogni feature ha il proprio slice e file thunks dedicato.

---

## Traduzioni (i18n)

* Utilizziamo `i18next` per React e `next-i18next` per Next
* Le lingue supportate di default sono `it` e `en`
* I file delle traduzioni si trovano in `src/locales/<lang>/common.json`
* Le chiavi devono essere in `camelCase`
* Le stringhe non devono essere hardcodate nei componenti

---

## Autenticazione

* Utilizziamo AWS Amplify come provider di autenticazione
* La configurazione si trova in `src/auth/amplifyConfig.ts`
* Lo stato di autenticazione deve essere gestito tramite context o Redux (?)

---

## Chiamate API

* Axios è il client HTTP di riferimento
* Tutte le chiamate passano da un’istanza Axios configurata in `src/config/axios.ts`
* Usare interceptor per gestione token e errori globali
* Evitare fetch diretti nei componenti

---

## Quando usare React o Next.js?

### React (Vite)

Utilizzare quando:

* Si sta sviluppando una SPA (Single Page App)
* L’applicazione non richiede SEO
* Serve massima velocità in ambienti dinamici (dashboard, admin, app interne)
* Il progetto è client-side only

### Next.js

Utilizzare quando:

* Il SEO è importante (landing, blog, e-commerce)
* Servono funzionalità SSR o SSG
* L’app è pubblica e il caricamento iniziale è fondamentale
* Serve una struttura fullstack 

#### SSG (Static Site Generation)

Utilizzare SSG quando:

* I dati cambiano raramente (es. blog post, prodotti e-commerce)
* Serve massima velocità e tempi di risposta istantanei
* Il contenuto può essere pre-renderizzato al build time

####  SSR (Server Side Rendering)

Utilizzare SSR quando:

* I dati cambiano spesso e devono essere aggiornati ad ogni richiesta
* Serve mostrare contenuto personalizzato in base all’utente/logica server
* SEO è importante ma i dati sono dinamici (es. profili utenti, pagine con token URL)

---

##  CLI Interno

Nel caso in cui decideremo di implementarlo avremmo un CLI generativo custom:

```bash
noemCLi-cli generate component Nome
noemCLi-cli generate page Nome
noemCLi-cli generate hook useNome
```

Permette di generare automaticamente struttura, file e boilerplate coerente.

> Riduce errori, accelera il flusso e rende l'onboarding più semplice.

---

##  In lavorazione

- [ ] Documentazione completa CLI
- [ ] Esempi d’uso per ogni comando
- [ ] Linee guida avanzate se necessariio
- [ ] Suggerimenti per naming pattern redux slice
- [ ] Integrazioni future (todo list)