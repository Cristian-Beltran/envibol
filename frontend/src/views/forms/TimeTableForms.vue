<template>
  <Forms title="Horario" icon="fa-calendar-alt" @handleSubmit="handleSubmit">
    <h6 class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase">
      Datos de horario
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <Input 
          id="title" 
          labelText="Nombre del horario" 
          v-model="v$.title.$model" 
          :errors="v$.title.$errors" 
          type="text" 
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="description"
          labelText="Descripción"
          v-model="v$.description.$model"
          :errors="v$.description.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="toleranceDelay"
          labelText="Tolerancia en atraso (minutos)"
          v-model="v$.toleranceDelay.$model"
          :errors="v$.toleranceDelay.$errors"
          type="text"
        />        
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="toleranceLack"
          labelText="Tolerancia en falta (minutos)"
          v-model="v$.toleranceLack.$model"
          :errors="v$.toleranceLack.$errors"
          type="text"
        />   
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="toleranceOutput"
          labelText="Tolerancia a la salida (minutos)"
          v-model="v$.toleranceOutput.$model"
          :errors="v$.toleranceOutput.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="earlyExit"
          labelText="Salida adelantada (minutos)"
          v-model="v$.earlyExit.$model"
          :errors="v$.earlyExit.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="puntuality"
          labelText="Puntualidad (minutos)"
          v-model="v$.puntuality.$model"
          :errors="v$.puntuality.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="priority"
          labelText="Prioridad"
          v-model="v$.priority.$model"
          :errors="v$.priority.$errors"
          type="text"
        />
      </div>
    </div>
    <h6 class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase">
      Horario
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="mondayEntry" 
          labelText="Lunes (Entrada)" 
          v-model="v$.mondayEntry.$model" 
          :errors="v$.mondayEntry.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="mondayExit" 
          labelText="Lunes (Salida)" 
          v-model="v$.mondayExit.$model" 
          :errors="v$.mondayExit.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="mondayEnable"
          labelText="Lunes (Habilitado)"
          v-model="v$.mondayEnable.$model"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="tuesdayEntry" 
          labelText="Martes (Entrada)" 
          v-model="v$.tuesdayEntry.$model" 
          :errors="v$.tuesdayEntry.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="tuesdayExit" 
          labelText="Martes (Salida)" 
          v-model="v$.tuesdayExit.$model" 
          :errors="v$.tuesdayExit.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="tuesdayEnable"
          labelText="Martes (Habilitado)"
          v-model="v$.tuesdayEnable.$model"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="wednesdayEntry" 
          labelText="Miércoles (Entrada)" 
          v-model="v$.wednesdayEntry.$model" 
          :errors="v$.wednesdayEntry.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="wednesdayExit" 
          labelText="Miércoles (Salida)" 
          v-model="v$.wednesdayExit.$model" 
          :errors="v$.wednesdayExit.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="wednesdayEnable"
          labelText="Miércoles (Habilitado)"
          v-model="v$.wednesdayEnable.$model"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="thursdayEntry" 
          labelText="Jueves (Entrada)" 
          v-model="v$.thursdayEntry.$model" 
          :errors="v$.thursdayEntry.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="thursdayExit" 
          labelText="Jueves (Salida)" 
          v-model="v$.thursdayExit.$model" 
          :errors="v$.thursdayExit.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="thursdayEnable"
          labelText="Jueves (Habilitado)"
          v-model="v$.thursdayEnable.$model"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="fridayEntry" 
          labelText="Viernes (Entrada)" 
          v-model="v$.fridayEntry.$model" 
          :errors="v$.fridayEntry.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="fridayExit" 
          labelText="Viernes (Salida)" 
          v-model="v$.fridayExit.$model" 
          :errors="v$.fridayExit.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="fridayEnable"
          labelText="Viernes (Habilitado)"
          v-model="v$.fridayEnable.$model"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="saturdayEntry" 
          labelText="Sábado (Entrada)" 
          v-model="v$.saturdayEntry.$model" 
          :errors="v$.saturdayEntry.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="saturdayExit" 
          labelText="Sábado (Salida)" 
          v-model="v$.saturdayExit.$model" 
          :errors="v$.saturdayExit.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="saturdayEnable"
          labelText="Sábado (Habilitado)"
          v-model="v$.saturdayEnable.$model"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="sundayEntry" 
          labelText="Domingo (Entrada)" 
          v-model="v$.sundayEntry.$model" 
          :errors="v$.sundayEntry.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="sundayExit" 
          labelText="Domingo (Salida)" 
          v-model="v$.sundayExit.$model" 
          :errors="v$.sundayExit.$errors" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="sundayEnable"
          labelText="Domingo (Habilitado)"
          v-model="v$.sundayEnable.$model"
        />
      </div>
    </div>
  </Forms>
