const Product = require("../models/ProductModel");
// const bcrypt = require('bcrypt');
// const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      imageDetails,
      gender,
      price,
      age,
      size,
      type,
      quantity,
    } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of product is already",
        });
      } else {

        const createProduct = await Product.create({
          name,
          image,
          imageDetails,
          gender,
          price,
          age,
          size,
          type,
          quantity,
        });
        if (createProduct) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createProduct,
          });
        }
      }
    } catch (e) {
      resolve({
        status: "ERROR SERVICE",
      });
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        updateProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "DELETE MANY PRODUCT SUCCESS",
      });
    } catch (e) {
      console.log("loi", e);
    }
  });
};

const getAllProductSearch = (limit, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if (filter && filter.length == 2) {
      let allProductFilterMain;
      let allProductFilter = [];
      let allProductFilter2 = [];
      let NameSearch = filter[1];
      let noProduct;
      let totalProductSearch;
      let arrAllProductFilter = [];

      const label = filter[0];
      console.log("Search", filter[1]);

      allProductFilter2 = await Product.find({
        [label]: { $regex: filter[1]?.split(" ")[0], $options: "i" },
      });

      if (filter[1]?.split(" ").length > 1) {
        for (let i = 0; i < allProductFilter2.length; i++) {
          if (
            allProductFilter2[i]?.name
              .toLowerCase()
              .includes(filter[1]?.split(" ")[1].toLowerCase())
          ) {
            allProductFilter.push(allProductFilter2[i]);
          }
        }
      } else {
        for (let i = 0; i < allProductFilter2.length; i++) {
          allProductFilter.push(allProductFilter2[i]);
        }
      }
      if (allProductFilter.length === 0) {
        noProduct = `Không có sản phẩm nào cho từ khoá: ${filter[1]}`;
      }

      for (let i = 0; i < allProductFilter.length; i++) {
        for (let j = 0; j < allProductFilter2.length; j++) {
          if (allProductFilter[i]?.id === allProductFilter2[j]?.id) {
            allProductFilter2.splice(j, 1);
          }
        }
        arrAllProductFilter.push(allProductFilter[i]?.name);
      }

      totalProductSearch = await Product.count({
        [label]: { $in: arrAllProductFilter },
      });

      allProductFilterMain = await Product.find({
        [label]: { $in: arrAllProductFilter },
      })
        .limit(limit)

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProductFilterMain,
        totalProduct: totalProductSearch,
        NameSearch: NameSearch,
        noProduct: noProduct || false,
        totalPage: Math.ceil(totalProductSearch / limit),
      });
      // }
    } catch (e) {
      console.log("loi search PRODUCT", e);
    }
  });
};

const getAllProductType = (limit, page, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Get type or gender", filter[1]);
      const totalTypeProduct = await Product.count({
        [filter[0]]: { $regex: filter[1], $options: "i" },
      });

      const allTypeProduct = await Product.find({
        [filter[0]]: { $regex: filter[1], $options: "i" },
      })
        .limit(limit)
        .skip(page * limit);

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allTypeProduct,
        totalProduct: totalTypeProduct,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalTypeProduct / limit),
      });
    } catch (e) {
      console.log("loi search PRODUCT", e);
    }
  });
};

