// PNG Icon Generator für Vier gewinnt PWA
// Installiere zuerst: npm install canvas
// Führe dann aus: node generate-icons.js

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [
    { name: 'icon-72.png', size: 72 },
    { name: 'icon-96.png', size: 96 },
    { name: 'icon-128.png', size: 128 },
    { name: 'icon-144.png', size: 144 },
    { name: 'icon-152.png', size: 152 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-384.png', size: 384 },
    { name: 'icon-512.png', size: 512 }
];

// Farben
const colors = {
    bgTop: '#667eea',
    bgBottom: '#764ba2',
    board: '#2563eb',
    slot: '#1f2937',
    tokenRed: '#ef4444',
    tokenRedLight: '#ff6b6b',
    tokenRedDark: '#c0392b'
};

function drawIcon(canvas, size) {
    const ctx = canvas.getContext('2d');
    const radius = size * 0.15;
    
    // Hintergrund (abgerundetes Quadrat)
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, colors.bgTop);
    gradient.addColorStop(1, colors.bgBottom);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, radius * size / 100);
    ctx.fill();
    
    // Spielfeld
    const boardSize = size * 0.55;
    const boardX = (size - boardSize) / 2;
    const boardY = (size - boardSize) / 2;
    const boardRadius = size * 0.04;
    
    ctx.fillStyle = colors.board;
    ctx.beginPath();
    ctx.roundRect(boardX, boardY, boardSize, boardSize, boardRadius);
    ctx.fill();
    
    // Raster (3x3 Kreise)
    const cellSize = boardSize / 4;
    const cellRadius = size * 0.06;
    const tokenRadius = size * 0.07;
    
    // Leere Slots
    ctx.fillStyle = colors.slot;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const x = boardX + cellSize * (col + 0.5);
            const y = boardY + cellSize * (row + 0.5);
            ctx.beginPath();
            ctx.arc(x, y, cellRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Roter Stein in der Mitte
    const tokenX = size / 2;
    const tokenY = size / 2;
    
    // Token Schatten
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = size * 0.03;
    ctx.shadowOffsetY = size * 0.02;
    
    // Token Gradient
    const tokenGradient = ctx.createRadialGradient(
        tokenX - tokenRadius * 0.3, 
        tokenY - tokenRadius * 0.3, 
        0,
        tokenX, 
        tokenY, 
        tokenRadius
    );
    tokenGradient.addColorStop(0, colors.tokenRedLight);
    tokenGradient.addColorStop(1, colors.tokenRedDark);
    
    ctx.fillStyle = tokenGradient;
    ctx.beginPath();
    ctx.arc(tokenX, tokenY, tokenRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Schatten zurücksetzen
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    
    // Highlight auf dem Token
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(
        tokenX - tokenRadius * 0.25, 
        tokenY - tokenRadius * 0.25, 
        tokenRadius * 0.3, 
        tokenRadius * 0.2, 
        0, 0, Math.PI * 2
    );
    ctx.fill();
    
    console.log(`✓ ${size}x${size} Icon erstellt`);
}

async function generateIcons() {
    const outputDir = path.join(__dirname, 'images');
    
    // Erstelle output Verzeichnis falls nicht vorhanden
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('🎮 Generiere Icons für Vier gewinnt PWA...\n');
    
    for (const { name, size } of sizes) {
        const canvas = createCanvas(size, size);
        drawIcon(canvas, size);
        
        const buffer = canvas.toBuffer('image/png');
        const filePath = path.join(outputDir, name);
        fs.writeFileSync(filePath, buffer);
    }
    
    console.log('\n✅ Alle Icons wurden erstellt im "images/" Ordner!');
    console.log('\nDateien:');
    sizes.forEach(({ name, size }) => {
        console.log(`   - images/${name} (${size}x${size})`);
    });
}

generateIcons().catch(console.error);
