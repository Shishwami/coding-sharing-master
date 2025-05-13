import clientPromise from "../lib/mongodb.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.COLLECTION);

        let id = req.query.id;
        const doc = await collection.findOne({_id:new ObjectId(id)});
        
        if (!doc)
            return res.status(404).json({ error: 'Document not found' });

        return res.status(200).json(doc);

    } catch (err) {
        console.error("API error:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}