import Udhaar from '../models/Udhaar.js'

const addUdhaar = async (req, res) => {
    try {
        const { customerName, contact, amount, reason, status } = req.body;
        const userId = req.user;

        if (!customerName || !contact || !amount || !status ) {
            return res.status(404).json({msg: 'All fields are required'});
        }

        const newUdhaar = new Udhaar({
            userId, customerName, contact, amount, reason, status
        });

        await newUdhaar.save();
        res.status(201).json({msg: 'Udhaar added successfully!'});
    }
    catch (err) {
        console.log("Error", err);
        res.status(500).json({msg: 'Internal server error'});
    }
}


const getUdhaarList = async (req, res) => {
    try {
        const userId = req.user;

        const udhaarList = await Udhaar.find({ userId });

        if (!udhaarList || udhaarList.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(udhaarList);
    }
    catch (err) {
        console.log("Error", err);
        res.status(500).json({msg: 'Internal server error'});
    }
}

const getUdhaarById = async (req, res) => {
    try {
        const id = req.params.id;
        const udhaar = await Udhaar.findById(id);
        if(!udhaar){
            return res.status(404).json({ msg: "No Udhaar record found" })
        }
        res.status(200).json(udhaar);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const updateUdhaar = async (req, res) => {
    try {
        const { amount, status } = req.body;
        const id = req.params.id;

        const udhaar = await Udhaar.findByIdAndUpdate( id,
            {
                amount, status
            },
            { new: true }
        )

        if (!udhaar) {
            return res.status(404).json({msg: 'No udhaar record found'});
        }
        res.status(200).json({msg: 'Udhaar record updated successfully!'});
    }
    catch (err) {
        console.log("Error", err);
        res.status(500).json({msg: 'Internal server error'});
    }
}


const deleteUdhaar = async (req, res) => {
    try {
        const id = req.params.id;
        const udhaar = await Udhaar.findByIdAndDelete(id);
        if (!udhaar) {
            return res.status(404).json({msg: 'No udhaar record found'});
        }
        res.status(200).json({msg: 'Udhaar record deleted successfully!'});
    }
    catch (err) {
        console.log("Error", err);
        res.status(500).json({msg: 'Internal server error'});
    }
}

export {
    addUdhaar,
    getUdhaarList,
    getUdhaarById,
    updateUdhaar,
    deleteUdhaar
}