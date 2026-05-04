# BRAIN.md — Mémoire de Samaritan-Nodali
# Auto-généré par inject_brain.py — NE PAS MODIFIER MANUELLEMENT
# Dernière mise à jour : Avril 2026

## APPROCHES MORTES (blacklist — NE JAMAIS retester)
- (aucune pour l'instant — sera alimenté au fil des sessions)

## PROCÉDURES APPRISES
- **boot_check**: TOUJOURS vérifier /health puis http://127.0.0.1:8000 avant tout test
- **login_pattern**: Utiliser /do avec 4 actions (write email + write mdp + click login + wait dashboard) — 1 seul appel
- **log_laravel**: En cas d'erreur 500 → lire storage/logs/laravel.log immédiatement
- **grep_avant_modif**: TOUJOURS grep le fichier avant de le modifier — comprendre avant de toucher
- **test_multi_role**: Chaque feature = tester avec rôle autorisé ET rôle non autorisé
- **screenshot_preuve**: Chaque étape critique = screenshot dans samaritan_eyes/ comme preuve
- **amine_check**: Avant de modifier un fichier → git log -1 -- <fichier> pour voir si Amine a récemment commité dessus

## FAITS SÉMANTIQUES (connaissances permanentes sur Nodali)

### Architecture
- **stack_backend**: Laravel 12 / PHP 8.2 / MySQL 8.0
- **stack_frontend**: React 18 + Vite 7 + TanStack React Query v5 + React Router v7 + Tailwind CSS v4
- **auth**: Laravel Sanctum — token Bearer dans localStorage
- **roles**: Spatie Laravel Permission v6 — 9 rôles (super_admin, admin, proviseur, secretaire, professeur, cpe, etudiant, parent, technicien_it)
- **websocket**: Laravel Reverb
- **css**: Tailwind CSS v4 via @tailwindcss/vite

### Environnement
- **url_local**: http://127.0.0.1:8000
- **url_prod**: https://nodali.fr (lecture seule, jamais tester ici)
- **daemon_port**: http://localhost:9876 (windows_daemon.py)
- **projet_path**: C:\xampp\htdocs\projet-iris
- **world_path**: C:\Users\salah\OneDrive\Bureau\the-machine\worlds\nodali
- **logs_path**: C:\xampp\htdocs\projet-iris\storage\logs\laravel.log

### Équipe
- **pilote**: JoyBoy (Salah Arroum) — décide et pousse sur GitHub
- **co_dev**: Amine Djermani — code en parallèle sur le même repo main
- **rule_git**: JAMAIS git push — JoyBoy fait ça lui-même

### Infra prod (NE PAS TOUCHER)
- **vps**: Ubuntu 22.04, Nginx, PHP 8.2-FPM
- **cicd**: GitHub Actions → SSH VPS

## HISTORIQUE PAR FEATURE
- (sera alimenté au fil des sessions de test)

## PROCHAINE FEATURE À TESTER
- Définie par JoyBoy en début de session — Samaritan n'initialise rien seul
