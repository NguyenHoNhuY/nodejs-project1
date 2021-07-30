const router = require("express").Router();
const customerModel = require("../models/customer.model");

router.get("/", async (req, res) => {
  //todo phương thức get giúp truy xuất đến router cần thiết
  try {
    const customers = await customerModel.find();
    res.render("customers/list", { customers: customers });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  } 
});

router.get("/add", (req, res) => {
  res.render("customers/add");
});
router.post("/add", async (req, res) => {
  //todo thực hiện post dữ liệu
  try {
    const newCustomer = new customerModel({
      name: req.body.name,
      old: req.body.old,
    });
    await newCustomer.save();
    res.redirect("/customer"); //todo điều hướng trở lại customer sau khi post
  } catch (error) {
    console.log(error);
    res.redirect("/"); //
  }
});
router.delete("/delete/:id", async (req, res) => {
  //!* load giao dien edit
  try {
    await customerModel.findByIdAndDelete(req.params.id);
    res.redirect("/customer");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.get("/edit/:id", async (req, res) => {
  //* chuc nang update info
  try {
    const customer = await customerModel.findById(req.params.id); //! lấy dữ liệu theo id
    res.render("customers/edit", { customer: customer }); //todo truyền dữ liệu vào trang edit
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    let customer = await customerModel.findById(req.params.id);
    customer.name = req.body.name;
    customer.old = req.body.old;
    await customer.save(); //! đưa dữ liệu lên lại cơ sở dữ liệu
    res.redirect("/customer");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

module.exports = router;
