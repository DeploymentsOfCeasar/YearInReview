// project import
import ThemeCustomization from './themes/ThemeCustomization';
import { ScrollTop } from './components';
import Routes from './routes/RoutesApp';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

function App() {
    return (
        <ThemeCustomization>
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    );
}

export default App;
