import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

/*
* This component displays the 404 not found page for the quiz section and it is called in the index.tsx file when the loader function does not find any data. It is a mirror of the quiz page, and it must be a mirror of the quiz page.
* The page redirects the user to the home page when the button is clicked.
*/

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <section id="not-found">
            <article>
                <div className="not-found__text">
                    <h1>404</h1>

                    <p>The quiz you are looking for does not exist.</p>
                </div>
                <img src="../../../public/cube-variant-02.svg" alt="logo" width={300} />
                <button onClick={() => navigate({ to: "/" })} className="button--variant-outline"><IconChevronLeft size={18} /> Back to Home</button>
            </article>
        </section>
    );
};

export default NotFound;