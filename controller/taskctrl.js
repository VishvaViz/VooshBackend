const taskSchema = require('../model/taskmodel')

const addTask = async (req, resp) => {
    const { title, description } = req.body
    const { _id } = req.user
    try {
        if (req.body) {
            if (req.user) {

                const createTask = new taskSchema({
                    author: _id,
                    title: title,
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
    const { taskId, title, description, status } = req.body?.details
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
                            title: title,
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
        console.log('error', error)
        resp.status(500).json({ success: false, message: 'Internal Error', error })
    }
}

// const deleteTask = async (req, resp) => {
//     const { taskId } = req.params
//     const { _id } = req.user
//     console.log('task', taskId)

//     try {


//         if (req.user) {
//             const deleteTask = await taskSchema.findByIdAndDelete(
//                 {
//                     author: _id,
//                     _id: taskId,

//                 },
//                 { new: true }
//             )
//             if (deleteTask) {
//                 await deleteTask.save()
//                 const taskDetails = await taskSchema.find({
//                     author: _id
//                 })
//                 resp.status(201).json({ success: true, message: 'TaskAdded', task: taskDetails })
//             }
//             else {
//                 resp.status(200).json({ success: false, message: 'Someting went wrong' })
//             }
//         }
//         else {
//             resp.status(200).json({ success: false, message: 'Invalid User Credentials' })
//         }
//     }
//     catch (error) {
//         console.log('error', error)
//         resp.status(500).json({ success: false, message: 'Internal Error', error })
//     }
// }

const deleteTask = async (req, resp) => {
    const { taskId } = req.params;
    const { _id } = req.user;

    console.log('task', taskId);

    try {
        if (_id) {
            const deleteTask = await taskSchema.findOneAndDelete(
                {
                    author: _id,
                    _id: taskId,
                }
            );

            if (deleteTask) {
                const taskDetails = await taskSchema.find({ author: _id });
                resp.status(201).json({ success: true, message: 'Task Deleted', task: taskDetails });
            } else {
                resp.status(200).json({ success: false, message: 'Task Not Found' });
            }
        } else {
            resp.status(200).json({ success: false, message: 'Invalid User Credentials' });
        }
    } catch (error) {
        console.log('error', error);
        resp.status(500).json({ success: false, message: 'Internal Error', error });
    }
};




const gettask = async (req, resp) => {
    const { _id } = req.user

    const findTask = await taskSchema.find(
        {
            author: _id
        }
    )
    if (findTask) {
        resp.status(200).json({ success: true, message: 'Task Details Fected', task: findTask })
    }
    else {
        resp.status(200).json({ success: false, message: 'No Task found', task: [] })
    }

}




module.exports = {
    addTask,
    editTask,
    deleteTask,
    gettask

}

