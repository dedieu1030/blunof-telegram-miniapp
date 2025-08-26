# ICONOIR_GUIDE.md

> Guide d’importation & d’utilisation des icônes **Iconoir** dans les principaux environnements (Web, React, React Native, Vue, Flutter, iOS/Swift, Framer, Figma).  
> Basé sur la documentation officielle [Iconoir](https://iconoir.com).

---

Sommaire

- [1) Télécharger ou installer les SVG (`iconoir`)](#1-télécharger-ou-installer-les-svg-iconoir)
- [2) Web (CSS / Icon Font via CDN)](#2-web-css--icon-font-via-cdn)
- [3) React (`iconoir-react`)](#3-react-iconoir-react)
- [4) React Native (`iconoir-react-native`)](#4-react-native-iconoir-react-native)
- [5) Vue (`@iconoir/vue`)](#5-vue-iconoirvue)
- [6) Flutter (`iconoir_flutter`)](#6-flutter-iconoir_flutter)
- [7) iOS (Swift Package `iconoir-swift`)](#7-ios-swift-package-iconoir-swift)
- [8) Framer](#8-framer)
- [9) Figma](#9-figma)
- [10) Nommage & props par défaut](#10-nommage--props-par-défaut)
- [11) Licence](#11-licence)

---

## 1) Télécharger ou installer les SVG (`iconoir`)

- **Installation :**
  
  ```bash
  npm i iconoir
  # ou
  yarn add iconoir
  # ou
  pnpm add iconoir
  # ou
  bun add iconoir
  ```

- **Import SVG :**
  
  ```js
  import IconExample from 'iconoir/icons/iconoir.svg';
  ```

- **Alternative :** télécharger directement les SVG sur [iconoir.com](https://iconoir.com).

---

## 2) Web (CSS / Icon Font via CDN)

Inclure la feuille CSS (icon font) :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css" />
```

Utilisation :

```html
<i class="iconoir-hand-brake"></i>
```

- Classe = `iconoir-<nom-de-l-icone>`.
- Hérite de la taille et couleur de police.

---

## 3) React (`iconoir-react`)

```bash
npm i iconoir-react
```

**Exemple :**

```jsx
import { Home, Search } from 'iconoir-react';

export default function App() {
  return (
    <>
      <Home color="black" width={24} height={24} />
      <Search color="blue" width={32} />
    </>
  );
}
```

**Provider global :**

```jsx
import { IconoirProvider, Check } from 'iconoir-react';

<IconoirProvider iconProps={{ color: '#AAA', strokeWidth: 1 }}>
  <Check />
</IconoirProvider>
```

---

## 4) React Native (`iconoir-react-native`)

```bash
npm i iconoir-react-native react-native-svg
```

**Exemple :**

```jsx
import { Home } from 'iconoir-react-native';

<Home color="red" width={36} height={36} />
```

---

## 5) Vue (`@iconoir/vue`)

```bash
npm i @iconoir/vue
```

**Exemple :**

```vue
<script setup>
import { Home, Search } from '@iconoir/vue';
</script>

<template>
  <Home color="black" width="24" />
  <Search color="blue" width="32" />
</template>
```

---

## 6) Flutter (`iconoir_flutter`)

```bash
flutter pub add iconoir_flutter
```

**Exemple :**

```dart
import 'package:flutter/material.dart';
import 'package:iconoir_flutter/iconoir_flutter.dart';

class Demo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const IconoirHome(color: Colors.black, size: 24);
  }
}
```

---

## 7) iOS (Swift Package `iconoir-swift`)

**Ajout :**

- Xcode → **File > Swift Packages > Add Package Dependency…**  
- URL : `https://github.com/iconoir-icons/iconoir-swift.git`

**UIKit :**

```swift
import UIKit
import Iconoir

let imageView = UIImageView(image: Iconoir.bell.asUIImage)
```

**SwiftUI :**

```swift
import SwiftUI
import Iconoir

struct ContentView: View {
    var body: some View {
        Iconoir.bell.asImage
            .foregroundColor(.blue)
            .font(.system(size: 24))
    }
}
```

---

## 8) Framer

- Dans Framer : `Insert > Graphics > Iconoir`  
- Sélectionnez l’icône dans la sidebar.

---

## 9) Figma

- Librairie disponible dans la **Figma Community** : recherchez “Iconoir”.

---

## 10) Nommage & props par défaut

- **Noms des composants** : PascalCase (ex. `airplane-helix-45deg` → `AirplaneHelix45deg`).
- **Props par défaut** :
  - `color: "currentColor"`
  - `width: "1.5em"`
  - `height: "1.5em"`
  - `strokeWidth: 1.5`

---

## 11) Licence

- **MIT License**  
- Icônes open-source, utilisation libre dans vos projets.

---
