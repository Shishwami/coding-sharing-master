import clientPromise from "../lib/mongodb";

export default function handler(req, res) {
    try {

    } catch (err) {
        console.error("API error:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}