const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  console.log('inside tag route');
  // find all tags
  // be sure to include its associated Product data
  try { //try / catch block
    const tagInfo = await Tag.findAll({ //retruves all records from tag table
      include: [{ model: Product, through: ProductTag, as: 'product_tags'}]
    }); //finds all tags and includes any products with the tag

    //error checking
    res.status(200).json(tagInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




//GET route for tag of ID

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findByPk(req.params.id, { //finding all tags by their id
      include: [{ model: Product, through: ProductTag, as: 'product_tags'}]
    });
    //model: Product, tells sequelize to return the product model
    //through: ProductTag, tells sequelize to include any product tags
    //as: 'productTag_products' tells sequelize to return the product tag model as productTag_products

//if respond not found catch this error
    if (!tagInfo) {
      res.status(404).json({ message: 'tag didnt work' });
    } else {
      res.status(200).json(tagInfo);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST route for new tag

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body); //creates a new tag in the db, await is used to wait for 
    //the db operation to complete before moving to the next line

    //error checking, return 201 if successful, catch error display status 500.
    res.status(201).json(newTag); 
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE route for tag of ID

router.delete('/:id', async (req, res) => { //handling http delete request
  // delete on tag by its `id` value
  
  //try / catch block
  try { 
    const tagToDelete = await Tag.findByPk(req.params.id); //finds a tag by its id


    //if respond not found catch this error
    if (!tagToDelete) {
      res.status(404).json({ message: 'Tag didnt work' }); //if tag not found, return 404
    } else {
      await tagToDelete.destroy(); //deletes the tag
      res.status(200).json({ message: 'Tag deleted'}); //returns status 200, successful. 
    }
  } catch (err) { //catches any errors, returns status 500
    res.status(500).json(err);
  }


});

module.exports = router;