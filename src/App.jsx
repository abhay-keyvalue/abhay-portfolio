import { lazy, Suspense, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Desktop from './components/Desktop/Desktop';
import './styles.css';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showDesktop, setShowDesktop] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleExplore3D = () => {
    setShowDesktop(false);
  };

  const handleBackToDesktop = () => {
    setShowDesktop(true);
  };

  return (
    <div className="app">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {!isLoading && showDesktop && (
        <Desktop onExplore={handleExplore3D} />
      )}
    </div>
  );
}

export default App;
