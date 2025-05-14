import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.COLLECTION);

    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: "Code and language are required" });
    }

    const codeSnippet = {
      code,
      language,
      dateCreated: new Date()
    };

    const result = await collection.insertOne(codeSnippet);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
