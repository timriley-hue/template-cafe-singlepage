#!/usr/bin/env npx tsx
/**
 * Run once when setting up a new client:
 *   npx tsx scripts/setup-client.ts
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline/promises";

const envPath = path.join(process.cwd(), ".env.local");
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";
const env = Object.fromEntries(
  envContent.split("\n").filter(Boolean).map((l) => l.split("=").map((s) => s.trim()))
);

const supabaseUrl = env["SUPABASE_URL"] || process.env.SUPABASE_URL;
const serviceKey = env["SUPABASE_SERVICE_ROLE_KEY"] || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function main() {
  console.log("\nPageNest — New client setup\n");

  const clientName = await rl.question("Client name (e.g. Brunch & Brew): ");
  const clientSlug = await rl.question("Client slug (e.g. brunch-brew, no spaces): ");
  const clientEmail = await rl.question("Admin login email for client: ");
  const clientPassword = await rl.question("Admin login password for client: ");

  rl.close();

  // Create auth user
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email: clientEmail,
    password: clientPassword,
    email_confirm: true,
  });

  if (userError) {
    console.error("Failed to create user:", userError.message);
    process.exit(1);
  }

  const userId = userData.user.id;

  // Create client record
  const { data: clientData, error: clientError } = await supabase
    .from("clients")
    .insert({ slug: clientSlug, name: clientName, user_id: userId })
    .select()
    .single();

  if (clientError) {
    console.error("Failed to create client:", clientError.message);
    process.exit(1);
  }

  const clientId = clientData.id;

  // Seed hours from content/hours.json
  const hoursFile = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/hours.json"), "utf-8"));
  await supabase.from("hours").insert(
    hoursFile.hours.map((row: any, i: number) => ({
      client_id: clientId,
      days: row.days,
      open: row.open,
      close: row.close,
      sort_order: i,
    }))
  );

  // Seed menu from content/menu.json
  const menuFile = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/menu.json"), "utf-8"));
  for (let ci = 0; ci < menuFile.categories.length; ci++) {
    const cat = menuFile.categories[ci];
    const { data: catData } = await supabase
      .from("menu_categories")
      .insert({ client_id: clientId, name: cat.name, sort_order: ci })
      .select()
      .single();

    if (catData) {
      await supabase.from("menu_items").insert(
        cat.items.map((item: any, ii: number) => ({
          client_id: clientId,
          category_id: catData.id,
          name: item.name,
          price: item.price,
          dietary: item.dietary,
          sort_order: ii,
        }))
      );
    }
  }

  // Seed FAQ from content/home.json
  const homeFile = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/home.json"), "utf-8"));
  await supabase.from("faq_items").insert(
    homeFile.faq.map((item: any, i: number) => ({
      client_id: clientId,
      question: item.question,
      answer: item.answer,
      sort_order: i,
    }))
  );

  console.log(`\n✅ Client "${clientName}" created successfully.`);
  console.log(`   Client ID: ${clientId}`);
  console.log(`\nAdd these to .env.local:`);
  console.log(`   NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`);
  console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key>`);
  console.log(`   CLIENT_ID=${clientId}`);
  console.log(`\nThen set clientEditing: true in content/modules.json\n`);
}

main().catch(console.error);
