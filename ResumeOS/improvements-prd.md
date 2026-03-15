# Portfolio OS - Product Requirements Documents

## Priorización de Mejoras

| Prioridad | Mejora | Impacto | Esfuerzo | Score |
|-----------|--------|---------|----------|-------|
| P0 | Contenido Real *(en progreso — avatar ✅)* | Alto | Medio | 9 |
| ~~P1~~ | ~~Animación del Dock~~ ✅ | ~~Alto~~ | ~~Bajo~~ | ~~8~~ |
| P2 | Redimensionado de Ventanas | Alto | Alto | 7 |
| P3 | Soporte de Teclado | Medio | Medio | 6 |
| P4 | Terminal Easter Egg | Medio | Medio | 5 |
| P5 | Animación de Minimizar | Medio | Medio | 5 |
| P6 | Mobile Launcher | Bajo | Alto | 3 |

---

## PRD-001: Contenido Real del Portfolio

### Prioridad: P0 (Crítica)

### Problema
El portfolio actualmente tiene datos placeholder. Sin contenido real, la interfaz pierde su propósito de comunicar la experiencia y habilidades de Julián.

### Objetivo
Reemplazar todo el contenido placeholder con información real, verificable y que cuente una narrativa coherente de la carrera de Julián como Product Manager.

### Requerimientos Funcionales

#### RF-001.1: About App
- ~~Bio profesional de 2-3 párrafos~~ ✅
- ~~Lista de skills técnicos categorizados (Product, Technical, Soft Skills)~~ ✅
- ~~Estadísticas reales: años de experiencia, productos lanzados, usuarios impactados~~ ✅
- ~~Foto de perfil real~~ ✅
- Links a LinkedIn y otras redes verificables

#### RF-001.2: Projects App
- Mínimo 3 casos de estudio con:
  - Nombre del producto/empresa
  - Rol específico y duración
  - Problema que se resolvió
  - Proceso (discovery, delivery)
  - Métricas de impacto cuantificables
  - Stack tecnológico involucrado
  - Aprendizajes clave
- Imágenes o mockups de cada proyecto

#### RF-001.3: Metrics App
- Métricas reales de carrera:
  - Revenue influenciado
  - Usuarios activos gestionados
  - Features shipped
  - Experimentos corridos
- Gráfico de actividad con datos representativos de contribución

#### RF-001.4: Product Thinking App
- Frameworks que Julián realmente usa
- Opiniones formadas sobre producto
- Lecturas recomendadas con justificación personal

#### RF-001.5: Experiments App
- Side projects reales con links funcionales
- Estado actual de cada proyecto
- Tecnologías utilizadas

#### RF-001.6: Writing App
- Posts reales o links a Medium/blog personal
- Si no existen, crear 2-3 artículos cortos sobre temas de producto

#### RF-001.7: Contact App
- Links reales a todas las redes
- CV descargable en PDF
- Email de contacto funcional

### Criterios de Aceptación
- [ ] Todo el contenido es verificable
- [ ] Las métricas tienen contexto (no números sueltos)
- [ ] Los proyectos cuentan una historia clara
- [ ] Los links externos funcionan
- [ ] El CV está disponible para descarga

### Dependencias
- Entrevista o documento con información real de Julián
- Assets: fotos, logos de empresas, mockups de proyectos

---

## ~~PRD-002: Animación del Dock (Magnification Effect)~~ ✅ COMPLETADO

### ~~Prioridad: P1 (Alta)~~

### Problema
El dock actual es estático y pierde la oportunidad de crear un momento de deleite característico de las interfaces de escritorio modernas.

### Objetivo
Implementar el efecto de magnificación del dock estilo macOS que agranda los iconos cercanos al cursor, creando una interacción fluida y memorable.

### Requerimientos Funcionales

#### RF-002.1: Magnificación por Proximidad
- Al hacer hover sobre el dock, los iconos cercanos al cursor deben agrandarse
- El icono directamente bajo el cursor: escala 1.5x
- Iconos adyacentes (1 de distancia): escala 1.25x
- Iconos a 2 de distancia: escala 1.1x
- Transición suave de 150ms con easing

#### RF-002.2: Animación de Bounce
- Al hacer click en un icono, debe hacer un "bounce" vertical
- 3 rebotes decrecientes antes de abrir la app
- Duración total: 400ms

#### RF-002.3: Indicador de App Abierta
- Punto luminoso debajo de apps abiertas
- Animación de "pulse" sutil cuando la app recibe foco

#### RF-002.4: Tooltip con Nombre
- Mostrar nombre de la app al hacer hover
- Aparecer encima del icono con fade de 200ms
- Desaparecer al salir del hover

### Especificaciones Técnicas

