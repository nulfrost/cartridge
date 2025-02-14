import { client } from "#/app/atproto/client";
import { redirect } from "react-router";
import { ensureValidHandle, ensureValidDid } from "@atproto/syntax";
import type { Route } from "./+types/login";
import { Button } from "#/app/components/ui/button";
import { Input } from "#/app/components/ui/input";
import { Label } from "#/app/components/ui/label";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const handleOrDid = formData.get("handle") as string;

  // user can input a handle or a did
  // first check which one it is
  // then check if it is valid
  if (typeof handleOrDid !== "string") {
    throw new Error("Invalid handle");
  }

  const ac = new AbortController();

  const redirectUrl = await client.authorize(handleOrDid, {
    signal: ac.signal,
  });

  throw redirect(redirectUrl.toString());
  return {};
}

export default function Login() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="max-w-sm w-full mb-6">
        <h1 className="text-xl font-bold">Login</h1>
        <div className="text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="https://bsky.app/"
            target="_blank"
            className="underline underline-offset-4"
            aria-label="Sign up for a new account on Bluesky, opens in a new tab"
          >
            Sign up
          </a>
        </div>
      </div>
      <form className="w-full max-w-sm" method="POST">
        <Label htmlFor="handle" className="block mb-1">
          Handle
        </Label>
        <span className="text-xs text-gray-500 mb-2 block">
          You can use your handle (e.g. @username.bsky.social) or your did (e.g.
          did:plc:abc123) to log in.
        </span>
        <Input
          id="handle"
          name="handle"
          type="text"
          required
          className="mb-4"
          maxLength={2048}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
