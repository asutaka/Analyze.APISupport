'use strict'

//Log
module.exports = {
    get: (req, res) => {
        return repo.logList();
    },
    detail: (req, res) => {
		return repo.logDetail(req.params.phone);
    },
    store: (req, res) => {
        let data = req.body;
        return repo.logStore(data.id, data.phone, data.type, data.ip, data.time);
    },
    delete: (req, res) => {
        return repo.logDelete(req.params.id);
    }
}