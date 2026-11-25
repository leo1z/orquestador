# Labs · estándar y fichas por módulo

Cada módulo tiene un lab tan interactivo y visual como el de UI 101, "Arregla la pantalla Tu pedido" ([referencia](https://claude.ai/artifact/WqrcVGHz7pUzUfP2Y7AL1Q), sección Laboratorio). Un lab que solo se lee o es un formulario no cuenta.

## Estándar obligatorio

1. **Algo que se ve y cambia.** El centro del lab es un objeto visual (una pantalla, un flujo, un schema, un árbol de commits, un loop de agente) que reacciona al instante.
2. **Elegir antes que memorizar.** La persona arma su acción eligiendo: qué pieza → qué propiedad → qué valor. El lab muestra la instrucción que eso produce (el prompt, la consulta SQL, el request).
3. **Ejecutar y ver el resultado.** Un botón aplica la acción ("Enviar al LLM", "Ejecutar", "Hacer commit") con un breve estado de carga, y el objeto cambia.
4. **Retos que se marcan solos.** De 5 a 8 retos que se validan contra el estado del lab, con pista opcional; algunos piden más de un cambio.
5. **Deshacer, reiniciar e historial.** El historial guarda lo que hizo la persona para copiarlo o revisarlo con el instructor.
6. **Errores que enseñan.** Cuando algo falla, aparece el personaje `estrellado` y explica qué pasó y cómo arreglarlo.

Estructura de pantalla: objeto visual a la izquierda o al centro; a su lado el constructor (pasos 1, 2 y 3) y la instrucción generada; debajo los retos y el historial. En celular, todo en una columna: objeto, constructor, retos.

### Cómo se implementa

- Estado del lab = un objeto plano; cada acción es `{pieza, propiedad, valorAnterior, valorNuevo, instruccion}` y se guarda en el historial (eso da el deshacer).
- Retos = funciones puras `(estado) => boolean` con texto y pista.
- El estado y el historial del lab se guardan por persona (para que el instructor los vea).

## Plantilla de ficha (copiar antes de programar un módulo)

```markdown
### Módulo NN · Título
- Objetivo: qué podrá hacer la persona al terminar (1 frase)
- Conceptos: 3–6 términos con su nombre en inglés
- Ejercicios: 3–6 micro-ejercicios independientes del caso
- Lab: objeto visual · piezas · propiedades · valores · qué instrucción genera
- Retos: 5–8, cada uno con su condición de éxito
- Aplicar al caso: qué builder guía y qué entregable produce
- Check: 3–5 preguntas
- Personaje y pista principal
```

## Fichas

### Módulo 04 · Lógica y flujos (primera ficha, base del diseño de pantallas)
- Objetivo: convertir una idea en reglas que una máquina pueda seguir, incluido qué pasa cuando algo sale mal.
- Conceptos: trigger, condition (IF/ELSE), action, state, edge case, loop.
- Lab: un flujo ejecutable del caso A (escanear QR de stand → validar → otorgar pin). Piezas: trigger, condiciones, acciones, ramas. La persona agrega o cambia bloques eligiendo de listas y ejecuta con datos de prueba (código válido, ya usado, vencido, sin internet).
- Retos: toda condición tiene rama ELSE · el código ya usado muestra un mensaje · una compra desbloquea una personalización · sin internet se guarda y reintenta · ningún camino termina sin respuesta al asistente.
- Aplicar al caso: reglas, estados y flujo principal del caso de la persona.
- Personaje: `lupa` con la pista "Cada IF necesita su ELSE. ¿Qué pasa si el QR ya fue usado?"

Las demás fichas se escriben al empezar cada módulo. El contenido base de 02 a 05 y 13 viene del OPSA AI Lab (Problem Solving Studio y Case Studio).
