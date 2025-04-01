import testConnection from "@/lib/db";
import officeSpaces from "@/models/officeSpaces";

export default async function handler(req, res) {
  await testConnection();

  if (req.method === "POST") {
    try {
      const newOfficeSpace = await officeSpaces.create(req.body);
      return res.status(201).json({ success: true, data: newOfficeSpace });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  res.status(405).json({ success: false, message: "Method not allowed" });
}
