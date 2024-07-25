const taskSchema = require('../model/taskmodel')

const addTask = async (req, resp) => {
    const { tittle, description } = req.body
    const { _id } = req.user
    try {
        if (req.body) {
            if (req.user) {

                const createTask = new taskSchema({
                    author: _id,
                    tittle: tittle,
                    description: description
                })
                if (createTask) {
                    await createTask.save()
                    const taskDetails = await taskSchema.find({
                        author: _id
                    })
                    resp.status(201).json({ success: true, message: 'TaskAdded', task: taskDetails })
                }
                else {
                    resp.status(200).json({ success: false, message: 'Someting went wrong' })
                }
            }
            else {
                resp.status(200).json({ success: false, message: 'Invalid User Credentials' })
            }
        }
        else {
            resp.status(200).json({ success: false, message: 'Invalid Payload' })
        }
    }
    catch (error) {
        resp.status(500).json({ success: false, message: 'Internal Error', error })
    }
}

const editTask = async (req, resp) => {
    const { taskId, tittle, description, status } = req.body
    const { _id } = req.user

    try {

        if (req.body) {
            if (req.user) {
                const findTask = await taskSchema.findByIdAndUpdate(
                    {
                        author: _id,
                        _id: taskId
                    },
                    {
                        $set: {
                            tittle: tittle,
                            description: description,
                            status: status
                        }
                    },
                    {
                        new: true
                    }
                )
                if (findTask) {
                    await findTask.save()
                    const taskDetails = await taskSchema.find({
                        author: _id
                    })
                    resp.status(201).json({ success: true, message: 'TaskAdded', task: taskDetails })
                }
                else {
                    resp.status(200).json({ success: false, message: 'Someting went wrong' })
                }
            }
            else {
                resp.status(200).json({ success: false, message: 'Invalid User Credentials' })
            }
        }
        else {
            resp.status(200).json({ success: false, message: 'Invalid Payload' })
        }
    }
    catch (error) {
        resp.status(500).json({ success: false, message: 'Internal Error', error })
    }
}

const deleteTask = async (req, resp) => {
    const { taskId } = req.params
    const { _id } = req.user

    try {

        if (req.body) {
            if (req.user) {
                const deleteTask = await taskSchema.findByIdAndUpdate(
                    {
                        author: _id,
                    },
                    {
                        $pull: {
                            _id: taskId
                        },
                    },
                    {
                        new:true
                    }
                )
                if (deleteTask) {
                    await deleteTask.save()
                    const taskDetails = await taskSchema.find({
                        author: _id
                    })
                    resp.status(201).json({ success: true, message: 'TaskAdded', task: taskDetails })
                }
                else {
                    resp.status(200).json({ success: false, message: 'Someting went wrong' })
                }
            }
            else {
                resp.status(200).json({ success: false, message: 'Invalid User Credentials' })
            }
        }
        else {
            resp.status(200).json({ success: false, message: 'Invalid Payload' })
        }
    }
    catch (error) {
        resp.status(500).json({ success: false, message: 'Internal Error', error })
    }
}

const gettask=async(req,resp)=>{
    const {_id}=req.user

    const findTask=await taskSchema.find(
        {
            author:_id
        }
    )
    if(findTask){
        resp.status(200).json({success:true,message:'Task Details Fected',task:findTask})
    }
    else{
        resp.status(200).json({success:false,message:'No Task found',task:[]})
    }

}




module.exports = {
    addTask,
    editTask,
    deleteTask,
    gettask

}

