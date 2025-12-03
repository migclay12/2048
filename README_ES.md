# 2048 Game

Un juego 2048 implementado en JavaScript vanilla con diseño responsive y animaciones suaves.

## 📋 Descripción

Este proyecto es una implementación del popular juego 2048, donde el objetivo es combinar fichas con el mismo número para alcanzar la ficha 2048. El juego incluye:

- ✅ Interfaz responsive que se adapta a diferentes tamaños de pantalla
- ✅ Animaciones suaves para fichas nuevas y combinaciones
- ✅ Sistema de puntuación con top score
- ✅ Detección de victoria y derrota
- ✅ Código modular y bien organizado

## 🎮 Cómo Jugar

1. Usa las **flechas del teclado** (↑ ↓ ← →) para mover las fichas
2. Las fichas se mueven en la dirección indicada y se combinan si tienen el mismo valor
3. Cada combinación suma puntos a tu score
4. **Objetivo**: Alcanza la ficha 2048 para ganar
5. El juego termina cuando no hay más movimientos posibles

## 🚀 Instalación y Ejecución

### Descargar el archivo

```bash
# Descargar el repositorio
git clone git@github.com:migclay12/2048.git
```

### Con Docker

```bash
# Dirigite a la carpeta ex00/
# Construir y ejecutar con docker-compose
cd ex00/ && docker-compose up --build

# El juego estará disponible en http://localhost:5173
```

## 📁 Estructura del Proyecto

```
ex00/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos y animaciones
├── js/
│   ├── main.js         # Inicialización y event listeners
│   ├── game-state.js   # Estado del juego y verificaciones
│   ├── game-logic.js   # Lógica de movimiento y combinación
│   ├── ui.js           # Interfaz de usuario y animaciones
│   └── utils.js        # Funciones utilitarias
├── Dockerfile          # Configuración Docker
└── docker-compose.yml  # Orquestación Docker
```

## 🏗️ Arquitectura

El código está organizado en módulos separados por responsabilidad:

- **`main.js`**: Define constantes globales (`GRID_SIZE`, `VICTORY_VALUE`) e inicializa el juego
- **`game-state.js`**: Gestiona el estado del juego (`gameState.table`, `gameState.mergedCells`) y verifica victoria/derrota
- **`game-logic.js`**: Implementa la lógica de movimiento en las 4 direcciones y las combinaciones
- **`ui.js`**: Maneja la renderización del tablero, actualización de scores y animaciones
- **`utils.js`**: Funciones auxiliares (copiar tablas, comparar, números aleatorios)

## 🎨 Características Técnicas

- **Responsive Design**: Usa unidades CSS modernas (`vw`, `vh`, `clamp()`) para adaptarse a cualquier pantalla
- **Animaciones CSS**: Transiciones suaves y animaciones para fichas nuevas y combinaciones
- **Código Modular**: Separación clara de responsabilidades para fácil mantenimiento
- **Sin Dependencias**: JavaScript vanilla, sin frameworks ni librerías externas

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- Docker & Nginx

## 📝 Notas

- El juego guarda el top score durante la sesión (se resetea al recargar la página)
- Las animaciones tienen una duración de 200ms
- El grid es de 4x4 por defecto
