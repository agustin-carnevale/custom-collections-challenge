import { FC } from "react";

import { NavBar } from "../ui";

interface CreateLayoutProps {
  title: string;
  children?: React.ReactNode;
}

export const CreateLayout: FC<CreateLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <nav>
        <NavBar title={title} />
      </nav>

      <main
        style={{
          padding: "15px",
        }}
      >
        {children}
      </main>
    </>
  );
};
