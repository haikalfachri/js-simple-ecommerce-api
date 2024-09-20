const { prisma } = require('../config/db');

prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model == '') {
        if (params.action == 'delete') {
            // Delete queries
            // Change action to an update
            params.action = 'update'
            params.args['data'] = { 
                deleted: true,
                deletedAt: new Date() 
            }
        }
        if (params.action == 'deleteMany') {
            // Delete many queries
            params.action = 'updateMany'
            if (params.args.data != undefined) {
                params.args.data['deleted'] = true;
                params.args.data['deletedAt'] = new Date();
            } else {
                params.args['data'] = { 
                    deleted: true,
                    deletedAt: new Date()
                }
            }
        }
    }
    return next(params)
})

module.exports = prisma;