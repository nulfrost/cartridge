import { getPdsEndpoint } from "@atcute/client/utils/did";
import { CredentialManager, XRPC } from "@atcute/client";

async function resolveHandle(handle: string) {
  const rpc = new XRPC({
    handler: new CredentialManager({ service: "https://public.api.bsky.app" }),
  });

  const response = await rpc.get("com.atproto.identity.resolveHandle", {
    params: { handle: handle },
  });

  return response.data.did;
}

export async function resolveFromIdentity(identity: string) {
  let did: string;

  if (isValidDid(identity)) {
    did = identity;
  } else {
    did = await resolveHandle(identity);
  }

  const didDoc = await getDidDocument(did);
  const serviceEndpoint = getPdsEndpoint(didDoc);

  if (!serviceEndpoint) {
    throw new Error("could not locate service endpoint");
  }

  return {
    did,
    doc: didDoc,
    serviceEndpoint: new URL(serviceEndpoint),
  };
}

async function getDidDocument(did: string) {
  const didUrl = did.startsWith("did:web")
    ? `https://${did.split(":")[2]}/.well-known/did.json`
    : `https://plc.directory/${did}`;

  const response = await fetch(didUrl);

  const data = response.json();

  return data;
}

function isValidDid(did: string) {
  return did.match(/^did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._-]$/);
}
