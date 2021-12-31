import logo from './logo.svg';
import './App.css';
import React from 'react';
import Hello from './Hello';

function App() {
  const name1 = 'react';
  const name = "코딩온" ;
  const style1 = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24,
    padding: '1rem'
  }
  return (
      <>
          <div className="test">홍길동</div>
          { name == "코딩온" ? ( <h1> 코딩온입니다. </h1> ) : ( <h2> 코딩온이 아닙니다. </h2>)}
        {/*주석 조건문 사용법 true : false */}
        /*주석*/
        <Hello />
        <Hello />
        <div style={style1}>{name1}</div>
        <div className="gray-box"></div>
        <Hello name="react"/>
      </>
  );
}

export default App;




//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

