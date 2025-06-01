import { createBrowserRouter, Outlet } from "react-router-dom";
import { Layout } from "antd";
import { TablePage } from "@/pages/TablePage/TablePage";

const { Header } = Layout;

const AppLayout = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header></Header>
    <Outlet />
  </Layout>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <TablePage />,
      }
    ],
  },
]);
