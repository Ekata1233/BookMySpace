import testConnection from "@/lib/db";


export default async function handler(req, res) {
  const result = await testConnection();
  
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
}