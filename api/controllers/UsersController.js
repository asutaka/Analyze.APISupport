'use strict'

//User
module.exports = {
    get: (req, res) => {
        return repo.userList();
    },
	
    detail: (req, res) => {
		return repo.userDetail(req.params.id);
    },
	
    update: (req, res) => {
        let data = req.body;
        let id = req.params.id;
        return repo.userUpdate(data.session, data.phone, data.signature, data.createdtime, data.isactive, id);
    },
	
    store: (req, res) => {
        let data = req.body;
        return repo.userStore(data.session, data.phone, data.signature, data.createdtime, data.isactive, data.id);
    },
	
    delete: (req, res) => {
        return repo.userDelete(req.params.id);
    }
}