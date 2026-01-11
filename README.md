# 🎮 Vier gewinnt - Progressive Web App (PWA)

Eine vollständig offline-fähige Version des Spiels, die als App installiert werden kann!

## 📱 Installation

### Android
1. Öffne die Webseite im Chrome Browser
2. Tipke auf das Menü (⋮) → "Zum Startbildschirm hinzufügen"
3. Bestätige mit "Hinzufügen"

### iOS (iPhone/iPad)
1. Öffne die Webseite im Safari Browser
2. Tipke auf das Teilen-Symbol (□ mit Pfeil)
3. Wähle "Zum Home-Bildschirm"
4. Tipke auf "Hinzufügen"

### Windows/Mac
1. Öffne im Chrome oder Edge Browser
2. Klicke auf das Install-Symbol in der Adresszeile
3. Bestätige mit "Installieren"

## 🔧 Für Entwickler

### Icons generieren
```bash
# Node.js und Canvas installieren
npm install canvas

# Icons erstellen
node generate-icons.js
```

### Manuell Icons erstellen
1. Öffne `icons-generator.html` im Browser
2. Lade das SVG herunter
3. Konvertiere zu PNG in diesen Größen:
   - 72×72, 96×96, 128×128, 144×144
   - 152×152, 192×192, 384×384, 512×512
4. Speichere alle PNGs im `images/` Ordner

### Dateistruktur
```
/workspace/
├── index.html              # PWA Einstiegspunkt
├── manifest.json           # App Manifest
├── service-worker.js       # Offline Funktionalität
├── vier-gewinnt-gegen-ki.html  # Das Spiel
├── generate-icons.js       # Icon Generator
├── icons-generator.html    # Icon Anleitung
├── README.md               # Diese Datei
└── images/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

### PWA testen
1. Alle Dateien auf einen Webserver hochladen
2. Mit HTTPS öffnen (erforderlich für PWA)
3. Service Worker wird automatisch registriert
4. Offline-Modus testen: DevTools → Network → Offline

## 🎯 Features

✅ 100% Offline nutzbar  
✅ Als App installierbar  
✅ Kein App Store nötig  
✅ Funktioniert auf Android, iOS, Windows, Mac  
✅ Klein und schnell (kein Download nötig)  
✅ Automatische Updates  

## 📝 Lizenz

Das Spiel wurde für dich erstellt. Du kannst es frei nutzen und teilen!

## 🔄 Updates

Bei Updates werden alle Dateien automatisch neu gecached. Einmal aktualisiert, siehst du das Spiel sofort in der neuen Version.

---

Viel Spaß beim Spielen! 🎉
