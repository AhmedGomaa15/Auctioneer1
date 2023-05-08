import { Navigate, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Login } from "./pages/auth/login/login";
import { Register } from "./pages/auth/register/register";
import { AdminHome } from "./pages/admin/admin-home/admin-home";
import { ShowUser } from "./pages/admin/show-user/show-user";
import { UpdateUser } from "./pages/admin/update-user/update-user";
import { SellerHome } from "./pages/Professor/home/professor-home";
import { AuthGuard } from "./guards/auth-guard";
import { Home } from "./pages/home/home";
import { BidderHome } from "./pages/bidder/bidder-home";
import { UpdateBidder } from "./pages/bidder/update-bidder/updateBidder";

export const routes = createBrowserRouter([
  {
    path: "", //localhost:3000
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        // Guard
        element: <AuthGuard roles={[]} />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },

      // Guard for admins
      {
        element: <AuthGuard roles={["Admin"]} />,
        children: [
          {
            path: "/admin-home", // home page
            element: <AdminHome />,
          },
          {
            path: "/show-user/:id",
            element: <ShowUser />,
          },
          {
            path: "/update-user/:id",
            element: <UpdateUser />,
          },
        ],
      },

      // Guard for Seller
      {
        element: <AuthGuard roles={["Seller"]} />,
        children: [
          {
            path: "/Seller-home",
            element: <SellerHome />,
          },
          {
            path: "/Auction-home",
            element: <Home />,
          },
        ],
      },

      // Guard for Bidder
      {
        element: <AuthGuard roles={["Bidder"]} />,
        children: [
          {
            path: "/Bidder-Home",
            element: <BidderHome />,
          },
          {
            path: "/Update-Bid/:id",
            element: <UpdateBidder />,
          },
        ],
      },

      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
]);
