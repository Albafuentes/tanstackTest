
import { createRoute, Link } from '@tanstack/react-router'
import { Route as ProtectedRoutesLayoutRoute } from "../layout";
import { IconChevronRight, IconDiamond } from '@tabler/icons-react';
import useScore from '../../../../zunstand/score';

export const Route = createRoute({
  getParentRoute: () => ProtectedRoutesLayoutRoute,
  path: "/",
  component: Dashboard,
});


function Dashboard() {

  const score = useScore((state) => state.score);

  return (
    <section id="dashboard">
      <div className="score-pill"><IconDiamond />{score}</div>
      <img src="../../../public/cube.svg" alt="logo" width={200} />
      <article className="info-card">
        <div>
          <h2>Play</h2>
          <p>Start the quiz and enjoy the game!</p>
          <Link
            to="/protected/quiz"
            activeOptions={{ exact: true }}
            className="button--variant-solid--white"
          >Get Started <IconChevronRight size={18} /></Link>
        </div>
      </article>
    </section>
  )
}

export default Dashboard
