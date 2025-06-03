import supabase from "@/lib/Database";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log(body);
    
    const { data, error } = await supabase
      .from("Customers")
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

export async function POST(request) {
  const formData = await request.formData();
  console.log(formData);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  const address = formData.get("address");



  const { data, error } = await supabase
    .from("Customers")
    .insert({
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
    });

  
  console.log(data);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new Response(
      JSON.stringify({
        status: 201,
        message: "Successfully created",
      }),
      {
        status: 201,
      }
    );
  }
}