```
Curva de magnificación (distancia del cursor):
- 0px: scale(1.5)
- 40px: scale(1.25)
- 80px: scale(1.1)
- 120px+: scale(1.0)

Función de interpolación: ease-out cubic
```

### Criterios de Aceptación
- [x] La magnificación se siente fluida (60fps)
- [x] El efecto no causa layout shift en otros elementos — `transformOrigin: bottom center`
- [x] Funciona correctamente con cualquier número de iconos
- [x] El bounce es satisfactorio pero no excesivo
- [ ] Funciona en touch devices (sin magnificación, solo tap)

### Consideraciones de Performance
- Usar transform en lugar de width/height para animaciones
- Considerar will-change para optimización
- Debounce en el cálculo de distancias si es necesario

---

## PRD-003: Redimensionado de Ventanas

### Prioridad: P2 (Alta)

### Problema
Las ventanas tienen tamaño fijo, limitando la capacidad del usuario de organizar su espacio de trabajo y ver más contenido cuando lo necesita.

### Objetivo
Permitir redimensionar ventanas arrastrando sus bordes y esquinas, manteniendo restricciones de tamaño mínimo y máximo.

### Requerimientos Funcionales

#### RF-003.1: Zonas de Resize
- 8 zonas de resize: 4 bordes + 4 esquinas
- Área de detección: 8px desde el borde
- Cursores apropiados: n-resize, s-resize, e-resize, w-resize, ne-resize, nw-resize, se-resize, sw-resize

#### RF-003.2: Comportamiento de Resize
- El resize debe ser en tiempo real mientras se arrastra
- Tamaño mínimo por ventana (configurable por app):
  - About: 400x300
  - Projects: 500x400
  - Metrics: 450x350
  - Default: 350x250
- Tamaño máximo: 90% del viewport

#### RF-003.3: Resize desde Esquinas
- Las esquinas permiten resize diagonal
- Mantener aspect ratio si se presiona Shift

#### RF-003.4: Double-Click en Borde
- Double-click en borde horizontal: expandir al ancho máximo
- Double-click en borde vertical: expandir al alto máximo
- Double-click en esquina: maximizar ventana

#### RF-003.5: Snap to Edges
- Al acercarse a 20px del borde del viewport, hacer snap
- Visual feedback con línea guía antes del snap

### Estados de la Ventana
```
Estados:
- normal: tamaño y posición libre
- maximized: ocupa todo el espacio disponible (menos dock y topbar)
- snapped-left: 50% izquierdo
- snapped-right: 50% derecho
- minimized: en el dock
```

### Criterios de Aceptación
- [ ] Se puede redimensionar desde cualquier borde/esquina
- [ ] El contenido se adapta al nuevo tamaño
- [ ] No se puede hacer más pequeño que el mínimo
- [ ] El resize es fluido (60fps)
- [ ] Funciona en conjunto con el drag de posición
- [ ] El estado se mantiene al cerrar/abrir la ventana

### Consideraciones Técnicas
- Separar lógica de drag (posición) y resize (tamaño)
- Usar ResizeObserver para notificar cambios al contenido
- Persistir dimensiones en estado global

---

## PRD-004: Soporte Completo de Teclado

### Prioridad: P3 (Media)

### Problema
El portfolio no es navegable por teclado, excluyendo usuarios que dependen de él y perdiendo la oportunidad de shortcuts que mejoran la experiencia power-user.

### Objetivo
Implementar navegación completa por teclado y shortcuts que hagan la interfaz más eficiente y accesible.

### Requerimientos Funcionales

#### RF-004.1: Navegación Básica
- Tab: navegar entre elementos focusables
- Shift+Tab: navegar hacia atrás
- Enter/Space: activar elemento (abrir app, click botón)
- Escape: cerrar ventana activa o modal

#### RF-004.2: Shortcuts de Ventanas
- Cmd/Ctrl + W: cerrar ventana activa
- Cmd/Ctrl + M: minimizar ventana activa
- Cmd/Ctrl + número (1-7): abrir app correspondiente
- Cmd/Ctrl + `: ciclar entre ventanas abiertas

#### RF-004.3: Command Palette (Cmd+K)
- Abrir modal de búsqueda rápida
- Buscar apps por nombre
- Buscar contenido dentro de apps (proyectos, posts)
- Acciones rápidas: "Open About", "Download CV", etc.
- Navegación con flechas y Enter para seleccionar

#### RF-004.4: Focus Management
- Focus visible en todos los elementos interactivos
- Focus ring con color accent
- Focus trap en modales y ventanas activas
- Restaurar focus al cerrar una ventana

#### RF-004.5: Screen Reader Support
- Roles ARIA apropiados para cada componente
- Labels descriptivos para iconos
- Anuncios de cambios de estado (ventana abierta/cerrada)
- Landmark regions para navegación

### Mapa de Shortcuts
```
Global:
- Cmd+K: Command palette
- Cmd+1-7: Abrir apps
- Escape: Cerrar activo

