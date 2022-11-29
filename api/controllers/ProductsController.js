'use strict'

//Product
module.exports = {
    get: (req, res) => {
        return repo.productList();
    },
	
    detail: (req, res) => {
		return repo.productDetail(req.params.id);
    },
	
    update: (req, res) => {
        let data = req.body;
        let id = req.params.id;
        return repo.productUpdate(data.name, data.color, data.price, id);
    },
	
    store: (req, res) => {
        let data = req.body;
        return repo.productStore(data.id, data.name, data.color, data.price);
    },
	
    delete: (req, res) => {
        return repo.productDelete(req.params.id);
    }
}