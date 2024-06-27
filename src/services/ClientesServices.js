import axios from "axios";
const urlBack = "http://localhost:8093/clientes";

export async function getClientes() {
  try {
    const response = await axios.get(urlBack);
    if (response && response.data) {
      const clientesObtenidos = response.data;
      const clientes = generarListadoClientes(clientesObtenidos);
      return clientes;
    } else {
      throw new Error("No se recibió una respuesta válida del servidor");
    }
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function createCliente(nombre, apellido, dni, razonSocial, tipoCliente) {
  try {
    const clienteDTOEntrada = {
      nombre,
      apellido,
      dni,
      razonSocial,
      tipoCliente,
    };
    const response = await axios.post(urlBack, clienteDTOEntrada);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function editCliente(id, nombre, apellido, dni, razonSocial, tipoCliente) {
  try {
    const clienteDTOEntrada = {
      activo: null,
      nombre: nombre || null,
      apellido: apellido || null,
      cuit: null,
      razonSocial: razonSocial || null,
      tipoDNI: null,
      dni: dni || null,
      tipoCliente: tipoCliente || null,
      categoriaClienteId: null,
      puntosCliente: null,
      medioContactoId: null,
      medioPagoId: null,
      historicoCategoriasIds: null,
      cuentaId: null
    };
    const response = await axios.put(`${urlBack}/${id}`, clienteDTOEntrada);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error de respuesta del servidor:", error.response.data);
      throw new Error("Error de respuesta del servidor: " + JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error("No se recibió respuesta del servidor, revise la conexión de red.");
    } else {
      console.error("Error al procesar la solicitud:", error.message);
      throw new Error("Error al procesar la solicitud: " + error.message);
    }
  }
}

export async function deleteCliente(id) {
  try {
    const response = await axios.delete(`${urlBack}/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

function handleAxiosError(error) {
  if (error.response) {
    console.error("Error de respuesta del servidor:", JSON.stringify(error.response.data, null, 2));
    throw new Error("Error de respuesta del servidor: " + JSON.stringify(error.response.data, null, 2));
  } else if (error.request) {
    console.error("No se recibió respuesta del servidor:", error.request);
    throw new Error("No se recibió respuesta del servidor, revise la conexión de red.");
  } else {
    console.error("Error al procesar la solicitud:", error.message);
    throw new Error("Error al procesar la solicitud: " + error.message);
  }
}

function generarListadoClientes(clientesObtenidos) {
  return clientesObtenidos.map((cliente) => {
    return {
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      razonSocial: {
        id: cliente.id,
        razonSocial: cliente.razonSocial,
      },
      cuitDni: cliente.dni,
      tipoCliente: {
        id: cliente.id,
        tipoCliente: cliente.tipoCliente,
      },
    };
  });
}

export async function getRazonesSociales() {
  await esperar(200);
  return [
    {
      id: 1,
      razonSocial: "Razon Social 1",
    },
    {
      id: 2,
      razonSocial: "Razon Social 2",
    },
  ];
}

export async function getTipoClientes() {
  await esperar(200);
  return [
    {
      id: 1,
      tipoCliente: "Empresa",
    },
    {
      id: 2,
      tipoCliente: "Particular",
    },
  ];
}

function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resuelto después de ${ms} milisegundos`);
    }, ms);
  });
}

function getListadoClientesManual() {
  return [
    {
      id: 1,
      nombre: "Cliente 1",
      apellido: "Apellido 1",
      razonSocial: {
        id: 1,
        razonSocial: "Razon Social 1",
      },
      cuitDni: "123456789",
      tipoCliente: {
        id: 1,
        tipoCliente: "Empresa",
      },
    },
    {
      id: 2,
      nombre: "Cliente 2",
      apellido: "Apellido 2",
      razonSocial: {
        id: 2,
        razonSocial: "Razon Social 2",
      },
      cuitDni: "29673451",
      tipoCliente: {
        id: 2,
        tipoCliente: "Particular",
      },
    },
    {
      id: 3,
      nombre: "Cliente 3",
      apellido: "Apellido 3",
      razonSocial: {
        id: 1,
        razonSocial: "Razon Social 1",
      },
      cuitDni: "218956752",
      tipoCliente: {
        id: 1,
        tipoCliente: "Empresa",
      },
    },
    {
      id: 4,
      nombre: "Cliente 4",
      apellido: "Apellido 4",
      razonSocial: {
        id: 2,
        razonSocial: "Razon Social 2",
      },
      cuitDni: "22172615",
      tipoCliente: {
        id: 2,
        tipoCliente: "Particular",
      },
    },
    {
      id: 5,
      nombre: "Cliente 5",
      apellido: "Apellido 5",
      razonSocial: {
        id: 1,
        razonSocial: "Razon Social 1",
      },
      cuitDni: "4714232",
      tipoCliente: {
        id: 1,
        tipoCliente: "Empresa",
      },
    },
  ];
}

