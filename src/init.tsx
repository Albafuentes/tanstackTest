
import { createRoute, Link } from '@tanstack/react-router'
import { Route as RootRoute } from "./routes/__root";
import { IconChevronRight, IconDiamond } from '@tabler/icons-react';

const dataMock = {
  points: 100,
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: Init,
});


function Init() {

  return (
    <section id="init">
      <div className="score-pill"><IconDiamond />{dataMock.points}</div>
      <img src="../../public/cube.svg" alt="logo" width={200} />
      <article className="info-card">
        <div>
          <h2>Play</h2>
          <p>Start the quiz and enjoy the game!</p>
          <Link
            to="/quiz"
            activeOptions={{ exact: true }}
          >get started <IconChevronRight size={18} /></Link>
        </div>
      </article>
    </section>
  )
}

export default Init
