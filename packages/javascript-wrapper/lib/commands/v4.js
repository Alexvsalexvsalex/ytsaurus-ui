var v3 = require('./v3');

module.exports = {
    // Transactions
    startTransaction: v3.startTransaction,
    pingTransaction: v3.pingTransaction,
    abortTransaction: v3.abortTransaction,
    commitTransaction: v3.commitTransaction,

    // Cypress
    move: v3.move,
    create: v3.create,
    remove: v3.remove,
    copy: v3.copy,
    link: v3.link,
    set: v3.set,
    lock: v3.lock,
    get: v3.get,
    list: v3.list,
    exists: v3.exists,

    // Files
    download: v3.download,
    readFile: v3.readFile,
    upload: v3.upload,
    writeFile: v3.writeFile,

    // Tables
    read: v3.read,
    readTable: v3.readTable,
    write: v3.write,
    writeTable: v3.writeTable,
    selectRows: v3.selectRows,
    mountTable: v3.mountTable,
    unmountTable: v3.unmountTable,
    remountTable: v3.remountTable,
    alterTable: v3.alterTable,
    insertRows: v3.insertRows,
    alterTableReplica: v3.alterTableReplica,
    getTabletErrors: {
        name: 'get_tablet_errors',
        method: 'GET',
        dataType: 'json',
    },

    // Journal
    readJournal: v3.readJournal,
    writeJournal: v3.writeJournal,

    // Groups, Users, Accounts, ACL
    addMember: v3.addMember,
    removeMember: v3.removeMember,
    checkPermission: v3.checkPermission,
    transferAccountResources: {
        name: 'transfer_account_resources',
        method: 'POST',
        dataType: 'json'
    },
    transferPoolResources: {
        name: 'transfer_pool_resources',
        method: 'POST',
        dataType: 'json'
    },
    setUserPassword: {
        name: 'set_user_password',
        method: 'POST',
        dataType: 'json'
    },

    // Operations
    abortOperation: v3.abortOperation,
    resumeOperation: v3.resumeOperation,
    suspendOperation: v3.suspendOperation,
    completeOperation: v3.completeOperation,
    updateOperationParameters: v3.updateOperationParameters,
    map: v3.map,
    reduce: v3.reduce,
    mapReduce: v3.mapReduce,
    joinReduce: v3.joinReduce,
    erase: v3.erase,
    merge: v3.merge,
    sort: v3.sort,
    remoteCopy: v3.remoteCopy,
    _listOperations: v3._listOperations,
    _getOperation: v3._getOperation,
    listOperations: v3._listOperations,
    getOperation: v3.getOperation,

    // Jobs
    listJobs: v3.listJobs,
    getJob: v3.getJob,
    straceJob: v3.straceJob,
    dumpJobContext: v3.dumpJobContext,
    getJobInputPaths: v3.getJobInputPaths,
    signalJob: v3.signalJob,
    abandonJob: v3.abandonJob,
    abortJob: v3.abortJob,
    getJobSpec: {
        name: 'get_job_spec',
        method: 'GET',
        dataType: 'json'
    },

    // Other
    parseYPath: v3.parseYPath,
    executeBatch: v3.executeBatch,
    _discoverVersions: v3._discoverVersions,

    // QueryTracker
    listQueries: {
        name: 'list_queries',
        method: 'GET',
        dataType: 'json'
    },
    getQuery: {
        name: 'get_query',
        method: 'GET',
        dataType: 'json'
    },
    startQuery: {
        name: 'start_query',
        method: 'POST',
        dataType: 'json'
    },
    readQueryResults: {
        name: 'read_query_result',
        method: 'GET',
        dataType: 'json'
    },
    getQueryResults: {
        name: 'get_query_result',
        method: 'GET',
        dataType: 'json'
    },
    abortQuery: {
        name: 'abort_query',
        method: 'POST',
        dataType: 'json'
    },
    alterQuery: {
        name: 'alter_query',
        method: 'POST',
        dataType: 'json'
    }
}
