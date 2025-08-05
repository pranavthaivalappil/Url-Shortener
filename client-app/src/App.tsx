import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <Container />
            </main>
            <Footer />
        </div>
    );
}

export default App;