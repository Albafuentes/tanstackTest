import { createRoute } from "@tanstack/react-router";
import { Badge } from "@/components/Badge/Badge";
import useSession from "@/zunstand/session";
import { Route as ProtectedRoutesLayoutRoute } from "../layout";
import type { QuizModel } from "@/types/quiz.types";
import { api } from "@/service/api.service";
import { QuizCard } from "./QuizCard/QuizCard";
import styles from "./dashboard.module.css";
import { ABBREVIATION_PT } from "@/config/constants";
import { formatSentenceString } from "@/utils/formats";
import { AnimatedRoute } from "@/components";

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
  const session = useSession();
  const { quizsData } = Route.useLoaderData() as { quizsData: QuizModel.Quiz[] };

  return (
    <AnimatedRoute variant="scale">
      <section className={styles["dashboard"]}>
        <h3>Let's play a quiz!</h3>

        <article className={styles["dashboard-quizs"]}>
          {quizsData.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </article>
        <article className={styles["dashboard-scores"]}>
          <strong>Lastest Scores</strong>
          <ul>
            {session?.history.length ? session?.history.map((historyItem, index) => (
              <li key={index}>
                <Badge variant="tag">
                  <span>{formatSentenceString(historyItem.quizName)}</span>
                  <span>{historyItem.points} {ABBREVIATION_PT}</span>
                </Badge>
              </li>
            )) : <li className={styles["dashboard-scores__item-empty"]}>No scores yet...</li>}
          </ul>
        </article>
      </section>
    </AnimatedRoute>
  );
}

export default Dashboard;
