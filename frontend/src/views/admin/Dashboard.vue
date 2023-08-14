<template>
  <div>
    <!-- Card stats -->
    <div class="flex flex-wrap mb-4">
      <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
        <card-stats
          statSubtitle="TRAFFIC"
          statTitle="350,897"
          statArrow="up"
          statPercent="3.48"
          statPercentColor="text-emerald-500"
          statDescripiron="Since last month"
          statIconName="far fa-chart-bar"
          statIconColor="bg-red-500"
        />
      </div>
      <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
        <card-stats
          statSubtitle="NEW USERS"
          statTitle="2,356"
          statArrow="down"
          statPercent="3.48"
          statPercentColor="text-red-500"
          statDescripiron="Since last week"
          statIconName="fas fa-chart-pie"
          statIconColor="bg-orange-500"
        />
      </div>
      <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
        <card-stats
          statSubtitle="SALES"
          statTitle="924"
          statArrow="down"
          statPercent="1.10"
          statPercentColor="text-orange-500"
          statDescripiron="Since yesterday"
          statIconName="fas fa-users"
          statIconColor="bg-pink-500"
        />
      </div>
      <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
        <card-stats
          statSubtitle="PERFORMANCE"
          statTitle="49,65%"
          statArrow="up"
          statPercent="12"
          statPercentColor="text-emerald-500"
          statDescripiron="Since last month"
          statIconName="fas fa-percent"
          statIconColor="bg-emerald-500"
        />
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-bar-chart />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-page-visits />
      </div>
    </div>
  </div>
</template>
<script>
import CardStats from "@/components/Cards/CardStats.vue";
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
export default {
  name: "dashboard-page",
  components: {
    CardStats,
    CardLineChart,
    CardBarChart,
    CardPageVisits,
  },
  
};
</script>
