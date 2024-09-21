const Product = require("../models/product");

const getAllProducts = async (req, res) => {

    const { company, name, sort, select } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" }; //to search name irrespective of case
    }

    let apiData = Product.find(queryObject);

    if (sort) {   //only if user wants to sort
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    if (select) {
        let selectFix = select.split(",").join(" "); //to select multiple queries
        apiData = apiData.select(selectFix);
    }

    //pagination
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;

    let skip = (page - 1) * limit;

    // page = 2;
    // limit = 3;
    // skip = (2 - 1) * 3;

    apiData = apiData.skip(skip).limit(limit);

    const products = await apiData;
    res.status(200).json({ products, totalRecords: products.length })
};

const getAllProductsTesting = async (req, res) => {
    const products = await Product.find(req.query).select("name company"); //req.query use for searching, sorting, pagination
    res.status(200).json({ products, totalRecords: products.length })
};

module.exports = { getAllProducts, getAllProductsTesting };