Ventana activa:
- Cmd+W: Cerrar
- Cmd+M: Minimizar
- Cmd+Enter: Maximizar/Restaurar
- Cmd+`: Siguiente ventana

Navegación:
- Tab/Shift+Tab: Siguiente/Anterior
- Arrow keys: Navegar en listas
- Enter/Space: Activar
```

### Criterios de Aceptación
- [ ] Score de accesibilidad Lighthouse > 90
- [ ] Toda la funcionalidad accesible sin mouse
- [ ] Focus visible siempre
- [ ] Shortcuts documentados y descubribles
- [ ] Funciona con lectores de pantalla (VoiceOver, NVDA)

---

## PRD-005: Terminal Easter Egg

### Prioridad: P4 (Media)

### Problema
El portfolio es funcional pero le falta un elemento de sorpresa y deleite que lo haga memorable y demuestre personalidad técnica.

### Objetivo
Crear una app de Terminal interactiva con comandos que revelen información adicional y easter eggs, mostrando el lado técnico de Julián.

### Requerimientos Funcionales

#### RF-005.1: Interfaz de Terminal
- Estética de terminal retro con fuente monospace
- Prompt personalizado: `julian@portfolio:~$`
- Historial de comandos (flecha arriba/abajo)
- Autocompletado con Tab
- Clear con Cmd+L o comando `clear`

#### RF-005.2: Comandos Informativos
```bash
help          # Lista de comandos disponibles
about         # Bio en formato texto
skills        # Lista de skills con barras ASCII
experience    # Timeline de experiencia
contact       # Info de contacto
whoami        # Descripción corta
pwd           # "~/portfolio/julian"
ls            # Lista de "archivos" (secciones)
cat <file>    # Ver contenido de sección
```

#### RF-005.3: Comandos Easter Egg
```bash
sudo hire julian    # Mensaje especial para recruiters
coffee              # ASCII art de café
matrix              # Efecto matrix temporal
fortune             # Quote aleatorio sobre producto
neofetch            # Info del "sistema" (tech stack)
game                # Mini juego simple (snake?)
```

#### RF-005.4: Respuestas Inteligentes
- Comandos no reconocidos: sugerencias de comandos similares
- Typos comunes manejados (halp -> help)
- Respuestas con personalidad y humor sutil

#### RF-005.5: Output Estilizado
- Colores ANSI simulados para output
- ASCII art para comandos especiales
- Animaciones de typing para ciertos outputs
- Links clickeables en el output

### Comandos Especiales
```
$ neofetch

      ██╗██╗   ██╗██╗      ██╗ █████╗ ███╗   ██╗
      ██║██║   ██║██║      ██║██╔══██╗████╗  ██║
      ██║██║   ██║██║      ██║███████║██╔██╗ ██║
 ██   ██║██║   ██║██║      ██║██╔══██║██║╚██╗██║
 ╚█████╔╝╚██████╔╝███████╗ ██║██║  ██║██║ ╚████║
  ╚════╝  ╚═════╝ ╚══════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝

 OS: Portfolio OS v1.0
 Host: Vercel Edge Network
 Shell: julian-sh 1.0
 Resolution: Responsive
 DE: Custom React Desktop
 Theme: Dark Tech [Indigo/Neon]
 Terminal: portfolio-term
 CPU: Product Thinking Engine
 Memory: 7+ years of experience
```

### Criterios de Aceptación
- [ ] Terminal se siente responsiva y real
- [ ] Mínimo 10 comandos funcionales
- [ ] Al menos 3 easter eggs descubribles
- [ ] Historial persiste durante la sesión
- [ ] Autocompletado funciona correctamente
- [ ] Output formateado y legible

---

## PRD-006: Animación de Minimizar al Dock

### Prioridad: P5 (Media)

### Problema
Al minimizar una ventana, esta simplemente desaparece, perdiendo la conexión visual con el dock y rompiendo el modelo mental del "sistema operativo".

### Objetivo
Implementar la animación "genie effect" que muestra la ventana encogiéndose hacia su icono en el dock.

### Requerimientos Funcionales

#### RF-006.1: Genie Effect (Simplificado)
- Al minimizar, la ventana se escala hacia el icono correspondiente en el dock
- La animación debe:
  - Reducir escala de 1 a 0.1
  - Mover posición hacia el centro del icono en el dock
  - Aplicar ligero skew para efecto de "succión"
  - Duración: 300ms
  - Easing: ease-in cubic

