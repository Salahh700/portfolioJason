# TOOLS.md — Arsenal Samaritan-Nodali

## Répertoires projet
- World dir     : C:\Users\salah\OneDrive\Bureau\the-machine\worlds\nodali
- Projet Laravel: C:\xampp\htdocs\projet-iris
- Logs Laravel  : C:\xampp\htdocs\projet-iris\storage\logs\laravel.log
- Screenshots   : C:\Users\salah\OneDrive\Bureau\the-machine\worlds\nodali\samaritan_eyes\
- Credentials   : TEST_CREDENTIALS.md (Bureau JoyBoy)

## URLs
- Test local    : http://127.0.0.1:8000
- Prod (lecture): https://nodali.fr
- Daemon 5 sens : http://localhost:9876

---

## Laravel / PHP (depuis C:\xampp\htdocs\projet-iris)

### Développement
```bash
php artisan serve                        # Lancer le serveur (port 8000)
php artisan route:list                   # Lister toutes les routes
php artisan route:list --name=planning   # Filtrer par nom
php artisan tinker                       # REPL Laravel interactif
```

### Base de données
```bash
php artisan migrate                      # Lancer les migrations
php artisan migrate:status               # État des migrations
php artisan db:seed                      # Lancer les seeders
php artisan db:seed --class=NomSeeder    # Seeder spécifique
php artisan migrate:rollback             # Rollback DERNIÈRE migration (avec prudence)
```

### Cache & Config
```bash
php artisan config:clear                 # Vider le cache config
php artisan route:clear                  # Vider le cache routes
php artisan cache:clear                  # Vider le cache app
php artisan optimize:clear               # Tout vider
```

### Debug
```bash
# Lire les dernières lignes du log Laravel
type C:\xampp\htdocs\projet-iris\storage\logs\laravel.log
# Chercher les erreurs récentes
findstr /n "ERROR\|CRITICAL\|Exception" C:\xampp\htdocs\projet-iris\storage\logs\laravel.log
```

### Tests Laravel
```bash
php artisan test                         # Tous les tests
php artisan test --filter NomDuTest      # Test spécifique
php artisan test --group=auth            # Tests par groupe
```

---

## React / Node (depuis C:\xampp\htdocs\projet-iris)

### Développement
```bash
npm run dev                              # Lancer Vite (port 5173 probablement)
npm run build                            # Build de production
npm run preview                          # Preview du build
```

### Analyse
```bash
npm run lint                             # ESLint
```

---

## 5 SENS — Windows Daemon (http://localhost:9876)

### /health — Vérification daemon
```bash
curl -X POST http://localhost:9876/health -H "Content-Type: application/json" -d "{}"
→ {"status":"ok","busy":false,...}
```

### /see — VUE (UIAutomation + OCR)
```bash
curl -X POST http://localhost:9876/see -H "Content-Type: application/json" -d "{}"
→ {"elements": [...], "texts": [...]}
→ 44+ éléments UI + 395+ textes OCR
```

### /touch — TOUCHER
```bash
# Clic par texte
curl -X POST http://localhost:9876/touch -H "Content-Type: application/json" \
  -d "{\"action\": \"click\", \"target\": \"Se connecter\"}"

# Clic par coordonnées
curl -X POST http://localhost:9876/touch -H "Content-Type: application/json" \
  -d "{\"action\": \"click\", \"x\": 920, \"y\": 400}"

# Raccourci clavier
curl -X POST http://localhost:9876/touch -H "Content-Type: application/json" \
  -d "{\"action\": \"hotkey\", \"keys\": [\"ctrl\", \"r\"]}"
```

### /write — ÉCRITURE
```bash
curl -X POST http://localhost:9876/write -H "Content-Type: application/json" \
  -d "{\"target\": \"Email\", \"text\": \"admin@nodali.test\"}"
```

### /sense — ODORAT + OUÏE
```bash
curl -X POST http://localhost:9876/sense -H "Content-Type: application/json" -d "{}"
→ apps ouvertes, souris, réseau, presse-papiers, écran actif
```

