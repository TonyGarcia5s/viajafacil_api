const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const clientesRoutes = require("./routes/clientes");
const cotizacionesRoutes = require("./routes/cotizaciones");
const paquetesRoutes = require("./routes/paquetes");
const agentesRoutes = require("./routes/agentes");
const preferenciasRoutes = require("./routes/preferencias");
const recomendacionesRoutes = require("./routes/recomendaciones");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/viaja_facil", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error(err));

app.use("/api/clientes", clientesRoutes);
app.use("/api/cotizaciones", cotizacionesRoutes);
app.use("/api/paquetes", paquetesRoutes);
app.use("/api/agentes", agentesRoutes);
app.use("/api/preferencias", preferenciasRoutes);
app.use("/api/recomendaciones", recomendacionesRoutes);


app.get("/", (req, res) => {
  res.send("API de ViajaFácil funcionando correctamente");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
