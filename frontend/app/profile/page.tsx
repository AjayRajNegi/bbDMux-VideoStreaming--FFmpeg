"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState<{ userEmail: string } | null>(null);
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
      <p>UserEmail: {user.userEmail}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