### /do — MAINS RAPIDES (PRIORITÉ pour 2+ actions)
```bash
curl -X POST http://localhost:9876/do -H "Content-Type: application/json" -d "{
  \"actions\": [
    {\"type\": \"write\", \"target\": \"Email\", \"text\": \"admin@nodali.test\"},
    {\"type\": \"write\", \"target\": \"Mot de passe\", \"text\": \"password\"},
    {\"type\": \"click\", \"target\": \"Se connecter\"},
    {\"type\": \"wait\", \"text\": \"Tableau de bord\", \"timeout\": 8}
  ]
}"
```

### /screenshot — VISION
```bash
curl -X POST http://localhost:9876/screenshot -H "Content-Type: application/json" -d "{}"
→ Screenshot sauvegardé dans samaritan_eyes/live.png
→ Lire avec: type samaritan_eyes\live.png (ou voir dans l'explorateur)
```

### /clear — RESET CACHE
```bash
curl -X POST http://localhost:9876/clear -H "Content-Type: application/json" -d "{}"
```

---

## Git (depuis C:\xampp\htdocs\projet-iris)

### Lecture seule (autorisé)
```bash
git status                               # État des fichiers modifiés
git log --oneline -10                    # 10 derniers commits
git log -1 -- <fichier>                  # Dernier commit sur un fichier
git diff                                 # Voir les modifications non commitées
git branch -a                            # Lister les branches
```

### INTERDIT sans validation JoyBoy
```bash
# git push          → INTERDIT
# git commit        → INTERDIT sans validation
# git merge         → INTERDIT
# git rebase        → INTERDIT
# git reset --hard  → INTERDIT
```

---

## Grep & Lecture de code (Windows)

### Chercher dans le code
```bash
# Chercher une string dans tous les fichiers PHP
findstr /s /n "nomDeLaClasse" C:\xampp\htdocs\projet-iris\app\*.php

# Chercher dans les routes
findstr /n "planning" C:\xampp\htdocs\projet-iris\routes\api.php
findstr /n "planning" C:\xampp\htdocs\projet-iris\routes\web.php

# Chercher une méthode dans les controllers
findstr /s /n "public function" C:\xampp\htdocs\projet-iris\app\Http\Controllers\*.php

# Chercher les middlewares sur une route
findstr /s /n "middleware" C:\xampp\htdocs\projet-iris\routes\*.php
```

### Lire des fichiers
```bash
type C:\xampp\htdocs\projet-iris\app\Http\Controllers\NomController.php
type C:\xampp\htdocs\projet-iris\routes\api.php
type C:\xampp\htdocs\projet-iris\app\Models\NomModel.php
```

---

## Scripts Python — Mémoire 4 couches
(depuis C:\Users\salah\OneDrive\Bureau\the-machine\worlds\nodali)

```bash
python3 inject_brain.py load             # Charger la mémoire → BRAIN.md
python3 inject_brain.py save             # Sauvegarder la session courante
# Payload dans /tmp/nodali_save_payload.json avant de sauvegarder
```

---

## Structure Nodali — Carte rapide

### Backend Laravel
```
app/
├── Http/
│   ├── Controllers/    ← Logique des endpoints
│   ├── Middleware/     ← Auth, rôles, CORS
│   └── Requests/       ← Validation des inputs
├── Models/             ← Eloquent (User, Classe, Cours, Planning...)
├── Policies/           ← Autorisations par modèle
└── Services/           ← Logique métier complexe
database/
├── migrations/         ← Schéma DB (NE PAS MODIFIER les existantes)
└── seeders/            ← Données de test
routes/
├── api.php             ← Routes API (Sanctum)
└── web.php             ← Routes web
```

### Frontend React
```
src/
├── components/         ← Composants réutilisables
├── pages/              ← Pages par feature
├── hooks/              ← Hooks custom (useAuth, usePlanning...)
├── services/           ← Appels API (axios)
└── store/              ← State management (TanStack Query)
```

### Rôles Spatie — accès rapide
| Rôle          | Peut faire                                      |
|---------------|-------------------------------------------------|
| super_admin   | TOUT                                            |
| admin         | Gérer son école complètement                    |
| proviseur     | Lire tout, valider admissions                   |
| secretaire    | Admissions, profils, absences, stages           |
| professeur    | Ses cours, ses classes, ses élèves              |
| cpe           | Absences, conseils de classe                    |
| etudiant      | Ses propres données                             |
| parent        | Données de son/ses enfant(s)                    |
| technicien_it | Tickets IT                                      |
