import { client } from "#/app/atproto/client";
import { redirect, data } from "react-router";
import { isValidHandle } from "@atproto/syntax";
import type { Route } from "./+types/login";
import { Button } from "#/app/components/ui/button";
import { Input } from "#/app/components/ui/input";
import { Label } from "#/app/components/ui/label";

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const handleOrDid = formData.get("handle") as string;

    // user can input a handle or a did
    // first check which one it is
    // then check if it is valid
    // TODO: Support DID login as well as 3rd party PDS login
    if (typeof handleOrDid !== "string" || !isValidHandle(handleOrDid)) {
      return data({ error: "Invalid handle" }, { status: 400 });
    }

    const ac = new AbortController();

    const redirectUrl = await client.authorize(handleOrDid, {
      signal: ac.signal,
    });

    throw redirect(redirectUrl.toString());
  } catch (error) {
    throw error;
  }
}

export default function Login({ actionData }: Route.ComponentProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="max-w-md w-full mb-6">
        <h1 className="text-xl font-bold">Login</h1>
        <p>
          Don&apos;t have an account?{" "}
          <a
            href="https://bsky.app/"
            target="_blank"
            className="underline underline-offset-4 text-primary"
            aria-label="Sign up for a new account on Bluesky, opens in a new tab"
          >
            Sign up
          </a>
        </p>
      </div>
      <form className="w-full max-w-md" method="POST">
        <Label htmlFor="handle" className="block text-md">
          Handle
        </Label>
        {actionData?.error ? (
          <span className="block text-red-600 mb-2" id="username-error">
            {actionData?.error}
          </span>
        ) : null}
        <span className="block text-gray-600 mb-2" id="username-hint">
          Please enter a valid handle, e.g. username.bsky.social
        </span>
        <Input
          id="handle"
          name="handle"
          type="text"
          required
          className="mb-4"
          autoComplete="username"
          maxLength={2048}
          aria-invalid={actionData?.error ? true : undefined}
          aria-describedby="username-hint username-error"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
