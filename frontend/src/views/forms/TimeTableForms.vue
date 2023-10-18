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
          type="number"
          :min="0"
          :max="60"
        />        
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="toleranceLack"
          labelText="Tolerancia en falta (minutos)"
          v-model="v$.toleranceLack.$model"
          :errors="v$.toleranceLack.$errors"
          type="number"
          :min="0"
          :max="60"
        />   
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="toleranceOutput"
          labelText="Tolerancia a la salida (minutos)"
          v-model="v$.toleranceOutput.$model"
          :errors="v$.toleranceOutput.$errors"
          type="number"
          :min="0"
          :max="60"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="earlyExit"
          labelText="Salida adelantada (minutos)"
          v-model="v$.earlyExit.$model"
          :errors="v$.earlyExit.$errors"
          type="number"
          :min="0"
          :max="60"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="puntuality"
          labelText="Puntualidad (minutos)"
          v-model="v$.puntuality.$model"
          :errors="v$.puntuality.$errors"
          type="number"
          :min="0"
          :max="60"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="priority"
          labelText="Prioridad"
          v-model="v$.priority.$model"
          :errors="v$.priority.$errors"
          type="number"
          :min="0"
          :max="60"
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
          v-model="formData.schedule.monday.entry"
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="mondayExit" 
          labelText="Lunes (Salida)" 
          v-model="formData.schedule.monday.exit"
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="mondayEnable"
          labelText="Lunes (Habilitado)"
          v-model="formData.schedule.monday.enable"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="tuesdayEntry" 
          labelText="Martes (Entrada)" 
          v-model="formData.schedule.tuesday.entry"
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="tuesdayExit" 
          labelText="Martes (Salida)" 
          v-model="formData.schedule.tuesday.exit" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="tuesdayEnable"
          labelText="Martes (Habilitado)"
          v-model="formData.schedule.tuesday.enable"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="wednesdayEntry" 
          labelText="Miércoles (Entrada)" 
          v-model="formData.schedule.wednesday.entry" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="wednesdayExit" 
          labelText="Miércoles (Salida)" 
          v-model="formData.schedule.wednesday.exit"
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="wednesdayEnable"
          labelText="Miércoles (Habilitado)"
          v-model="formData.schedule.wednesday.enable"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="thursdayEntry" 
          labelText="Jueves (Entrada)" 
          v-model="formData.schedule.thursday.entry"
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="thursdayExit" 
          labelText="Jueves (Salida)" 
          v-model="formData.schedule.thursday.exit" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="thursdayEnable"
          labelText="Jueves (Habilitado)"
          v-model="formData.schedule.thursday.enable"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="fridayEntry" 
          labelText="Viernes (Entrada)" 
          v-model="formData.schedule.friday.entry"
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="fridayExit" 
          labelText="Viernes (Salida)" 
          v-model="formData.schedule.friday.exit" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="fridayEnable"
          labelText="Viernes (Habilitado)"
          v-model="formData.schedule.friday.enable"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="saturdayEntry" 
          labelText="Sábado (Entrada)" 
          v-model="formData.schedule.saturday.entry"
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="saturdayExit" 
          labelText="Sábado (Salida)" 
          v-model="formData.schedule.saturday.exit" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="saturdayEnable"
          labelText="Sábado (Habilitado)"
          v-model="formData.schedule.saturday.enable"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="sundayEntry" 
          labelText="Domingo (Entrada)" 
          v-model="formData.schedule.sunday.entry"  
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input 
          id="sundayExit" 
          labelText="Domingo (Salida)" 
          v-model="formData.schedule.sunday.exit" 
          type="time" 
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="sundayEnable"
          labelText="Domingo (Habilitado)"
          v-model="formData.schedule.sunday.enable"
        />
      </div>
    </div>
  </Forms>
</template>

<script setup>
import {
  createTimeTableRequest,
  updateTimeTableRequest,
  getTimeTableRequest,
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
  schedule: {
    monday: {
      entry: null,
      exit: null,
      enable: false,
    },
    tuesday: {
      entry: null,
      exit: null,
      enable: false,
    },
    wednesday: {
      entry: null,
      exit: null,
      enable: false,
    },
    thursday: {
      entry: null,
      exit: null,
      enable: false,
    },
    friday: {
      entry: null,
      exit: null,
      enable: false,
    },
    saturday: {
      entry: null,
      exit: null,
      enable: false,
    },
    sunday: {
      entry: null,
      exit: null,
      enable: false,
    },
  }
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
  schedule: {
    monday: {
      entry: {},
      exit: {},
      enable: {},
    },
    tuesday: {
      entry: {},
      exit: {},
      enable: {},
    },
    wednesday: {
      entry: {},
      exit: {},
      enable: {},
    },
    thursday: {
      entry: {},
      exit: {},
      enable: {},
    },
    friday: {
      entry: {},
      exit: {},
      enable: {},
    },
    saturday: {
      entry: {},
      exit: {},
      enable: {},
    },
    sunday: {
      entry: {},
      exit: {},
      enable: {},
    },
  },
}));

const v$ = useVuelidate(rules, formData);

async function handleSubmit () {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) await createTimeTableRequest(formData);
      else await updateTimeTableRequest(route.query.id, formData);
      toast.success("Horario guardado correctamente");
      router.push("/timeTable");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted( async () => {
  if (route.query.id) {
    try {
      const res = await getTimeTableRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      route.push("/timeTable");
    }
  }
});
</script>
