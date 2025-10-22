// supabase/functions/get-contact-analytics/index.js
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

serve(async (req) => {
  try {
    // Get comprehensive analytics
    const { data: messages, error } = await supabase
      .from("contact_messages")
      .select("*");

    if (error) throw error;

    const now = new Date();
    const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));

    const analytics = {
      total: messages.length,
      thisWeek: messages.filter((msg) => new Date(msg.created_at) > oneWeekAgo)
        .length,
      today: messages.filter(
        (msg) =>
          new Date(msg.created_at).toDateString() === new Date().toDateString()
      ).length,
      responded: messages.filter((msg) => msg.status === "replied").length,
      responseRate:
        Math.round(
          (messages.filter((msg) => msg.status === "replied").length /
            messages.length) *
            100
        ) || 0,
    };

    return new Response(JSON.stringify(analytics), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
