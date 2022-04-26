const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// All Categories with associated Products
router.get("/", (req, res) => {
  Category.findAll({ include: { model: Product } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Single Category with associated Products
router.get("/:id", (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: { model: Product },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new category
router.post("/", (req, res) => {
  Category.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update a Category
router.put("/:id", (req, res) => {
  Category.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      if (!data[0]) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;