const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint




router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data


  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'productTag_products'}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
      const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'productTag_products' }]
    });
    if (!tagData) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }
    res.status(200).json(tagData);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching data' });
  }
});


router.post('/', async (req, res) => {
  // create a new tag

  try {
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data. Tag creation failed.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    if (updatedTag[0] === 0) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }
    res.status(200).json({ message: 'Tag updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the tag.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!deletedTag) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }
    res.status(200).json({ message: 'Tag deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the tag.' });
  }
});

module.exports = router;

//add comments