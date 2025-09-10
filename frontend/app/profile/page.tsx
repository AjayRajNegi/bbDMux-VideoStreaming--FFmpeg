"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/user");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch(`/api/auth/logout`, {
      method: "POST",
    });
    router.push("/login");
  };

  return user ? (
    <div>
      <h2>User Information</h2>
      <p className="text-black">UserEmail: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
