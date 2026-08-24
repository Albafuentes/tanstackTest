import { useRouterState } from "@tanstack/react-router";
import useSession from "../../zunstand/session";
import { ABBREVIATION_PT } from "../../config/constants";
import chGreen from "../../assets/svg/ch-green.svg";
import chRed from "../../assets/svg/ch-red.svg";
import { IconStar } from "@tabler/icons-react";
import styles from "./Header.module.css";

export const Header = () => {
  const isDashboardRoute = useRouterState().location.pathname === "/protected";

  const urlImage = Math.random() < 0.5 ? chGreen : chRed;

  const score = useSession((state) => state.score.points);

  return (
    <header>
      {isDashboardRoute && (
        <img src={urlImage} alt="User" width={48} height={48} />
      )}
      <div className={styles["score-pill"]}>
        <IconStar size={18} />
        {score} {ABBREVIATION_PT}
      </div>
    </header>
  );
};
