var Workflow = function (logWriter, mongoose) {

    var workflowSchema = mongoose.Schema({
        _id: String,
        value: [{
            name: { type: String, default: '' },
            status: { type: String, default: 'New' },
            sequence: { type: Number, default: 0 }
        }]
    }, { collection: 'workflows' });

    var relatedStatusSchema = mongoose.Schema({
        _id: Number,
        status:String
    }, { collection: 'relatedStatus' });

    var workflow = mongoose.model('workflows', workflowSchema);
    var rStatus = mongoose.model('relatedStatus', relatedStatusSchema);

    return {
        create: function (data, resault) {
            try {
                if (data) {
                    workflow.findById(data.name, function (err, workflows) {
                        if (err) {
                            console.log(err);
                            logWriter.log('WorkFlow.js create workflow.find ' + err);
                            result.send(400, { error: 'WorkFlow.js create workflow Incorrect Incoming Data' });
                            return;
                        } else {
                            if (workflows) {
                                workflow.update({ _id: workflows._id }, { $push: { value: data.value } }, function (err, res) {
                                    console.log(res);
                                    resault.send(200, { success: 'WorkFlow updated success' });
                                });
                            } else {
                                try {
                                    _workflow = new workflow();
                                    _workflow._id = data.name;
                                    _workflow.value = data.value;
                                    _workflow.save(function (err, workfloww) {
                                        if (err) {
                                            console.log(err);
                                            logWriter.log('WorkFlow.js create workflow.find _workflow.save ' + err);
                                            result.send(500, { error: 'WorkFlow.js create save error' });
                                        } else {
                                            result.send(201, { success: 'A new WorkFlow crate success' });
                                        }
                                    });
                                }
                                catch (err) {
                                    console.log(err);
                                    logWriter.log('WorkFlow.js create _workflow.save ' + err);
                                    result.send(500, { error: 'WorkFlow.js create error' });
                                }
                            }
                        }
                    });
                }
            }
            catch (exception) {
                logWriter.log("Workflow.js  create " + exception);
            }
        },

        get: function (data, response) {
            try {
                var res = {};
                res['data'] = [];
                if (data) {
                    workflow.findById(data.id, function (err, result) {
                        if (err) {
                            console.log(err);
                            logWriter.log('WorkFlow.js create workflow.find ' + err);
                            response.send(500, { error: "Can't find Workflow" });
                        } else {
                            res['data'] = result;
                            response.send(res);
                        }
                    });
                }
            }
            catch (exception) {
                console.log(exception);
                logWriter.log("Workflow.js  create " + exception);
                response.send(500, { error: "Can't find Workflow" });
            }
        },

        getRelatedStatus: function (response) {
            try {
                var res = {};
                res['data'] = [];
                rStatus.find({}, function (err, _statuses) {
                    if (err) {
                        console.log(err);
                        logWriter.log('WorkFlow.js getRelatedStatus ' + err);
                        response.send(500, { error: "Can't find relatedStatus " });
                    } else {
                        res['data'] = _statuses;
                        response.send(res);
                    }
                });
            }
            catch (exception) {
                console.log(exception);
                logWriter.log("Workflow.js  create " + exception);
                response.send(500, { error: "Can't find Workflow" });
            }
        }
    };
};

module.exports = Workflow;