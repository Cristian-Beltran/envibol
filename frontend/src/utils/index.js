import ExcelJS from "exceljs";

export const dateFormat = (date) => {
  const d = new Date(date);
  const addCero = (number) => {
    return number < 10 ? `0${number}` : number;
  };
  const year = d.getFullYear();
  const month = addCero(d.getMonth() + 1);
  const day = addCero(d.getDate());
  return `${year}-${month}-${day}`;
};

export const fullDateFormat = (date) => {
  const d = new Date(date);
  const addCero = (number) => {
    return number < 10 ? `0${number}` : number;
  };
  const year = d.getFullYear();
  const month = addCero(d.getMonth() + 1);
  const day = addCero(d.getDate());
  const hour = addCero(d.getHours());
  const minute = addCero(d.getMinutes());
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export const createTableExcel = async (data, columns, title = "Reporte") => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Reporte");
  worksheet.mergeCells("A1:E1");

  // Agrega el título
  worksheet.getCell("A1").value = title;
  const titleCell = worksheet.getCell("A1");
  titleCell.font = { bold: true, size: 16 };
  titleCell.alignment = { horizontal: "center" };

  // Extrae las claves y etiquetas de las columnas personalizadas
  const keys = columns.map((column) => column.key);
  const labels = columns.map((column) => column.label);

  // Agrega los encabezados de columna personalizados
  worksheet.addRow(labels);
  const headerRow = worksheet.getRow(2);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: "center" };

  // Agrega los datos y aplica formato personalizado si es necesario
  data.forEach((item) => {
    const row = [];
    keys.forEach((key) => {
      if (key === "createdAt") {
        // Formatea la fecha usando la función personalizada
        row.push(fullDateFormat(item[key]));
      } else {
        row.push(item[key]);
      }
    });
    worksheet.addRow(row);
  });

  // Aplica filtros a los encabezados de columna
  worksheet.autoFilter =
    "A2:" + String.fromCharCode(65 + keys.length - 1) + "2";

  // Ajusta automáticamente el ancho de las columnas al contenido
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const length = cell.value ? cell.value.toString().length : 10;
      if (length > maxLength) {
        maxLength = length;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength + 2; // Agrega un margen de 2 para el ancho de la columna
  });

  // Genera un nombre de archivo con el nombre del reporte y la fecha actual
  const date = new Date();
  const fileName = `${title}_${date.toISOString()}.xlsx`;

  // Crea un archivo blob
  const buffer = await workbook.xlsx.writeBuffer();

  // Crea un enlace de descarga y lo simula un clic para descargar el archivo
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();

  // Limpia el enlace de descarga después de un tiempo
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 5000); // Elimina el enlace después de 5 segundos (ajusta el tiempo según sea necesario)
};
