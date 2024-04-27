import { ConnectKitButton } from "connectkit";
import React from "react";

function Navbar() {
  return (
    <div className="border-b shadow-gray-800 container justify-between flex">
      <>ABGS</>
      <ConnectKitButton />
    </div>
  );
}

export default Navbar;
