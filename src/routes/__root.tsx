import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import { Error } from '@/components/Error/Error';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <Error status={404} />,
  head: () => ({
    meta: [
      { title: "Quiz" },
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  })
});

function RootLayout() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  );
}