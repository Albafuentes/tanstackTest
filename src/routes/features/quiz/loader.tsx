import PageTemplateContent from "./components/PageTemplateContent";
import PageTemplateHeader from "./components/PageTemplateHeader";

const Loader = () => {
    return (
        <section id="loader">
            <PageTemplateHeader />
            <PageTemplateContent />
        </section>
    );
};

export default Loader;