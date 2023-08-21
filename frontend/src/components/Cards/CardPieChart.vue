<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            {{ title }}
          </h6>
          <h2 class="text-blueGray-700 text-xl font-semibold">
            {{ description }}
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-450-px">
        <canvas :id="id"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  props: {
    id: { type: String },
    load: { type: Boolean, default: true },
    dataSet: { type: Array },
    labels: { type: Array },
    title: { type: String },
    description: { type: String },
  },
  watch: {
    load() {
      if (!this.load) {
        console.log(this.dataSet);
        this.$nextTick(function () {
          let config = {
            type: "doughnut",
            data: {
              labels: this.labels,
              datasets: this.dataSet,
            },
          };
          let ctx = document.getElementById(this.id).getContext("2d");
          window.myBar = new Chart(ctx, config);
        });
      }
    },
  },
};
</script>
