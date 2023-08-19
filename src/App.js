import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import VideoDetail from './VideoDetail';

function App() {
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={< Home />}/>
                    <Route path="/video/:videoId" element={< VideoDetail />}/>
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
