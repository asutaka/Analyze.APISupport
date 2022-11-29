'use strict'

//Product
module.exports = {
    get: (req, res) => {
        return repo.telegramList();
    },
	
    detail: (req, res) => {
		return repo.telegramDetail(req.params.phone);
    },
	
    update: (req, res) => {
		let data = req.body;
        let id = req.params.id;
        return repo.telegramUpdate(data.status, id);
    },
	
    store: (req, res) => {
		let data = req.body;
        return repo.telegramStore(data.id, data.phone, data.message, data.status, data.createdtime);
    },
	
    delete: (req, res) => {
        return repo.telegramDelete(req.params.id);
    }
}