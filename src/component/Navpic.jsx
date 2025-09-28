import React from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navpic = () => {
  return (
    <div className="relative">
      <img src="navpic.png" alt="" className="w-full h-auto" />

      <div className="fixed top-80 right-4 z-50 border-2 border-none rounded-full bg-white">
        <IconButton 
  color="primary" 
  sx={{ width: 60, height: 60 }}
>
  <Badge
    badgeContent={1}
    color="primary"
    overlap="circular"
    sx={{
      "& .MuiBadge-badge": {
        minWidth: 15,
        height: 15, fontSize: 12
      }
    }}
  >
    <ShoppingCartIcon sx={{ fontSize: 40 }} />
  </Badge>
</IconButton>
      </div>
    </div>
  );
};

export default Navpic;
