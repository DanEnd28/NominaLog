import Nomina from '../models/Nomina.js';

export const validateNomina = async (req, res, next) => {
  const { fecha, recibo, monto, nombre, montoEnLetras, concepto, numeroFactura, moneda } = req.body;

  if (!fecha || !recibo || !monto || !nombre || !montoEnLetras || !concepto || !numeroFactura || !moneda) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || new Date(fecha) < new Date('2000-01-01')) {
    return res.status(400).json({ message: 'Formato de fecha inválido o fecha anterior al año 2000' });
  }

  if (isNaN(Number(monto)) || Number(monto) <= 0) {
    return res.status(400).json({ message: 'El monto debe ser un número positivo' });
  }

  if (moneda !== 'USD' && moneda !== 'Bs') {
    return res.status(400).json({ message: 'La moneda debe ser USD o Bs' });
  }

  const existingNomina = await Nomina.findOne({ where: { recibo } });
  if (existingNomina) {
    return res.status(400).json({ message: 'El número de recibo ya existe' });
  }

  next();
};