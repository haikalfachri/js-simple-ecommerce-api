prisma.$use(async (params, next) => {
    if (params.model === 'User') {
        if (params.action === 'delete') {
            if (params.args?.forceDelete) {
                return next(params);
            } else {
                params.action = 'update';
                params.args['data'] = {
                    deleted: true,
                    deletedAt: new Date(),
                };
            }
        }
        if (params.action === 'deleteMany') {
            if (params.args?.forceDelete) {
                return next(params);
            } else {
                params.action = 'updateMany';
                if (params.args.data !== undefined) {
                    params.args.data['deleted'] = true;
                    params.args.data['deletedAt'] = new Date();
                } else {
                    params.args['data'] = {
                        deleted: true,
                        deletedAt: new Date(),
                    };
                }
            }
        }
    }
    return next(params);
});

module.exports = prisma;