interface IBreakpoint {
  name: string;
  width: number;
}

const _breakpoints: IBreakpoint[] = [
  { name: "desktop", width: Infinity },
  { name: "tablet-l", width: 1024 },
  { name: "tablet-p", width: 768 },
  { name: "mobile-l", width: 480 },
  { name: "mobile-p", width: 320 },
];

let columns: any[] = [];

export const loadDatatable = (ocultarTabla?:boolean) => {
  
  _resize();
  const dtrControles = document.querySelectorAll(".dtr-control");
  const dataTable = document.querySelector(
    ".dt-responsive"
  ) as HTMLTableElement;
  const filasHeader = dataTable?.rows[0] as HTMLTableRowElement;
  let headersOcultos: any[] = [];
  let widthDtrControl = 0;
  const tbody = document.querySelector('.dt-responsive>tbody') as HTMLElement
  // if (ocultarTabla) {
  //   tbody.style.display='none'
  //  return 
  // } else {
  //    tbody.style.display='table-row-group'
  // }
  for (let i = 0, cell; (cell = filasHeader?.cells[i]); i++) {
    if (i == 0) {
      widthDtrControl = cell.clientWidth;
    }
    if (cell.classList.contains("cell-hide")) {
      headersOcultos.push(cell.children[0].textContent);
    }
  }

  const lengthColumns = filasHeader?.cells?.length;
  const lenthOcultos = headersOcultos.length;
  for (let i = 0, control; (control = dtrControles[i]); i++) {
    control?.addEventListener("click", (evt) => {
      const cellControl = evt.target as HTMLDivElement;
      if (cellControl.classList.toggle("active")) {
        const parent = cellControl.parentElement as HTMLTableRowElement;
        let registrosOcultos = [];
        for (let cell of parent.cells) {
          if (cell.classList.contains("cell-hide")) {
            registrosOcultos.push(cell.children[0].textContent); //children[0] es el div que tiene la celda
          }
        }
        const nuevaFila = dataTable.insertRow(i + 2);
        const ulNode = document.createElement("ul");
        let elementUL = "";
        for (let i = 0, cell; (cell = headersOcultos[i]); i++) {
          elementUL += `<li style='display:flex;'>
            <span style='width:${widthDtrControl}px;display:block;padding-left:1.3rem;font-weight:600'>
            ${cell}</span><span style='display:block'>${registrosOcultos[i]}</span></li>`;
        }
        ulNode.innerHTML = elementUL;
        const newCell = nuevaFila.insertCell(0);
        newCell.colSpan = lengthColumns - lenthOcultos;
        newCell.appendChild(ulNode);
      } else {
        dataTable.deleteRow(i + 2);
      }
    });
  }

  addEventListener("resize", (ev) => {
    console.log("redimensionando");
    _resize();
  });
};

function _resize() {
  const dataTable = document.querySelector(
    ".dt-responsive"
  ) as HTMLTableElement;
  const contenedorComponent = document.querySelector(
    ".table-component"
  ) as HTMLDivElement;
  const pageWidth = contenedorComponent.clientWidth;
  const pageHeight = contenedorComponent.clientHeight;
  const filasTotales = dataTable?.rows;
  const lengthFilas = filasTotales.length;
  console.log("tamanio page", { pageHeight, pageWidth });
  for (let i = 0, fila; (fila = filasTotales[i]); i++) {
    let widthRow = 0;
    for (let col of fila.cells) {
      const width = col.clientWidth;
      const height = col.clientHeight;
      const widths = [
        {
          client: { width: width, height: height },
          offset: { width: col.offsetWidth, height: col.offsetHeight },
        },
      ];
      widthRow += width;
      if (widthRow <= pageWidth) {
        col.classList.add("cell-show");
        col.classList.remove("cell-hide");
        if (i == 0) {
          col.style.width = "100%";
        }
      } else {
        col.classList.add("cell-hide");
        col.classList.remove("cell-show");
      }
    }
  }
}
