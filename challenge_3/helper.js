const mongo = require('./mongodb/mongo')


module.exports = {
    handlePost: (req, res) => {
        let data = req.body
        // console.log('server side account post', data);
        //do something on the url and data
        mongo.insert(data)
        res.send('Success');
    },

    handleGet: (req, res) => {
        //use find to get things from mongod:

        mongo.retrieve((data) => {
            res.send(data);
        })
        
    }

}