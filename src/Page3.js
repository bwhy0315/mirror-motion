import './App.css';
import  MainHeader from'./Page2Components/MainHeader'
import  MainTitle from './Page3Components/MainTitle' 
import  MainPage3 from './Page3Components/MainPage3'
import BottomComponents from './PageComponents/BottomComponets';
 function App() {
  return (
    <div className="App">
       <MainHeader/>
       <MainTitle/>
       <MainPage3/>
       <BottomComponents/>
      </div>
  );
}

export default App;
