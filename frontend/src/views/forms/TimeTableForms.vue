<template>
  <Forms title="Horario" icon="fa-calendar-alt" @handleSubmit="handleSubmit">
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de horario
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Nombre del horario
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Descripción
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.description.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.description.$model"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Tolerancia en atraso (minutos)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.description.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.description.$model"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Tolerancia en falta (minutos)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.description.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.description.$model"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Tolerancia a la salida (minutos)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.description.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.description.$model"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Salida adelantada (minutos)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.description.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.description.$model"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Puntualidad (minutos)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.description.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.description.$model"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Prioridadad
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.description.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.description.$model"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Horario
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Lunes (Entrada)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Lunes (Salida)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <div
            class="flex items-center pl-4 mt-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              id="bordered-checkbox-1"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-checkbox-1"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Lunes (Habilitado)</label
            >
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Martes (Entrada)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Martes (Salida)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <div
            class="flex items-center pl-4 mt-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              id="bordered-checkbox-2"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-checkbox-2"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Martes (Habilitado)</label
            >
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Miercole (Entrada)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Miercoles (Salida)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <div
            class="flex items-center pl-4 mt-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              id="bordered-checkbox-3"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-checkbox-3"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Miercole (Habilitado)</label
            >
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Jueves (Entrada)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Jueves (Salida)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <div
            class="flex items-center pl-4 mt-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              id="bordered-checkbox-4"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-checkbox-4"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Jueves (Habilitado)</label
            >
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Viernes (Entrada)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Viernes (Salida)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <div
            class="flex items-center pl-4 mt-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              id="bordered-checkbox-5"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-checkbox-5"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Viernes (Habilitado)</label
            >
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Sabado (Entrada)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Sabado (Salida)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <div
            class="flex items-center pl-4 mt-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              id="bordered-checkbox-6"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-checkbox-6"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Sabado (Habilitado)</label
            >
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Domingo (Entrada)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
          >
            Domingo (Salida)
          </label>
          <div
            class="p-1 mb-1"
            v-for="(error, index) of v$.rfid.$errors"
            :key="index"
          >
            <p class="text-sm text-white bg-red-500 p-2 rounded-md">
              {{ error.$message }}
            </p>
          </div>
          <input
            v-model="v$.rfid.$model"
            type="time"
            placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative w-full mb-3">
          <div
            class="flex items-center pl-4 mt-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              id="bordered-checkbox-7"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-checkbox-7"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Domingo (Habilitado)</label
            >
          </div>
        </div>
      </div>
    </div>
  </Forms>
</template>

<script setup>
import {
  createCardRequest,
  getCardRequest,
  updateCardRequest,
} from "@/api/card";
import { getTypeCardsRequest } from "@/api/typecard";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import Forms from "@/components/Cards/Forms.vue";
import { ref, computed, onMounted, reactive } from "vue";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  rfid: "",
  typeCardId: "",
  description: "",
});
const errors = ref([]);
const types = ref([]);
const rules = computed(() => ({
  rfid: {
    required: helpers.withMessage("El codigo rfid es requerido", required),
  },
  typeCardId: {
    required: helpers.withMessage("El tipo de tarjeta es requerido", required),
  },
  description: {
    required: helpers.withMessage("Se requiere una descripción", required),
  },
}));

const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) await createCardRequest(formData);
      else await updateCardRequest(route.query.id, formData);
      toast.success("Tarjeta guardada correctamente");
      router.push("/card");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  try {
    const res = await getTypeCardsRequest();
    types.value = res.data;
  } catch (error) {
    toast.error("Error al cargar los datos");
  }
  if (route.query.id) {
    try {
      const res = await getCardRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      route.push("/card");
    }
  }
});
</script>