#### RF-006.2: Restaurar desde Dock
- Al hacer click en icono de app minimizada:
  - Animación inversa (desde dock hacia posición original)
  - La ventana "emerge" del icono
  - Restaurar tamaño y posición previos

#### RF-006.3: Preview en Dock
- Al hover sobre icono de app minimizada, mostrar preview
- Preview: miniatura de la ventana al 20% de escala
- Aparecer sobre el dock con sombra
- Fade in de 200ms

#### RF-006.4: Múltiples Instancias
- Si una app se minimiza múltiples veces (si se permite):
  - Stack de previews al hacer hover
  - Click selecciona la más reciente

### Especificación de Animación
```
Minimizar:
- Frame 0: scale(1), posición original, skewY(0)
- Frame 50%: scale(0.5), posición intermedia, skewY(5deg)
- Frame 100%: scale(0.1), posición dock, skewY(0)

Restaurar:
- Inverso del anterior
- Agregar ligero bounce al final (overshoot de 1.05)
```

### Criterios de Aceptación
- [ ] La animación es fluida (60fps)
- [ ] La ventana "viaja" visualmente hacia el dock
- [ ] El efecto es satisfactorio pero no distrae
- [ ] Funciona con ventanas de cualquier tamaño
- [ ] El preview muestra contenido real de la ventana

---

## PRD-007: Mobile App Launcher

### Prioridad: P6 (Baja)

### Problema
La versión móvil actual es una lista de secciones que pierde completamente la metáfora del sistema operativo, resultando en una experiencia genérica.

### Objetivo
Rediseñar la experiencia móvil para mantener la metáfora de OS con un launcher de apps estilo iOS/Android.

### Requerimientos Funcionales

#### RF-007.1: Home Screen
- Grid de iconos de apps (3x3 o 4x4)
- Iconos idénticos a la versión desktop
- Labels debajo de cada icono
- Background con wallpaper (adaptado a móvil)

#### RF-007.2: Dock Móvil
- Dock fijo en la parte inferior
- 4 apps principales siempre visibles
- Área de swipe para acceder

#### RF-007.3: App Sheets
- Al tocar un icono, la app se abre como bottom sheet
- Sheet cubre 90% de la pantalla
- Drag down para cerrar
- Indicador de drag en la parte superior

#### RF-007.4: Navegación por Gestos
- Swipe left/right entre apps abiertas
- Swipe up desde abajo: ver apps abiertas (app switcher)
- Long press en icono: opciones rápidas

#### RF-007.5: Status Bar Móvil
- Barra superior con hora y batería (simulados)
- Nombre de la app actual
- Botón de cerrar

#### RF-007.6: App Switcher
- Vista de cards de apps abiertas
- Swipe horizontal para cambiar
- Swipe up en card para cerrar
- Tap para ir a la app

### Wireframe Conceptual
```
┌─────────────────────┐
│ 9:41        🔋 100% │  <- Status bar simulado
├─────────────────────┤
│                     │
│  📁  📊  🧠  🧪    │  <- Grid de apps
│                     │
│  ✍️  📬  🖥️  ⚡    │
│                     │
│                     │
├─────────────────────┤
│  📁   📊   🧠   📬  │  <- Dock fijo
└─────────────────────┘
```

### Criterios de Aceptación
- [ ] La experiencia se siente nativa de móvil
- [ ] Todos los gestos funcionan fluidamente
- [ ] El contenido es legible y usable
- [ ] Transiciones a 60fps
- [ ] Funciona en iOS y Android

### Consideraciones
- Esta mejora requiere mayor esfuerzo y tiene menor prioridad
- Evaluar si el ROI justifica el desarrollo vs la solución actual
- Considerar implementación progresiva (solo launcher primero)

---

## Roadmap Sugerido

### Fase 1: Fundamentos (Semana 1-2)
- PRD-001: Contenido Real

### Fase 2: Polish Visual (Semana 3)
- PRD-002: Animación del Dock
- PRD-006: Animación de Minimizar

### Fase 3: Funcionalidad Avanzada (Semana 4-5)
- PRD-003: Redimensionado de Ventanas
- PRD-004: Soporte de Teclado

### Fase 4: Deleite (Semana 6)
- PRD-005: Terminal Easter Egg

### Fase 5: Mobile (Opcional, Semana 7-8)
- PRD-007: Mobile App Launcher

---

## Métricas de Éxito

| Métrica | Objetivo | Cómo Medir |
|---------|----------|------------|
| Tiempo en página | > 3 min | Analytics |
| Ventanas abiertas por sesión | > 3 | Custom event |
| Tasa de descarga CV | > 10% | Click tracking |
| Easter eggs descubiertos | > 20% usuarios | Custom event |
| Score Lighthouse Accesibilidad | > 90 | Lighthouse |
| Bounce rate | < 40% | Analytics |
