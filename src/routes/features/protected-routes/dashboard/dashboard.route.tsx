import { createRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/Badge/Badge";
import useSession from "@/zunstand/session";
import { Route as ProtectedRoutesLayoutRoute } from "../layout";
import type { QuizModel } from "@/types/quiz.types";
import { api } from "@/service/api.service";
import { QuizCard } from "./QuizCard/QuizCard";
import styles from "./dashboard.module.css";

export const Route = createRoute({
  getParentRoute: () => ProtectedRoutesLayoutRoute,
  path: "/",
  component: Dashboard,
  loader: async () => {
    try {
      const quizsData = await api.quiz.getQuizs();
      return { quizsData };

    } catch (error) {
      console.error("Error fetching quiz data:", error);
      return { quizsData: [] };
    }
  },
  // staleTime fixed the revalidation of the data. The loader function is not executed again on the client, and the data is not fetched again if it does not become stale.
  // staleTime: 1000 * 60 * 5, // 5 minutes
  staleTime: 0,

  // gcTime fixed the garbage collection of the data. The loader function is not executed again on the client, and the data is not fetched again if the user does not navigate away from the page.
  // gcTime: 1000 * 60 * 10, // 10 minutes
  gcTime: 0,

  // page error 404, the page is not found, the component is rendered, and the user can navigate to another page.
  notFoundComponent: () => <>not found...</>,

  // the component is rendered while the navigator is pending a few minutes. It works with pendingMs and only appears to after the time specified in pendingMs. It is useful for long loading times, and the user can see a loading state.
  // pendingComponent: () => <>Loading...</>,
  // pendingMs: 1000, // 1 second

});

function Dashboard() {

  const { quizsData } = Route.useLoaderData() as { quizsData: QuizModel.Quiz[] };

  return (
    <main id="dashboard" className={styles["dashboard"]}>
      <section>
        <h3>Let's play a quiz!</h3>

        <article className={styles["dashboard-quizs"]}>
          {quizsData.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </article>
        <article className={styles["dashboard-scores"]}>
          <p>Lastest Scores</p>
          <ul>
            <li><Badge variant="tag"><span>score</span><span>0 XP</span></Badge></li>
            <li><Badge variant="tag"><span>score</span><span>0 XP</span></Badge></li>
            <li><Badge variant="tag"><span>score</span><span>0 XP</span></Badge></li>
          </ul>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
