import { FC } from "react";
import { NavBar } from "../ui";

interface HomeLayoutProps {
  title: string;
  children?: React.ReactNode;
}

export const HomeLayout: FC<HomeLayoutProps> = ({ title, children }) => {
  return (
    <>
      <nav>
        <NavBar title={title} />
      </nav>

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
    </>
  );
};

