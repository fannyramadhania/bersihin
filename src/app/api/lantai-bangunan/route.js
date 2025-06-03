import supabase from "@/lib/Database";

export async function GET() {
    const { data, error} = await supabase.from("LantaiBangunan").select("*")
    
    console.log(data)

    console.log(error)


    if (error) {
      return new Response(JSON.stringify({ error: error }), {
        status: 500,
      });
    } else {
      return new Response(
        JSON.stringify({
            status: 200,
            data:data,
        }),
        {
          status: 200,
        }
      );
    }
    
    
}