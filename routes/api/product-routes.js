const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data

  Product.findAll({ //finds all products
    include: [ //includes the following
      {
        model: Category, //includes the category model
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag, //target model
        through: ProductTag, //allows us to access the join table
        as: 'tags', //alias
        attributes: ['id', 'tag_name'], //arttributes ID and tag_name
      },
    ],
  })
    //.then((products) => res.json(products))...returns the products
    .then((products) => {
      res.json(products);
    //error checking, if catch is triggered, it will return status 500.
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//GET Route
//HTTP GET
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try {
    const product = await Product.findByPk(req.params.id, { //takes two arguments, the first is the ID and the second is an object
      include: [Category, Tag], //includes the category and tag models
    });

    //error checking, if catch is triggered, it will return status 404.
    if (!product) {
      return res.status(404).json({ error: 'Product was not found, please try again!' });
    }


    //error checking, if catch is triggered, it will return status 500.
    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'error' });
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const { product_name, price, stock, tagIds } = req.body;

    // Input validation
    //checks to make sure product_name, price, and stock are not null
    //if null it will return status 400
    if (!product_name && !price && !stock) {
      return res.status(400).json({ error: 'product_name, price, and stock are all required fields. Please fill in accordingly.' });
    }

    //taking the product_name, price, and stock from the req.body
    const product = await Product.create({
      product_name,
      price,
      stock,
    });


    //if tagIds is not null and has a length greater than 0
    if (tagIds && tagIds.length > 0) {
      //this below is the same as SELECT * FROM tag WHERE id = tagIds in sql
      //finds all tags where the id is in the tagIds array
      const tags = await Tag.findAll({ where: { id: tagIds } })
      //adds tags to the product
      await product.addTags(tags);
    }


    //error checking, if catch is triggered, it will return status 500.
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'error' });
  }
});


//eveything below is from the given code

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
