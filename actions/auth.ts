"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SignUpPayload, LoginPayload } from "@/types";

import { createClient } from "@/utils/supabase/server";

export async function login({ email, password }: LoginPayload) {
  const supabase = await createClient();

  const data = {
    email: email,
    password: password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/login?message=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup({ email, password, firstName }: SignUpPayload) {
  const supabase = await createClient();

  const data = {
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(`/register?message=${error.message}`);
  }

  revalidatePath("/", "layout");

  return { success: true, email: email };
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
