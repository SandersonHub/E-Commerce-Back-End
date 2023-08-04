const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try { //try / catch block
    const tagInfo = await Tag.findAll({ //retruves all records from tag table
      include: [{ model: Product, through: ProductTag, as: 'productTag_products'}]
    }); //finds all tags and includes any products with the tag

    //error checking
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

});

router.post('/', async (req, res) => {
  // create a new tag

});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value


});

module.exports = router;