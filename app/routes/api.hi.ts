interface ActionArgs {
  request: Request;
}
export async function action({ request }: ActionArgs) {
  return new Response("Hi from API route!", { status: 200 });
}