</template>

<script setup>
import {
  createTimeTable,
  updateTimeTable,
  getTimeTables,
} from "@/api/timetable";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { ref, computed, onMounted, reactive, watch } from "vue";
import { toast } from "vue-sonner";

import Forms from "@/components/Cards/Forms.vue";
import Input from "@/components/Inputs/Input.vue";
import Checkbox from "@/components/Inputs/Checkbox.vue";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  title: "",
  description: "",
  toleranceDelay: "",
  toleranceLack: "",
  toleranceOutput: "",
  earlyExit: "",
  puntuality: "",
  priority: "",
  mondayEntry: "",
  mondayExit: "",
  mondayEnable: false,
  tuesdayEntry: "",
  tuesdayExit: "",
  tuesdayEnable: false,
  wednesdayEntry: "",
  wednesdayExit: "",
  wednesdayEnable: false,
  thursdayEntry: "",
  thursdayExit: "",
  thursdayEnable: false,
  fridayEntry: "",
  fridayExit: "",
  fridayEnable: false,
  saturdayEntry: "",
  saturdayExit: "",
  saturdayEnable: false,
  sundayEntry: "",
  sundayExit: "",
  sundayEnable: false,
});
const errors = ref([]);
const types = ref([]);
const rules = computed(() => ({
  title: {
    required: helpers.withMessage("Se requiere el nombre del horario", required),
  },
  description: {
    required: helpers.withMessage("Se requiere una descripción", required),
  },
  toleranceDelay: {
    required: helpers.withMessage("Tolerancia en atraso es requerida", required),
  },
  toleranceLack: {
    required: helpers.withMessage("Tolerancia en falta es requerida", required),
  },
  toleranceOutput: {
    required: helpers.withMessage("Tolerancia a la salida es requerida", required),
  },
  earlyExit: {
    required: helpers.withMessage("Salida adelantada es requerida", required),
  },
  puntuality: {
    required: helpers.withMessage("Se requiere datos en puntualidad", required),
  },
  priority: {
    required: helpers.withMessage("Prioridad es requerida", required),
  },
  mondayEntry: {},
  mondayExit: {},
  mondayEnable: {},
  tuesdayEntry: {},
  tuesdayExit: {},
  tuesdayEnable: {},
  wednesdayEntry: {},
  wednesdayExit: {},
  wednesdayEnable: {},
  thursdayEntry: {},
  thursdayExit: {},
  thursdayEnable: {},
  fridayEntry: {},
  fridayExit: {},
  fridayEnable: {},
  saturdayEntry: {},
  saturdayExit: {},
  saturdayEnable: {},
  sundayEntry: {},
  sundayExit: {},
  sundayEnable: {},
}));

const v$ = useVuelidate(rules, formData);

/*watch(
  () => formData.mondayEnable,
  (mondayEnable) => {
    console.log("Cambio de checkbox", mondayEnable);
  }
);*/

async function handleSubmit () {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) await createTimeTable(formData);
      else await updateTimeTable(route.query.id, formData);
      toast.success("Horario guardado correctamente");
      router.push("/timeTable");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted( async () => {
  try {
    const res = await getTimeTables();
    types.value = res.data;
  } catch (error) {
    toast.error("Error al cargar los datos");
  }
  if (route.query.id) {
    try {
      const res = await getTimeTables(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      route.push("/timeTable");
    }
  }
});
</script>
