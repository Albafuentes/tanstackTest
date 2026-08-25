import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/Button/Button";
import { IconSettings } from "@tabler/icons-react";
import { Sidebar } from "../Sidebar";
import useSession from "../../zunstand/session";
import { ABBREVIATION_PT } from "../../config/constants";
import chGreen from "../../assets/svg/ch-green.svg";
import chRed from "../../assets/svg/ch-red.svg";
import { IconStar } from "@tabler/icons-react";
import styles from "./Header.module.css";

const Logo = () => {
  const urlImage = Math.random() < 0.5 ? chGreen : chRed;
  return <img src={urlImage} alt="User" width={48} height={48} />;
};

export const Header = () => {
  const isDashboardRoute = useRouterState().location.pathname === "/protected";
  const session = useSession();

  return (
    <header id={styles["header"]}>
      {isDashboardRoute && (
        <Sidebar>
          <Sidebar.Trigger>
            <Logo />
          </Sidebar.Trigger>
          <Sidebar.Item readonly>
            <div className={styles["sidebar-item__header"]}>
              <Logo />
              {session?.identity.user}
            </div>
          </Sidebar.Item>
          <Sidebar.Item withSeparator>
            <Link to="/protected/settings"><IconSettings size={20} />Settings</Link>
          </Sidebar.Item>

          <Sidebar.Footer>
            <Button onClick={() => console.log("Log out")} variant="link">Log out</Button>

          </Sidebar.Footer>
        </Sidebar>
      )}
      <div className={styles["score-pill"]}>
        <IconStar size={18} />
        {session?.score?.points} {ABBREVIATION_PT}
      </div>
    </header>
  );
};
