const router=require('express').Router()

const {
    addTask,
    editTask,
    deleteTask,
    gettask
}=require('../controller/taskctrl')
const { jwtverify } = require('../middleware/jwtverify')

router.get('/gettask',jwtverify,gettask)
router.post('/addtask',jwtverify,addTask)
router.put('/edittask',jwtverify,editTask)
router.put('/deletetask',jwtverify,deleteTask)

module.exports=router