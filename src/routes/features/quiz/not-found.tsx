import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <section id="not-found">
            <article>
                <div className="not-found__text">
                    <h1>404</h1>

                    <p>The quiz you are looking for does not exist.</p>
                </div>
                <img src="../../public/cube-variant-02.svg" alt="logo" width={200} />
                <button onClick={() => navigate({ to: "/" })} className="button--variant-outline"><IconChevronLeft size={18} /> Back to Home</button>
            </article>
        </section>
    );
};

export default NotFound;