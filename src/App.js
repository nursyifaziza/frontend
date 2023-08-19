import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import VideoDetail from './VideoDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={< Home />}/>
                <Route path="/video/:videoId" element={< VideoDetail />}/>
            </Routes>
        </Router>
    );
}

export default App;
