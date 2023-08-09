const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET ROUTE FOR ALL CATEGORIES
  // find all categories
  // be sure to include its associated Products
  router.get('/', async (req, res) => {
    try {
      // Find all categories and include their associated Products
      const categories = await Category.findAll({ //finds all categories
        include: [Product], //includes any products with the category
      });
      res.json(categories); //returns the categories
    } catch (err) { //error checking
      res.status(500).json(err);
    }
  });

//GET ROUTE FOR CATEGORY BY ID
  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => { //gets a category by its id
    try {
      const categoryId = req.params.id;
      // Find one category by its `id` value and include its associated Products
      const category = await Category.findByPk(categoryId, { //finds a category by its id
        include: [Product], //includes any product
      });

      if (!category) { //error checking
        return res.status(404).json({ message: 'Category not found, Please try again!' });
      }
      res.json(category); //returns the category
    } catch (err) { //error checking
      res.status(500).json(err);
    }
  });


//POST ROUTE FOR NEW CATEGORY

  // create a new category
  router.post('/', async (req, res) => {
    try {
      // Create a new category using the data provided in the request body
      const newCategory = await Category.create(req.body); //creates a new category
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//PUT ROUTE FOR CATEGORY BY ID

 //route handling for updating a category by its id
  router.put('/:id', async (req, res) => { //route handling for updating a category by its id
    try {
      //req = incoming http request
      //parmas, route parameters 
      //all togehter "req.params.id" gets id from the parameter
      const categoryId = req.params.id; //gets the category id
      const category = await Category.findByPk(categoryId); //finds a category by its id
      if (!category) { //error checking
        return res.status(404).json({ message: 'Category isnt found, try again!' });
      }
      await category.update(req.body); //updates the category
      res.json(category); //returns the category
    } catch (err) { //error checking
      res.status(500).json(err);
    }
  });


//DELETE ROUTE FOR CATEGORY BY ID

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = req.params.id;
    // Find the category with the specified `id`
    const category = await Category.findByPk(categoryId); 
    //findByPk is used to something in the db table by is primary key
    //await, waits for the asynchroneous function to be done.

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Deletes the category from the speicified `id`
    await category.destroy();
    res.json({ message: 'Category deleted.' });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
