import { client } from "#/app/atproto/client";
import { redirect, data, useNavigation, Form } from "react-router";
import type { Route } from "./+types/login";
import { Button } from "#/app/components/ui/button";
import { Input } from "#/app/components/ui/input";
import { Label } from "#/app/components/ui/label";
import { resolveFromIdentity } from "#/app/lib/pds";
import { OAuthResolverError } from "@atproto/oauth-client-node";
import { XRPCError } from "@atcute/client";
import { useEffect, useRef, type ComponentRef } from "react";

export function meta() {
	return [
		{
			title: "cartridge | Login",
		},
	];
}

export async function action({ request }: Route.ActionArgs) {
	try {
		const formData = await request.formData();
		const identity = formData.get("identity") as string;

		/*
    Identity formats:
      at://dane.computer
      dane.computer
      did:plc:qttsv4e7pu2jl3ilanfgc3zn
      did:web:lizthegrey.com
    */
		if (typeof identity !== "string") {
			return data(
				{ error: "Error: handle must be a valid handle" },
				{ status: 400 },
			);
		}

		const formattedIdentity = identity.startsWith("at://")
			? new URL(identity).hostname.trim()
			: identity.trim();

		const resolvedIdentity = await resolveFromIdentity(formattedIdentity);

		const ac = new AbortController();

		const redirectUrl = await client.authorize(resolvedIdentity.did, {
			signal: ac.signal,
		});

		throw redirect(redirectUrl.toString());
	} catch (error) {
		if (error instanceof OAuthResolverError) {
			return data({ error: error.message }, { status: 400 });
		}
		if (error instanceof XRPCError) {
			return data({ error: error.description }, { status: 400 });
		}
		throw error;
	}
}

export default function Login({ actionData }: Route.ComponentProps) {
	const inputRef = useRef<ComponentRef<"input">>(null);

	const navigation = useNavigation();

	const isSubmitting =
		navigation.state === "submitting" && navigation.formAction === "/login";

	useEffect(() => {
		if (actionData?.error) {
			inputRef?.current?.focus();
		}
	}, [actionData?.error]);
	return (
		<div className="h-full flex flex-col items-center justify-center min-h-screen">
			<div className="max-w-md w-full mb-6">
				<h1 className="text-xl font-bold">Login</h1>
				<p>
					Don&apos;t have an account?{" "}
					<a
						href="https://bsky.app/"
						target="_blank"
						className="underline underline-offset-4 text-primary"
						aria-label="Sign up for a new account on Bluesky, opens in a new tab"
						rel="noreferrer"
					>
						Sign up
					</a>
				</p>
			</div>
			<Form className="w-full max-w-md" method="POST">
				<fieldset disabled={isSubmitting}>
					<Label htmlFor="identity" className="block text-md">
						Handle
					</Label>
					{actionData?.error ? (
						<span className="block text-red-600 mb-2" id="username-error">
							{actionData?.error}
						</span>
					) : null}
					<span className="block text-gray-600 mb-2 text-xs" id="username-hint">
						Please enter a valid handle, e.g. username.bsky.social
					</span>
					<Input
						ref={inputRef}
						id="identity"
						name="identity"
						type="text"
						required
						className="mb-4"
						autoComplete="username"
						maxLength={2048}
						aria-invalid={actionData?.error ? true : undefined}
						aria-describedby="username-hint username-error"
					/>
					<Button type="submit" className="w-full font-bold">
						{isSubmitting ? "Logging in..." : "Login"}
					</Button>
				</fieldset>
			</Form>
		</div>
	);
}
