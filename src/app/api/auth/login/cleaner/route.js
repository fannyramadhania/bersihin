import supabase from "@/lib/Database";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const { data, error } = await supabase
      .from("Cleaners")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (data?.length > 0) {
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Login successfully",
          data: data,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 401,
          error: "Invalid email or password",
          message: "Invalid email or password",
        }),
        { status: 401 }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid request format", detail: err.message }),
      { status: 400 }
    );
  }
}
  