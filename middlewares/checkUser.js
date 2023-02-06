function checkUser(req, res, next){
    let userList = [1,2,3,4,5,6]
    let id = req.params.id
    
    if(userList.includes(parseInt(id))){
        next()
    }
    else{
        res.status(404).json({
            users : {}
        })
    }
}

module.exports = checkUser