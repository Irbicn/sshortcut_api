
const isEmail = (valor) =>
  String(valor)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const responses = {
  403: (res) => res.status(403).json({ message: "ingresa a la app!" }),
  401: (res, payload) =>
    res.status(401).json(payload ?? { message: "Que haces aqui?" }),
  500: (res) => res.status(500).json({ message: "Algo a salido mal!" }),
  404: (res) => res.status(404).json({ message: "No se econtro" }),
  400: (res, payload) =>
    res
      .status(400)
      .json(payload.message ? payload : { message: String(payload) }),
};

module.exports = {isEmail, responses}
