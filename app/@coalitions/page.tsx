export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 100000))

  return <h1 className="font-medium">Project ready!</h1>
}
