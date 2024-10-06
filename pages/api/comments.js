import { supabase } from "../../supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { post_id, content } = req.body;
    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id, content }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === "GET") {
    const { data, error } = await supabase.from("comments").select("*");
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
}
