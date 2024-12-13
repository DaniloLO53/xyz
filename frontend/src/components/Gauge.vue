<!-- eslint-disable vue/multi-word-component-names -->

<!-- MADE WITH A.I -->

<template>
  <div class="gauge-container">
    <!-- Arco do medidor -->
    <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" class="gauge">
      <!-- Fundo do arco -->
      <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#e5e5e5" stroke-width="10" />
      <!-- Arco colorido -->
      <path
        d="M10 50 A40 40 0 0 1 90 50"
        fill="none"
        :stroke="getGradientColor(value)"
        stroke-width="10"
        stroke-dasharray="126"
        :stroke-dashoffset="getStrokeOffset(value)"
      />
      <!-- Marcador -->
      <!-- <circle
        :cx="getMarkerPosition(value).x"
        :cy="getMarkerPosition(value).y"
        r="2.5"
        fill="black"
      /> -->
    </svg>
    <!-- Valor -->
    <text class="gauge-value">{{ value }}</text>
    <!-- Descrição -->
    <div class="gauge-label">{{ getLabel(value) }}</div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    value: {
      type: Number,
      required: true,
      validator: (v: number) => v >= 0 && v <= 100,
    },
  },
  setup() {
    // Calcula o deslocamento do arco
    const getStrokeOffset = (value: number) => {
      const maxOffset = 126 // Circunferência do arco
      return maxOffset - (value / 100) * maxOffset
    }

    // Calcula a posição do marcador
    const getMarkerPosition = (value: number) => {
      const angle = ((value / 100) * 180 + 180) * (Math.PI / 180) // Em radianos
      const radius = 40 // Raio do arco
      const centerX = 50 // Centro X
      const centerY = 50 // Centro Y
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    }

    // Define as cores do arco com base no valor
    const getGradientColor = (value: number) => {
      if (value <= 33) return '#f44336' // Vermelho
      if (value <= 66) return '#ffc107' // Amarelo
      return '#4caf50' // Verde
    }

    // Define o rótulo com base no valor
    const getLabel = (value: number) => {
      if (value <= 33) return 'Fear'
      if (value <= 66) return 'Neutral'
      return 'Greed'
    }

    return {
      getStrokeOffset,
      getMarkerPosition,
      getGradientColor,
      getLabel,
    }
  },
}
</script>

<style scoped>
.gauge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gauge {
  width: 56px;
  height: 28px;
}

.gauge-value {
  font-size: 14px;
  font-weight: bold;
  position: absolute;
}

.gauge-label {
  font-size: 10px;
  color: #666;
}
</style>
