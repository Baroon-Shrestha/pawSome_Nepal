import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import AllPets from "./pages/allPets/allPets";
import CreatePets from "./dashboard/dashboardPages/createPets/createPets";
import Favourites from "./pages/favourites/favourites";
import DashboardHome from "./dashboard/dashboardPages/dashboardHome/dashboardHome";
import EditPets from "./dashboard/dashboardPages/editPets/editPets";
import DashboardPets from "./dashboard/dashboardPages/dashboardPets/dashboardPets";
import NewPetDescription from "./pages/newPetDescriptionPage/newPetDescription";
import AdoptPage from "./pages/adoptPet/adoptPage";
import ManageAdoptionRequest from "./dashboard/dashboardPages/manageAdoptionRequest/manageAdoptionRequest";
import AdoptionRequest from "./pages/adoptionRequest/adoptionRequest";
import UserProfile from "./pages/userProfile/userProfile";
import Products from "./pages/products/Products";
import ProductDesc from "./pages/productDescription/productDesc";
import Cart from "./pages/cart/cart";
import PetHostel from "./pages/petHostel/PetHostel";
import Homestay from "./pages/petHomestay/Homestay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/userProfile",
    element: <UserProfile />,
  },
  {
    path: "/favourites",
    element: <Favourites />,
  },
  {
    path: "/create",
    element: <CreatePets />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/allPets",
    element: <AllPets />,
  },
  {
    path: "/newPetDescription/:id",
    element: <NewPetDescription />,
  },
  {
    path: "/dashboard",
    element: <DashboardHome />,
  },
  {
    path: "/managepets",
    element: <DashboardPets />,
  },

  {
    path: "/editPets/:id",
    element: <EditPets />,
  },
  {
    path: "newPetDescription",
    element: <NewPetDescription />,
  },
  {
    path: "adoptPet/:id",
    element: <AdoptPage />,
  },
  {
    path: "manageAdoptionRequest",
    element: <ManageAdoptionRequest />,
  },
  {
    path: "viewAdoptionRequest",
    element: <AdoptionRequest />,
  },
  {
    path: "viewAdoptionRequest",
    element: <AdoptionRequest />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "productdescription",
    element: <ProductDesc />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "homestay",
    element: <Homestay />,
  },
  {
    path: "hostel",
    element: <PetHostel />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
  // <React.StrictMode>
  // </React.StrictMode>
);
