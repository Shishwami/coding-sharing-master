import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.COLLECTION);

        const { code, language } = req.query;
        const codeSnippet = {
            code: code,
            language: language,
            dateCreated: new Date
        }

        const result = await collection.insertOne(codeSnippet);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        console.error("API error:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}