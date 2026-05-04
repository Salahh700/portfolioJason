# AGENTS.md — Protocole QA Samaritan-Nodali

## RÈGLE SUPRÊME — JAMAIS TESTER À L'AVEUGLE
Tu es une ÉQUIPE DE 20 DEVS SENIORS QA. Pas un script de clic automatique.
UN test = UN screenshot de preuve. TOUJOURS. SANS EXCEPTION.

## STEP 0 — PREPARATION (non-négociable)
```bash
cd C:\Users\salah\OneDrive\Bureau\the-machine\worlds\nodali
python3 inject_brain.py load
```
→ Lire BRAIN.md + blacklist.json + le contexte de la feature à tester
→ Identifier quel(s) rôle(s) Spatie sont concernés par la feature
→ Récupérer les bons credentials dans TEST_CREDENTIALS.md

## STEP 1 — VÉRIFIER QUE L'ENVIRONNEMENT EST PRÊT
```json
POST http://localhost:9876/health
→ {"status": "ok"} obligatoire avant tout
```
```bash
# Vérifier que Laravel tourne
curl http://127.0.0.1:8000
→ Si erreur → dire à JoyBoy "lance php artisan serve"
```

## STEP 2 — VOIR L'ÉTAT ACTUEL (5 sens /see)
```json
POST http://localhost:9876/see
→ Lire les éléments UIAutomation + textes OCR
→ Vérifier que Chrome est ouvert sur http://127.0.0.1:8000
```
Si Chrome n'est pas ouvert sur la bonne URL :
```json
POST http://localhost:9876/do
{"actions": [
    {"type": "hotkey", "keys": ["ctrl", "t"]},
    {"type": "write", "target": "barre d'adresse", "text": "http://127.0.0.1:8000"},
    {"type": "hotkey", "keys": ["enter"]}
]}
```

## STEP 3 — LOGIN avec le bon compte
```json
POST http://localhost:9876/do
{"actions": [
    {"type": "write", "target": "Email", "text": "admin@nodali.test"},
    {"type": "write", "target": "Mot de passe", "text": "password"},
    {"type": "click", "target": "Se connecter"},
    {"type": "wait", "text": "Tableau de bord", "timeout": 8}
]}
```
→ Screenshot OBLIGATOIRE après login pour confirmer le rôle connecté :
```json
POST http://localhost:9876/screenshot
```

## STEP 4 — NAVIGUER VERS LA FEATURE À TESTER
```json
POST http://localhost:9876/do
{"actions": [
    {"type": "click", "target": "Nom du menu"},
    {"type": "wait", "text": "Titre de la page", "timeout": 5}
]}
```
→ Screenshot OBLIGATOIRE pour confirmer la navigation :
```json
POST http://localhost:9876/screenshot
```

## STEP 5 — EXÉCUTER LE TEST (action par action)
- Une action = un appel /do ou /touch
- JAMAIS enchaîner 10 actions sans screenshot intermédiaire
- Après chaque action critique → /screenshot pour preuve
- Si erreur UI visible → /see pour lire l'OCR et identifier le message d'erreur

## STEP 6 — ANALYSER LE RÉSULTAT
Pour chaque test, répondre à ces 3 questions :
1. **Visuel** : L'UI affiche-t-elle ce qui est attendu ? (OCR + screenshot)
2. **Fonctionnel** : La feature fait-elle ce qu'elle doit faire ?
3. **Sécurité** : Un autre rôle pourrait-il accéder à ce qu'il ne devrait pas ?

Si erreur 500 ou comportement anormal :
```bash
# Lire les logs Laravel
type C:\xampp\htdocs\projet-iris\storage\logs\laravel.log | findstr /n "." | tail -50
```

## STEP 7 — CORRIGER SI NÉCESSAIRE
Si bug trouvé :
1. Lire le code concerné avec grep avant de toucher quoi que ce soit
2. Identifier la cause racine (pas juste le symptôme)
3. Corriger chirurgicalement — UN seul fichier à la fois si possible
4. Vérifier qu'Amine n'a pas récemment modifié ce fichier : `git log -1 -- <fichier>`
5. Retester après correction → screenshot de preuve

## STEP 8 — VÉRIFICATION MULTI-RÔLES
Pour chaque feature testée :
- Tester avec le rôle qui DOIT avoir accès → vérifier que ça marche
- Tester avec un rôle qui NE DOIT PAS avoir accès → vérifier que c'est bloqué
- Documenter les résultats (pass/fail) pour chaque rôle

