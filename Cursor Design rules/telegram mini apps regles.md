# Telegram Mini‑Apps — Règles UI essentielles (sans étouffer votre style)

Ce guide compile **uniquement** des règles issues des **docs officielles Telegram** pour éviter les chevauchements avec l’UI Telegram (bouton **Close**, menu, etc.) tout en gardant votre identité visuelle.

---

## 1) Safe Areas : la règle #1

- **Toujours caler l’UI dans les zones sûres** pour éviter tout recouvrement avec les contrôles Telegram :
  - Docs : https://core.telegram.org/bots/webapps
- **Utiliser les insets fournis par Telegram** :
  - `web_app_request_content_safe_area` → Telegram émet `content_safe_area_changed` 
    - Méthode : https://docs.telegram-mini-apps.com/platform/methods#web_app_request_content_safe_area
    - Événement : https://docs.telegram-mini-apps.com/platform/events#content_safe_area_changed
  - `web_app_request_safe_area` → Telegram émet `safe_area_changed` 
    - Méthode : https://docs.telegram-mini-apps.com/platform/methods#web_app_request_safe_area
    - Événement : https://docs.telegram-mini-apps.com/platform/events#safe_area_changed
- **Différence “Safe Area” vs “Content Safe Area”** (utilisez de préférence *Content Safe Area* pour votre contenu) :
  - Viewport & insets : https://docs.telegram-mini-apps.com/platform/viewport
- **Contexte officiel (introduction v8.0)** :
  - Changelog Bot API : https://core.telegram.org/bots/api-changelog

**Implémentation conseillée**
1. Au premier rendu, appelez `web_app_request_content_safe_area`.
2. Appliquez les valeurs reçues de `content_safe_area_changed` (`top`, `right`, `bottom`, `left`) comme **padding** sur votre conteneur racine (ou via CSS `var(--tg-content-safe-area-inset-*)`).
3. Écoutez en continu `content_safe_area_changed` (rotation, changement d’état…) et mettez à jour le layout.

---

## 2) Viewport & BottomSheet : stabilité d’affichage

- Les Mini‑Apps s’ouvrent d’abord dans un **BottomSheet** ; vous pouvez l’**étendre** (max height) et suivre sa **stabilité** :
  - Viewport (dimensions, expansion, stabilité, fullscreen) : https://docs.telegram-mini-apps.com/platform/viewport
  - Événement `viewport_changed` : https://docs.telegram-mini-apps.com/platform/events#viewport_changed
- Conseils :
  - N’effectuez pas de calculs de layout “coûteux” tant que `is_state_stable` n’est pas vrai.
  - Évitez les “sauts” d’UI en appliquant d’abord les insets, **puis** en appelant `web_app_ready` (voir §6).

---

## 3) Thème natif & couleurs système (contraste garanti)

- **Theme Params** (clairs/sombres & thèmes personnalisés) :
  - Principes : https://core.telegram.org/bots/webapps
  - Détails theming : https://docs.telegram-mini-apps.com/platform/theming
  - Paramètre de lancement `tgWebAppThemeParams` : https://docs.telegram-mini-apps.com/platform/launch-parameters#tgwebappthemeparams
- **Méthodes liées aux couleurs** (entête, fond, bottom bar) :
  - Liste des méthodes : https://docs.telegram-mini-apps.com/platform/methods

Bonnes pratiques : 
- Liez votre design system (tokens) aux Theme Params pour rester cohérent en light/dark.
- En fullscreen, fixez la couleur d’en‑tête pour garder un bon contraste (cf. §7).

---

## 4) Boutons natifs Telegram (espaces réservés inclus)

- **Main Button** (CTA principal) :
  - Plateforme : https://docs.telegram-mini-apps.com/platform/main-button
  - SDK (3.x) : https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/3-x/components/main-button
- **Secondary Button** (optionnel) :
  - SDK (1.x) : https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/1-x/components/secondary-button
- **Settings Button** (menu haut‑droite) :
  - Plateforme : https://docs.telegram-mini-apps.com/platform/settings-button
  - SDK (1.x) : https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/1-x/components/settings-button
- **Back Button** (retour contextuel) :
  - SDK (3.x) : https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/3-x/components/back-button

> Les insets de *Content Safe Area* couvrent aussi le bas de l’écran lorsque les boutons natifs sont visibles — gardez‑les activés pour éviter le recouvrement de votre barre/tabbar.

---

## 5) Swipe & Fermeture : privilégier le bouton **Close**

### Désactiver le swipe vertical (recommandé)
- **Méthode plateforme** : `web_app_setup_swipe_behavior` avec `allow_vertical_swipe: false` 
  - https://docs.telegram-mini-apps.com/platform/methods#web_app_setup_swipe_behavior
- **Guide** : 
  - https://docs.telegram-mini-apps.com/platform/swipe-behavior
- **SDK (3.x)** : 
  - https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/3-x/components/swipe-behavior

