const Repairman = require("../models/repairmanModel");

// ROUTE FUNCTIONS
exports.getAllRepairmen = async (req, res) => {
    try {
    // Filtering:
        const queryObject = { ...req.query };
        const excludedFields = ["sort", "limit", "fields"];
        excludedFields.forEach((element) => delete queryObject[element]);

        // Advanced filtering:
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}` // query rasyti reikia taip: http://localhost:3000/api/v1/hotels?comfort[gte]=5
        );
        // console.log(JSON.parse(queryString));

        let query = Repairman.find(JSON.parse(queryString));

        // Sorting:
    if (req.query.sort){
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy); // http://localhost:3000/api/v1/hotels?comfort[gte]=6&sort=-price
    } else {
        query = query.sort("-created_at"); // http://localhost:3000/api/v1/hotels?comfort[gte]=6&sort
    }

    // Field limiting:
    if (req.query.fields){
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields); // http://localhost:3000/api/v1/hotels?fields=name,address
    }

    // Execute query
    const repairmen = await query;
    res.status(200).json({
        status: "success",
        results: repairmen.length,
        data: {
            repairmen,
        },
    });
    } catch (err) {
        console.log(err);
    }
};

exports.createRepairman = async (req, res) => {
    try {
        const newRepairman = await Repairman.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                repairman: newRepairman,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getRepairmanById = async (req, res) => {
    try {
        const repairman = await Repairman.findById(req.params.id).populate("likes"); // populate, kad sudeti users is duomenu bazes
        if (!repairman) {
            res.status(404).json({
                status: "failed",
                message: "invalid id",
            });
        } else {
            res.status(200).json({
                status: "success",
                data: {
                    repairman,
                },
            });
        }
    } catch (err) {
        console.log(err);
    }
};

// kitam kartui
exports.updateRepairman = async (req, res) => {
    try{
        const repairman = await Repairman.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        repairman.push(req.body)
        res.status(200).json({
            status: "success",
            data: {
                dish,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err.message,
        });
    }
};

exports.updateLikes = async (req, res) => {
    try {
        const repairman = await Repairman.findById(req.params.id);
        if (!repairman) {
            return res.status(404).json({
                status: "failed",
                message: "Dish not found",
            });
        }
        
        const existingLikeIndex = repairman.likes.indexOf(req.body.likes);

        if (existingLikeIndex === -1) {
            // Item does not exist, so add it
            repairman.likes.push(req.body.likes);
        } else {
            // Item exists, so remove it
            repairman.likes.splice(existingLikeIndex, 1);
        }

        await repairman.save();

        res.status(200).json({
            status: "success",
            data: {
                repairman,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err.message,
        });
    }
};

exports.deleteRepairman = async (req, res) => {
    try {
        await Repairman.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                repairman: "deleted",
            },
        });
    } catch (err) {
        console.log(err);
    }
};