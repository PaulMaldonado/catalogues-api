const Catalogue = require('../models/Catalogue');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer for upload images 
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
       fs.mkdir('./uploads/', (error) => {
           cb(null, './uploads/');
       })
    },

    filename: function(req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});

exports.uploadImage = multer({storage: storage}).single('image');

// Method create
exports.createCatalogue = async (req, res) => {
    // Destructuring data
    const { name, mark, description, image, quantity } = req.body;

    try {
        // Create a new catalogue
        const catalogue = new Catalogue({
            name,
            mark,
            description,
            image: req.file.path,
            quantity
        });

        const catalogueSaved = await catalogue.save();

        return res.status(201).json({
            message: 'Created catalogue successfully',
            data: {
                catalogueSaved
            }
        });

    } catch (error) {
        console.error('Not saved catalogue...');
        return res.status(500).json({
            message: 'Not saved catalogue...',
            data: null
        })
    }
};

// Method getById for search for id
exports.findCatalogueById = async (req, res) => {
    const { id } = req.params;

    const catalogue = await Catalogue.findById(id);

    res.status(200).json({
        message: 'Find catalogue for id successfully',
        data: {
            catalogue
        }
    })
};

// Method getCatalogues for search all documents
exports.findAllCatalogues = async (req, res) => {
    await Catalogue.find()
        .then(catalogue => {
            if(catalogue !== 0) {
                return res.status(200).json({
                    data: {
                        catalogue,
                        message: 'List of catalogues...'
                    }
                })
            }
        })
        .catch(error => {
            console.error('Not find catalogues...', error);
            return res.status(500).json({
                message: 'Not find catalogues',
                data: null
            })
        })
        
};

// Method for updated document
exports.updateCatalogueById = async (req, res) => {
    const { id } = req.params;
    const { name, mark, description, image, quantity } = req.body;

    if(!req.body && req.body === null) {
        return res.status(400).json({
            message: 'We cant find that catalogue by id to update',
            data: null
        })
    }

    await Catalogue.findByIdAndUpdate(id, {
        name,
        mark,
        description,
        image,
        quantity
    }, { new: true })
    .then(catalogue => {
        if(!catalogue) {
            return res.status(404).json({
                message: `No catalog with that id ${id} was found`,
                data: null
            })
        }
    })

    res.status(200).json({
        catalogue: catalogue,
        message: 'Catalogue updated successfully'
    })
};

// Method delete
exports.deleteCatalogueById = async (req, res) => {
    const { id } = req.params;

    await Catalogue.findOneAndRemove(id)
        .then(catalogue => {
            if(!catalogue) {
                return res.status(404).json({
                    message: `No catalog with that id ${id} was found`,
                    data: null
                })
            }
        })

        res.status(200).json({
            message: `Deleted successfully cfatalogue with id ${id}`,
            catalogue: catalogue
        })
};