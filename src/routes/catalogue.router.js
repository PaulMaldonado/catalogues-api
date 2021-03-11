const express = require('express');
const router = express.Router();

const cataloguesController = require('../controllers/catalogueController');

router.post('/create', cataloguesController.uploadImage, cataloguesController.createCatalogue);
router.get('/catalogue/:id', cataloguesController.findCatalogueById);
router.get('/allCatalogues', cataloguesController.findAllCatalogues);
router.put('/catalogue/:id', cataloguesController.updateCatalogueById);
router.delete('/catalogue/:id', cataloguesController.deleteCatalogueById);

module.exports = router;