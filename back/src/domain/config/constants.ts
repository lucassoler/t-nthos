export default (() => {
    const constants = {
        IDENTIFICATION: {
            AUTHORIZED_SORT_BY: ['id', 'source', 'createdAt', 'status'],
            AUTHORIZED_STATUS: ['WAITING', 'REJECTED', 'ACCEPTED']
        }
    }

    return constants;
})();