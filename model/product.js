const productColletion = require('../utilities/productCollection');
const productDb = {};

productDb.getNewProduct = () => {
    return productColletion.getNewProductColletion().then(model=>{
        return model.find({},{_id:0}).then(data=>{
            return data;
        })
    })
}

module.exports = productDb;
