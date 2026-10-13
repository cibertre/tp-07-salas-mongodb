const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema(
    {
        estudiante: { type: String, required: true, trim: true },
        email: { type: String, required: true, match: /@/, trim: true },

        sala: { type: String, required: true, enum: ["Sala Norte", "Sala Sur", "Sala Multimedia"] },
        fecha: { type: Date, required: true },
        turno: { type: String, required: true, enum: ["Mañana", "Tarde", "Noche"] },

        personas: { type: Number, required: true, validator: Number.isInteger, min: 1, max: 6},
        
    },
    { collection: "reservas" },
);

const Reserva = mongoose.model("Reserva", reservaSchema);

// Al momento de consultar y mostrar los datos:
async function obtenerRegistros() {
  // Usamos .lean() para obtener objetos JavaScript planos
  const registros = await Reserva.find().lean();

  // Convertimos el _id de ObjectId a texto (String) antes de mostrarlo/enviarlo
  const registrosFormateados = registros.map(item => ({
    ...item,
    id: item._id.toString(), // Lo exponemos como texto limpio
    _id: undefined           // Opcional: ocultamos el _id original si prefieres 'id'
  }));

  return registrosFormateados;
}


module.exports = { Reserva, obtenerRegistros };