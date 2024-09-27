import express from 'express';
import { Op, Transaction } from 'sequelize';
import Nomina from '../models/Nomina.js';
import sequelize from '../config/database.js';
import { validateNomina } from '../validators/nominaValidator.js';

const router = express.Router();

/**
 * @swagger
 * /api/nomina:
 *   get:
 *     summary: Obtiene todas las nóminas
 *     description: Retorna una lista paginada de nóminas con opciones de filtrado y ordenamiento
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de elementos por página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Campo por el cual ordenar
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Orden (ASC o DESC)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Trmino de búsqueda
 *     responses:
 *       200:
 *         description: Lista de nóminas
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sortBy = 'fecha', sortOrder = 'DESC', search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const where = {};
    if (search) {
      where[Op.or] = [
        { id: isNaN(Number(search)) ? -1 : Number(search) },
        { nombre: { [Op.iLike]: `%${search}%` } },
        { recibo: { [Op.iLike]: `%${search}%` } },
        { numeroFactura: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Nomina.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [[sortBy, sortOrder]],
    });

    res.json({
      total: count,
      pages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      nominas: rows,
    });
  } catch (error) {
    next(error);
  }
});

// Crear una nueva nómina
router.post('/', validateNomina, async (req, res, next) => {
  let transaction = null;
  try {
    transaction = await sequelize.transaction();

    const nuevaNomina = await Nomina.create(req.body, { transaction });
    
    await transaction.commit();
    res.status(201).json(nuevaNomina);
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
});

// Obtener una nómina por ID
router.get('/:id', async (req, res) => {
  try {
    const nomina = await Nomina.findByPk(req.params.id);
    if (nomina) {
      res.json(nomina);
    } else {
      res.status(404).json({ message: 'Nómina no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la nómina:', error);
    res.status(500).json({ message: 'Error al obtener la nómina' });
  }
});

// Actualizar una nómina
router.put('/:id', async (req, res) => {
  const { fecha, recibo, monto, nombre, montoEnLetras, concepto, numeroFactura } = req.body;
  let transaction = null;

  try {
    // Validaciones manuales (similar a las del POST)
    if (!fecha || !recibo || !monto || !nombre || !montoEnLetras || !concepto || !numeroFactura) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Verificar si el recibo ya existe para otra nómina
    const existingNomina = await Nomina.findOne({ 
      where: { 
        recibo,
        id: { [Op.ne]: req.params.id } // Excluir la nómina actual
      } 
    });
    if (existingNomina) {
      return res.status(400).json({ message: 'El número de recibo ya existe para otra nómina' });
    }

    // Otras validaciones (fecha, monto, etc.) como en el POST

    transaction = await sequelize.transaction();

    const [updated] = await Nomina.update(req.body, {
      where: { id: req.params.id },
      transaction
    });

    if (updated) {
      const updatedNomina = await Nomina.findByPk(req.params.id, { transaction });
      await transaction.commit();
      res.json(updatedNomina);
    } else {
      await transaction.rollback();
      res.status(404).json({ message: 'Nómina no encontrada' });
    }
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error al actualizar la nómina:', error);
    res.status(500).json({ message: 'Error al actualizar la nómina' });
  }
});

// Eliminar una nómina
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Nomina.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Nómina no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la nómina:', error);
    res.status(500).json({ message: 'Error al eliminar la nómina' });
  }
});

export default router;