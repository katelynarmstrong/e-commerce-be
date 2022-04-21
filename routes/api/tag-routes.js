const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: "product_tags",
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
 Tag.findOne({
   where: { id: req.params.id },
   include: [
     {
       model: Product,
       through: ProductTag,
       as: "product_tags",
     },
   ],
 })
 .then((data) => {
  res.status(200).json(data);
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, { where: { id: req.params.id } })
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
  Tag.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No tag found with this id" });
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