const getAllProductPropose = (limit, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allProductFilterPropose;

      const label1 = filter[0];
      const label2 = filter[2];
      const label3 = filter[4];

      let label4 = filter[1];
      let label5 = filter[3];
      let label6 = filter[5];

      const ageStart = +label5?.split("-")[0];
      const ageEnd = +label5?.split("-")[1];

      const arrAge = [];
      const arrGender = [];
      const arrSize = [];

      console.log('filter[1]', filter[1])

      if (filter[1] === "nu") {
        label4 = "Nữ";
      }
      if (filter[1] !== "nu" && filter[1] !== "nam") {
        label4 = "";
      }
      console.log('label4', label4)

      if (filter[5] === "Beo") {
        label6 = "Mập";
      }
      if (filter[5].toLowerCase() === "thuong") {
        label6 = "Bình thường";
      }
      if (filter[5] === "Om") {
        label6 = "Ốm";
      }
      if (filter[5] !== "Om" && filter[5] !== "thuong" && filter[5] !== "Beo") {
        label6 = "";
      }

      let totalProductPropose;
      if (label5.includes("-")) {
        const arrGenderSize = await Product.find({
          [label1]: { $regex: label4, $options: "i" },
          [label3]: { $regex: label6, $options: "i" },
        });

        for (let i = 0; i < arrGenderSize.length; i++) {
          arrGender.push(arrGenderSize[i]?.gender);
          arrSize.push(arrGenderSize[i]?.size);
          const ageProductStart = +arrGenderSize[i]?.age?.split("-")[0];
          const ageProductEnd = +arrGenderSize[i]?.age?.split("-")[1];
          if (
            ageStart === ageProductStart ||
            ageStart === ageProductEnd ||
            ageEnd === ageProductStart ||
            ageEnd === ageProductEnd ||
            (ageStart < ageProductStart && ageEnd > ageProductStart) ||
            (ageProductEnd > ageStart && ageStart > ageProductStart)
          ) {
            arrAge.push(arrGenderSize[i]?.age);
          }
        }

        totalProductPropose = await Product.count({
          [label1]: { $in: arrGender },
          [label2]: { $in: arrAge },
          [label3]: { $in: arrSize },
        });

        allProductFilterPropose = await Product.find({
          [label1]: { $in: arrGender },
          [label2]: { $in: arrAge },
          [label3]: { $in: arrSize },
        })
          .limit(limit)
      } else {
        allProductFilterPropose = await Product.find({
          [label1]: { $regex: label4, $options: "i" },
          [label3]: { $regex: label6, $options: "i" },
        })
          .limit(limit)

        totalProductPropose = await Product.count({
          [label1]: { $regex: label4, $options: "i" },
          [label3]: { $regex: label6, $options: "i" },
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProductFilterPropose,
        totalProduct: totalProductPropose,
        totalPage: Math.ceil(totalProductPropose / limit),
      });
    } catch (e) {
      console.log("loi propose PRODUCT", e);
    }
  });
};

const getAllProduct = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if (sort && sort.length == 2) {
      //   const objectSort = {};
      //   objectSort[sort[1]] = sort[0];
      //   const allProductSort = await Product.find()
      //     .limit(limit)
      //     .skip(page * limit)
      //     .sort(objectSort);
      //   resolve({
      //     status: "OK",
      //     message: "SUCCESS",
      //     data: allProductSort,
      //     totalProduct: totalProductAll,
      //     pageCurrent: page + 1,
      //     totalPage: Math.ceil(totalProductAll / limit),
      //   });
      // }

      //   ------

      console.log("Get All");
      const totalProductAll = await Product.count();
      const allProduct = await Product.find()
        .limit(limit)
        .sort({ _id: -1 });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProduct,
        totalProduct: totalProductAll,
        totalPage: Math.ceil(totalProductAll / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "GET ALL TYPE SUCCESS",
        data: allType,
      });
    } catch (e) {
      console.log("loi All type", e);
    }
  });
};

const getBestProduct = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProductAll = await Product.count({
        selled: { $gte: 1 },
      });

      const allBest = await Product.find({
        selled: { $gte: 1 },
      })
        .sort({ selled: -1 })
        .limit(limit);
      resolve({
        status: "OK",
        message: "GET BEST PRODUCT SUCCESS",
        data: allBest,
        totalProduct: totalProductAll,
        totalPage: Math.ceil(totalProductAll / limit),
      });
    } catch (e) {
      console.log("loi BEST PRODUCT", e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProductSearch,
  getAllProductType,
  getAllProductPropose,
  getAllProduct,
  deleteManyProduct,
  getAllType,
  getBestProduct,
};
