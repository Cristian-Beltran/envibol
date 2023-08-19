<template>
  <div>
    <!-- Card stats -->
    <div class="flex flex-wrap mb-4">
      <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
        <card-stats
          statSubtitle="EMPLEADOS"
          :statTitle="employee"
          statDescripiron="Empleados regitrados"
          statIconName="fas fa-user-tie"
          statIconColor="bg-red-500"
        />
      </div>
      <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
        <card-stats
          statSubtitle="VISITAS"
          :statTitle="visit"
          statDescripiron="Visitas registradas hoy"
          statIconName="fas fa-address-book"
          statIconColor="bg-orange-500"
        />
      </div>
      <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
        <card-stats
          statSubtitle="ENTRADAS"
          :statTitle="entrie"
          statDescripiron="Entradas registradas hoy"
          statIconName="fas fa-sign-in-alt"
          statIconColor="bg-pink-500"
        />
      </div>
      <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
        <card-stats
          statSubtitle="SALIDAS"
          :statTitle="exit"
          statDescripiron="Salidas registradas hoy"
          statIconName="fas fa-sign-out-alt"
          statIconColor="bg-emerald-500"
        />
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full mb-12 xl:mb-0 px-4">
        <card-line-chart
          :load="load"
          :dataSet="entrieData"
          title="Entradas/Salidas"
        />
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
        <card-pie-chart
          id="employee"
          title="Empleados"
          description="Total de empleados"
          :dataSet="employeeData"
          :labels="['Empleados dentro', 'Empleados fuera']"
          :load="load"
        />
      </div>
      <div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
        <card-pie-chart
          id="external"
          title="Externos"
          description="Total de externos"
          :dataSet="externalData"
          :labels="['Externos dentro', 'Externos fuera']"
          :load="load"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CardStats from "@/components/Cards/CardStats.vue";
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardPieChart from "@/components/Cards/CardPieChart.vue";
import {
  getEmployeeRequest,
  getEntrieHourRequest,
  getExternalRequest,
  getTotalRequest,
} from "../../api/stats";
export default {
  name: "dashboard-page",
  components: {
    CardStats,
    CardLineChart,
    CardPieChart,
  },
  data() {
    return {
      employee: "",
      load: true,
      visit: "",
      entrie: "",
      exit: "",
      entrieData: [
        {
          label: "Entradas de Empleados",
          fill: false,
          backgroundColor: "#ef4444",
          borderColor: "#ef4444",
          data: [],
        },
        {
          label: "Salidas de Empleados",
          fill: false,
          backgroundColor: "#f97316",
          borderColor: "#f97316",
          data: [],
        },
        {
          label: "Entradas de externos",
          fill: false,
          backgroundColor: "#ec4899",
          borderColor: "#ec4899",
          data: [],
        },
        {
          label: "Salidas de externos",
          fill: false,
          backgroundColor: "#10b981",
          borderColor: "#10b981",
          data: [],
        },
      ],
      employeeData: [
        {
          label: "Empleados",
          data: [],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 4,
        },
      ],
      externalData: [
        {
          label: "Externos",
          data: [],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 4,
        },
      ],
    };
  },
  async created() {
    try {
      const total = await getTotalRequest();
      const entrieHour = await getEntrieHourRequest();
      const employee = await getEmployeeRequest();
      const external = await getExternalRequest();
      this.employee = total.data.employees;
      this.entrie = total.data.entries;
      this.exit = total.data.exits;
      this.visit = total.data.visits;
      this.employeeData[0].data = [employee.data.inside, employee.data.outside];
      this.externalData[0].data = [external.data.inside, external.data.outside];
      this.entrieData[0].data = entrieHour.data.entrieEmployee;
      this.entrieData[1].data = entrieHour.data.exitEmployee;
      this.entrieData[2].data = entrieHour.data.entrieExternal;
      this.entrieData[3].data = entrieHour.data.entrieExternal;
      this.load = false;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
