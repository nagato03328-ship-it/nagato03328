import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Supabase Service Role Client (Private)
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase admin credentials missing. Server-side database operations will be disabled.");
  }

  const supabaseAdmin = (supabaseUrl && supabaseServiceKey) 
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

  // Client for token verification (using anon key)
  const supabaseVerify = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

  // API routes
  app.post("/api/delete-account", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");
    
    if (!supabaseAdmin) {
      return res.status(503).json({ error: "Server-side database operations are disabled" });
    }

    try {
      // Verify the user using the verification client (anon key)
      // This is often more reliable for user tokens than using the service role client
      const verifier = supabaseVerify || supabaseAdmin;
      if (!verifier) {
        return res.status(503).json({ error: "Verification service unavailable" });
      }

      const { data: { user }, error: authError } = await verifier.auth.getUser(token);
      
      if (authError || !user) {
        console.error("Token verification failed:", authError);
        return res.status(401).json({ error: "Invalid token" });
      }

      console.log(`Deleting account for user: ${user.id} (${user.email})`);

      // Delete the user
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
      
      if (deleteError) {
        throw deleteError;
      }

      res.json({ success: true });
    } catch (err: any) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/health", async (req, res) => {
    let dbStatus = "not_configured";
    if (supabaseAdmin) {
      try {
        const { error } = await supabaseAdmin.from('profiles').select('count', { count: 'exact', head: true });
        dbStatus = error ? `error: ${error.message}` : "connected";
      } catch (err: any) {
        dbStatus = `exception: ${err.message}`;
      }
    }
    res.json({ 
      status: "ok", 
      database: dbStatus,
      env: {
        hasUrl: !!process.env.VITE_SUPABASE_URL,
        hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    });
  });

  // Admin API: Get all users
  app.get("/api/admin/users", async (req, res) => {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: "Supabase admin not configured" });
    }

    try {
      // Fetch profiles
      const { data: profiles, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      res.json(profiles);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin API: Get total idea count
  app.get("/api/admin/ideas/count", async (req, res) => {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: "Supabase admin not configured" });
    }

    try {
      const { count, error } = await supabaseAdmin
        .from('ideas')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      res.json({ count });
    } catch (err: any) {
      console.error("Error fetching idea count:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin API: Get all ideas with author details
  app.get("/api/admin/ideas", async (req, res) => {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: "Supabase admin not configured" });
    }

    try {
      // 1. Fetch ideas
      const { data: ideas, error: ideasError } = await supabaseAdmin
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false });

      if (ideasError) throw ideasError;

      if (!ideas || ideas.length === 0) {
        return res.json([]);
      }

      // 2. Fetch profiles for these ideas
      const userIds = [...new Set(ideas.map((idea: any) => idea.user_id))];
      const { data: profiles, error: profilesError } = await supabaseAdmin
        .from('profiles')
        .select('user_id, full_name, company_name, email')
        .in('user_id', userIds);

      if (profilesError) throw profilesError;

      // 3. Merge data
      const profilesMap = new Map(profiles?.map((p: any) => [p.user_id, p]));
      
      const ideasWithProfiles = ideas.map((idea: any) => ({
        ...idea,
        profiles: profilesMap.get(idea.user_id) || null
      }));

      res.json(ideasWithProfiles);
    } catch (err: any) {
      console.error("Error fetching admin ideas:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin API: Delete an idea
  app.delete("/api/admin/ideas/:id", async (req, res) => {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: "Supabase admin not configured" });
    }

    const { id } = req.params;

    try {
      const { error } = await supabaseAdmin
        .from('ideas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      res.json({ success: true });
    } catch (err: any) {
      console.error("Error deleting idea:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin API: Delete a user
  app.delete("/api/admin/users/:id", async (req, res) => {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: "Supabase admin not configured" });
    }

    const { id } = req.params;

    try {
      // Delete the user from auth.users (this also deletes from profiles due to cascade if configured, 
      // but we should be sure. The schema provided says: 
      // constraint profiles_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE)
      const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
      
      if (error) throw error;

      res.json({ success: true });
    } catch (err: any) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin API: Update a user
  app.patch("/api/admin/users/:id", async (req, res) => {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: "Supabase admin not configured" });
    }

    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
      // 1. Update Auth User (Email)
      const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, {
        email: email,
        user_metadata: { full_name: name }
      });

      if (authError) throw authError;

      // 2. Update Profile
      const profileType = role === 'Investor' ? 'company' : 'personal';
      const profileUpdate: any = {
        email: email,
        profile_type: profileType,
        updated_at: new Date().toISOString()
      };

      if (profileType === 'personal') {
        profileUpdate.full_name = name;
      } else {
        profileUpdate.company_name = name;
      }

      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update(profileUpdate)
        .eq('user_id', id);

      if (profileError) throw profileError;

      res.json({ success: true });
    } catch (err: any) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("index.html", { root: "dist" });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
