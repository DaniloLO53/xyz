<template>
  <div class="loading-dots">
    <svg width="21" height="7" viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg" fill="#000">
      <circle cx="10" cy="10" r="5">
        <animate
          attributeName="r"
          from="5"
          to="5"
          begin="0s"
          dur="0.6s"
          values="5;10;5"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.6s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="30" cy="10" r="5">
        <animate
          attributeName="r"
          from="5"
          to="5"
          begin="0.2s"
          dur="0.6s"
          values="5;10;5"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0.2s"
          dur="0.6s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="50" cy="10" r="5">
        <animate
          attributeName="r"
          from="5"
          to="5"
          begin="0.4s"
          dur="0.6s"
          values="5;10;5"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0.4s"
          dur="0.6s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>

<style scoped>
.loading-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
