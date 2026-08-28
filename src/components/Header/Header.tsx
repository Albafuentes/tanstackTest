import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { totalScore } from "@/utils/score.utils";
import { Button } from "@/components";
import { IconSettings } from "@tabler/icons-react";
import { Sidebar } from "../Sidebar";
import useSession from "../../zunstand/session";
import { ABBREVIATION_PT } from "../../config/constants";
import chGreen from "../../assets/svg/ch-green.svg";
import { IconStar } from "@tabler/icons-react";
import styles from "./Header.module.css";
import { formatDate } from "@/utils/formats";
import { clearToken, decodeToken } from "@/utils/auth.util";

const Logo = ({ avatarUrl }: { avatarUrl: string }) => {


  return <img src={avatarUrl} loading="lazy" alt="User" width={48} height={48} />;
};

export const Header = () => {
  const navigate = useNavigate();
  const location = useRouterState().location.pathname;
  const isDashboardRoute = location === "/dashboard";
  const isSettingsRoute = location === "/dashboard/settings";

  const user = decodeToken();

  const history = useSession((state) => state.history);

  const handleLogout = () => {
    clearToken();
    navigate({ to: "/" });
  }

  return (
    <header id={styles["header"]}>
      {(isDashboardRoute || isSettingsRoute) && (
        <Sidebar>
          <Sidebar.Trigger className={styles["sidebar-item__trigger"]}>
            <Logo avatarUrl={user?.avatarURL || chGreen} />
          </Sidebar.Trigger>
          <Sidebar.Item readonly>
            <div className={styles["sidebar-item__header"]}>
              <Logo avatarUrl={user?.avatarURL || chGreen} />
              <span>Invited</span>
              <small>session: {formatDate(user?.createdAt)}</small>

            </div>
          </Sidebar.Item>
          <Sidebar.Item withSeparator>
            <Link to="/dashboard/settings"><IconSettings size={20} />Settings</Link>
          </Sidebar.Item>

          <Sidebar.Footer>
            <Button onClick={handleLogout} variant="link">Log out</Button>
          </Sidebar.Footer>
        </Sidebar>
      )}
      <div className={styles["score-pill"]}>
        <IconStar size={18} />
        {totalScore(history || [])} {ABBREVIATION_PT}
      </div>
    </header>
  );
};
