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

        // Handle state search via address field
        if (queryCopy.state) {
            this.query = this.query.find({
                address: { $regex: queryCopy.state, $options: "i" },
            });
            delete queryCopy.state;
        }

        // Handle NAAC filter (if provided)
        if (queryCopy.naac) {
            this.query = this.query.find({
                naac: { $regex: queryCopy.naac, $options: "i" }
            });
            delete queryCopy.naac;
        }

        // Handle NBA filter (if provided)
        if (queryCopy.nba) {
            this.query = this.query.find({
                nba: { $regex: queryCopy.nba, $options: "i" }
            });
            delete queryCopy.nba;
        }

        // Normalize course input (convert to lowercase for consistent comparison)
        if (queryCopy.course) {
            const bigCourses = ["engineering", "btech", "bsc", "bca", "mca"];
            const courseNormalized = queryCopy.course.toLowerCase();

            if (bigCourses.includes(courseNormalized) && queryCopy.dept) {
                this.query = this.query.find({
                    course: new RegExp(`^${queryCopy.course}$`, "i"),
                    dept: new RegExp(`^${queryCopy.dept}$`, "i")
                });
            } else {
                this.query = this.query.find({
                    course: new RegExp(`^${queryCopy.course}$`, "i")
                });
            }
            delete queryCopy.dept; // Prevent invalid queries
        }

        // Process any remaining filters (e.g., for numeric ranges) using the JSON string replace trick
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

    async sanitizeResults() {
        this.query = this.query.then((results) => {
            return results.map((college) => ({
                ...college.toObject(),
                dept: college.dept || "N/A",
                naac: college.naac || "N/A",
                contact: college.contact || "N/A",
                intake: college.intake || "N/A",
            }));
        });
        return this;
    }
}

export default ApiFeatures;
