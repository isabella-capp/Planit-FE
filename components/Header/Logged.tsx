import { LogOut } from "lucide-react";
import React, { FC } from "react";

interface LoggedHeaderProps {
  username: string;
}

const Logged: FC<LoggedHeaderProps> = ({ username }) => {
  const handleLogout = async () => {
    const response = await fetch(`http://127.0.0.1:5000/api/logout`, {
      method: 'POST',
      credentials: 'include', // Importante per inviare i cookie di sessione
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Logout failed: ', result.message);
    } else {
      window.location.href = '/'; // Redirect to home
    }
  };

  return <>
    <div className="flex flex-row gap-6 items-center">
        <h3 className="font-bold"> Hello {username}!</h3>
        <button onClick={handleLogout}>
            <LogOut className="h-[24px] w-[24px]"></LogOut>
        </button>
    </div>
  </>
}

export default Logged