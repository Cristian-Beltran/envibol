<template>
  <CardData title="Vacaciones" icon="fa-calendar-day">
    <template v-slot:filters>
      <div class="pb-4">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <v-icon
              name="fa-search"
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
            />
          </div>
          <input
            type="text"
            v-model="searchQuery"
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar"
          />
        </div>
      </div>
    </template>
    <div class="demo-app">
      <div class="demo-app-main">
        <FullCalendar
          class="demo-app-calendar dark:text-white"
          :options="calendarOptions"
        >
          <template v-slot:eventContent="arg">
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
        </FullCalendar>
      </div>
    </div>
  </CardData>
  <ModalConfirm
    v-model="show"
    title="Hello World!"
    @close="() => (show = false)"
    @confirm="() => confirm()"
  >
  </ModalConfirm>
</template>

<style lang="css">
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
</style>
<script setup>
import { ref, reactive, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "@/utils/event-utils";
import CardData from "@/components/Cards/CardData.vue";

import ModalConfirm from "@/components/modals/ModalConfirm.vue";
const show = ref(false);
const currentEvents = ref([]);
const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: "prev,next today",
    center: "title",
  },
  initialView: "dayGridMonth",
  editable: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  /* you can update a remote database when these fire:
  eventAdd:
  eventChange:
  eventRemove:
  */
});

const employees = ref([]);
const absenceTypes = ref([]);

const employeeData = computed(() => {
  return employees.value.map((employee) => {
    return {
      id: employee.id,
      fullName: `${employee.first_name} ${employee.last_name}`,
      role: employee.role,
      ci: employee.ci,
    };
  });
});

const formData = reactive({
  start: new Date(),
  end: new Date(),
  detail: "",
  absenceTypeId: 0,
  employeeId: 0,
});


function handleDateSelect(selectInfo) {
  show.value = true;
  /*let title = prompt("Please enter a new title for your event");
  let calendarApi = selectInfo.view.calendar;
  calendarApi.unselect(); // clear date selection
  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }*/
}

function handleEventClick(clickInfo) {
  if (
    confirm(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    )
  ) {
    clickInfo.event.remove();
  }
}
function handleEvents(events) {
  currentEvents.val = events;
}


onMounted(() => {
 
});

</script>
