class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
        this.defaultLimit = 20;  // Default number of results
        this.limit = 50;         // Maximum permissible limit
        this.extremeLimit = 101; // Hard limit, anything above this is restricted
        this.warningMessage = null; // Store warning messages
    }

    search() {
        if (this.queryStr.keyword) {
            this.query = this.query.find({
                college_name: { $regex: this.queryStr.keyword, $options: "i" },
            });
        }
        return this;
    }
    filter() {
        let queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit", "sort"];
        removeFields.forEach((key) => delete queryCopy[key]);

        // Extract state if provided in query
        if (queryCopy.state) {
            this.query = this.query.find({
                address: { $regex: queryCopy.state, $options: "i" },
            });
            delete queryCopy.state; // Remove processed field
        }

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }


    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("college_name");
        }
        return this;
    }

    pagination() {
        const page = Number(this.queryStr.page) || 1;
        let resultLimit = Number(this.queryStr.limit) || this.defaultLimit;

        if (resultLimit > this.extremeLimit) {
            this.warningMessage = `⚠️ Extreme limit of ${this.extremeLimit} exceeded. Returning ${this.defaultLimit} results.`;
            resultLimit = this.defaultLimit;
        } else if (resultLimit > this.limit) {
            this.warningMessage = `⚠️ User requested more than the allowed limit (${this.limit}). Returning ${this.limit} results.`;
            resultLimit = this.limit;
        }

        const skip = resultLimit * (page - 1);
        this.query = this.query.limit(resultLimit).skip(skip);
        return this;
    }
}

export default ApiFeatures;









// class ApiFeatures {
//     constructor(query, queryStr) {
//         this.query = query;
//         this.queryStr = queryStr;
//         this.defaultLimit = 20;  // Default number of results
//         this.limit = 50;         // Maximum permissible limit
//         this.extremeLimit = 101; // Hard limit, anything above this is restricted
//         this.warningMessage = null; // Store warning messages
//     }

//     search() {
//         if (this.queryStr.keyword) {
//             this.query = this.query.find({
//                 college_name: { $regex: this.queryStr.keyword, $options: "i" },
//             });
//         }
//         return this;
//     }

//     filter() {
//         let queryCopy = { ...this.queryStr };
//         const removeFields = ["keyword", "page", "limit", "sort"];
//         removeFields.forEach((key) => delete queryCopy[key]);

//         let queryStr = JSON.stringify(queryCopy);
//         queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

//         this.query = this.query.find(JSON.parse(queryStr));
//         return this;
//     }

//     sort() {
//         if (this.queryStr.sort) {
//             const sortBy = this.queryStr.sort.split(",").join(" ");
//             this.query = this.query.sort(sortBy);
//         } else {
//             this.query = this.query.sort("college_name");
//         }
//         return this;
//     }

//     pagination() {
//         const page = Number(this.queryStr.page) || 1;
//         let resultLimit = Number(this.queryStr.limit) || this.defaultLimit;

//         if (resultLimit > this.extremeLimit) {
//             this.warningMessage = `⚠️ Extreme limit of ${this.extremeLimit} exceeded. Returning ${this.defaultLimit} results.`;
//             resultLimit = this.defaultLimit;
//         } else if (resultLimit > this.limit) {
//             this.warningMessage = `⚠️ User requested more than the allowed limit (${this.limit}). Returning ${this.limit} results.`;
//             resultLimit = this.limit;
//         }

//         const skip = resultLimit * (page - 1);
//         this.query = this.query.limit(resultLimit).skip(skip);
//         return this;
//     }
// }

// export default ApiFeatures;
