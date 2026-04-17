import { createClient } from "next-sanity";

const client = createClient({
  projectId: "v4n48inp",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function run() {
  const data = await client.fetch(`*[_type == "hero"][0] { 
    _id, 
    title, 
    subtitle, 
    "videoUrls": backgroundVideos[].asset->url 
  }`);
  console.log(JSON.stringify(data, null, 2));
}

run().catch(console.error);
