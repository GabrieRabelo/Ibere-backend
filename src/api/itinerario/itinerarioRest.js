const express = require('express');
const router = express.Router();
const itinerarioService = require('../../business/itinerario/itinerarioService');

/**
 * @swagger
 *
 * definitions:
 *  Itinerario:
 *   type: object
 *   properties:
 *    tempoCaminhada:
 *     type: number
 *     format: float
 *    tempoCarro:
 *     type: number
 *     format: float
 *    tempoBicicleta:
 *     type: number
 *     format: float
 *    nome:
 *     type: string
 */

/**
 * @swagger
 * tags:
 *   - name: itinerario
 *     description: Tudo sobre Itinerario
 */

/**
 * @swagger
 *
 * /api/v1/itinerario:
 *   get:
 *     tags: [itinerario]
 *     description: Get Itinerarios
 *     responses:
 *       200:
 *         description: Application Itinerario
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Itinerario'
 *
 */
router.get('/', async (req, res) => {
    await itinerarioService.buscarItinerarios()
        .then(itinerario => res.json(itinerario))
        .catch(e => res.status(e.statusCode).send(e));
});

/**
 * @swagger
 *
 * /api/v1/itinerario/{id}:
 *   delete:
 *     tags: [itinerario]
 *     description: Deleta Itinerario dado determinado Id
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *     responses:
 *       204:
 *         description: Application Itinerario
 *
 */
router.delete('/:id', async (req, res) => {
    console.log(" reste");
    itinerarioService.deletar(req.params.id)
        .then(result => {
            res.status(204);
            res.json(`itinerario ${result} deletado`);
        })
        .catch(e => {
            const status = e.statusCode || 500;
            res.status(status);
            res.json(e);
        });
});
module.exports = router;