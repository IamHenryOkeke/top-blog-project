import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard/home");
  return (
    <div>
      <p>Welcome to my admin page</p>
    </div>
  );
}
