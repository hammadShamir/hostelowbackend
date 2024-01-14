module.exports = {
    buildQuery: (queryParams) => {
        const { _id, slug, location, min, max, userId } = queryParams;
        const queryObject = {};

        if (_id) {
            queryObject._id = _id;
        }
        if (userId) {
            queryObject.userId = userId
        }
        if (slug) {
            queryObject.slug = slug;
        }
        if (location) {
            queryObject.location = location;
        }
        if (min || max) {
            queryObject.price = {};
            if (min) {
                queryObject.price.$gte = parseInt(min);
            }
            if (max) {
                queryObject.price.$lte = parseInt(max);
            }
        }

        return queryObject;
    }
}