## STEP 9 — SAUVEGARDER EN MÉMOIRE (OBLIGATOIRE après chaque session)
```bash
# Créer le payload de save
# Le fichier /tmp/nodali_save_payload.json DOIT contenir :
{
  "feature": "nom_de_la_feature_testée",
  "description": "Description DÉTAILLÉE de ce qui a été testé et résultat",
  "status": "SUCCESS ou FAIL ou PARTIAL",
  "roles_tested": ["admin", "professeur"],
  "bugs_found": ["description du bug 1", "description du bug 2"],
  "bugs_fixed": ["description du fix 1"],
  "lessons": "Ce que j'ai appris de cette session",
  "semantic_updates": {
    "clé_du_fait": "valeur apprise sur Nodali"
  },
  "procedure_updates": {
    "clé_procedure": "procédure apprise"
  }
}

python3 inject_brain.py save
```

RÈGLES :
- semantic_updates OBLIGATOIRE = faits permanents appris sur Nodali
- procedure_updates OBLIGATOIRE = nouvelles méthodes de test apprises
- blacklist_entry = seulement si une approche a ÉCHOUÉ définitivement
- Si tu saves sans ces champs → save BÂCLÉ, recommencer

## STEP 10 — RÉSUMÉ POUR JOYBOY
À la fin de chaque session, présenter :
1. Features testées ✅
2. Bugs trouvés 🐛 (avec description + screenshot)
3. Bugs corrigés ✅ (avec description du fix)
4. Features non testées (pour la prochaine session)
5. Recommandations prioritaires

---

## HIÉRARCHIE DE VITESSE — 5 SENS

1. `/do` pour 2+ actions — PRIORITÉ (1 appel = N gestes)
2. `/touch` ou `/write` pour geste isolé
3. `/sense` pour contexte global (apps ouvertes, réseau)
4. `/screenshot` pour vérification visuelle AVANT/APRÈS (obligatoire à chaque étape critique)
5. `/see` pour lire l'arbre UI complet + OCR
6. Terminal (grep, type, findstr) — 0 token
7. Bash direct — DERNIER RECOURS si daemon crash

## WORKFLOW DE TEST — DEV SENIOR PAS QA JUNIOR

### Test fonctionnel (clic, formulaire, navigation) :
1. /see → connaître l'état initial
2. /do → exécuter les actions
3. /screenshot → capturer le résultat
4. Analyser OCR → bug ou succès ?
5. TOTAL : 3-4 appels max

### Test de sécurité (permissions par rôle) :
1. Login avec rôle non autorisé
2. Tenter d'accéder à la feature
3. /screenshot → vérifier que l'accès est bien refusé (403 ou redirect)
4. TOTAL : 2-3 appels max

### Login (~1s local, 1 appel /do) :
```json
POST http://localhost:9876/do
{"actions": [
    {"type": "write", "target": "Email", "text": "COMPTE_DU_ROLE"},
    {"type": "write", "target": "Mot de passe", "text": "MOT_DE_PASSE"},
    {"type": "click", "target": "Se connecter"},
    {"type": "wait", "text": "Tableau de bord", "timeout": 8}
]}
```
- JAMAIS deviner les credentials — ils sont dans TEST_CREDENTIALS.md
- JAMAIS tester sur nodali.fr — TOUJOURS http://127.0.0.1:8000

## DÉFINITION OF DONE
1. Feature testée avec le(s) bon(s) rôle(s)
2. Screenshot de preuve (succès ou échec) dans samaritan_eyes/
3. Logs Laravel vérifiés (aucune erreur silencieuse)
4. Test multi-rôles effectué (accès autorisé ET refusé)
5. Mémoire 4 couches sauvegardée avec description détaillée
6. JoyBoy a été informé du résultat

## INTERDICTIONS ABSOLUES
- JAMAIS tester sur nodali.fr
- JAMAIS dire "c'est testé" sans screenshot comme preuve
- JAMAIS passer à la feature suivante sans inject_brain.py save
- JAMAIS git push — JoyBoy pousse lui-même
- JAMAIS modifier une migration existante — créer une nouvelle si besoin
- JAMAIS laisser des données de test en base sans les nettoyer après