### Fermer via le bouton **Close** (ou par code si nécessaire)
- **Bouton Close** : géré par Telegram (coin haut‑gauche).
- **Fermeture programmée** : `web_app_close` (plateforme) / `miniApp.close()` (SDK)
  - Plateforme : https://docs.telegram-mini-apps.com/platform/methods#web_app_close
  - SDK (1.x) : https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/1-x/components/mini-app
  - SDK (2.x) : https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/2-x/components/mini-app

### Confirmation de fermeture (sécurité anti‑perte de données)
- `web_app_setup_closing_behavior` avec `need_confirmation: true`
  - Guide : https://docs.telegram-mini-apps.com/platform/closing-behavior
  - Méthode : https://docs.telegram-mini-apps.com/platform/methods#web_app_setup_closing_behavior

---

## 6) “Prêt à afficher” (éviter le flash / saut visuel)

- **`web_app_ready`** : signale à Telegram que l’UI est prête (loader retiré) — à appeler **après** application des insets et du thème.
  - Méthodes : https://docs.telegram-mini-apps.com/platform/methods#web_app_ready

**Ordre recommandé au démarrage** :
1. Lire/monter le thème → appliquer vos tokens.
2. Demander *Content Safe Area* → appliquer le padding.
3. Initialiser vos composants natifs (Main/Back/Settings…) si nécessaires.
4. (Optionnel) Désactiver le swipe vertical si votre UX l’exige.
5. Appeler `web_app_ready`.

---

## 7) Mode plein écran (optionnel)

- **Entrer / quitter le fullscreen** et rester conforme au thème & contrastes :
  - Présentation (client‑side) : https://core.telegram.org/bots/webapps
  - Méthodes & événements : https://docs.telegram-mini-apps.com/platform/methods
  - Événements `fullscreen_changed` / `fullscreen_failed` : https://docs.telegram-mini-apps.com/platform/events#fullscreen_changed

**Tips**
- Continuez à respecter *Content Safe Area* même en plein écran.
- Fixez la couleur d’entête adaptée à votre fond pour assurer lisibilité des barres système.

---

## 8) Performance & accessibilité (bonnes pratiques Telegram)

- **Responsive mobile‑first**, animations fluides (~60 fps), labels accessibles et tailles tactiles confortables.
  - Principes : https://core.telegram.org/bots/webapps
- **Monter les composants SDK avant usage** (évite erreurs et états incohérents) :
  - Usage tips (3.x) : https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/3-x/usage-tips

---

## 9) Checklist “anti‑chevauchement” (copier/coller)

- [ ] Appeler `web_app_request_content_safe_area` au démarrage.
- [ ] Appliquer **padding** = insets reçus de `content_safe_area_changed` sur le **wrapper racine**.
- [ ] Écouter `content_safe_area_changed` et ajuster à chaud (rotation, état viewport).
- [ ] Demander/écouter `viewport_changed` et éviter les calculs tant que `is_state_stable` est faux.
- [ ] Gérer le **thème** via Theme Params avant d’afficher.
- [ ] **Désactiver le swipe vertical** via `web_app_setup_swipe_behavior` (sauf écrans qui le nécessitent).
- [ ] **Fermer via Close** ; si nécessaire, `web_app_close()` / `miniApp.close()`.
- [ ] **Demander confirmation** à la fermeture (`web_app_setup_closing_behavior`).
- [ ] Monter/configurer Main/Back/Settings Buttons **après** application des insets.
- [ ] Appeler `web_app_ready` **après** insets + thème pour retirer le loader sans flash.
- [ ] En plein écran : garder Content Safe Area + fixer header color si besoin.

---

### Annexes (références rapides)
- Safe Areas & design : https://core.telegram.org/bots/webapps
- Web Events (safe area / swipe / closing…) : https://core.telegram.org/api/web-events
- Viewport (BottomSheet, expansion, stabilité) : https://docs.telegram-mini-apps.com/platform/viewport
- Méthodes (ready, safe area, theme, viewport, fullscreen, colors, swipe…) : https://docs.telegram-mini-apps.com/platform/methods
- Événements (viewport/safe area/fullscreen/theme…) : https://docs.telegram-mini-apps.com/platform/events
- Theming : https://docs.telegram-mini-apps.com/platform/theming
- Theme Params (SDK) : https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/3-x/components/theme-params
- Main Button : https://docs.telegram-mini-apps.com/platform/main-button
- Back Button (SDK) : https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/3-x/components/back-button
- Swipe Behavior : https://docs.telegram-mini-apps.com/platform/swipe-behavior
- Closing Behavior : https://docs.telegram-mini-apps.com/platform/closing-behavior

---

> **Résumé** — Pour garder votre style sans conflit avec Telegram : **appliquez systématiquement les insets de *Content Safe Area***, synchronisez votre **thème** avec les Theme Params, **désactivez le swipe vertical** si votre UX le requiert et laissez l’utilisateur fermer via **Close**, gérez proprement **viewport** et **gestes**, et affichez l’app uniquement quand tout est prêt via `web_app_ready`. Ces étapes évitent précisément les chevauchements visibles sur certaines captures.

